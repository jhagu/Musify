import {Component, OnInit} from "@angular/core";
import { Artist } from "../models/artist";
import {UserService} from "../services/user.services";
import {ArtistService} from "../services/artist.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "artist-list",
    templateUrl: "../views/artistList.html",
    providers : [UserService, ArtistService]
})

export class ArtistListComponent implements OnInit{

    public title: string;

    public artists : Artist[];

    public identity;

    public token;

    public url:string;

    public nextPage;

    public prevPage;

    public confirmated;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService,
        private _artistService : ArtistService){

        this.title = "Artists";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.artist_url;
        this.nextPage = 1;
        this.prevPage = 1;
    }

    ngOnInit(){
        console.log("artistListComponent.ts successfully loaded");

        //Conseguir el listado de artistas
        this.getAllArtists();
    }

    public getAllArtists(){
        this._route.params.forEach((params : Params) =>{
            let page = +params["page"];


            if (!page){
                page = 1;
            }
            else{
                this.nextPage = page + 1;
                this.prevPage = page - 1;

                if (this.prevPage == 0){
                    this.prevPage = 1;
                }
            }

            this._artistService.getArtists(this.token, page).subscribe(
                 res =>{
                    if (!res.artists){
                        this._router.navigate(["/"]);
                    }
                    else{
                        this.artists = res.artists;
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

    onDeleteArtist(id){

        this.confirmated = id;
    }

    onCancelDelete(){
        this.confirmated = null;
    }

    onConfirmDelete(id){
        this._artistService.deleteArtist(this.token, id).subscribe(
            res =>{
                if (!res.artist){
                    alert("Server error");
                }
                this.getAllArtists();
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