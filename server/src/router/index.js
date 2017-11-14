
import formidable from 'formidable';
import util from 'util';
import path from 'path';
import fs from 'fs';


import loginFunc from '../controller/login.js';
import postingFunc from '../controller/posting.js';

export default (app) => {
  app.post('/login', loginFunc);
  app.post('/posting', postingFunc);

  app.post('/string', (req, res) => {
    res.send({code: 200, message: '我是post string 接口的返回', data: {}});
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
