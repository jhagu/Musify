import { Component } from '@angular/core';
import { User } from "./models/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'Musify';
  public user : User;
  public identity; //Propiedad con los datos del usuario logueado
  public token;

  constructor(){
    this.user = new User("","","","","","ROLE_USER","");
  }

}
