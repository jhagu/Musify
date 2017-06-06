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

function getAll(req, res){
    var artistId = req.params.artistId;
    var find = null;
    if (!artistId){
        //Sacar todos los albums de  la bbdd
        find = Album.find({}).sort("title");
    }
    else{
        //Sacar los albums de un artista concreto
        find = Album.find({"artist" : artistId}).sort("year");
    }

    find.populate({path: "artist"}).exec((err, albums) => {
        if (err){
            res.status(500).send({message: "Error en la peticion"});
        }
        else{
            if (!albums){
                res.status(404).send({message: "No existen albums en la base de datos"});
            }
            else{
                res.status(200).send({message: "Albums encontrados", albums: albums});
            }
        }
    });
}

function updateAlbum(req,res){
    var albumId = req.params.albumId;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update,(err, albumUpdated) => {
        if (err){
            res.status(500).send({message: "Error en la petición"});
        }
        else{
            if (!albumUpdated){
                res.status(404).send({message: "No existe el album en la base de datos"});
            }
            else{
                res.status(200).send({message: "Album que se actualizo", album: albumUpdated});
            }
        }
    });

}

function deleteAlbum(req, res){
    var albumId = req.params.albumId;

    Album.findByIdAndRemove(albumId, function(err, albumRemoved){
        if (err){
            res.status(500).send({message: "Error en la petición"});
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
                            res.status(200).send({message: "Album eliminado", album : albumRemoved});
                        }
                    }
                });
            }
        }
    });
}

function uploadImage(req, res){
    var albumId = req.params.albumId;
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
            Album.findByIdAndUpdate(albumId, {image: fileName}, (err, albumUpdated) => {
                if (err){
                    res.status(500).send({message: "Error en la petición"});
                }
                else{
                    if (!albumUpdated){
                        res.status(404).send({message: "No se ha podido actualizar la imagen del album"});
                    }
                    else{
                        res.status(200).send({message: "Imagen de album actualizada", album: albumUpdated})
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
    var pathFile = "./uploads/albums/" + imageFile;

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
    getAlbum,
    saveAlbum,
    getAll,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}