
import path from 'path';
import fs from 'fs';

export default async (req, res) => {
  var form = new formidable.IncomingForm();
  var src = path.join(__dirname, '../../resource/');
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
};