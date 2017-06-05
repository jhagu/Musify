'use strict'

var express = require("express");
var albumController = require("../controllers/albumController.js");
var multiparty = require("connect-multiparty");
var md_auth = require("../middlewares/autheticated.js");
var md_upload = multiparty({uploadDir: "./uploads/album"});
var api = express.Router();

api.get("/getAlbum/:id", md_auth.ensureAuth, albumController.getAlbum);
api.post("/saveAlbum", md_auth.ensureAuth, albumController.saveAlbum);
//api.get("/getAll/:page?", md_auth.ensureAuth, artistController.getAll);
//api.put("/updateArtist/:id", md_auth.ensureAuth, artistController.updateArtist);
//api.delete("/deleteArtist/:id", md_auth.ensureAuth, artistController.deleteArtist);
//api.post("/upload-image/:id", [md_auth.ensureAuth, md_upload], artistController.uploadImage);
//api.get("/get-image/:imageFile", artistController.getImageFile);

module.exports = api;