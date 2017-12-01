//var express = require('express');
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

var cors = require('cors')

import router from './src/router/index.js';
var app = express();
import dbconnect from './src/config/db.js';
var db = dbconnect();

import websit_chat_room from './src/servers/websit_chat_room.js';
import chat_room from './src/servers/chat_room.js';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./public'));
app.use(cors());

router(app);
// websit_chat_room(); // 全站聊天室启动

chat_room(); // 通讯录聊天功能启动

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
