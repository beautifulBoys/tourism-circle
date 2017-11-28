
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let userList = [];
let socketList = [];
export default () => {
  io.on('connection', socket => {

    //监听新用户加入
    socket.on('login', function (obj) {
      socket.fromId = obj.fromId - 0;
      socket.toId = obj.toId - 0;
      socketList.push(socket);
      console.log('新朋友 ' + obj.username + ' 加入 !');
      this.emit('loginSuccess', 1);
    });

    //监听用户退出
    socket.on('disconnect', function () {
      
      this.broadcast.emit('logout');
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) {
      console.log(obj);
      for (let i = 0; i < socketList.length; i++) {
        if ((obj.toId - 0 === socketList[i].fromId - 0) && (obj.fromId - 0 === socketList[i].toId - 0)) {
          let obj = {type: 1, message: obj.message};
          socketList[i].emit('message', obj);
          break;
        }
      }
    });
  });

  const port = 3003;
  http.listen(port, function () {
    console.log('监听端口: ' + port);
  });
};
