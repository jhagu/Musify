'use strict'

var mongoose = require("mongoose");
var app = require("./app.js");
var port = process.env.PORT || 3977;

mongoose.connect("mongodb://localhost:27017/db_musify", (err, res) => {
    if (err){
        throw err;
    }
    else{
        console.log("Successfully connected to db! :)");

        app.listen(port, function(){
            console.log("Servidor del API Rest de Musify escuchando en http://localhost:" + port);
        });
    }
});
