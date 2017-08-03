import {Component, OnInit} from "@angular/core";
import { Album } from "../models/album";
import { Artist } from "../models/artist";
import {ArtistService} from "../services/artist.services";
import {AlbumService} from "../services/album.services";
import {UserService} from "../services/user.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "album-add",
    templateUrl: "../views/albumAdd.html",
    providers : [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements OnInit{

    public title: string;

    public artist : Artist;

    public album : Album;

    public identity;

    public token;

    public url:string;

    public alertMessage;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService, 
        private _artistService : ArtistService,
        private _albumService : AlbumService
    )
    {
        this.title = "Add album";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.album_url;
        this.album = new Album("","",2017, "", "");
    }

    ngOnInit(){
        console.log("albumAddComponent.ts successfully loaded");
    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let artist_id = params["artistId"];
            this.album.artist = artist_id;

            this._albumService.addAlbum(this.token, this.album).subscribe(
                res => {

                if (!res.album){
                    this.alertMessage = "Server error";
                }
                else{
                    this.alertMessage = "Album created successfully";
                    this.album = res.album;
                    //Para añadir imagen cdo se crea
                    //Si no le paso el id dentro de las llaves, no redirige correctamente
                    this._router.navigate(["/editAlbum", res.album._id]); 
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
}