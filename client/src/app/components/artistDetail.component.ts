import {Component, OnInit} from "@angular/core";
import { Artist } from "../models/artist";
import {ArtistService} from "../services/artist.services";
import {UserService} from "../services/user.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "artist-detail",
    templateUrl: "../views/artistDetail.html", //MISMA PLANTILLA
    providers : [UserService, ArtistService]
})

export class ArtistDetailComponent implements OnInit{

    public artist : Artist;

    public identity;

    public token;

    public url:string;

    public alertMessage;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService, 
        private _artistService : ArtistService){

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.artist_url;
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
}