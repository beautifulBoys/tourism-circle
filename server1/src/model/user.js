/**
 * Created by user on 2017/3/9.
 */
var mongoose = require('mongoose');

var Schemas = new mongoose.Schema({
    username: String,
    password: String,
    passport: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    bg: {
        type: String,
        default: ''
    },
    registerTime: {
        type: Date,
        default: new Date()
    },
    loginTime: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('user', Schemas);
