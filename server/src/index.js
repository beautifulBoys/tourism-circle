//var express = require('express');
import express from 'express';
import http from 'http';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './router/index.js';
import dbconnect from './config/db.js';

import websit_chat_room from './servers/websit_chat_room.js';
import chat_room from './servers/chat_room.js';

var app = express();
var db = dbconnect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

router(app);
// websit_chat_room(); // 全站聊天室启动

chat_room(); // 通讯录聊天功能启动

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// server 报错处理
var port = normalizePort(process.env.PORT || '3000');
var server = http.createServer(app);
server.listen(port);
console.log('主程序启动：', port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

module.exports = app;
