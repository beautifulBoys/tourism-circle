
import formidable from 'formidable';
import util from 'util';
import path from 'path';
import fs from 'fs';

import User from '../model/user.js';
import Id from '../model/id.js';

export default (app) => {
  app.post('/register', (req, res) => {
    new User({
      username: req.body.username,
      password: req.body.password
    }).save(() => {
        res.send({code: 200, message: 'ok', data: {}});
    });
  });
  app.post('/test', (req, res) => {
    res.send({code: 200, message: 'okokokokok', data: {}});
  });

  app.post('/upload', (req, res) => {

    var form = new formidable.IncomingForm();
    var src = path.join(__dirname, '../../upload/');
    form.uploadDir = src;

    form.parse(req, (err, fields, files) => {
      console.log(files);
      for (item in files) {
        (function(){
            var oldname = files[item].path;
            var newname = src + (Date.parse(new Date()) / 1000) + '.' + files[item].name.split('.')[1];
            fs.rename(oldname, newname, (err) => {});
        })(item);
      }
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('');
    });

  });
}
