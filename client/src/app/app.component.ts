import { Component, OnInit } from '@angular/core';
import { User } from "./models/user"
import {UserService} from "./services/user.services";

//Aca abajo cargo el servicio a usar, en un array de providers
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'Musify';
  public user : User;
  public identity; //Propiedad con los datos del usuario logueado
  public token;
  public errMessage;

  //Tmb tengo que cargar el servicio en el constructor
  constructor(private _userService : UserService){
    this.user = new User("","","","","","ROLE_USER","");
  }

  ngOnInit(){
  }

  public onSubmit(){
    //Datos del usuario identificado
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response.user;
        //this.identity -->  variable global de este componente
        this.identity = identity;

        if (!this.identity._id){
          alert("Usuario no identificado");
        }
        else{
          //Crear elemento en el localstorage para la sesion del usuario

          //Obtener token para enviarlo a cada peticion http
          this._userService.signUp(this.user, true).subscribe(
            response => {
              let token = response.token;
              //this.token -->  variable global de este componente
              this.token = token;

              if (this.token <= 0){
                alert("Token generado incorrectamente");
              }
              else{
                //Crear elemento en el localstorage para el token
                console.log("Usuario:");
                console.log(identity);
                console.log("Token:\n" + token);
              }
            },
            err => {
              let body = JSON.parse(err._body);
              this.errMessage = body.message;
              }
          );
        }
      },
      err => {
        let body = JSON.parse(err._body);
        this.errMessage = body.message;
        }
    );
  }
}
