var mongoose = require('mongoose');

function dbconnect () {
  mongoose.connect('mongodb://10.209.96.67/tourism', {useMongoClient: true});
  return mongoose.connection;
}

module.exports = dbconnect;
