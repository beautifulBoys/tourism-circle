'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webMailSendFunc = exports.sendWebMailFunc = exports.ignoreMessageFunc = exports.messageBoxListFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _message = require('../model/message.js');

var _message2 = _interopRequireDefault(_message);

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

var _id = require('../model/id.js');

var _id2 = _interopRequireDefault(_id);

var _formDate = require('../lib/formDate.js');

var _formDate2 = _interopRequireDefault(_formDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function typeToText(type) {
  var arr = {
    'add-friend': '好友请求',
    'web-mail': '站内信'
  };
  return arr[type];
}

var messageBoxListFunc = exports.messageBoxListFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var result, arr, i, user, obj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _message2.default.find({ toId: req.headers.userid, status: true });

          case 3:
            result = _context.sent;

            result = result.filter(function (item) {
              return item.status;
            });
            // res.send({code: 200, message: '获取消息盒子数据成功', data: {list: result}});
            arr = [];
            i = 0;

          case 7:
            if (!(i < result.length)) {
              _context.next = 16;
              break;
            }

            _context.next = 10;
            return _user2.default.findOne({ id: result[i].fromId });

          case 10:
            user = _context.sent;
            obj = {
              messageId: result[i].id,
              fromId: result[i].fromId,
              toId: result[i].toId,
              name: user.username,
              time: _formDate2.default.formatCSTDate(result[i].time, 'MM/dd hh:mm'),
              remark: result[i].remark,
              typeText: typeToText(result[i].type),
              type: result[i].type
            };

            arr.push(obj);

          case 13:
            i++;
            _context.next = 7;
            break;

          case 16:
            res.send({ code: 200, message: '获取消息盒子数据成功', data: { list: arr } });
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](0);

            res.send({ code: 300, message: '获取消息盒子数据失败', data: _context.t0 });

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 19]]);
  }));

  return function messageBoxListFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var ignoreMessageFunc = exports.ignoreMessageFunc = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var messageId, meId;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            messageId = req.body.id - 0;
            meId = req.headers.userid - 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _message2.default.update({ id: messageId }, { status: false }, { multi: false }, function (err, docs) {
              if (err) {
                console.log(err);
                res.send({ code: 300, message: '发生未知错误，忽略消息失败', data: { err: err, docs: docs } });
                return;
              }
              console.log(docs);
            });

          case 5:

            res.send({ code: 200, message: '忽略消息成功', data: {} });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](2);

            res.send({ code: 300, message: '忽略消息失败，请联系管理员', data: _context2.t0 });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 8]]);
  }));

  return function ignoreMessageFunc(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var sendWebMailFunc = exports.sendWebMailFunc = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var fromId, toId, remark, obj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fromId = req.headers.userid - 0;
            toId = req.body.to - 0;
            remark = req.body.remark;

            if (!(fromId === toId)) {
              _context3.next = 6;
              break;
            }

            res.send({ code: 300, message: '不能给自己发送站内信', data: {} });
            return _context3.abrupt('return');

          case 6:
            _context3.prev = 6;
            _context3.next = 9;
            return _id2.default.findOne({ type: 'messageId' });

          case 9:
            obj = _context3.sent;

            if (obj) _id2.default.update({ _id: obj._id }, { value: obj.value + 1 }, { multi: false }, function () {});else _id2.default.create({ type: 'messageId' });
            _context3.next = 13;
            return _message2.default.create({
              id: obj.value + 1,
              type: 'web-mail',
              fromId: fromId,
              toId: toId,
              remark: remark
            });

          case 13:
            res.send({ code: 200, message: '站内信发送成功', data: {} });
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3['catch'](6);

            console.log(_context3.t0);
            res.send({ code: 300, message: '站内信发送失败', data: _context3.t0 });

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[6, 16]]);
  }));

  return function sendWebMailFunc(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var webMailSendFunc = exports.webMailSendFunc = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var messageId, remark, fromId, toId;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            messageId = req.body.messageId - 0;
            remark = req.body.remark;
            fromId = req.body.fromId - 0;
            toId = req.body.toId - 0;

            console.log(messageId, remark, fromId, toId);
            _context4.prev = 5;
            _context4.next = 8;
            return _message2.default.update({ id: messageId }, { fromId: toId, toId: fromId, remark: remark }, { multi: false }, function (err) {
              if (err) console.log(err);
            });

          case 8:
            res.send({ code: 200, message: '站内信发送成功', data: {} });
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](5);

            console.log(_context4.t0);
            res.send({ code: 300, message: '站内信发送失败', data: _context4.t0 });

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[5, 11]]);
  }));

  return function webMailSendFunc(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=message.js.map