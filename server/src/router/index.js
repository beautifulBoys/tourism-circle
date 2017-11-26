import admin from './admin.js';

export default (app) => {
  app.use('/admin', admin);
};