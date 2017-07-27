import {Component, OnInit} from "@angular/core";
import { Artist } from "../models/artist";
import { Album } from "../models/album";
import {AlbumService} from "../services/album.services";
import {UserService} from "../services/user.services";
import {UploadService} from "../services/upload.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "album-edit",
    templateUrl: "../views/albumAdd.html", //MISMA PLANTILLA
    providers : [UserService, UploadService, AlbumService]
})

export class AlbumEditComponent implements OnInit{

    public title: string;

    public album : Album;

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
        private _uploadService : UploadService,
        private _albumService : AlbumService){

        this.title = "Update album";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.album_url;
        this.album = new Album("","",2017, "", "");
        this.isEdit = true;
    }

    ngOnInit(){
        console.log("albumEdit.component.ts successfully loaded");

        //Llamar al metodo de la api para sacar un artista en base a su id getArtist
        //this.getAlbum();
    }

   /*  public getAlbum(){
        
        this._route.params.forEach((params : Params) => {
            let id = params["albumId"];

            this._albumService.getArtist(this.token, id).subscribe(
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
                        //Subir imagen artista
                        this._uploadService.makeFileRequest(this.url + "/upload-image/" + id, [], this.filesToUpload, this.token, "image")
                        .then(
                                (result) =>{
                                    this._router.navigate(["/"]);
                                },
                                (error) =>{
                                    console.log(error);
                                }
                        );

                        //this.artist = res.artist;
                        //this._router.navigate(["/editArtist"], res.artist._id); //Para añadir imagen cdo se crea
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
    } */
}