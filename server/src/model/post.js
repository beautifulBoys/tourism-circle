/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';

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
        type: Array
    },
    time: {
        type: Array
    },
    content: {
        type: String,
        default: ''
    },
    urls: {
        type: Array
    },
    rate: {
        type: Number,
        default: 0
    },
    tagList: Array,
    starList: {
        type: Array,
        default: []
    },
    commentList: {
        type: Array,
        default: []
    },
    // commentList: [
    //     {
    //         comment: {
    //             content: String,
    //             time: {
    //                 type: Date,
    //                 default: new Date()
    //             },
    //             starNum: {
    //                 type: Number,
    //                 default: 0
    //             }
    //         },
    //         userId: Number
    //     }
    // ],
    userId: Number,
    postTime: {
        type: Date,
        default: new Date()
    },
    id: {
        type: Number,
        default: 1000
    },
    status: { // 0 为正常， 1为隐藏， 2为 删除
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});

export default mongoose.model('post', Schemas);
