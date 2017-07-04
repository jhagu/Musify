import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Import user components

import { UserEditComponent } from "./components/userEdit.component";

//Definir array con todas las configuraciones de ruta

const appRoutes : Routes = [
    //Se definen JSONS {path : path, compoonent : component} con configuraciones
    {path : "" , component : UserEditComponent}, //ruta vacia
    {path : "editUser" , component : UserEditComponent}, //ruta de edicion
    {path : "**" , component : UserEditComponent} //rutas invalidas
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);

