'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

SongSchema = Schema({
    number : String,
    title : String,
    duration : String,
    file: String,
    album : {type : Schema.ObjectId, ref : "Album"}
});

module.exports = mongoose.model("Song", SongSchema);