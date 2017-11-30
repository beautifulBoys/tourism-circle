var http = require('http');

const errObj = {
  result: 0,
  content: '没有理解你的意思，你能说的简单一点吗？'
};
const qingyunkeUrl = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg=';

let socketList = [];
function ajax (text) {
  return new Promise((resolve, reject) => {
    try {
      http.get(qingyunkeUrl + encodeURI(text), (req) => {
        req.setEncoding('utf8');  
        req.on('data', function (data) {
          resolve(data); 
        });
        req.on('error', (e) => {
          console.log('我是ajax的错误', e);
          resolve(errObj); 
        });
      });
    } catch (err) {
      resolve(errObj);
    }
  });
}
export default async (text, fn) => {
  try {
    let result = await ajax(text);
    fn(JSON.parse(result));
  } catch (err) {
    fn(errObj);
  }
};