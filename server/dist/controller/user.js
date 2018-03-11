'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUserFunc = exports.userInfoUpdateFunc = exports.getUserInfoFunc = exports.loginFunc = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

var _following = require('../model/following.js');

var _following2 = _interopRequireDefault(_following);

var _follow = require('../model/follow.js');

var _follow2 = _interopRequireDefault(_follow);

var _friend = require('../model/friend.js');

var _friend2 = _interopRequireDefault(_friend);

var _star = require('../model/star.js');

var _star2 = _interopRequireDefault(_star);

var _comment = require('../model/comment.js');

var _comment2 = _interopRequireDefault(_comment);

var _id = require('../model/id.js');

var _id2 = _interopRequireDefault(_id);

var _blueimpMd = require('blueimp-md5');

var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

var _formDate = require('../lib/formDate.js');

var _formDate2 = _interopRequireDefault(_formDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function passportFunc(password) {
  return (0, _blueimpMd2.default)('circle' + _formDate2.default.formatDate(new Date()) + password);
}

var loginFunc = exports.loginFunc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var result, passport, username, obj, userId;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.body.username && req.body.password)) {
              _context.next = 51;
              break;
            }

            _context.prev = 1;
            _context.next = 4;
            return _user2.default.findOne({ username: req.body.username });

          case 4:
            result = _context.sent;
            passport = passportFunc(req.body.password);
            username = req.body.username;

            if (!result) {
              _context.next = 17;
              break;
            }

            if (!(result.password === req.body.password)) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return _user2.default.update({ _id: result._id }, { passport: passport }, { multi: false }, function () {});

          case 11:
            res.send({ code: 200, message: '你好：' + username + '，欢迎回来', data: { passport: passport, userId: result.id, username: username } });
            _context.next = 15;
            break;

          case 14:
            res.send({ code: 300, message: '用户名或密码输入错误', data: {} });

          case 15:
            _context.next = 44;
            break;

          case 17:
            _context.next = 19;
            return _id2.default.findOne({ type: 'userId' });

          case 19:
            obj = _context.sent;

            if (!obj) {
              _context.next = 25;
              break;
            }

            _context.next = 23;
            return _id2.default.update({ _id: obj._id }, { value: obj.value + 1 }, { multi: false }, function () {});

          case 23:
            _context.next = 27;
            break;

          case 25:
            _context.next = 27;
            return _id2.default.create({ type: 'userId' });

          case 27:
            _context.next = 29;
            return _id2.default.findOne({ type: 'userId' });

          case 29:
            obj = _context.sent;
            userId = obj.value + 1;
            // 创建 user 表

            _context.next = 33;
            return _user2.default.create({
              id: userId,
              username: req.body.username,
              password: req.body.password,
              passport: passport
            }, function (err, docs) {
              if (err) console.log('create user 出错了', err);
            });

          case 33:
            _context.next = 35;
            return _following2.default.create({
              id: userId,
              userId: userId
            }, function (err, docs) {
              if (err) console.log('create following 出错了', err);
            });

          case 35:
            _context.next = 37;
            return _follow2.default.create({
              id: userId,
              userId: userId
            }, function (err, docs) {
              if (err) console.log('create follow 出错了', err);
            });

          case 37:
            _context.next = 39;
            return _friend2.default.create({
              id: userId,
              userId: userId
            }, function (err, docs) {
              if (err) console.log('create friend 出错了', err);
            });

          case 39:
            _context.next = 41;
            return _star2.default.create({
              id: userId,
              userId: userId
            }, function (err, docs) {
              if (err) console.log('create star 出错了', err);
            });

          case 41:
            _context.next = 43;
            return _comment2.default.create({
              id: userId,
              userId: userId
            }, function (err, docs) {
              if (err) console.log('create comment 出错了', err);
            });

          case 43:

            res.send({ code: 200, message: '你好：' + username + '，已自动为您注册账号', data: {
                passport: passport,
                userId: obj.value + 1,
                username: username
              } });

          case 44:
            _context.next = 49;
            break;

          case 46:
            _context.prev = 46;
            _context.t0 = _context['catch'](1);

            res.send({ code: 300, message: '登录故障，请联系管理员', data: {} });

          case 49:
            _context.next = 52;
            break;

          case 51:
            res.send({ code: 300, message: '用户名和密码请输入完整', data: {} });

          case 52:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 46]]);
  }));

  return function loginFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getUserInfoFunc = exports.getUserInfoFunc = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var data, obj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user2.default.findOne({ id: req.body.userId });

          case 3:
            data = _context2.sent;
            obj = {};

            if (data) {
              obj.username = data.username;
              obj.userId = data.id;
              obj.email = data.email;
              obj.address = data.address;
              obj.desc = data.desc;
              obj.avatar = data.avatar;
              obj.sex = data.sex === 1 ? '女孩' : '男孩';
            }
            res.send({ code: 200, message: '获取用户信息成功', data: obj });
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            res.send({ code: 200, message: '获取用户信息失败', data: _context2.t0 });

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function getUserInfoFunc(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var userInfoUpdateFunc = exports.userInfoUpdateFunc = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user2.default.update({ id: req.headers.userid }, (0, _extends3.default)({}, req.body), { multi: false }, function () {});

          case 3:
            res.send({ code: 200, message: '修改用户信息成功', data: {} });
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](0);

            res.send({ code: 300, message: '修改用户信息失败', data: _context3.t0 });

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 6]]);
  }));

  return function userInfoUpdateFunc(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getAllUserFunc = exports.getAllUserFunc = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var pageConfig, start, end, result, total, arr, i, item;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            pageConfig = {
              num: req.body.num - 0, // 每页数量
              page: req.body.page - 0 // 当前页数
            };
            start = pageConfig.page * pageConfig.num;
            end = start + pageConfig.num;
            _context4.prev = 3;
            _context4.next = 6;
            return _user2.default.find({});

          case 6:
            result = _context4.sent;
            total = result.length;

            result = result.slice(start, end);
            arr = [];
            i = 0;

          case 11:
            if (!(i < result.length)) {
              _context4.next = 19;
              break;
            }

            if (result[i].status) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt('continue', 16);

          case 14:
            item = {
              address: result[i].address.length > 0 ? result[i].address.join('-') : '',
              email: result[i].email,
              id: result[i].id,
              username: result[i].username,
              desc: result[i].desc,
              postNum: result[i].postNum,
              avatar: result[i].avatar,
              sex: result[i].sex
            };

            arr.push(item);

          case 16:
            i++;
            _context4.next = 11;
            break;

          case 19:
            res.send({ code: 200, message: '获取用户列表成功', data: { list: arr, total: total } });
            _context4.next = 25;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4['catch'](3);

            res.send({ code: 300, message: '获取用户列表失败', data: _context4.t0 });

          case 25:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[3, 22]]);
  }));

  return function getAllUserFunc(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=user.js.map