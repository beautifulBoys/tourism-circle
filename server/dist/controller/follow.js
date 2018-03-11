'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.followsFunc = exports.deleteFollowingFunc = exports.myFollowingFunc = exports.toFollowFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _following = require('../model/following.js');

var _following2 = _interopRequireDefault(_following);

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

var _follow = require('../model/follow.js');

var _follow2 = _interopRequireDefault(_follow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toFollowFunc = exports.toFollowFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var userId, toId, _ref2, list, toObj, list1;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.headers.userid - 0;
            toId = req.body.id - 0;

            if (!(userId === toId)) {
              _context.next = 5;
              break;
            }

            res.send({ code: 300, message: '不能关注自己', data: {} });
            return _context.abrupt('return');

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return _following2.default.findOne({ id: userId });

          case 8:
            _ref2 = _context.sent;
            list = _ref2.list;

            if (!(list.indexOf(toId) !== -1)) {
              _context.next = 13;
              break;
            }

            res.send({ code: 300, message: '你已经关注了他（她）', data: {} });
            return _context.abrupt('return');

          case 13:
            // 更新关注用户
            list = [].concat((0, _toConsumableArray3.default)(list), [toId]);
            _context.next = 16;
            return _following2.default.update({ id: userId }, { list: list }, { multi: false }, function (err) {});

          case 16:
            _context.next = 18;
            return _follow2.default.findOne({ id: toId });

          case 18:
            toObj = _context.sent;
            list1 = [].concat((0, _toConsumableArray3.default)(toObj.list), [userId]);

            console.log(toObj.list, list1);
            _context.next = 23;
            return _follow2.default.update({ id: toId }, { list: list1 }, { multi: false }, function (err) {});

          case 23:

            res.send({ code: 200, message: '关注成功', data: {} });
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context['catch'](5);

            res.send({ code: 300, message: '关注失败', data: _context.t0 });

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 26]]);
  }));

  return function toFollowFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var myFollowingFunc = exports.myFollowingFunc = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var userId, arr, _ref4, list, i, user, item;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.headers.userid - 0;
            arr = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _following2.default.findOne({ id: userId });

          case 5:
            _ref4 = _context2.sent;
            list = _ref4.list;
            i = 0;

          case 8:
            if (!(i < list.length)) {
              _context2.next = 17;
              break;
            }

            _context2.next = 11;
            return _user2.default.findOne({ id: list[i] - 0 });

          case 11:
            user = _context2.sent;
            item = {
              address: user.address.length > 0 ? user.address.join('-') : '',
              email: user.email,
              id: user.id,
              username: user.username,
              desc: user.desc,
              postNum: user.postNum,
              avatar: user.avatar
            };

            arr.push(item);

          case 14:
            i++;
            _context2.next = 8;
            break;

          case 17:
            res.send({ code: 200, message: '获取关注列表成功', data: { list: arr } });
            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2['catch'](2);

            res.send({ code: 300, message: '获取关注列表失败', data: _context2.t0 });

          case 23:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 20]]);
  }));

  return function myFollowingFunc(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteFollowingFunc = exports.deleteFollowingFunc = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var userId, deleteId, arr, _ref6, list, obj, list1, i, user, item;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.headers.userid - 0;
            deleteId = req.body.id - 0;
            arr = [];
            _context3.prev = 3;
            _context3.next = 6;
            return _following2.default.findOne({ id: userId });

          case 6:
            _ref6 = _context3.sent;
            list = _ref6.list;

            list = [].concat((0, _toConsumableArray3.default)(list)).filter(function (item) {
              return item - 0 !== deleteId;
            });
            _context3.next = 11;
            return _following2.default.update({ id: userId }, { list: list }, { multi: false }, function (err) {});

          case 11:
            _context3.next = 13;
            return _follow2.default.findOne({ id: deleteId });

          case 13:
            obj = _context3.sent;
            list1 = [].concat((0, _toConsumableArray3.default)(obj.list)).filter(function (item) {
              return item - 0 !== userId;
            });
            _context3.next = 17;
            return _follow2.default.update({ id: deleteId }, { list: list1 }, { multi: false }, function (err) {});

          case 17:
            i = 0;

          case 18:
            if (!(i < list.length)) {
              _context3.next = 28;
              break;
            }

            _context3.next = 21;
            return _user2.default.findOne({ id: list[i] - 0 });

          case 21:
            user = _context3.sent;
            item = {
              address: user.address.length > 0 ? user.address.join('-') : '未设置',
              email: user.email || '未设置',
              id: user.id,
              username: user.username,
              desc: user.desc || '未设置',
              postNum: user.postNum
            };

            if (user.sex === 1) item.sex = '女孩';else if (user.sex === 2) item.sex = '男孩';else item.sex = '未设置';
            arr.push(item);

          case 25:
            i++;
            _context3.next = 18;
            break;

          case 28:
            res.send({ code: 200, message: '取消关注成功', data: { list: arr } });
            _context3.next = 34;
            break;

          case 31:
            _context3.prev = 31;
            _context3.t0 = _context3['catch'](3);

            res.send({ code: 300, message: '取消关注失败', data: _context3.t0 });

          case 34:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 31]]);
  }));

  return function deleteFollowingFunc(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var followsFunc = exports.followsFunc = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var userId, arr, _ref8, list, i, user, item;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.headers.userid - 0;
            arr = [];
            _context4.prev = 2;
            _context4.next = 5;
            return _follow2.default.findOne({ id: userId });

          case 5:
            _ref8 = _context4.sent;
            list = _ref8.list;
            i = 0;

          case 8:
            if (!(i < list.length)) {
              _context4.next = 17;
              break;
            }

            _context4.next = 11;
            return _user2.default.findOne({ id: list[i] - 0 });

          case 11:
            user = _context4.sent;
            item = {
              address: user.address.length > 0 ? user.address.join('-') : '',
              email: user.email,
              id: user.id,
              username: user.username,
              desc: user.desc,
              postNum: user.postNum,
              avatar: user.avatar,
              sex: user.sex
            };

            arr.push(item);

          case 14:
            i++;
            _context4.next = 8;
            break;

          case 17:
            res.send({ code: 200, message: '获取粉丝列表成功', data: { list: arr } });
            _context4.next = 23;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4['catch'](2);

            res.send({ code: 300, message: '获取粉丝列表失败', data: _context4.t0 });

          case 23:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[2, 20]]);
  }));

  return function followsFunc(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();
//# sourceMappingURL=follow.js.map