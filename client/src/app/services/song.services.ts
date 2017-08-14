import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Song} from "../models/song";

@Injectable()
export class SongService{
    
    public url : string;

    constructor(private _http : Http){
        
        this.url = GLOBAL.song_url;
    }

    public addSong(token, song : Song){

        let params = JSON.stringify(song);
        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});

        return this._http.post(this.url + "/saveSong", params, {headers : headers}).map(res => res.json());
    }

    public getSong(token, songId : string){

        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});
        let options = new RequestOptions({headers : headers});

        return this._http.get(this.url + "/getSong/"  + songId, options).map(res => res.json());
    }

    public updateSong(token, songId : string, song : Song){

        let params = JSON.stringify(song);
        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});

        return this._http.put(this.url + "/updateSong/" + songId , params, {headers : headers}).map(res => res.json());
    }

    public getSongs(token, albumId = null){
        
        let headers = new Headers({
            "Content-Type" : "application/json", 
            "Authorization" : token
        });

        let options = new RequestOptions({headers : headers});

        if (albumId == null){
            return this._http.get(this.url + "/getAll/", options).map(res => res.json());
        }
        else{
            return this._http.get(this.url + "/getAll/" + albumId, options).map(res => res.json());
        }
        
    }

    public deleteSong(token, id : string){
        
        let headers = new Headers({
            "Content-Type" : "application/json", 
            "Authorization" : token
        });

        let options = new RequestOptions({headers : headers});
        return this._http.delete(this.url + "/deleteSong/" + id, options).map(res => res.json());
    } 
}