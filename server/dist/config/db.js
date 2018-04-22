'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _init_db = require('../servers/init_db.js');

var _init_db2 = _interopRequireDefault(_init_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dbconnect() {
  _mongoose2.default.connect('mongodb://47.95.212.47:27017/tourism', { useMongoClient: true });
  // mongoose.connect('mongodb://127.0.0.1:27017/tourism', {useMongoClient: true})
  var db = _mongoose2.default.connection;
  db.on('error', function () {
    console.log('数据库连接出错。');
  });
  db.once('open', function () {
    console.log('数据库连接成功。');
    (0, _init_db2.default)();
  });
  db.on('close', function () {
    console.log('数据库已断开，请重新连接数据库');
  });
}

exports.default = dbconnect;
//# sourceMappingURL=db.js.map