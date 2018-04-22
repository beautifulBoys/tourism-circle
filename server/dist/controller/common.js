'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myCommentsFunc = exports.myStarFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user3 = require('../model/user.js');

var _user4 = _interopRequireDefault(_user3);

var _star = require('../model/star.js');

var _star2 = _interopRequireDefault(_star);

var _comment = require('../model/comment.js');

var _comment2 = _interopRequireDefault(_comment);

var _post = require('../model/post.js');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myStarFunc = exports.myStarFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var userId, pageConfig, start, end, arr, _ref2, list, i, post, isStared, starList, j, user, commentList, h, _user, _ref3, avatar, obj;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.headers.userid - 0;
            pageConfig = {
              num: req.body.num - 0, // 每页数量
              page: req.body.page - 0 // 当前页数
            };
            start = pageConfig.page * pageConfig.num;
            end = start + pageConfig.num;
            arr = [];
            _context.prev = 5;
            _context.next = 8;
            return _star2.default.findOne({ id: userId });

          case 8:
            _ref2 = _context.sent;
            list = _ref2.list;

            if (list) {
              _context.next = 13;
              break;
            }

            res.send({ code: 300, message: '你还没有喜欢过别人的分享', data: {} });
            return _context.abrupt('return');

          case 13:
            list = list.slice(start, end);
            i = 0;

          case 15:
            if (!(i < list.length)) {
              _context.next = 49;
              break;
            }

            _context.next = 18;
            return _post2.default.findOne({ id: list[i] - 0 });

          case 18:
            post = _context.sent;
            isStared = post.starList.indexOf(userId) === -1 ? false : true;
            starList = [];
            j = 0;

          case 22:
            if (!(j < post.starList.length)) {
              _context.next = 30;
              break;
            }

            _context.next = 25;
            return _user4.default.findOne({ id: post.starList[j] - 0 });

          case 25:
            user = _context.sent;

            starList.push(user);

          case 27:
            j++;
            _context.next = 22;
            break;

          case 30:
            commentList = [];
            h = 0;

          case 32:
            if (!(h < post.commentList.length)) {
              _context.next = 40;
              break;
            }

            _context.next = 35;
            return _user4.default.findOne({ id: post.commentList[h].userId - 0 });

          case 35:
            _user = _context.sent;


            commentList.push({
              comment: post.commentList[h].comment,
              user: {
                url: _user.avatar,
                name: _user.username
              }
            });

          case 37:
            h++;
            _context.next = 32;
            break;

          case 40:
            _context.next = 42;
            return _user4.default.findOne({ id: post.userId });

          case 42:
            _ref3 = _context.sent;
            avatar = _ref3.avatar;
            obj = {
              id: post.id,
              userId: post.userId - 0,
              postTime: post.postTime,
              commentList: commentList,
              starList: starList,
              tagList: post.tagList,
              rate: post.rate,
              urls: post.urls,
              content: post.content,
              time: post.time,
              city: post.city,
              spot: post.spot,
              title: post.title,
              avatar: avatar,
              isStared: isStared
            };

            arr.push(obj);

          case 46:
            i++;
            _context.next = 15;
            break;

          case 49:
            res.send({ code: 200, message: '获取我的喜欢成功', data: { list: arr } });
            _context.next = 55;
            break;

          case 52:
            _context.prev = 52;
            _context.t0 = _context['catch'](5);

            res.send({ code: 300, message: '获取我的喜欢失败，请联系管理员', data: _context.t0 });

          case 55:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 52]]);
  }));

  return function myStarFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var myCommentsFunc = exports.myCommentsFunc = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var userId, pageConfig, start, end, arr, _ref5, list, i, post, isStared, starList, j, user, commentList, h, _user2, _ref6, avatar, obj;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.headers.userid - 0;
            pageConfig = {
              num: req.body.num - 0, // 每页数量
              page: req.body.page - 0 // 当前页数
            };
            start = pageConfig.page * pageConfig.num;
            end = start + pageConfig.num;
            arr = [];
            _context2.prev = 5;
            _context2.next = 8;
            return _comment2.default.findOne({ id: userId });

          case 8:
            _ref5 = _context2.sent;
            list = _ref5.list;

            if (list) {
              _context2.next = 13;
              break;
            }

            res.send({ code: 300, message: '你还没有评论过别人的分享', data: {} });
            return _context2.abrupt('return');

          case 13:
            list = list.slice(start, end);
            i = 0;

          case 15:
            if (!(i < list.length)) {
              _context2.next = 49;
              break;
            }

            _context2.next = 18;
            return _post2.default.findOne({ id: list[i] - 0 });

          case 18:
            post = _context2.sent;
            isStared = post.starList.indexOf(userId) === -1 ? false : true;
            starList = [];
            j = 0;

          case 22:
            if (!(j < post.starList.length)) {
              _context2.next = 30;
              break;
            }

            _context2.next = 25;
            return _user4.default.findOne({ id: post.starList[j] - 0 });

          case 25:
            user = _context2.sent;

            starList.push(user);

          case 27:
            j++;
            _context2.next = 22;
            break;

          case 30:
            commentList = [];
            h = 0;

          case 32:
            if (!(h < post.commentList.length)) {
              _context2.next = 40;
              break;
            }

            _context2.next = 35;
            return _user4.default.findOne({ id: post.commentList[h].userId - 0 });

          case 35:
            _user2 = _context2.sent;

            commentList.push({
              comment: post.commentList[h].comment,
              user: {
                url: _user2.avatar,
                name: _user2.username
              }
            });

          case 37:
            h++;
            _context2.next = 32;
            break;

          case 40:
            _context2.next = 42;
            return _user4.default.findOne({ id: post.userId });

          case 42:
            _ref6 = _context2.sent;
            avatar = _ref6.avatar;
            obj = {
              id: post.id,
              userId: post.userId - 0,
              postTime: post.postTime,
              commentList: commentList,
              starList: starList,
              tagList: post.tagList,
              rate: post.rate,
              urls: post.urls,
              content: post.content,
              time: post.time,
              city: post.city,
              spot: post.spot,
              title: post.title,
              avatar: avatar,
              isStared: isStared
            };

            arr.push(obj);

          case 46:
            i++;
            _context2.next = 15;
            break;

          case 49:
            res.send({ code: 200, message: '获取我评论的数据成功', data: { list: arr } });
            _context2.next = 55;
            break;

          case 52:
            _context2.prev = 52;
            _context2.t0 = _context2['catch'](5);

            res.send({ code: 300, message: '获取我评论的数据失败，请联系管理员', data: _context2.t0 });

          case 55:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 52]]);
  }));

  return function myCommentsFunc(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=common.js.map