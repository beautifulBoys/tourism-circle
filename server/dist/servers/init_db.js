'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _id = require('../model/id.js');

var _id2 = _interopRequireDefault(_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var obj_user, obj_post, obj_message, obj_image;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _id2.default.findOne({ type: 'userId' });

        case 2:
          obj_user = _context.sent;

          if (!obj_user) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return _id2.default.update({ _id: obj_user._id }, { value: obj_user.value + 1 }, { multi: false }, function () {});

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.next = 10;
          return _id2.default.create({ type: 'userId' });

        case 10:
          _context.next = 12;
          return _id2.default.findOne({ type: 'postId' });

        case 12:
          obj_post = _context.sent;

          if (!obj_post) {
            _context.next = 18;
            break;
          }

          _context.next = 16;
          return _id2.default.update({ _id: obj_post._id }, { value: obj_post.value + 1 }, { multi: false }, function () {});

        case 16:
          _context.next = 20;
          break;

        case 18:
          _context.next = 20;
          return _id2.default.create({ type: 'postId' });

        case 20:
          _context.next = 22;
          return _id2.default.findOne({ type: 'messageId' });

        case 22:
          obj_message = _context.sent;

          if (obj_message) _id2.default.update({ _id: obj_message._id }, { value: obj_message.value + 1 }, { multi: false }, function () {});else _id2.default.create({ type: 'messageId' });

          // 初始化 创建image表
          _context.next = 26;
          return _id2.default.findOne({ type: 'imagesId' });

        case 26:
          obj_image = _context.sent;

          if (!obj_image) {
            _context.next = 32;
            break;
          }

          _context.next = 30;
          return _id2.default.update({ _id: obj_image._id }, { value: obj_image.value + 1 }, { multi: false }, function () {});

        case 30:
          _context.next = 34;
          break;

        case 32:
          _context.next = 34;
          return _id2.default.create({ type: 'imagesId' });

        case 34:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));
//# sourceMappingURL=init_db.js.map