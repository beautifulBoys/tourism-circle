import ajax from './ajax';

export default {
  bind (d) {
    return ajax.post('/string', d);
  },
  register (d) {
    return ajax.post('/register', d);
  }
};
