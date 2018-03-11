'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _admin = require('./admin.js');

var _admin2 = _interopRequireDefault(_admin);

var _client = require('./client.js');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/admin', _admin2.default);
  app.use('/client', _client2.default);
};
//# sourceMappingURL=index.js.map