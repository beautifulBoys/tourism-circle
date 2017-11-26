/**
 * Created by Administrator on 2017/6/7.
 */
import axios from 'axios';
import Vue from 'vue';
import Cookie from 'js-cookie';

let ajaxConfig = {
  baseURL: '/api/admin/',
  transformResponse: [function (data) {
    return JSON.parse(data);
  }],
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'passport': '',
    'userId': ''
  }
};

let ajaxConfigForm = {
  baseURL: '/api/admin/',
  headers: {
    'Content-Type': 'multipart/form-data',
    'passport': '',
    'userId': ''
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
  if (error.message) console.log(error.message);
  throw error;
});

// 统一的错误处理函数
function _ajaxCatch (err) {
  throw err;
};

var ajax = {
  setHeader (name, value) {
    _ajax.defaults.headers[name] = value;
    _ajaxForm.defaults.headers[name] = value;
  },
  parseParam (data) {
    if (!data) return '';
    return '?' + Object.keys(data).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  }
};
Vue.prototype.ajaxFunc = ajax;
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


if (Cookie.get('passport') && Cookie.get('userId') && Cookie.get('username')) {
  ajax.setHeader('passport', Cookie.get('passport'));
  ajax.setHeader('userId', Cookie.get('userId'));
  window.loginStatus = true;
} else {
  window.loginStatus = false;
}


export {ajax1, ajax2};
