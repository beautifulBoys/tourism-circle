'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schemas = new _mongoose2.default.Schema({
    num: {
        type: Number,
        default: 1
    },
    path: {
        type: String,
        default: ''
    }
}, {
    versionKey: false
}); /**
     * Created by user on 2017/3/9.
     * 适用于 我评论的，不是每一个分享的评论
     */
exports.default = _mongoose2.default.model('api', Schemas);
//# sourceMappingURL=api.js.map