'use strict'

var User = require("../models/user.js");
var bcrypt = require("bcrypt-nodejs");

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
    user.role = "ROLE_ADMIN";
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
                            res.status(200).send({user: userStored});
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

module.exports = {
    pruebas,
    saveUser
}