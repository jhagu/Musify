import {Component, OnInit} from "@angular/core";
import { Artist } from "../models/artist";
import { Album } from "../models/album";
import {ArtistService} from "../services/artist.services";
import {UserService} from "../services/user.services";
import {AlbumService} from "../services/album.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "artist-detail",
    templateUrl: "../views/artistDetail.html", //MISMA PLANTILLA
    providers : [UserService, ArtistService, AlbumService]
})

export class ArtistDetailComponent implements OnInit{

    public artist : Artist;

    public identity;

    public token;

    public artistUrl:string;
    
    public albumUrl:string;

    public alertMessage;

    public albums : Album[];

    public confirmated;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService, 
        private _artistService : ArtistService,
        private _albumService : AlbumService){

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.artistUrl = GLOBAL.artist_url;
        this.albumUrl = GLOBAL.album_url;
    }

    ngOnInit(){
        console.log("artistDetail.component.ts successfully loaded");
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

                        //Mostrar albums del artista

                        this._albumService.getAlbums(this.token, res.artist._id).subscribe(
                            res =>{
                                if(!res.albums){
                                    this.alertMessage = "Albums not found for" + this.artist.name;
                                }
                                else{
                                    this.albums = res.albums;
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

    onDeleteAlbum(id){

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
    }
}