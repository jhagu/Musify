'use strict'
//More info at https://jwt.io/

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "you_shall_not_pass";

exports.createToken = function(user){
    //Datos a codificar
    var payload = {
        sub: user._id,
        firstName : user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        image: user.image,
        creationDate: moment().unix(),
        expirationDate: moment().add(30, "days").unix()
    };

    return jwt.encode(payload, secret);
}

//expirationDate: moment().add(30, "days").unix() --> el token de autenticacion expira cada 30 dias