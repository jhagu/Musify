'use strict'

var fs = require("fs");
var path = require("path");
var mongoosePagination = require("mongoose-pagination");
var Artist = require("../models/artist.js");
var Album = require("../models/album.js");
var Song = require("../models/song.js");

function getAlbum(req, res){
    res.status(200).send({message: "Accion getAlbum"});
}

module.exports = {
    getAlbum
}