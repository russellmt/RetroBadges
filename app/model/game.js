var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Badge = require('./badge');

var GameSchema = new Schema({
    title: String,
    genre: String,
    year: Number,
    publisher: String,
    developer: String,
    platforms: [String],
    badges: [Badge.schema]
});

module.exports = mongoose.model('Game', GameSchema);