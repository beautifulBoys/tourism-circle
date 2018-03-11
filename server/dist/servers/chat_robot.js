'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');

var errObj = {
  result: 0,
  content: '没有理解你的意思，你能说的简单一点吗？'
};
var qingyunkeUrl = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg=';

var socketList = [];
function ajax(text) {
  return new _promise2.default(function (resolve, reject) {
    try {
      http.get(qingyunkeUrl + encodeURI(text), function (req) {
        req.setEncoding('utf8');
        req.on('data', function (data) {
          resolve(data);
        });
        req.on('error', function (e) {
          console.log('我是ajax的错误', e);
          resolve(errObj);
        });
      });
    } catch (err) {
      resolve(errObj);
    }
  });
}

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(text, fn) {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return ajax(text);

          case 3:
            result = _context.sent;

            fn(JSON.parse(result));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            fn(errObj);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=chat_robot.js.map