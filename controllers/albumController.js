'use strict'

var fs = require("fs");
var path = require("path");
var mongoosePagination = require("mongoose-pagination");
var Artist = require("../models/artist.js");
var Album = require("../models/album.js");
var Song = require("../models/song.js");

function getAlbum(req, res){
    var albumId = req.params.id;
    
    Album.findById(albumId).populate({path: "artist"}).exec((err, album) => {
        if (err){
            res.status(500).send({message:"Error en la peticion"});
        }
        else{
            if (!album){
                res.status(404).send({message: "El album no existe"});
            }
            else{
                res.status(200).send({message: "Album encontrado", album: album});
            }
        }
    });
}

function saveAlbum(req, res){
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = params.image;
    album.artist = params.artist; //Id del artista al que pertenece el album

    album.save((err, albumStored) => {
        if (err){
            res.status(500).send({message: "Error en la petición."});
        }
        else{
            if (!albumStored){
                res.status(404).send({message: "No se ha guardado el album"});
            }
            else{
                res.status(200).send({message:"Album guardado", album: albumStored});
            }
        }
    });

}

module.exports = {
    getAlbum,
    saveAlbum
}