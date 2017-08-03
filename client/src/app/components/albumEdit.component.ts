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
        this.getAlbum();
    }

   public getAlbum(){
        
        this._route.params.forEach((params : Params) => {
            let id = params["albumId"];

            this._albumService.getAlbum(this.token, id).subscribe(
                res =>{
                    if (!res.album){
                        this._router.navigate(["/"]);
                    }
                    else{
                        this.album = res.album;
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
              
        this._route.params.forEach((params : Params) => {
            
            let id = params["albumId"];
            
            this._albumService.updateAlbum(this.token, id, this.album).subscribe(
                res => {

                    if (!res.album){
                        this.alertMessage = "Server error";
                    }
                    else{
                        this.alertMessage = "Album updated successfully";

                        if (!this.filesToUpload){
                            //Redirigir
                            this._router.navigate(["/detailArtist", res.album.artist]);
                        }
                        else{                        
                            //Subir imagen artista
                            this._uploadService.makeFileRequest(this.url + "/upload-image/" + id, [], this.filesToUpload, this.token, "image")
                            .then(
                                (result) =>{
                                    this._router.navigate(["/detailArtist", res.album.artist]);
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