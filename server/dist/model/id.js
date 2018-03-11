'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schemas = new _mongoose2.default.Schema({
    type: String,
    value: {
        type: Number,
        default: 1000
    }
}, {
    versionKey: false
}); /**
     * Created by user on 2017/3/9.
     */


var ids = _mongoose2.default.model('Ids', Schemas);

exports.default = ids;
//# sourceMappingURL=id.js.map