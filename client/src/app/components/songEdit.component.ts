import {Component, OnInit} from "@angular/core";
import { Song } from "../models/song";
import { UserService } from "../services/user.services";
import { SongService } from "../services/song.services";
import { UploadService } from "../services/upload.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "song-edit",
    templateUrl: "../views/songAdd.html",
    providers : [UserService, SongService, UploadService]
})

export class SongEditComponent implements OnInit{

    public title: string;

    public song : Song;

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
        private _songService : SongService,
        private _uploadService : UploadService
    )
    {
        this.title = "Edit song";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.song_url;
        this.song = new Song("1", "", "", "", "");
        this.isEdit = true;
    }

    ngOnInit(){
        console.log("songEditComponent.ts successfully loaded");

        //Obtener cancion a editar
        this.getSong();
    }

    public getSong(){
        
        this._route.params.forEach((params : Params) => {
            let id = params["songId"];

            this._songService.getSong(this.token, id).subscribe(
                res =>{
                    if (!res.song){
                        this._router.navigate(["/"]);
                    }
                    else{
                        this.song = res.song;
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
            
            let id = params["songId"];
            
            this._songService.updateSong(this.token, id, this.song).subscribe(
                res => {

                    if (!res.song){
                        this.alertMessage = "Server error";
                    }
                    else{
                        this.alertMessage = "Song updated successfully";

                        if (!this.filesToUpload){
                            //Redirigir
                            this._router.navigate(["/detailAlbum", res.song.album]);
                        }
                        else{                        
                            //Subir archivo audio
                            this._uploadService.makeFileRequest(this.url + "/upload-song/" + id, [], this.filesToUpload, this.token, "file")
                            .then(
                                (result) =>{
                                    this._router.navigate(["/detailAlbum", res.song.album]);
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