'use strict'

var express = require("express");
var songController = require("../controllers/songController.js");
var multiparty = require("connect-multiparty");
var md_auth = require("../middlewares/autheticated.js");
var md_upload = multiparty({uploadDir: "./uploads/songs/"});
var api = express.Router();

api.get("/getSong/:songId", md_auth.ensureAuth, songController.getSong);
api.post("/saveSong", md_auth.ensureAuth, songController.saveSong);
api.get("/getAll/:albumId?", md_auth.ensureAuth, songController.getAll);
api.put("/updateSong/:songId", md_auth.ensureAuth, songController.updateSong);
api.delete("/deleteSong/:songId", md_auth.ensureAuth, songController.deleteSong);
api.post("/upload-song/:songId", [md_auth.ensureAuth, md_upload], songController.uploadFile);
api.get("/get-song/:file", songController.getSongFile);
module.exports = api; 