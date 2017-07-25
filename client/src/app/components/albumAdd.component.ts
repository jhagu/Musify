import {Component, OnInit} from "@angular/core";
import { Album } from "../models/album";
import { Artist } from "../models/artist";
import {ArtistService} from "../services/artist.services";
import {UserService} from "../services/user.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "album-add",
    templateUrl: "../views/albumAdd.html",
    providers : [UserService, ArtistService]
})

export class AlbumAddComponent implements OnInit{

    public title: string;

    public artist : Artist;

    public album : Album;

    public identity;

    public token;

    public url:string;

    public alertMessage;

    constructor(private _route : ActivatedRoute, private _router: Router, private _userService : UserService, private _artistService : ArtistService){

        this.title = "Add album to Artist";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.album_url;
        this.album = new Album("","",2017, "", "");
    }

    ngOnInit(){
        console.log("albumAddComponent.ts successfully loaded");
    }

}