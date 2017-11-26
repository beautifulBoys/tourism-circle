import ajax from './ajax.js';

export const loginAjax = data => ajax.post('/login', data);
