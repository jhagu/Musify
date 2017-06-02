'use strict'

var express = require("express");
var artistController = require("../controllers/artistController.js");
var multiparty = require("connect-multiparty");
var md_auth = require("../middlewares/autheticated.js");
var md_upload = multiparty({uploadDir: "./uploads/artists"});
var api = express.Router();
//Para proteger las rutas a las que queremos que acceda el usuario, pasamos el middleware de autenticacion como 2
//parametro en el metodo.
//api.get("/testUserController", userController.pruebas);
api.get("/getArtist/:id", md_auth.ensureAuth, artistController.getArtist);
api.post("/saveArtist", md_auth.ensureAuth, artistController.saveArtist);
api.get("/getAll/:page?", md_auth.ensureAuth, artistController.getAll);
api.put("/updateArtist/:id", md_auth.ensureAuth, artistController.updateArtist);
api.delete("/deleteArtist/:id", md_auth.ensureAuth, artistController.deleteArtist);
api.post("/upload-image/:id", [md_auth.ensureAuth, md_upload], artistController.uploadImage);
api.get("/get-image/:imageFile", artistController.getImageFile);

module.exports = api;