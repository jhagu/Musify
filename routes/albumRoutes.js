'use strict'

var express = require("express");
var albumController = require("../controllers/albumController.js");
var multiparty = require("connect-multiparty");
var md_auth = require("../middlewares/autheticated.js");
var md_upload = multiparty({uploadDir: "./uploads/albums"});
var api = express.Router();

api.get("/getAlbum/:id", md_auth.ensureAuth, albumController.getAlbum);
api.post("/saveAlbum", md_auth.ensureAuth, albumController.saveAlbum);
api.get("/getAll/:artistId?", md_auth.ensureAuth, albumController.getAll);
api.put("/updateAlbum/:albumId", md_auth.ensureAuth, albumController.updateAlbum);
api.delete("/deleteAlbum/:albumId", md_auth.ensureAuth, albumController.deleteAlbum);
api.post("/upload-image/:albumId", [md_auth.ensureAuth, md_upload], albumController.uploadImage);
api.get("/get-image/:imageFile", albumController.getImageFile);

module.exports = api;