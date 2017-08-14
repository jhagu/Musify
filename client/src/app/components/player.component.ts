import {Component, OnInit} from "@angular/core";
import { Song } from "../models/song";
import {GLOBAL} from "../services/global";

@Component({
    selector : "player",
    template : `
        <div class="album-image">
            <span *ngIf="song.album">
                <img id="play-image-album" src="{{album_url + '/get-image/' + song.album.image}}"/>
            </span>
            <span *ngIf="!song.album">
                <img id="play-image-album" src="assets/images/player.png"/>
            </span>
        </div>

        <div class="audio-file">
            <p>Playing</p>
            <span id="play-song-title">{{song.title}}</span>
            <span> - </span>
            <span id="play-song-artist">
                <span *ngIf="song.album.artist">
                    {{song.album.artist.name}}
                </span>
            </span>

            <audio controls id="player">
                <source id="mp3-source" src="{{song_url + '/get-song/' + song.file}}" type="audio/mpeg"/>
                Your browser does not support audio files
            </audio>
        </div>
    `
})

export class PlayerComponent implements OnInit{

    public album_url : string;

    public song_url : string;

    public song : Song;

    constructor(){

        this.album_url = GLOBAL.album_url;

        this.song_url = GLOBAL.song_url;

        this.song = new Song("1","","","","");

    }

    ngOnInit(){
        console.log("Player loaded");

        var song = JSON.parse(localStorage.getItem("songSound"));

        if (song){
            this.song = song;
        }
        else{
            this.song = new Song("1","","","","");
        }
    }
}