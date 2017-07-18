import {Component, OnInit} from "@angular/core";
import { Artist } from "../models/artist";
import {ArtistService} from "../services/artist.services";
import {UserService} from "../services/user.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "artist-add",
    templateUrl: "../views/artistAdd.html",
    providers : [UserService, ArtistService]
})

export class ArtistAddComponent implements OnInit{

    public title: string;

    public artist : Artist;

    public identity;

    public token;

    public url:string;

    public alertMessage;

    constructor(private _route : ActivatedRoute, private _router: Router, private _userService : UserService, private _artistService : ArtistService){

        this.title = "Create new artist";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.artist_url;
        this.artist = new Artist("","","");
    }

    ngOnInit(){
        console.log("artistAddComponent.ts successfully loaded");
    }

    onSubmit(){
        console.log(this.artist);
        this._artistService.addArtist(this.token, this.artist).subscribe(
            res => {

                if (!res.artist){
                    this.alertMessage = "Server error";
                }
                else{
                    this.alertMessage = "Artist created successfully";
                    this.artist = res.artist;
                    this._router.navigate(["/editArtist", res.artist._id]); 
                    //Para añadir imagen cdo se crea
                    //Si no le paso el id dentro de las llaves, no redirige correctamente
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
}