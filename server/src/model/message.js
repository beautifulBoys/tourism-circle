/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';

var Schemas = new mongoose.Schema({
    id: {
      type: Number,
      default: 1000
    },
    type: {
      type: String,
      default: ''
    },
    fromId: Number,
    toId: Number,
    remark: {
      type: String,
      default: ''
    },
    time: {
      type: Date,
      default: new Date()
    },
    reply: {
      type: String,
      default: ''
    },
    replyTime: {
      type: Date,
      default: null
    },
    status: { // 是否已经处理过了，处理过了则为 false
      type: Boolean,
      default: true
    }
}, {
    versionKey: false
});

export default mongoose.model('message', Schemas);
