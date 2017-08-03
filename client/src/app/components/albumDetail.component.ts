import {Component, OnInit} from "@angular/core";
import { Album } from "../models/album";
import {UserService} from "../services/user.services";
import {AlbumService} from "../services/album.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "album-detail",
    templateUrl: "../views/albumDetail.html", //MISMA PLANTILLA
    providers : [UserService, AlbumService]
})

export class AlbumDetailComponent implements OnInit{

    public album : Album;

    public identity;

    public token;
    
    public albumUrl:string;

    public alertMessage;

    public albums : Album[];

    public confirmated;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService, 
        private _albumService : AlbumService){

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.albumUrl = GLOBAL.album_url;
    }

    ngOnInit(){
        console.log("albumDetail.component.ts successfully loaded");
        
        //Sacar album de la bb dd
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
                        //Mostrar canciones del album

                        /* this._albumService.getAlbums(this.token, res.artist._id).subscribe(
                            res =>{
                                if(!res.albums){
                                    this.alertMessage = "Albums not found for" + this.artist.name;
                                }
                                else{
                                    this.albums = res.albums;
                                    console.log(this.albums);
                                }
                            },
                            err =>{
                                var errorMessage = <any>err;
                                if (errorMessage!=null){
                                    var body = JSON.parse(err._body);
                                    console.log(err);
                                }
                            }
                        ) */
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

    /* onDeleteAlbum(id){

        this.confirmated = id;
    }

    onCancelDelete(){
        this.confirmated = null;
    }

    onConfirmDelete(id){
        this._albumService.deleteAlbum(this.token, id).subscribe(
            res =>{
                if (!res.album){
                    alert("Server error");
                }
                else{
                    this.getArtist();
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
    } */ 
}