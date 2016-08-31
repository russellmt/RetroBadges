var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BadgeSchema = new Schema({
    title: String,
    desc: String
});

module.exports = mongoose.model('Badge', BadgeSchema);