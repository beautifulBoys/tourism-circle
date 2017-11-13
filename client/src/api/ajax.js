/**
 * Created by Administrator on 2017/6/7.
 */
import axios from 'axios';
import Vue from 'vue';
// import Cookie from 'js-cookie';
let ajaxConfig = {
  baseURL: '/api/',
  // baseURL: 'http://ehr.sit.ffan.com/api',
  transformResponse: [function (data) {
    return JSON.parse(data);
  }],
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

var _ajax = axios.create(ajaxConfig);

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

// 统一的错误处理函数
function _ajaxCatch (err) {
  throw err;
};

var func = {
  parseParam (data) {
    if (!data) return '';
    return '?' + Object.keys(data).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  }
};
var ajax = {
  get (url, data) {
    return _ajax.get(url + func.parseParam(data)).catch(_ajaxCatch);
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

export default ajax;
