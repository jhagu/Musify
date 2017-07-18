import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders} from "./app.routing";

import { AppComponent } from './app.component';
//Importo mis componentes
import { UserEditComponent} from "./components/userEdit.component";
import {ArtistListComponent} from "./components/artistList.component";
import { HomeComponent} from "./components/home.component";
import {ArtistAddComponent} from "./components/artistAdd.component";
import {ArtistEditComponent} from "./components/artistEdit.component";
import {ArtistDetailComponent} from "./components/artistDetail.component";

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
