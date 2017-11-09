/**
 * Created by Administrator on 2017/6/7.
 */
import axios from 'axios';
import Vue from 'vue';
// import Cookie from 'js-cookie';
let ajaxConfig = {
  // baseURL: '/api/',
  // baseURL: 'http://10.209.96.67:3000/',
  baseURL: '/baidu/',
  transformResponse: [function (data) {
    return JSON.parse(data);
  }],
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

let ajaxConfigForm = {
  baseURL: '/api/',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

var _ajax = axios.create(ajaxConfig);
var _ajaxForm = axios.create(ajaxConfigForm);

// 拦截response(有加载等待)
_ajax.interceptors.response.use((response) => {
  if (response.status === 200) {
      return response.data;
  } else {
    console.log('请求出错啦，status：' + response.status);
    throw new Error('Internal Server Error');
  }
}, (error) => {
  if (error.message) {
    console.log(error.message);

  }
  throw error;
});

_ajaxForm.interceptors.response.use((response) => {
  if (response.status === 200) {
      return response.data;
  } else {
    console.log('请求出错啦，status：' + response.status);
    throw new Error('Internal Server Error');
  }
}, (error) => {
  if (error.message) {
    console.log(error.message);

  }
  throw error;
});

// 统一的错误处理函数
function _ajaxCatch (err) {
  throw err;
};


// 加载等待 - 添加等待
_ajax.interceptors.request.use(function (config) {

  return config;
}, function (error) {
  throw error;
});
// 加载等待 - 移除等待
_ajax.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  throw error;
});

var ajax = {
  setHeader (name, value) {
    _ajax.defaults.headers[name] = value;
  },
  setCookie (user) {
    document.cookie = 'userId=' + user.userId + ';expires=' + new Date('2120/12/12 00:00:00').toGMTString();
    document.cookie = 'passport=' + user.passport + ';expires=' + new Date('2120/12/12 00:00:00').toGMTString();
    // Cookie.set('passport', user.passport, {expires: new Date('2120/12/12 00:00:00').toGMTString()});
    // Cookie.set('userId', user.userId, {expires: new Date('2120/12/12 00:00:00').toGMTString()});
  },
  parseParam (data) {
    if (!data) {
      return '';
    }
    return '?' + Object.keys(data).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  }
};
var ajax1 = {
  get (url, data) {
    return _ajax.get(url + ajax.parseParam(data)).catch(_ajaxCatch);
  },
  post (url, data) {
    return _ajax.post(url, data).catch(_ajaxCatch);
  },
  put (url, data) {
    return _ajax.put(url, data).catch(_ajaxCatch);
  },
  delete (url, data) {
    return _ajax.delete(url, data).catch(_ajaxCatch);
  }
};
var ajax2 = {
  post (url, data) {
    return _ajaxForm.post(url, data).catch(_ajaxCatch);
  }
};


// if (Cookie.get('passport')) {
//   ajax.setHeader('passport', Cookie.get('passport'));
//   ajax.setHeader('userId', Cookie.get('userId'));
// }
// window.ajax = ajax;
export {ajax1, ajax2};
