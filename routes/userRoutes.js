'use strict'

var express = require("express");
var userController = require("../controllers/userController.js");

var api = express.Router();

api.get("/testUserController", userController.pruebas);
api.post("/register", userController.saveUser);

module.exports = api;