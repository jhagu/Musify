'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

/*****************Cargar rutas********************/

                //Rutas de usuario
var userRoutes = require("./routes/userRoutes.js");

                //Rutas de artistas
var artistRoutes = require("./routes/artistRoutes.js");

                //Rutas de Albums
var albumRoutes = require("./routes/albumRoutes.js");

                //Rutas de Canciones
var songRoutes = require("./routes/songRoutes.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next();
});


//Ruta Base de Usuario
app.use("/user", userRoutes);
//Ruta base de Artista
app.use("/artist", artistRoutes);
//Ruta base de Album
app.use("/album", albumRoutes);
//Rutas base de Cancion
app.use("/song", songRoutes);

module.exports = app;