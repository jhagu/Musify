import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Artist} from "../models/artist";

@Injectable()
export class ArtistService{
    
    public url : string;

    constructor(private _http : Http){
        
        this.url = GLOBAL.artist_url;
    }

    public addArtist(token, artist : Artist){

        let params = JSON.stringify(artist);
        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});

        return this._http.post(this.url + "/saveArtist", params, {headers : headers}).map(res => res.json());
    }

    public getArtists(token, page){
        
        let headers = new Headers({
            "Content-Type" : "application/json", 
            "Authorization" : token
        });

        let options = new RequestOptions({headers : headers});
        return this._http.get(this.url + "/getAll/" + page, options).map(res => res.json());
    }

    public getArtist(token, id : string){
        
        let headers = new Headers({
            "Content-Type" : "application/json", 
            "Authorization" : token
        });

        let options = new RequestOptions({headers : headers});
        return this._http.get(this.url + "/getArtist/" + id, options).map(res => res.json());
    }

    public updateArtist(token, id : string, artist : Artist){

        let params = JSON.stringify(artist);
        let headers = new Headers({"Content-Type" : "application/json", "Authorization" : token});

        return this._http.put(this.url + "/updateArtist/" + id, params, {headers : headers}).map(res => res.json());
    }

    public deleteArtist(token, id : string){
        
        let headers = new Headers({
            "Content-Type" : "application/json", 
            "Authorization" : token
        });

        let options = new RequestOptions({headers : headers});
        return this._http.delete(this.url + "/deleteArtist/" + id, options).map(res => res.json());
    }


}