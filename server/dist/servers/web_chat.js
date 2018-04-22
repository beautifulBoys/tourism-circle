'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../config/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//在线用户
var onlineUserList = [];
//当前在线人数
var onlineUserCount = 0;

exports.default = function () {
  io.on('connection', function (socket) {
    console.log('全站聊天室-服务已创建 !');

    //监听新用户加入
    socket.on('login', function (obj) {
      // {userId, username, passport, avatar}
      socket.socketId = obj.userId;
      onlineUserList.push(obj);
      //向除自己以外的所有客户端广播:有新用户加入
      var newUserMessage = {
        user: {
          id: obj.userId,
          name: obj.username,
          avatar: obj.avatar
        },
        message: {
          type: 1,
          text: '用户 ' + obj.username + ' 进入房间'
        }
      };
      this.broadcast.emit('comming', newUserMessage);
      this.emit('loginSuccess', 1);
      console.log(obj.username + '加入了群聊');
    });

    //监听用户退出
    socket.on('disconnect', function () {
      // 将退出的用户从在线列表中删除
      var exitObj = {};
      var sign = false;
      onlineUserList = onlineUserList.filter(function (item) {
        if (item.userId === socket.socketId) exitObj = item;
        return item.userId !== socket.socketId;
      });
      onlineUserCount--;
      console.log('exitObj', exitObj);
      //向所有客户端广播用户退出
      var exitUserMessage = {
        user: {
          id: exitObj.userId,
          name: exitObj.username,
          avatar: exitObj.avatar
        },
        message: {
          type: 1,
          text: '用户 ' + exitObj.username + ' 离开房间'
        }
      };
      this.broadcast.emit('logout', exitUserMessage);
      console.log(exitObj.username + '退出了群聊');
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) {
      this.broadcast.emit('message', obj); // 广播给自己以外的所有用户
      console.log(obj.user.name + '说：' + obj.message.text);
    });
  });

  var port = _index2.default.webChat_port;
  http.listen(port, function () {
    console.log('全站聊天室启动: ' + port);
  });
};
//# sourceMappingURL=web_chat.js.map