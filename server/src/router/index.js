import admin from './admin.js';
import client from './client.js';

export default (app) => {
  app.use('/admin', admin);
  app.use('/client', client);
};