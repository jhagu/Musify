import {Component, OnInit} from "@angular/core";
import { Artist } from "../models/artist";
import {ArtistService} from "../services/artist.services";
import {UserService} from "../services/user.services";
import {UploadService} from "../services/upload.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "artist-edit",
    templateUrl: "../views/artistAdd.html", //MISMA PLANTILLA
    providers : [UserService, ArtistService, UploadService]
})

export class ArtistEditComponent implements OnInit{

    public title: string;

    public artist : Artist;

    public identity;

    public token;

    public url:string;

    public alertMessage;

    public isEdit;

    public filesToUpload : Array<File>;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService, 
        private _artistService : ArtistService,
        private _uploadService : UploadService){

        this.title = "Update artist";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.artist_url;
        this.artist = new Artist("","","");
        this.isEdit = true;
    }

    ngOnInit(){
        console.log("artistEdit.component.ts successfully loaded");

        //Llamar al metodo de la api para sacar un artista en base a su id getArtist
        this.getArtist();
    }

    public getArtist(){
        
        this._route.params.forEach((params : Params) => {
            let id = params["id"];

            this._artistService.getArtist(this.token, id).subscribe(
                res =>{
                    if (!res.artist){
                        this._router.navigate(["/"]);
                    }
                    else{
                        this.artist = res.artist;
                    }
                },
                err =>{
                    var errorMessage = <any>err;
                    if (errorMessage!=null){
                        var body = JSON.parse(err._body);
                        console.log(err);
                    }
                }
            );

        });

    }

    onSubmit(){
        console.log(this.artist);
        
        this._route.params.forEach((params : Params) => {
            
            let id = params["id"];
            
            this._artistService.updateArtist(this.token, id, this.artist).subscribe(
                res => {

                    if (!res.artist){
                        this.alertMessage = "Server error";
                    }
                    else{
                        this.alertMessage = "Artist updated successfully";
                         if (!this.filesToUpload){
                            //Redirigir
                            this._router.navigate(["/detailArtist", res.artist._id]);
                        }
                        else{
                        //Subir imagen artista
                            this._uploadService.makeFileRequest(this.url + "/upload-image/" + id, [], this.filesToUpload, this.token, "image")
                            .then(
                                (result) =>{
                                    this._router.navigate(["/detailArtist", res.artist._id]);
                                },
                                (error) =>{
                                    console.log(error);
                                }
                            );
                        }
                    }
                },
                err =>{
                    var errorMessage = <any>err;
                    if (errorMessage!=null){
                        var body = JSON.parse(err._body);
                        console.log(err);
                    }
                }
            )
        });
    }

    fileChangeEvent(fileInput : any){

        this.filesToUpload = <Array<File>> fileInput.target.files; 
    }
}