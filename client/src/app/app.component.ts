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
  public identity=false; //Propiedad con los datos del usuario logueado
  public token;
  public errMessage;

  //Tmb tengo que cargar el servicio en el constructor
  constructor(private _userService : UserService){
    this.user = new User("","","","","","ROLE_USER","");
  }

  ngOnInit(){
  }

  public onSubmit(){
    console.log(this.user);

    this._userService.signUp(this.user).subscribe(
      response => {
        console.log(response);

      },
      err => {
        let body = JSON.parse(err._body);
        this.errMessage = body.message;
        if (this.errMessage!=null){
          console.log(err);   
        }
      }
    );
  }

}
