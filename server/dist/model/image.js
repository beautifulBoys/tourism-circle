'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schemas = new _mongoose2.default.Schema({
  suff: {
    type: String,
    default: ''
  },
  size: (0, _defineProperty3.default)({
    type: Number
  }, 'type', 0),
  desc: {
    type: String,
    default: ''
  },
  tag: {
    type: Array,
    default: []
  },
  name: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  id: {
    type: Number,
    default: 1000
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false
}); /**
     * Created by user on 2017/3/9.
     */
exports.default = _mongoose2.default.model('image', Schemas);
//# sourceMappingURL=image.js.map