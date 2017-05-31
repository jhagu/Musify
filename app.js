'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

/*****************Cargar rutas********************/

                //Rutas de usuario
var userRoutes = require("./routes/userRoutes.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//Rutas Base
app.use("/user", userRoutes);
module.exports = app;