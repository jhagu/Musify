'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

/*****************Cargar rutas********************/

                //Rutas de usuario
var userRoutes = require("./routes/userRoutes.js");
var artistRoutes = require("./routes/artistRoutes.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//Rutas Base de Usuario
app.use("/user", userRoutes);

//Rutas base de Artista
app.use("/artist", artistRoutes);


module.exports = app;