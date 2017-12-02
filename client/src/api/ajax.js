/**
 * Created by Administrator on 2017/6/7.
 */
import axios from 'axios';
import Vue from 'vue';
import Cookie from 'js-cookie';

function deleteUserInfoFunc () {
  Cookie.remove('userId');
  Cookie.remove('username');
  Cookie.remove('passport');
  localStorage.removeItem('user');
  window.loginStatus = false;
}

let ajaxConfig = {
  baseURL: '/api/client/',
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

var _ajax = axios.create(ajaxConfig);

_ajax.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.code && (response.data.code - 0 !== 400)) {
      return response.data;
    } else { // 身份验证不通过
      Vue.$vux.toast.show({
        text: response.data.message,
        position: 'middle',
        time: 3000,
        type: 'text',
        width: '15em'
      });
      deleteUserInfoFunc();
      return response.data;
    }
  } else {
    console.log('请求出错啦，status：' + response.status);
    throw new Error('Internal Server Error');
  }
}, error => {
  if (error.message) console.log(error.message);
  throw error;
});


// 加载等待 - 添加等待
_ajax.interceptors.request.use(config => {
  Vue.$vux.loading.show();
  return config;
}, error => {
  throw error;
});
// 加载等待 - 移除等待
_ajax.interceptors.response.use(response => {
  Vue.$vux.loading.hide();
  return response;
}, error => {
  Vue.$vux.loading.hide();
  throw error;
});

// 统一的错误处理函数
function _ajaxCatch (err) {
  throw err;
};

var ajax = {
  setHeader (name, value) {
    _ajax.defaults.headers[name] = value;
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
  }
};

if (Cookie.get('passport') && Cookie.get('userId') && Cookie.get('username')) {
  ajax.setHeader('passport', Cookie.get('passport'));
  ajax.setHeader('userId', Cookie.get('userId'));
  window.loginStatus = true;
} else {
  window.loginStatus = false;
}

if (localStorage.getItem('user')) {
  let user = JSON.parse(localStorage.getItem('user'));
  ajax.setHeader('passport', user.passport);
  ajax.setHeader('userId', user.userId);
  window.loginStatus = true;
} else {
  window.loginStatus = false;
}


export default ajax1;
