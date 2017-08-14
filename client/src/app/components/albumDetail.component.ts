import {Component, OnInit} from "@angular/core";
import { Album } from "../models/album";
import {Song} from "../models/song";
import {UserService} from "../services/user.services";
import {AlbumService} from "../services/album.services";
import {SongService} from "../services/song.services";
import {GLOBAL} from "../services/global";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector : "album-detail",
    templateUrl: "../views/albumDetail.html", 
    providers : [UserService, AlbumService, SongService]
})

export class AlbumDetailComponent implements OnInit{

    public album : Album;

    public identity;

    public token;
    
    public albumUrl:string;

    public alertMessage;

    public songs : Song[];

    public confirmated;

    public songUrl : string;

    constructor(
        private _route : ActivatedRoute, 
        private _router: Router, 
        private _userService : UserService, 
        private _albumService : AlbumService,
        private _songService : SongService){

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.albumUrl = GLOBAL.album_url;
        this.songUrl = GLOBAL.song_url;
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

                        this._songService.getSongs(this.token, res.album._id).subscribe(
                            res =>{
                                if(!res.songs){
                                    this.alertMessage = "Songs not found for" + this.album.title;
                                }
                                else{
                                    this.songs = res.songs;
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

    onDeleteSong(id){

        this.confirmated = id;
    }

    onCancelDelete(){
        this.confirmated = null;
    }

   onConfirmDelete(id){
        this._songService.deleteSong(this.token, id).subscribe(
            res =>{
                if (!res.song){
                    alert("Server error");
                }
                else{
                    this.getAlbum();
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
    
    
    startPlayer(song){
        let songPlayer = JSON.stringify(song);
        let filePath = this.songUrl + "/get-song/" + song.file;
        let imagePath = this.albumUrl + "/get-image/" + song.album.image;

        localStorage.setItem("songSound", songPlayer);
        document.getElementById("mp3-source").setAttribute("src", filePath);
        (document.getElementById("player") as any).load();
        (document.getElementById("player") as any).play();

        document.getElementById("play-song-title").innerHTML = song.title;
        document.getElementById("play-song-artist").innerHTML = song.album.artist.name;
        document.getElementById("play-image-album").setAttribute("src", imagePath);
    }
}