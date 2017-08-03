import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Artist} from "../models/artist";
import {Album} from "../models/album";

@Injectable()
export class AlbumService{
    
    public url : string;

    constructor(private _http : Http){
        
        this.url = GLOBAL.album_url;
    }

    public addAlbum(token, album : Album){

        let params = JSON.stringify(album);
        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});

        return this._http.post(this.url + "/saveAlbum", params, {headers : headers}).map(res => res.json());
    }

    public getAlbum(token, albumId : string){

        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});
        let options = new RequestOptions({headers : headers});

        return this._http.get(this.url + "/getAlbum/"  + albumId, options).map(res => res.json());
    }

    public updateAlbum(token, albumId : string, album : Album){

        let params = JSON.stringify(album);
        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});

        return this._http.put(this.url + "/updateAlbum/" + albumId , params, {headers : headers}).map(res => res.json());
    }

    public getAlbums(token, artistId = null){
        
        let headers = new Headers({
            "Content-Type" : "application/json", 
            "Authorization" : token
        });

        let options = new RequestOptions({headers : headers});

        if (artistId == null){
            return this._http.get(this.url + "/getAll/", options).map(res => res.json());
        }
        else{
            return this._http.get(this.url + "/getAll/" + artistId, options).map(res => res.json());
        }
        
    }

    public deleteAlbum(token, id : string){
        
        let headers = new Headers({
            "Content-Type" : "application/json", 
            "Authorization" : token
        });

        let options = new RequestOptions({headers : headers});
        return this._http.delete(this.url + "/deleteAlbum/" + id, options).map(res => res.json());
    }
}