'use strict'

var express = require("express");
var artistController = require("../controllers/artistController.js");
var multiparty = require("connect-multiparty");
var md_auth = require("../middlewares/autheticated.js");
var api = express.Router();
//Para proteger las rutas a las que queremos que acceda el usuario, pasamos el middleware de autenticacion como 2
//parametro en el metodo.
//api.get("/testUserController", userController.pruebas);
api.get("/get/:id", md_auth.ensureAuth, artistController.getArtist);
api.post("/saveArtist", md_auth.ensureAuth, artistController.saveArtist);

module.exports = api;