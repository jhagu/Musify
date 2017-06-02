'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

/*****************Cargar rutas********************/

                //Rutas de usuario
var userRoutes = require("./routes/userRoutes.js");

                //Rutas de artistas
var artistRoutes = require("./routes/artistRoutes.js");

var albumRoutes = require("./routes/albumRoutes.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//Ruta Base de Usuario
app.use("/user", userRoutes);

//Ruta base de Artista
app.use("/artist", artistRoutes);

//Ruta base de Album
app.use("/album", albumRoutes);

module.exports = app;