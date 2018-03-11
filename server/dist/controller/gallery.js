'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.galleryDeleteFunc = exports.galleryFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _image = require('../model/image.js');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var galleryFunc = exports.galleryFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _image2.default.find({ status: true });

          case 3:
            result = _context.sent;

            res.send({ code: 200, message: '获取图库数据成功', data: { list: result } });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            res.send({ code: 300, message: '获取图库数据失败', data: _context.t0 });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function galleryFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var galleryDeleteFunc = exports.galleryDeleteFunc = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var id, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.body.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _image2.default.update({ id: id }, { status: false }, { multi: false }, function () {});

          case 4:
            result = _context2.sent;

            console.log('result', result);
            res.send({ code: 200, message: '删除图片成功', data: {} });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](1);

            res.send({ code: 300, message: '删除图片失败', data: _context2.t0 });

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 9]]);
  }));

  return function galleryDeleteFunc(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=gallery.js.map