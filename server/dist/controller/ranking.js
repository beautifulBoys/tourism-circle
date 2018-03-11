'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rankingFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var FollowsFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(list) {
    var arr, xunHuanNun, i, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            list = list.sort(function (b, a) {
              return a.list.length - b.list.length;
            });
            arr = [];
            xunHuanNun = list.length > 6 ? 6 : list.length;
            i = 0;

          case 4:
            if (!(i < xunHuanNun)) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return FindUser(list[i].id - 0);

          case 7:
            user = _context.sent;

            arr.push({
              id: user.id,
              username: user.username,
              num: list[i].list.length
            });

          case 9:
            i++;
            _context.next = 4;
            break;

          case 12:
            return _context.abrupt('return', arr);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function FollowsFunc(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

var _follow = require('../model/follow.js');

var _follow2 = _interopRequireDefault(_follow);

var _following = require('../model/following.js');

var _following2 = _interopRequireDefault(_following);

var _friend = require('../model/friend.js');

var _friend2 = _interopRequireDefault(_friend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function postUserFunc(list) {
  list = list.sort(function (b, a) {
    return a.postNum - b.postNum;
  });
  var arr = [];
  var xunHuanNun = list.length > 6 ? 6 : list.length;
  for (var i = 0; i < xunHuanNun; i++) {
    arr.push({
      id: list[i].id,
      username: list[i].username,
      num: list[i].postNum
    });
  }
  return arr;
}
function FindUser(id) {
  return new _promise2.default(function (resolve, reject) {
    _user2.default.findOne({ id: id }, function (err, docs) {
      if (err) reject(err);else resolve(docs);
    });
  });
}
var rankingFunc = exports.rankingFunc = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var postList, followsList, followingList, friendList;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user2.default.find({});

          case 3:
            postList = _context2.sent;

            postList = postUserFunc(postList);
            // 粉丝排行榜
            _context2.next = 7;
            return _follow2.default.find({});

          case 7:
            followsList = _context2.sent;
            _context2.next = 10;
            return FollowsFunc(followsList);

          case 10:
            followsList = _context2.sent;
            _context2.next = 13;
            return _following2.default.find({});

          case 13:
            followingList = _context2.sent;
            _context2.next = 16;
            return FollowsFunc(followingList);

          case 16:
            followingList = _context2.sent;
            _context2.next = 19;
            return _friend2.default.find({});

          case 19:
            friendList = _context2.sent;
            _context2.next = 22;
            return FollowsFunc(friendList);

          case 22:
            friendList = _context2.sent;


            res.send({ code: 200, message: '获取排行榜信息成功', data: {
                friendList: friendList,
                followingList: followingList,
                followsList: followsList,
                postList: postList
              } });
            _context2.next = 29;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2['catch'](0);

            res.send({ code: 200, message: '获取排行榜信息失败', data: {} });

          case 29:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 26]]);
  }));

  return function rankingFunc(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=ranking.js.map