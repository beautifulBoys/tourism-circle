
import mongoose from 'mongoose';

function dbconnect () {
  mongoose.connect('mongodb://10.209.96.67/tourism', {useMongoClient: true});
  console.log('数据库连接成功!');
  return mongoose.connection;
}

export default dbconnect;
