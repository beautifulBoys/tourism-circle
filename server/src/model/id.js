/**
 * Created by user on 2017/3/9.
 */
var mongoose = require('mongoose');

var Schemas = new mongoose.Schema({
    type: String,
    value: {
      type: Number,
      default: 1000
    }
}, {
    versionKey: false
});

var ids = mongoose.model('Ids', Schemas);

module.exports = ids;
