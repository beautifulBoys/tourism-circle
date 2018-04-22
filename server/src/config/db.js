
import mongoose from 'mongoose'
import init_db from '../servers/init_db.js'

function dbconnect () {

  // mongoose.connect('mongodb://47.95.212.47:27017/tourism', {useMongoClient: true})
  mongoose.connect('mongodb://127.0.0.1:27017/tourism', {useMongoClient: true})
  var db = mongoose.connection
  db.on('error', () => {
    console.log('数据库连接出错。')
  })
  db.once('open', () => {
    console.log('数据库连接成功。')
    init_db()
  })
  db.on('close', () => {
    console.log('数据库已断开，请重新连接数据库')
  })
}

export default dbconnect
