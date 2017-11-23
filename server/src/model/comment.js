/**
 * Created by user on 2017/3/9.
 * 适用于 我评论的，不是每一个分享的评论
 */
import mongoose from 'mongoose';

var Schemas = new mongoose.Schema({
    id: {
        type: Number,
        default: 1000
    },
    userId: Number,
    list: {
        type: Array,
        default: []
    }
}, {
    versionKey: false
});

export default mongoose.model('comment', Schemas);
