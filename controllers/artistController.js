'use strict'

var fs = require("fs");
var path = require("path");
var mongoosePagination = require("mongoose-pagination");
var Artist = require("../models/artist.js");
var Album = require("../models/album.js");
var Song = require("../models/song.js");

function getArtist(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err){
            res.status(500).send({message: "Error en la petición"});
        }
        else{
            if (!artist){
                res.status(404).send({message: "El artista no existe"});
            }
            else{
                res.status(200).send({artist : artist});
            }
        }
    });
}

function saveArtist(req, res){
    var artist = new Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = "null";

    artist.save((err, artistStored) => {
        if (err){
            res.status(500).send({message: "Error al guardar artista"});
        }
        else{
            if (!artistStored){
                res.status(404).send({message: "No se ha registrado el artista"});
            }
            else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
}

function getAll(req, res){
    var page = null;
    var itemsPerPage = 3;

    if (req.params.page){
        page = req.params.page;
    }
    else{
        page = 1;
    }

    Artist.find().sort("name").paginate(page, itemsPerPage, function(err, artists, total){
        if (err){
            res.status(500).send({message: "Error en la petición"});
        }
        else{
            if(!artists){
                res.status(404).send({message: "No se encontro ningún artista"});
            }
            else{
                //return, just in case
                return res.status(200).send({
                    total_items: total,
                    artists : artists
                });
            }
        }
    });
}

module.exports = {
    getArtist,
    saveArtist,
    getAll
}