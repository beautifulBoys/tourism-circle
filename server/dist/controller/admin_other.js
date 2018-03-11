'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadFunc = exports.mapFunc = exports.authenticationFunc = exports.getCityDataFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _city = require('../data/city.js');

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCityDataFunc = exports.getCityDataFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.send({ code: 200, message: '获取城市数据成功', data: _city.china });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getCityDataFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// 统一身份验证
var authenticationFunc = exports.authenticationFunc = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var ignoreList, passport, userId, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ignoreList = ['/login', '/map', '/download'];

            if (!(ignoreList.indexOf(req.path) !== -1)) {
              _context2.next = 4;
              break;
            }

            next();
            return _context2.abrupt('return');

          case 4:
            passport = req.headers.passport;
            userId = req.headers.userid - 0;
            _context2.prev = 6;
            _context2.next = 9;
            return _user2.default.findOne({ id: userId });

          case 9:
            result = _context2.sent;

            if (!(result && result.passport && passport === result.passport)) {
              _context2.next = 14;
              break;
            }

            next();
            _context2.next = 16;
            break;

          case 14:
            res.send({ code: 400, message: '身份验证失败', data: {} });
            return _context2.abrupt('return');

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2['catch'](6);

            res.send({ code: 400, message: '此账号验证异常，请重新登录', data: {} });

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[6, 18]]);
  }));

  return function authenticationFunc(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var mapFunc = exports.mapFunc = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var result, count, obj, i, arr, k;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user2.default.find({});

          case 3:
            result = _context3.sent;
            count = result.length;
            obj = {};

            for (i = 0; i < count; i++) {
              if (result[i].address.length > 0) {
                if (obj[result[i].address[0]]) obj[result[i].address[0]]++;else obj[result[i].address[0]] = 1;
              } else {
                if (obj['未知']) obj['未知']++;else obj['未知'] = 1;
              }
            }
            arr = [];

            for (k in obj) {
              arr.push({
                name: k,
                value: obj[k],
                rate: obj[k] / count
              });
            }
            res.send({ code: 200, message: '数据查询成功', data: arr });
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](0);

            res.send({ code: 400, message: '数据查询失败', data: {} });

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 12]]);
  }));

  return function mapFunc(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var downloadFunc = exports.downloadFunc = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res.download(_path2.default.join(__dirname, '../../resource/Desert.jpg'), 'Desert.jpg', function (err) {
              if (err) console.log(err);else console.log('没有错误');
            });

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function downloadFunc(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=admin_other.js.map