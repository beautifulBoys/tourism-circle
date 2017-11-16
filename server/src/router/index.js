
import formidable from 'formidable';
import util from 'util';
import Image from '../model/image.js';


import {loginFunc, userInfoUpdateFunc, getUserInfoFunc} from '../controller/user.js';
import {postingFunc, postFunc} from '../controller/posting.js';
import {galleryFunc, galleryDeleteFunc} from '../controller/gallery.js';

import Id from '../model/id.js';

export default (app) => {
  app.post('/login', loginFunc);
  app.post('/posting', postingFunc);
  app.get('/post', postFunc);

  app.post('/gallery', galleryFunc);
  app.post('/gallery-delete', galleryDeleteFunc);
  app.post('/updateUserInfo', userInfoUpdateFunc);
  app.post('/getUserInfo', getUserInfoFunc);
  
  

  app.post('/string', async (req, res) => {
    let list = req.body.list;
    console.log(list);

    for (let i = 0; i < list.length; i++) {

      let obj = await Id.findOne({type: 'imageId'});
      if (obj) await Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
      else await Id.create({type: 'imageId'});

      await Image.create({
        url: list[i].url,
        id: obj.value + 1
      });
    }
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
