'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeMinePostStatusFunc = exports.myPostedFunc = exports.pinglunFunc = exports.starFunc = exports.postFunc = exports.postingFunc = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var changeList = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(arr) {
    var list, i, user, obj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            list = [];
            i = 0;

          case 2:
            if (!(i < arr.length)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 5;
            return _user5.default.findOne({ id: arr[i].userId });

          case 5:
            user = _context2.sent;
            obj = (0, _extends3.default)({}, arr[i], { avatar: user.avatar });

            list.push(obj);

          case 8:
            i++;
            _context2.next = 2;
            break;

          case 11:
            return _context2.abrupt('return', list);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function changeList(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _post = require('../model/post.js');

var _post2 = _interopRequireDefault(_post);

var _id = require('../model/id.js');

var _id2 = _interopRequireDefault(_id);

var _user4 = require('../model/user.js');

var _user5 = _interopRequireDefault(_user4);

var _star = require('../model/star.js');

var _star2 = _interopRequireDefault(_star);

var _comment = require('../model/comment.js');

var _comment2 = _interopRequireDefault(_comment);

var _formDate = require('../lib/formDate.js');

var _formDate2 = _interopRequireDefault(_formDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postingFunc = exports.postingFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var userId, obj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.headers.userid;
            _context.next = 3;
            return _id2.default.findOne({ type: 'postId' });

          case 3:
            obj = _context.sent;

            if (!obj) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return _id2.default.update({ _id: obj._id }, { value: obj.value + 1 }, { multi: false }, function () {});

          case 7:
            _context.next = 11;
            break;

          case 9:
            _context.next = 11;
            return _id2.default.create({ type: 'postId' });

          case 11:
            _context.next = 13;
            return _id2.default.findOne({ type: 'postId' });

          case 13:
            obj = _context.sent;
            _context.prev = 14;
            _context.next = 17;
            return _post2.default.create({
              title: req.body.title,
              spot: req.body.spot,
              city: req.body.city,
              time: req.body.time,
              content: req.body.content,
              urls: req.body.urls,
              rate: req.body.rate,
              tagList: req.body.tagList,
              starList: [],
              commentList: [],
              userId: req.headers.userid,
              id: obj.value + 1
            });

          case 17:
            _context.next = 19;
            return _user5.default.update({ id: userId }, { $inc: { postNum: 1 } }, { multi: false }, function () {});

          case 19:
            res.send({ code: 200, message: '分享成功', data: {} });
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](14);

            res.send({ code: 300, message: '分享失败', data: _context.t0 });

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[14, 22]]);
  }));

  return function postingFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function sort(type, list) {
  var result = void 0;
  if (type === 'newest') {
    result = list;
  } else if (type === 'hotest') {
    result = list.sort(function (b, a) {
      return a.starList.length - b.starList.length;
    });
  } else if (type === 'mostest') {
    result = list.sort(function (b, a) {
      return a.commentList.length - b.commentList.length;
    });
  } else console.log('出错了，请检查');
  return result;
}

