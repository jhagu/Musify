import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Import user components
import { UserEditComponent } from "./components/userEdit.component";

//Import artist components
import { ArtistListComponent } from "./components/artistList.component";
import {ArtistAddComponent} from "./components/artistAdd.component";
import {ArtistEditComponent} from "./components/artistEdit.component";
import {ArtistDetailComponent} from "./components/artistDetail.component";

//Import home component
import { HomeComponent} from "./components/home.component";

//Import album components
import { AlbumAddComponent } from "./components/albumAdd.component";
import { AlbumEditComponent } from "./components/albumEdit.component";


//Definir array con todas las configuraciones de ruta

const appRoutes : Routes = [
    //Se definen JSONS {path : path, component : component} con configuraciones
    {path : '' , component : HomeComponent}, //ruta vacia
    {path : 'editUser' , component : UserEditComponent}, //ruta de edicion
    {path : "artists/:page", component : ArtistListComponent},
    {path : 'createArtist', component : ArtistAddComponent},
    {path : 'editArtist/:id' , component : ArtistEditComponent}, //ruta de edicion
    {path : 'detailArtist/:id' , component : ArtistDetailComponent}, //ruta de detalle
    {path : "createAlbum/:artistId", component: AlbumAddComponent},
    {path : "editAlbum/:albumId", component:AlbumEditComponent},






    //ULTIMA RUTA!!!!!!!
    {path : '**' , component : HomeComponent}, //rutas invalidas
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);

