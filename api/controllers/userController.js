'use strict'
var fs = require("fs");
var path = require("path");
var User = require("../models/user.js");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt.js");

function pruebas(req, res){
    res.status(200).send({
        message: "Probando accion controlador de usuario del API REST en Node"
    });
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.password = params.password;
    user.role = "ROLE_USER";
    user.image = "null";
    
    if (params.password){
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if (user.firstName != null && user.lastName != null && user.email != null){
                user.save((err, userStored) => {
                    if (err){
                        res.status(500).send({message: "Error al guardar usuario"});
                    }
                    else{
                        if (!userStored){
                            res.status(404).send({message: "No se ha registrado el usuario"});
                        }
                        else{
                            res.status(200).send({message: "Usuario guardado", user: userStored});
                        }
                    }
                });
            }
            else{
                res.status(200).send({message:"Rellene todos los campos"});
            }
        });
    }
    else{
        res.status(200).send({message:"Introduce la contraseña"});
    }
}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email : email.toLowerCase()}, (err,user) => {
        if (err){
            res.status(500).send({message: "Error en la petición"});
        }
        else{
            if(!user){
                res.status(404).send({message: "El usuario no existe"});
            }
            else{
                //Comprobar contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if (check){
                        //Datos del usuario logueado,getHash se manda en PostMan
                        if (params.getHash){
                            res.status(200).send({token : jwt.createToken(user)});
                        }
                        else{
                            res.status(200).send({message : "Usuario logueado", user: user});
                        }     
                    }
                    else{
                        res.status(404).send({message : "El usuario no ha podido loguearse"});
                    }
                });
            }
        }
    });
}

function updateUser(req, res){

    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err){
            res.status(500).send({message: "Error al actualizar el usuario"});
        }
        else{
            if (!userUpdated){
                res.status(404).send({message: "No se ha podido actualizar el usuario"});
            }
            else{
                res.status(200).send({message: "Usuario actualizado", user: userUpdated})
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
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
            User.findByIdAndUpdate(userId, {image: fileName}, (err, userUpdated) => {
                if (err){
                    res.status(500).send({message: "Error al actualizar el usuario"});
                }
                else{
                    if (!userUpdated){
                        res.status(404).send({message: "No se ha podido actualizar la imagen del usuario"});
                    }
                    else{
                        res.status(200).send({message: "Imagen de usuario actualizada", image: fileName, user: userUpdated})
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
    var pathFile = "./uploads/users/" + imageFile;

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
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}