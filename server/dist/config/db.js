'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dbconnect() {
  _mongoose2.default.connect('mongodb://127.0.0.1:27017/tourism', { useMongoClient: true });
  var db = _mongoose2.default.connection;
  db.on('error', function () {
    console.log('数据库连接出错。');
  });
  db.once('open', function () {
    console.log('数据库连接成功。');
  });
  db.on('close', function () {
    console.log('数据库已断开，请重新连接数据库');
  });
}

exports.default = dbconnect;
//# sourceMappingURL=db.js.map