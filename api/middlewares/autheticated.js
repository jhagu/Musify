'use strict'
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "you_shall_not_pass";

exports.ensureAuth = function(req, res, next){
    if (!req.headers.authorization){

        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación"});
        
    }
    //Eliminamos las comillas del token
    var token = req.headers.authorization.replace(/['"]+/g, "");

    try{
        var payload = jwt.decode(token, secret);
        if (payload.expirationDate <= moment().unix()){
            return res.status(401).send({message: "El token ha expirado"});
        }

    }catch(ex){

        return res.status(404).send({message: "Token no válido", ex: ex, token: token});
        
    }

    //Si todo bien, tenemos los datos del usuario en el payload
    req.user = payload;
    next(); 
};