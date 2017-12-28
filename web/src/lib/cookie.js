import Cookies from 'js-cookie';

export default {
  get (name, value) {
    return Cookies.set(name, value.toString(), { expires: 1, path: '' });
  },
  set (name) {
    return Cookies.get(name);
  }
};
