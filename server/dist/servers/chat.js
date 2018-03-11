'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var autoChat = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(text, fn) {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return ajax(text);

          case 3:
            result = _context.sent;

            fn(JSON.parse(result));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            fn(errObj);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function autoChat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _chat_robot = require('./chat_robot.js');

var _chat_robot2 = _interopRequireDefault(_chat_robot);

var _index = require('../config/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var errObj = {
  result: 0,
  content: '没有理解你的意思，你能说的简单一点吗？'
};
var qingyunkeUrl = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg=';

var socketList = [];
function ajax(text) {
  return new _promise2.default(function (resolve, reject) {
    try {
      httpApi.get(qingyunkeUrl + encodeURI(text), function (req) {
        req.setEncoding('utf8');
        req.on('data', function (data) {
          resolve(data);
        });
        req.on('error', function (e) {
          resolve(errObj);
        });
      });
    } catch (err) {
      resolve(errObj);
    }
  });
}

module.exports = function () {
  io.on('connection', function (socket) {

    //监听新上线用户
    socket.on('online', function (obj) {
      this.userId = obj.fromId - 0;
      socketList.push(socket);
      console.log(obj.username + '（' + obj.fromId + '）' + ' 加入，现在在线人数: ', socketList.length);
      this.emit('onlined', { userId: this.userId });
    });

    //监听用户退出
    socket.on('disconnect', function () {
      var _this = this;

      // {userId: 1004}
      socketList = socketList.filter(function (item) {
        if (item.userId - 0 === _this.userId) console.log(item.userId + '退出');
        return item.userId - 0 !== _this.userId;
      });
      console.log('现在在线人数: ', socketList.length);
      this.broadcast.emit('logout', { userId: this.userId });
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) {
      // {fromId, toId, message}
      console.log('收到 ' + obj.fromId + ' 发送给 ' + obj.toId + ' 的消息： ' + obj.message);
      var sign = true;
      var me = this;
      if (obj.toId - 0 === 100) {
        console.log('收到发给机器人的消息');
        (0, _chat_robot2.default)(obj.message, function (result) {
          me.emit('message', {
            fromId: obj.toId,
            toId: obj.fromId,
            type: 1,
            message: result.content
          });
        });
        return;
      }
      for (var i = 0; i < socketList.length; i++) {
        if (obj.toId - 0 === socketList[i].userId - 0) {
          sign = false;
          socketList[i].emit('message', {
            fromId: obj.fromId,
            toId: obj.toId,
            type: 1,
            message: obj.message
          });
          break;
        }
      }
      if (sign) {
        this.emit('message', { // 对话方不在线。
          fromId: obj.toId,
          toId: obj.fromId,
          type: 2,
          message: '对方不在线，请稍后联系他'
        });
      }
    });
  });
  var port = _index2.default.chat_port;
  http.listen(port, function () {
    console.log('聊天工具启动: ' + port);
  });
};
//# sourceMappingURL=chat.js.map