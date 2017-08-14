import {Component, OnInit} from "@angular/core";
import { Song } from "../models/song";
import { UserService } from "../services/user.services";
import { SongService } from "../services/song.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "song-add",
    templateUrl: "../views/songAdd.html",
    providers : [UserService, SongService]
})

export class SongAddComponent implements OnInit{

    public title: string;

    public song : Song;

    public identity;

    public token;

    public url:string;

    public alertMessage;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService,
        private _songService : SongService
    )
    {
        this.title = "Create song";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.song_url;
        this.song = new Song("1", "", "", "", "");
    }

    ngOnInit(){
        console.log("songAddComponent.ts successfully loaded");
    }

    onSubmit(){
        
        this._route.params.forEach((params: Params) => {
            let album_id = params["albumId"];
            this.song.album = album_id;

            this._songService.addSong(this.token, this.song).subscribe(
                res => {
                    if (!res.song){
                        this.alertMessage = "Server error";
                    }
                    else{
                        this.alertMessage = "Song created successfully";
                        //Actualiza el objeto con lo q viene de la bb dd
                        this.song = res.song;
                        //Para añadir archivo cdo se crea
                        //Si no le paso el id dentro de las llaves, no redirige correctamente
                        this._router.navigate(["/editSong", res.song._id]); 
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