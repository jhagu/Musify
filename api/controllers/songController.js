'use strict'

var fs = require("fs");
var path = require("path");
var mongoosePagination = require("mongoose-pagination");
var Artist = require("../models/artist.js");
var Album = require("../models/album.js");
var Song = require("../models/song.js");

function getSong(req, res){
    var songId = req.params.songId;

    Song.findById(songId).populate({path: "album"}).exec((err, song) => {
        if (err){
            res.status(500).send({message:"Error en la peticion"});
        }
        else{
            if (!song){
                res.status(404).send({message: "La cancion no existe"});
            }
            else{
                res.status(200).send({message: "Cancion encontrada", song: song});
            }
        }
    });
}

function saveSong(req, res){
    var song = new Song();

    var params = req.body;
    song.number = params.number;
    song.title = params.title;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err, songStored) => {
        if (err){
            res.status(500).send({message: "Error en la petición."});
        }
        else{
            if (!songStored){
                res.status(404).send({message: "No se ha guardado la cancion"});
            }
            else{
                res.status(200).send({message:"Canción guardada", song : songStored});
            }
        }
    });
}

function getAll(req, res){
    var albumId = req.params.albumId;
    if (!albumId){
        //Sacar todos los albums de  la bbdd
        var find = Song.find({}).sort("number");
    }
    else{
        //Sacar los albums de un artista concreto
        var find = Song.find({"album" : albumId}).sort("number");
    }

    find.populate({
        path: "album",
        populate:{
            path: "artist",
            model: "Artist"
        }
    }).exec((err, songs) => {
        if (err){
            res.status(500).send({message: "Error en la peticion"});
        }
        else{
            if (!songs){
                res.status(404).send({message: "No existen canciones en la base de datos"});
            }
            else{
                res.status(200).send({message: "Canciones encontradas", songs: songs});
            }
        }
    });
}

function updateSong(req,res){
    var songId = req.params.songId;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update,(err, songUpdated) => {
        if (err){
            res.status(500).send({message: "Error en la petición"});
        }
        else{
            if (!songUpdated){
                res.status(404).send({message: "No existe la canción en la base de datos"});
            }
            else{
                res.status(200).send({message: "Canción que se actualizo", song: songUpdated});
            }
        }
    });

}

function deleteSong(req, res){
    var songId = req.params.songId;

    Song.findByIdAndRemove(songId, function(err, songRemoved){
        if (err){
            res.status(500).send({message: "Error en la petición"});
        }
        else{
            if (!songRemoved){
                res.status(404).send({message: "No se ha encontrado la canciön a eliminar"});
            }
            else{
                res.status(200).send({message: "Canción eliminada", song : songRemoved});
            }
        }
    });
}

function uploadFile(req, res){
    var songId = req.params.songId;
    var fileName = "No subido...";

    //files --> variable global
    if (req.files){
        var filePath = req.files.file.path; //file es el nombre del argumento que llega en el POST
        var fileSplit = filePath.split("\\"); //Devuelve un array con cada elemento dsp de cada barra
        var fileName = fileSplit[2]; //Nombre de la imagen

        //Controlamos la extension de la imagen
        var extSplit = fileName.split("\.");
        var filExt = extSplit[1];

        if (filExt == "mp3" || filExt == "ogg" || filExt == "m4a"){
            Song.findByIdAndUpdate(songId, {file: fileName}, (err, songUpdated) => {
                if (err){
                    res.status(500).send({message: "Error en la petición"});
                }
                else{
                    if (!songUpdated){
                        res.status(404).send({message: "No se ha podido actualizar el fichero de la canción"});
                    }
                    else{
                        res.status(200).send({message: "Fichero de canción actualizado", song: songUpdated})
                    }
                }
            });
        }
        else{
            res.status(200).send({message: "Extesión incorrecta. Suba un archivo con extension mp3, ogg o m4a"});
        }
    }else{
        res.status(200).send({message: "El fichero no se ha subido"});
    }
}

function getSongFile(req, res){
    var file = req.params.file;
    var pathFile = "./uploads/songs/" + file;

    fs.exists(pathFile, function(exists){
        if (exists){
            console.log()
            res.sendFile(path.resolve(pathFile));
        }
        else{
            res.status(200).send({message: "No existe el fichero de audio."});
        }

    });
}


module.exports = {
    getSong,
    saveSong,
    getAll,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}