import {ajax1, ajax2} from './ajax';

export const login = data => ajax1.post('/login', data);
export const postingAjax = data => ajax1.post('/posting', data);

export const getGalleryAjax = data => ajax1.post('/gallery', data);
export const deleteGalleryAjax = data => ajax1.post('/gallery-delete', data);

export const getPostAjax = type => ajax1.get('/post', type);
// export const getPostAjax = type => ajax1.get('/post/' + type);
