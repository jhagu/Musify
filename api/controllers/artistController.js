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
                res.status(200).send({message: "Artista obtenido", artist : artist});
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
                res.status(200).send({message: "Artista guardado", artist: artistStored});
            }
        }
    });
}

function getAll(req, res){
    var page = null;
    var itemsPerPage = 4;

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
                    message: "Artista/s obtenido/s",
                    total_items: total,
                    artists : artists
                });
            }
        }
    });
}

function updateArtist(req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err){
            res.status(500).send({message: "Error al actualizar el artista"});
        }
        else{
            if (!artistUpdated){
                res.status(404).send({message: "No se ha podido actualizar el artista"});
            }
            else{
                res.status(200).send({message: "Artista actualizado", artist: artistUpdated})
            }
        }
    });
}

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, function(err, artistRemoved){
        if (err){
            res.status(500).send({message: "Error al eliminar el artista"});
        }
        else{
            if (!artistRemoved){
                res.status(404).send({message: "No se ha podido eliminar el artista"});
            }
            else{
                Album.find({artist : artistRemoved._id}).remove((err, albumRemoved) => {
                    if (err){
                        res.status(500).send({message: "Error al eliminar el album"});
                    }
                    else{
                        if (!albumRemoved){
                            res.status(404).send({message: "No se ha podido eliminar el album"});
                        }
                        else{
                            Song.find({album : albumRemoved._id}).remove((err, songRemoved) => {
                                if (err){
                                    res.status(500).send({message: "Error al eliminar la canción"});
                                }
                                else{
                                    if (!songRemoved){
                                         res.status(404).send({message: "No se ha podido eliminar la canción"});
                                    }
                                    else{
                                        res.status(200).send({message: "Artista eliminado", artist : artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

function uploadImage(req, res){
    var artistId = req.params.id;
    var fileName = "No subido...";

    //files --> variable global
    if (req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split("\\"); //Devuelve un array con cada elemento dsp de cada barra
        var fileName = fileSplit[2]; //Nombre de la imagen

        //Controlamos la extension de la imagen
        var extSplit = fileName.split("\.");
        var filExt = extSplit[1];

        if (filExt == "jpg" || filExt == "png" || filExt == "gif"){
            Artist.findByIdAndUpdate(artistId, {image: fileName}, (err, artistUpdated) => {
                if (err){
                    res.status(500).send({message: "Error al actualizar el artista"});
                }
                else{
                    if (!artistUpdated){
                        res.status(404).send({message: "No se ha podido actualizar la imagen del artista"});
                    }
                    else{
                        res.status(200).send({message: "Imagen de artista actualizada", artist: artistUpdated})
                    }
                }
            });
        }
        else{
            res.status(200).send({message: "Extesion incorrecta. Suba una imagen con extension jpg, png o gif"});
        }
    }else{
        res.status(200).send({message: "La imagen no se ha subido"});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = "./uploads/artists/" + imageFile;

    fs.exists(pathFile, function(exists){
        if (exists){
            console.log()
            res.sendFile(path.resolve(pathFile));
        }
        else{
            res.status(200).send({message: "No existe la imagen."});
        }

    });
}

module.exports = {
    getArtist,
    saveArtist,
    getAll,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}