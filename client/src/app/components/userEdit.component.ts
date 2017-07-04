import {Component, OnInit} from "@angular/core";
import { User } from "../models/user";
import {UserService} from "../services/user.services";
import {GLOBAL} from "../services/global";

@Component({
    selector:"user-edit",
    templateUrl:"../views/userEdit.html",
    providers: [UserService]  
})
export class UserEditComponent implements OnInit{
    
    //Properties
    title : String;

    userToUpdate : User;

    identity;

    token;

    alertUpdate;

    filesToUpload : Array<File>;

    url : string;

    constructor(private _userService : UserService){

        this.title = "Update my info";

        //LocalStorage

        this.identity = this._userService.getIdentity();

        this.token = this._userService.getToken();

        //User in the localStorage

        this.userToUpdate = this.identity;

        this.url = GLOBAL.user_url;

    }
    
    ngOnInit() {

        console.log("userEditComponent successfully loaded.");

    }

    onSubmit(){

        this._userService.update(this.userToUpdate).subscribe(
            
            response =>{

                if (!response.user){

                    this.alertUpdate = "The user was not updated.";
                }
                else{

                    //this.userToUpdate = response.user; //Si dejo esta linea me trae los 
                    //datos viejos que modifique, por eso la comento

                    localStorage.setItem("identity", JSON.stringify(this.userToUpdate));

                    document.getElementById("span-identity-name").innerHTML = this.userToUpdate.firstName;

                    if (!this.filesToUpload){
                        //Redireccion
                    }else{

                        this.makeFileRequest(this.url + "/upload-image/" + this.userToUpdate._id, [], this.filesToUpload).then(

                            (result : any) =>{
                                this.userToUpdate.image = result.image;
                                //Vuelvo a actualizar el usuario
                                localStorage.setItem("identity", JSON.stringify(this.userToUpdate));

                                let imagePath = this.url + "/get-image/" + this.userToUpdate.image;

                                document.getElementById("get-image-user").setAttribute("src", imagePath);
                            } 
                        );

                    }

                    this.alertUpdate = "The user  was successfully updated.";
                }
            },
            err =>{

                let body = JSON.parse(err._body);

                this.alertUpdate = body.alertUpdate;

            }
        );
    }

    fileChangeEvent(fileInput : any){

        this.filesToUpload = <Array<File>> fileInput.target.files;
        
    }

    makeFileRequest(url : string, params : Array<String>, files : Array<File>){

        var token = this.token;

        return new Promise(function(resolve, reject){
            //Simular el comportamiento de un form normal
            var formData : any = new FormData();

            var xhr = new XMLHttpRequest();

            for (var i = files.length -1 ; i >= 0 ; i--){

                formData.append("image", files[i], files[i].name);

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