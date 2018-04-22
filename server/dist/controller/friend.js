'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myFriendFunc = exports.friendHandleFunc = exports.deleteFriendFunc = exports.addFriendFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

var _message = require('../model/message.js');

var _message2 = _interopRequireDefault(_message);

var _friend = require('../model/friend.js');

var _friend2 = _interopRequireDefault(_friend);

var _id = require('../model/id.js');

var _id2 = _interopRequireDefault(_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addFriendFunc = exports.addFriendFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var fromId, toId, remark, friend, obj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fromId = req.headers.userid - 0;
            toId = req.body.to - 0;
            remark = req.body.remark;

            if (!(fromId === toId)) {
              _context.next = 6;
              break;
            }

            res.send({ code: 300, message: '不能添加自己为好友', data: {} });
            return _context.abrupt('return');

          case 6:
            _context.next = 8;
            return _friend2.default.findOne({ userId: fromId });

          case 8:
            friend = _context.sent;

            if (!(friend.list.indexOf(toId) !== -1)) {
              _context.next = 12;
              break;
            }

            res.send({ code: 300, message: '你们已经是好友', data: {} });
            return _context.abrupt('return');

          case 12:
            _context.next = 14;
            return _message2.default.findOne({ fromId: fromId, toId: toId, status: true, type: 'add-friend' });

          case 14:
            friend = _context.sent;

            if (!friend) {
              _context.next = 18;
              break;
            }

            res.send({ code: 300, message: '您已经对该用户发送过好友请求，请等待回复', data: {} });
            return _context.abrupt('return');

          case 18:
            _context.prev = 18;
            _context.next = 21;
            return _id2.default.findOne({ type: 'messageId' });

          case 21:
            obj = _context.sent;
            _context.next = 24;
            return _message2.default.create({
              id: obj.value + 1,
              type: 'add-friend',
              fromId: fromId,
              toId: toId,
              remark: remark
            });

          case 24:
            res.send({ code: 200, message: '添加好友请求发送成功', data: {} });
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](18);

            console.log(_context.t0);
            res.send({ code: 300, message: '添加好友请求发送失败', data: _context.t0 });

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[18, 27]]);
  }));

  return function addFriendFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var deleteFriendFunc = exports.deleteFriendFunc = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var fromId, toId, fromObj, friendList, n, toObj, list, fromobj, i, friend, item;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fromId = req.headers.userid - 0;
            toId = req.body.id - 0;

            console.log(fromId, toId);
            _context2.prev = 3;
            _context2.next = 6;
            return _friend2.default.findOne({ userId: fromId });

          case 6:
            fromObj = _context2.sent;
            friendList = fromObj.list.concat([]);
            n = friendList.indexOf(toId);

            if (n !== -1) friendList.splice(n, 1);
            _friend2.default.update({ userId: fromId }, { list: friendList }, { multi: false }, function (err) {});

            _context2.next = 13;
            return _friend2.default.findOne({ userId: toId });

          case 13:
            toObj = _context2.sent;

            friendList = toObj.list.concat([]);
            n = friendList.indexOf(fromId);
            if (n !== -1) friendList.splice(n, 1);
            _friend2.default.update({ userId: toId }, { list: friendList }, { multi: false }, function (err) {});

            list = [];
            _context2.next = 21;
            return _friend2.default.findOne({ userId: fromId });

          case 21:
            fromobj = _context2.sent;
            i = 0;

          case 23:
            if (!(i < fromobj.list.length)) {
              _context2.next = 33;
              break;
            }

            _context2.next = 26;
            return _user2.default.findOne({ id: fromobj.list[i] - 0 });

          case 26:
            friend = _context2.sent;
            item = {
              address: friend.address.length > 0 ? friend.address.join('-') : '未设置',
              email: friend.email || '未设置',
              id: friend.id,
              username: friend.username,
              desc: friend.desc || '未设置',
              postNum: friend.postNum
            };

            if (friend.sex === 1) item.sex = '女孩';else if (friend.sex === 2) item.sex = '男孩';else item.sex = '未设置';
            list.push(item);

          case 30:
            i++;
            _context2.next = 23;
            break;

          case 33:
            res.send({ code: 200, message: '解除好友关系成功', data: { list: list } });
            _context2.next = 39;
            break;

          case 36:
            _context2.prev = 36;
            _context2.t0 = _context2['catch'](3);

            res.send({ code: 300, message: '解除好友关系失败', data: _context2.t0 });

          case 39:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 36]]);
  }));

  return function deleteFriendFunc(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var friendHandleFunc = exports.friendHandleFunc = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var meId, messageId, fromId, toId, type, friendFromObj, newFrindList_from, friendToObj, newFrindList_to, result, list, i;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // 处理好友请求
            meId = req.headers.userid;
            messageId = req.body.messageId - 0;
            fromId = req.body.fromId - 0;
            toId = req.body.toId - 0;
            type = void 0;
            _context3.next = 7;
            return _message2.default.update({ id: messageId }, { status: false }, { multi: false }, function (err) {});

          case 7:
            if (!(req.body.type === 'agree')) {
              _context3.next = 37;
              break;
            }

            _context3.prev = 8;
            _context3.next = 11;
            return _friend2.default.findOne({ userId: fromId });

          case 11:
            friendFromObj = _context3.sent;
            newFrindList_from = friendFromObj.list.concat([]);

            newFrindList_from.push(toId);
            _context3.next = 16;
            return _friend2.default.update({ userId: fromId }, { list: newFrindList_from }, { multi: false }, function (err) {
              if (err) console.log(1, err);
            });

          case 16:
            _context3.next = 18;
            return _friend2.default.findOne({ userId: toId });

          case 18:
            friendToObj = _context3.sent;
            newFrindList_to = friendToObj.list.concat([]);

            newFrindList_to.push(fromId);
            _context3.next = 23;
            return _friend2.default.update({ userId: toId }, { list: newFrindList_to }, { multi: false }, function (err) {
              if (err) console.log(2, err);
            });

          case 23:
            _context3.next = 25;
            return _message2.default.find({ toId: meId });

          case 25:
            result = _context3.sent;
            list = [];

            for (i = 0; i < result.length; i++) {
              if (result[i].status) list.push(result[i]);
            }
            res.send({ code: 200, message: '已添加好友', data: list });
            _context3.next = 35;
            break;

          case 31:
            _context3.prev = 31;
            _context3.t0 = _context3['catch'](8);

            console.log(_context3.t0);
            res.send({ code: 300, message: '添加好友失败', data: _context3.t0 });

          case 35:
            _context3.next = 38;
            break;

          case 37:
            res.send({ code: 200, message: '已拒绝', data: {} });

          case 38:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[8, 31]]);
  }));

  return function friendHandleFunc(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var myFriendFunc = exports.myFriendFunc = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var userId, list, user, i, friend, item;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.headers.userid;
            list = [];
            _context4.prev = 2;
            _context4.next = 5;
            return _friend2.default.findOne({ userId: userId });

          case 5:
            user = _context4.sent;
            i = 0;

          case 7:
            if (!(i < user.list.length)) {
              _context4.next = 16;
              break;
            }

            _context4.next = 10;
            return _user2.default.findOne({ id: user.list[i] - 0 });

          case 10:
            friend = _context4.sent;
            item = {
              address: friend.address.length > 0 ? friend.address.join('-') : '',
              email: friend.email,
              id: friend.id,
              username: friend.username,
              desc: friend.desc,
              postNum: friend.postNum,
              avatar: friend.avatar,
              sex: friend.sex
            };

            list.push(item);

          case 13:
            i++;
            _context4.next = 7;
            break;

          case 16:

            res.send({ code: 200, message: '获取用户列表成功', data: { list: list } });
            _context4.next = 22;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4['catch'](2);

            res.send({ code: 300, message: '获取用户列表失败', data: _context4.t0 });

          case 22:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[2, 19]]);
  }));

  return function myFriendFunc(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=friend.js.map