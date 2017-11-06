var formidable = require('formidable')
var util = require('util');
var path = require('path');
var fs = require('fs');

var User = require('../model/user.js');
var Id = require('../model/id.js');

var router = (app) => {
  app.post('/register', function (req, res) {
    new User({
      username: req.body.username,
      password: req.body.password
    }).save(function () {
        res.send({code: 200, message: 'ok', data: {}});
    });
  });

  app.post('/upload', function (req, res) {

    var form = new formidable.IncomingForm();
    var src = path.join(__dirname, '../../upload/');
    form.uploadDir = src;
    
    form.parse(req, function (err, fields, files) {
      console.log(files);
      for (item in files) {
        (function(){
            var oldname = files[item].path;
            var newname = src + (Date.parse(new Date()) / 1000) + '.' + files[item].name.split('.')[1];
            fs.rename(oldname, newname, function (err) {});
        })(item);
      }
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('');
    });

  });
}

module.exports = router;
