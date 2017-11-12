/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';

var Schemas = new mongoose.Schema({
    username: String,
    password: String,
    passport: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    bg: {
        type: String,
        default: ''
    },
    registerTime: {
        type: Date,
        default: new Date()
    },
    loginTime: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
});

export default mongoose.model('user', Schemas);
