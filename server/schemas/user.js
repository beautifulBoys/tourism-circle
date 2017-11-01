var mongoose = require('mongoose');
var BulletSchemas = new mongoose.Schema({
    currentTime: Object,
    sendTime: Object,
    content: String,
    userId: Number,
    color: String,
    fontSize: String
}, {
    versionKey: false
});

module.exports = mongoose.model('bullet', BulletSchemas);
