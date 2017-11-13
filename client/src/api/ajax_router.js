import ajax from './ajax.js';

export const bind = data => ajax.post('/string', data);
