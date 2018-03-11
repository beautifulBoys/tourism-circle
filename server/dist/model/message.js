'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schemas = new _mongoose2.default.Schema({
  id: {
    type: Number,
    default: 1000
  },
  type: {
    type: String,
    default: ''
  },
  fromId: Number,
  toId: Number,
  remark: {
    type: String,
    default: ''
  },
  time: {
    type: Date,
    default: new Date()
  },
  reply: {
    type: String,
    default: ''
  },
  replyTime: {
    type: Date,
    default: null
  },
  status: { // 是否已经处理过了，处理过了则为 false
    type: Boolean,
    default: true
  }
}, {
  versionKey: false
}); /**
     * Created by user on 2017/3/9.
     */
exports.default = _mongoose2.default.model('message', Schemas);
//# sourceMappingURL=message.js.map