import {ajax1, ajax2} from './ajax';

export const login = data => ajax1.post('/login', data);
export const postingAjax = data => ajax1.post('/posting', data);

export const getGalleryAjax = data => ajax1.post('/gallery', data);
export const deleteGalleryAjax = data => ajax1.post('/gallery-delete', data);

export const getPostAjax = type => ajax1.get('/post', type);

export const updateUserInfoAjax = data => ajax1.post('/updateUserInfo', data);
export const getUserInfoAjax = data => ajax1.post('/getUserInfo', data);

export const allUserListAjax = data => ajax1.post('/allUser', data);

export const addFriendAjax = data => ajax1.post('/addFriend', data);
export const messageBoxListAjax = data => ajax1.post('/messageBoxList', data);
export const ignoreMessageAjax = data => ajax1.post('/ignoreMessage', data);
