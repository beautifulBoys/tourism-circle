import {ajax1, ajax2} from './ajax';

export default {
  bind (d) {
    return ajax1.post('/test', d);
  },
  register (d) {
    return ajax1.post('/register', d);
  },
  upload (d) {
    return ajax2.post('/upload', d);
  },
  location (data) {
    return ajax1.post('/location/ip', data);
  }
};
