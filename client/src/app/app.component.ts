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

  public user : User; //Logueo de usuario

  public userToRegister : User; //Registro de usuario

  public identity; //Propiedad con los datos del usuario logueado

  public token;

  public errMessage;

  public alertSignUp;

  //Tmb tengo que cargar el servicio en el constructor
  constructor(private _userService : UserService){

    this.user = new User("","","","","","ROLE_USER","");

    this.userToRegister = new User("","","","","","ROLE_USER","");

  }

  ngOnInit(){

    this.identity = this._userService.getIdentity();

    this.token = this._userService.getToken();
    
  }

  public onSignIn(){
    //Datos del usuario identificado
    this._userService.signIn(this.user).subscribe(

      response => {

        let identity = response.user;
        //this.identity -->  variable global de este componente
        this.identity = identity;

        if (!this.identity._id){

          alert("Usuario no identificado");

        }
        else{
          //Crear elemento en el localstorage para la sesion del usuario
          localStorage.setItem("identity", JSON.stringify(identity));
          
          //Obtener token para enviarlo a cada peticion http
          this._userService.signIn(this.user, true).subscribe(

            response => {

              let token = response.token;
              //this.token -->  variable global de este componente
              this.token = token;

              if (this.token <= 0){

                alert("Token generado incorrectamente");

              }
              else{
                //Crear elemento en el localstorage para tener el token disponible
                localStorage.setItem("token", token);            
                //Con el usuario y su token ya en el localStorage, y para evitar inconvenientes al 
                //reloguear con el mismo usuario o loguear con uno nuevo
                //modifico el modelo seteando un nuevo usuario
                this.user = new User("","","","","","ROLE_USER","");

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

  public signOut(){

    if (localStorage.getItem("identity")!=null && localStorage.getItem("token")!=null){

      localStorage.removeItem("identity");

      localStorage.removeItem("token");

      localStorage.clear();
      //Lo siguiente es para redireccionar la pagina al div de inicio de sesion
      this.identity=null;

      this.token=null;

    }
  }

  public onSignUp(){
    console.log(this.userToRegister);

    this._userService.signUp(this.userToRegister).subscribe(

      response => {

        let user = response.user; //desde la bd

        this.userToRegister = user;

        if (!user._id){

          this.alertSignUp = "Error in the Sign Up";

        }
        else{

          this.alertSignUp = "Successfully registered, sign in with " + this.userToRegister.email; 

          this.userToRegister = new User("","","","","","ROLE_USER","");

        }
      },
      err =>{

        let body = JSON.parse(err._body);

        this.alertSignUp = body.message;

      }
    );
  }
}
