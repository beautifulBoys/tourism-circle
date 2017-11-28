
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let socketList = [];
module.exports = function () {
  io.on('connection', socket => {

    //监听新上线用户
    socket.on('online', function (obj) {
      this.userId = obj.fromId - 0;
      socketList.push(socket);
      console.log(obj.username + ' 加入，现在在线人数: ', socketList.length);
      this.emit('onlined', {userId: this.userId});
    });

    //监听用户退出
    socket.on('disconnect', function () { // {userId: 1004}
      socketList = socketList.filter((item) => {
        return (item.userId - 0 !== this.userId);
      });
      console.log('有人退出，现在在线人数: ', socketList.length);
      this.broadcast.emit('logout', {userId: this.userId});
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) { // {fromId, toId, message}
      let sign = true;
      for (let i = 0; i < socketList.length; i++) {
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

  const port = 3003;
  http.listen(port, function () {
    console.log('监听端口: ' + port);
  });
};
