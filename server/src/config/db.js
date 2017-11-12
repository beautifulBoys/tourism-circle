
import mongoose from 'mongoose';

function dbconnect () {
  mongoose.connect('mongodb://10.209.96.67/tourism', {useMongoClient: true});
  return mongoose.connection;
}

export default dbconnect;
