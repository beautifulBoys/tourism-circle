import {ajax1, ajax2} from './ajax';

export const login = data => ajax1.post('/login', data);
