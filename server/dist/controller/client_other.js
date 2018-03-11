'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationFunc = exports.postInfoFunc = exports.mineFunc = exports.userMainInfoFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

var _post = require('../model/post.js');

var _post2 = _interopRequireDefault(_post);

var _friend = require('../model/friend.js');

var _friend2 = _interopRequireDefault(_friend);

var _following = require('../model/following.js');

var _following2 = _interopRequireDefault(_following);

var _follow = require('../model/follow.js');

var _follow2 = _interopRequireDefault(_follow);

var _formDate = require('../lib/formDate.js');

var _formDate2 = _interopRequireDefault(_formDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userMainInfoFunc = exports.userMainInfoFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var userId, toId, user, friend, postList, arr, i, isFriend, following, isFollowing, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.headers.userid - 0;
            toId = req.body.id - 0;
            _context.prev = 2;
            _context.next = 5;
            return _user2.default.findOne({ id: toId });

          case 5:
            user = _context.sent;
            _context.next = 8;
            return _friend2.default.findOne({ id: userId });

          case 8:
            friend = _context.sent;
            _context.next = 11;
            return _post2.default.find({ userId: toId });

          case 11:
            postList = _context.sent;
            arr = [];

            for (i = 0; i < postList.length; i++) {
              arr.push({
                id: postList[i].id,
                title: postList[i].title,
                postTime: _formDate2.default.formatCSTDate(postList[i].postTime),
                avatar: user.avatar,
                urls: postList[i].urls
              });
            }
            isFriend = friend.list.indexOf(toId);
            _context.next = 17;
            return _following2.default.findOne({ id: userId });

          case 17:
            following = _context.sent;
            isFollowing = following.list.indexOf(toId);
            result = {
              userInfo: {
                username: user.username,
                userId: user.userId,
                avatar: user.avatar,
                desc: user.desc
              },
              isFriend: isFriend !== -1,
              isFollowing: isFollowing !== -1,
              postList: arr
            };


            res.send({ code: 200, message: '获取用户主页数据成功', data: result });
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](2);

            res.send({ code: 300, message: '获取用户主页数据失败', data: _context.t0 });

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 23]]);
  }));

  return function userMainInfoFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var mineFunc = exports.mineFunc = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var userId, user, friend, follow, following, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.headers.userid - 0;
            _context2.prev = 1;
            _context2.next = 4;
            return _user2.default.findOne({ id: userId });

          case 4:
            user = _context2.sent;
            _context2.next = 7;
            return _friend2.default.findOne({ id: userId });

          case 7:
            friend = _context2.sent;
            _context2.next = 10;
            return _follow2.default.findOne({ id: userId });

          case 10:
            follow = _context2.sent;
            _context2.next = 13;
            return _following2.default.findOne({ id: userId });

          case 13:
            following = _context2.sent;
            data = {
              username: user.username,
              userId: user.userId,
              avatar: user.avatar,
              desc: user.desc,
              friendNum: friend.list.length,
              followNum: follow.list.length,
              followingNum: following.list.length
            };


            res.send({ code: 200, message: '获取个人主页数据成功', data: data });
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2['catch'](1);

            res.send({ code: 300, message: '获取个人主页数据失败', data: _context2.t0 });

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 18]]);
  }));

  return function mineFunc(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var postInfoFunc = exports.postInfoFunc = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var postId, userId, post, user, starList, i, starUser, commentList, _i, commentUser, isStared, data;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            postId = req.body.id - 0;
            userId = req.headers.userid - 0;
            _context3.prev = 2;
            _context3.next = 5;
            return _post2.default.findOne({ id: postId });

          case 5:
            post = _context3.sent;
            _context3.next = 8;
            return _user2.default.findOne({ id: post.userId });

          case 8:
            user = _context3.sent;
            starList = [];
            i = 0;

          case 11:
            if (!(i < post.starList.length)) {
              _context3.next = 19;
              break;
            }

            _context3.next = 14;
            return _user2.default.findOne({ id: post.starList[i] - 0 });

          case 14:
            starUser = _context3.sent;

            starList.push({
              avatar: starUser.avatar
            });

          case 16:
            i++;
            _context3.next = 11;
            break;

          case 19:
            commentList = [];
            _i = 0;

          case 21:
            if (!(_i < post.commentList.length)) {
              _context3.next = 29;
              break;
            }

            _context3.next = 24;
            return _user2.default.findOne({ id: post.commentList[_i].userId - 0 });

          case 24:
            commentUser = _context3.sent;

            commentList.push({
              userInfo: {
                avatar: commentUser.avatar,
                username: commentUser.username,
                id: commentUser.id
              },
              comment: post.commentList[_i].comment
            });

          case 26:
            _i++;
            _context3.next = 21;
            break;

          case 29:
            isStared = post.starList.indexOf(userId) !== -1;
            data = {
              userInfo: {
                avatar: user.avatar,
                username: user.username,
                id: user.id
              },
              title: post.title,
              postTime: _formDate2.default.formatCSTDate(post.postTime),
              content: post.content,
              starList: starList,
              commentList: commentList,
              isStared: isStared,
              urls: post.urls
            };


            res.send({ code: 200, message: '获取分享详情数据成功', data: data });
            _context3.next = 37;
            break;

          case 34:
            _context3.prev = 34;
            _context3.t0 = _context3['catch'](2);

            res.send({ code: 300, message: '获取分享详情数据失败', data: _context3.t0 });

          case 37:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 34]]);
  }));

  return function postInfoFunc(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// 统一身份验证
var authenticationFunc = exports.authenticationFunc = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var passport, userId, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(req.path === '/login')) {
              _context4.next = 3;
              break;
            }

            next();
            return _context4.abrupt('return');

          case 3:
            passport = req.headers.passport;
            userId = req.headers.userid - 0;
            _context4.prev = 5;
            _context4.next = 8;
            return _user2.default.findOne({ id: userId });

          case 8:
            result = _context4.sent;

            if (!(result && result.passport && passport === result.passport)) {
              _context4.next = 13;
              break;
            }

            next();
            _context4.next = 15;
            break;

          case 13:
            res.send({ code: 400, message: '身份验证失败', data: {} });
            return _context4.abrupt('return');

          case 15:
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4['catch'](5);

            res.send({ code: 400, message: '此账号验证异常，请重新登录', data: {} });

          case 20:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[5, 17]]);
  }));

  return function authenticationFunc(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=client_other.js.map