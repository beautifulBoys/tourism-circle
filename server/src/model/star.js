/**
 * Created by user on 2017/3/9.
 * 适用于 我点赞的，不是每一个分享的点赞
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

export default mongoose.model('star', Schemas);
