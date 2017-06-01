'use strict'

var express = require("express");
var userController = require("../controllers/userController.js");
var multiparty = require("connect-multiparty");
var md_auth = require("../middlewares/autheticated.js");
var md_upload = multiparty({uploadDir: "./uploads/users"});
var api = express.Router();
//Para proteger las rutas a las que queremos que acceda el usuario, pasamos el middleware de autenticacion como 2
//parametro en el metodo.
api.get("/testUserController", md_auth.ensureAuth, userController.pruebas);
api.post("/register", userController.saveUser);
api.post("/login", userController.loginUser);
api.put("/update/:id", md_auth.ensureAuth, userController.updateUser);
api.post("/upload-image/:id", [md_auth.ensureAuth, md_upload], userController.uploadImage);
api.get("/get-image/:imageFile", userController.getImageFile);

module.exports = api;