var postFunc = exports.postFunc = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var userId, pageConfig, start, end, type, sortString, arr, list_a, list, i, user, isStared, starList, j, userStar, commentList, h, _user, obj;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.headers.userid - 0;
            pageConfig = {
              num: req.query.num - 0, // 每页数量
              page: req.query.page - 0 // 当前页数
            };
            start = pageConfig.page * pageConfig.num;
            end = start + pageConfig.num;

            console.log(pageConfig);
            type = req.query.type ? req.query.type : 'newest';
            sortString = 0;
            // let arr = await Post.find({status: 0}).sort({postTime: -1});

            arr = [];

            if (!(type === 'newest')) {
              _context3.next = 14;
              break;
            }

            _context3.next = 11;
            return _post2.default.find({ status: 0 }).skip(start).limit(pageConfig.num).sort({ '_id': -1 });

          case 11:
            arr = _context3.sent;
            _context3.next = 18;
            break;

          case 14:
            _context3.next = 16;
            return _post2.default.find({});

          case 16:
            list_a = _context3.sent;

            if (type === 'mostest') {
              list_a = list_a.sort(function (b, a) {
                return a.commentList.length - b.commentList.length;
              });
              arr = list_a.slice(start, end);
            } else if (type === 'hotest') {
              list_a = list_a.sort(function (b, a) {
                return a.starList.length - b.starList.length;
              });
              arr = list_a.slice(start, end);
            }

          case 18:
            list = [];
            i = 0;

          case 20:
            if (!(i < arr.length)) {
              _context3.next = 50;
              break;
            }

            _context3.next = 23;
            return _user5.default.findOne({ id: arr[i].userId });

          case 23:
            user = _context3.sent;
            isStared = arr[i].starList.indexOf(userId) === -1 ? false : true;
            starList = [];
            j = 0;

          case 27:
            if (!(j < arr[i].starList.length)) {
              _context3.next = 35;
              break;
            }

            _context3.next = 30;
            return _user5.default.findOne({ id: arr[i].starList[j] - 0 });

          case 30:
            userStar = _context3.sent;

            starList.push(userStar);

          case 32:
            j++;
            _context3.next = 27;
            break;

          case 35:
            commentList = [];
            h = 0;

          case 37:
            if (!(h < arr[i].commentList.length)) {
              _context3.next = 45;
              break;
            }

            _context3.next = 40;
            return _user5.default.findOne({ id: arr[i].commentList[h].userId });

          case 40:
            _user = _context3.sent;


            commentList.push({
              comment: arr[i].commentList[h].comment,
              user: {
                url: _user.avatar,
                name: _user.username
              }
            });

          case 42:
            h++;
            _context3.next = 37;
            break;

          case 45:
            obj = {
              id: arr[i].id,
              userId: arr[i].userId - 0,
              userInfo: {
                username: user.username,
                desc: user.desc,
                avatar: user.avatar
              },
              postTime: _formDate2.default.formatCSTDate(arr[i].postTime),
              commentList: commentList,
              starList: starList,
              tagList: arr[i].tagList,
              rate: arr[i].rate,
              urls: arr[i].urls,
              content: arr[i].content,
              time: arr[i].time,
              city: arr[i].city,
              spot: arr[i].spot,
              title: arr[i].title,
              avatar: user.avatar,
              isStared: isStared
            };

            list.push(obj);

          case 47:
            i++;
            _context3.next = 20;
            break;

          case 50:
            res.send({ code: 200, message: '获取数据成功', data: { list: list } });

          case 51:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function postFunc(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var starFunc = exports.starFunc = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var userId, postId, _ref5, starList, starIndex, status, statusText, _ref6, list, _ref7, _list, newstarlist, i, user;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.headers.userid - 0;
            postId = req.body.id - 0;
            _context4.next = 4;
            return _post2.default.findOne({ id: postId });

          case 4:
            _ref5 = _context4.sent;
            starList = _ref5.starList;

            starList = [].concat((0, _toConsumableArray3.default)(starList));

            starIndex = starList.indexOf(userId);
            status = null;
            statusText = null;

            if (!(starIndex === -1)) {
              _context4.next = 23;
              break;
            }

            starList.push(userId);
            status = 'star';
            statusText = '喜欢成功';
            _context4.next = 16;
            return _star2.default.findOne({ id: userId });

          case 16:
            _ref6 = _context4.sent;
            list = _ref6.list;

            list = [].concat((0, _toConsumableArray3.default)(list), [postId]);
            _context4.next = 21;
            return _star2.default.update({ id: userId }, { list: list }, { multi: false }, function (err, docs) {
              if (err) console.log('喜欢分享出错了', err);
            });

          case 21:
            _context4.next = 33;
            break;

          case 23:
            starList.splice(starIndex, 1);
            status = 'unstar';
            statusText = '取消喜欢成功';
            _context4.next = 28;
            return _star2.default.findOne({ id: userId });

          case 28:
            _ref7 = _context4.sent;
            _list = _ref7.list;

            _list = _list.filter(function (item) {
              return item - 0 !== postId;
            });

            _context4.next = 33;
            return _star2.default.update({ id: userId }, { list: _list }, { multi: false }, function (err, docs) {
              if (err) console.log('喜欢分享出错了', err);
            });

          case 33:
            _context4.prev = 33;
            _context4.next = 36;
            return _post2.default.update({ id: req.body.id }, { starList: starList }, { multi: false }, function () {});

          case 36:
            newstarlist = [];
            i = 0;

          case 38:
            if (!(i < starList.length)) {
              _context4.next = 46;
              break;
            }

            _context4.next = 41;
            return _user5.default.findOne({ id: starList[i] - 0 });

          case 41:
            user = _context4.sent;

            newstarlist.push({
              avatar: user.avatar
            });

          case 43:
            i++;
            _context4.next = 38;
            break;

          case 46:
            res.send({ code: 200, message: statusText, data: {
                status: status,
                list: newstarlist
              } });
            _context4.next = 52;
            break;

          case 49:
            _context4.prev = 49;
            _context4.t0 = _context4['catch'](33);

            res.send({ code: 300, message: '操作失败', data: _context4.t0 });

          case 52:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[33, 49]]);
  }));

  return function starFunc(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var pinglunFunc = exports.pinglunFunc = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var userId, postId, value, comment, post, commentList, user, newComment, _ref9, list;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = req.headers.userid - 0;
            postId = req.body.id - 0;
            value = req.body.value;
            comment = {
              comment: {
                time: new Date(),
                starNum: 0,
                content: value
              },
              userId: userId
            };
            _context5.next = 6;
            return _post2.default.findOne({ id: postId });

          case 6:
            post = _context5.sent;
            commentList = post.commentList.concat([]);

            commentList.push(comment);

            _context5.next = 11;
            return _user5.default.findOne({ id: userId });

          case 11:
            user = _context5.sent;
            newComment = {
              comment: {
                content: value
              },
              user: {
                url: user.avatar,
                name: user.username
              },
              userInfo: {
                avatar: user.avatar,
                username: user.username
              }
            };
            _context5.next = 15;
            return _comment2.default.findOne({ id: userId });

          case 15:
            _ref9 = _context5.sent;
            list = _ref9.list;

            if (!(list.indexOf(postId) === -1)) {
              _context5.next = 21;
              break;
            }

            list = [].concat((0, _toConsumableArray3.default)(list), [postId]);
            _context5.next = 21;
            return _comment2.default.update({ id: userId }, { list: list }, { multi: false }, function () {});

          case 21:
            _context5.prev = 21;
            _context5.next = 24;
            return _post2.default.update({ id: postId }, { commentList: commentList }, { multi: false }, function () {});

          case 24:
            _context5.next = 26;
            return _comment2.default.update({ id: userId }, { commentList: commentList }, { multi: false }, function () {});

          case 26:
            res.send({ code: 200, message: '评论成功', data: newComment });
            _context5.next = 32;
            break;

          case 29:
            _context5.prev = 29;
            _context5.t0 = _context5['catch'](21);

            res.send({ code: 300, message: '评论失败，请联系管理员', data: _context5.t0 });

          case 32:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[21, 29]]);
  }));

  return function pinglunFunc(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();
var myPostedFunc = exports.myPostedFunc = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var userId, pageConfig, start, end, list, arr, i, user, isStared, starList, j, _user2, commentList, h, _user3, obj;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = req.headers.userid - 0;
            pageConfig = {
              num: req.body.num - 0, // 每页数量
              page: req.body.page - 0 // 当前页数
            };
            start = pageConfig.page * pageConfig.num;
            end = start + pageConfig.num;
            list = [];
            _context6.prev = 5;
            _context6.next = 8;
            return _post2.default.find({ userId: userId });

          case 8:
            arr = _context6.sent;

            arr = arr.slice(start, end);
            i = 0;

          case 11:
            if (!(i < arr.length)) {
              _context6.next = 43;
              break;
            }

            if (!(arr[i].status === 2)) {
              _context6.next = 14;
              break;
            }

            return _context6.abrupt('continue', 40);

          case 14:
            _context6.next = 16;
            return _user5.default.findOne({ id: arr[i].userId });

          case 16:
            user = _context6.sent;
            isStared = arr[i].starList.indexOf(userId) === -1 ? false : true;
            starList = [];
            j = 0;

          case 20:
            if (!(j < arr[i].starList.length)) {
              _context6.next = 28;
              break;
            }

            _context6.next = 23;
            return _user5.default.findOne({ id: arr[i].starList[j] - 0 });

          case 23:
            _user2 = _context6.sent;

            starList.push(_user2);

          case 25:
            j++;
            _context6.next = 20;
            break;

          case 28:
            commentList = [];
            h = 0;

          case 30:
            if (!(h < arr[i].commentList.length)) {
              _context6.next = 38;
              break;
            }

            _context6.next = 33;
            return _user5.default.findOne({ id: arr[i].commentList[h].userId });

          case 33:
            _user3 = _context6.sent;


            commentList.push({
              comment: arr[i].commentList[h].comment,
              user: {
                url: _user3.avatar,
                name: _user3.username
              }
            });

          case 35:
            h++;
            _context6.next = 30;
            break;

          case 38:
            obj = {
              id: arr[i].id,
              userId: arr[i].userId - 0,
              postTime: _formDate2.default.formatCSTDate(arr[i].postTime),
              commentList: commentList,
              starList: starList,
              tagList: arr[i].tagList,
              rate: arr[i].rate,
              urls: arr[i].urls,
              content: arr[i].content,
              time: arr[i].time,
              city: arr[i].city,
              spot: arr[i].spot,
              title: arr[i].title,
              avatar: user.avatar,
              isStared: isStared,
              status: arr[i].status
            };

            list.push(obj);

          case 40:
            i++;
            _context6.next = 11;
            break;

          case 43:
            res.send({ code: 200, message: '获取我的分享成功', data: { list: list } });
            _context6.next = 49;
            break;

          case 46:
            _context6.prev = 46;
            _context6.t0 = _context6['catch'](5);

            res.send({ code: 300, message: '获取我的分享失败，请联系管理员', data: _context6.t0 });

          case 49:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[5, 46]]);
  }));

  return function myPostedFunc(_x10, _x11) {
    return _ref10.apply(this, arguments);
  };
}();

var changeMinePostStatusFunc = exports.changeMinePostStatusFunc = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var postId, status, list, statusObj;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            postId = req.body.id - 0;
            status = req.body.status;
            list = [];
            statusObj = {
              hide: { num: 1, text: '隐藏' },
              show: { num: 0, text: '显示' },
              delete: { num: 2, text: '删除' }
            };

            status = statusObj[status];
            _context7.prev = 5;
            _context7.next = 8;
            return _post2.default.update({ id: postId }, { status: status.num }, { multi: false }, function () {});

          case 8:

            res.send({ code: 200, message: status.text + '我的分享成功', data: {} });
            _context7.next = 14;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7['catch'](5);

            res.send({ code: 300, message: status.text + '我的分享失败，请联系管理员', data: _context7.t0 });

          case 14:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[5, 11]]);
  }));

  return function changeMinePostStatusFunc(_x12, _x13) {
    return _ref11.apply(this, arguments);
  };
}();
//# sourceMappingURL=post.js.map