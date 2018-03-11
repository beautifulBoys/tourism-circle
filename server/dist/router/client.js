'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('../model/api.js');

var _api2 = _interopRequireDefault(_api);

var _user = require('../controller/user.js');

var _post = require('../controller/post.js');

var _gallery = require('../controller/gallery.js');

var _friend = require('../controller/friend.js');

var _common = require('../controller/common.js');

var _ranking = require('../controller/ranking.js');

var _follow = require('../controller/follow.js');

var _api3 = require('../controller/api.js');

var _client_other = require('../controller/client_other.js');

var _message = require('../controller/message.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var path, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = req.path;
            _context.next = 3;
            return _api2.default.findOne({ path: path });

          case 3:
            result = _context.sent;

            if (!result) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return _api2.default.update({ path: path }, { $inc: { num: 12 } }, { multi: false }, function () {});

          case 7:
            _context.next = 11;
            break;

          case 9:
            _context.next = 11;
            return _api2.default.create({ path: path }, function (err, docs) {
              if (err) console.log('create user 出错了', err);
            });

          case 11:
            (0, _client_other.authenticationFunc)(req, res, next);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/login', _user.loginFunc);
router.get('/post', _post.postFunc);
router.post('/myFriend', _friend.myFriendFunc);
router.post('/myPosted', _post.myPostedFunc);
router.post('/myStar', _common.myStarFunc);
router.post('/myComments', _common.myCommentsFunc);
router.post('/ranking', _ranking.rankingFunc);
router.post('/allUser', _user.getAllUserFunc);
router.post('/userMainInfo', _client_other.userMainInfoFunc);
router.post('/mine', _client_other.mineFunc);
router.post('/follows', _follow.followsFunc);
router.post('/myFollowing', _follow.myFollowingFunc);
router.post('/sendWebMail', _message.sendWebMailFunc);
router.post('/toFollow', _follow.toFollowFunc);
router.post('/deleteFollowing', _follow.deleteFollowingFunc);
router.post('/posting', _post.postingFunc);
router.post('/gallery', _gallery.galleryFunc);
router.post('/postInfo', _client_other.postInfoFunc);
router.post('/pinglun', _post.pinglunFunc);
router.post('/star', _post.starFunc);
router.post('/api', _api3.apiFunc);
router.post('/addFriend', _friend.addFriendFunc);

exports.default = router;
//# sourceMappingURL=client.js.map