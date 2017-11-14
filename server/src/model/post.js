/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';
import { Stream } from 'stream';

var Schemas = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    spot: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    time: {
        type: Date,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    urls: [{
        type: String,
        default: ''
    }],
    rate: {
        type: Number,
        default: 0
    },
    tagList: Array,
    starList: Array,
    commentList: [{
        comment: {
            content: String,
            time: {
                type: Date,
                default: new Date()
            },
            starNum: {
                type: Number,
                default: 0
            }
        },
        userId: Number
    }],
    userId: Number,
    postTime: {
        type: Date,
        default: new Date()
    },
    id: {
        type: Number,
        default: 1000
    }
}, {
    versionKey: false
});

export default mongoose.model('post', Schemas);
