import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Artist} from "../models/artist";

@Injectable()
export class UploadService{
    
    public url : string;

    constructor(private _http : Http){
        
        this.url = GLOBAL.artist_url;
    }

    makeFileRequest(url : string, params : Array<String>, files : Array<File>, token : string, fileName:string){

        return new Promise(function(resolve, reject){
            //Simular el comportamiento de un form normal
            var formData : any = new FormData();

            var xhr = new XMLHttpRequest();

            for (var i = files.length -1 ; i >= 0 ; i--){

                formData.append(fileName, files[i], files[i].name);

            }

            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Authorization", token);
            xhr.send(formData);
        });
    }
}
