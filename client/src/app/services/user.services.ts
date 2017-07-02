import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";

@Injectable()
export class UserService{
    
    public identity;
    public token;
    public url : string;

    //Para poder hacer uso de Injection paso un atributo privado http al constructor de esta clase
    //De este modo puedo usar toda la funcionalidad de Http

    constructor(private _http : Http){
        this.url = GLOBAL.user_url;
    }

    //Metodo para loguearse
    public signIn(userToLogin, getHash = null){

        if (getHash != null){
            userToLogin.getHash = getHash;
        }

        let json = JSON.stringify(userToLogin);
        let params = json;

        let headers = new Headers({"Content-Type": "application/json"});
        return this._http.post(this.url + "/login", params, {headers: headers}).map(res => res.json());
    }

    public getIdentity(){

        let identity = JSON.parse(localStorage.getItem("identity"));

        if(identity!="undefined"){
            this.identity = identity;
        }
        else{
            this.identity = null;
        }

        return this.identity;
    }

    public getToken(){

        let token = localStorage.getItem("token");

        if(token!="undefined"){
            this.token = token;
        }
        else{
            this.token = null;
        }
        return this.token;
    }
}