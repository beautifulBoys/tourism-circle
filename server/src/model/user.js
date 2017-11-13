/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';

const userInfo = {
    desc: { // 碎碎念
        type: String,
        default: ''
    },
    bg: { // 背景图地址
        type: String,
        default: ''
    },
    icon: { // 头像地址
        type: String,
        default: ''
    },
    registerTime: {
        type: Date,
        default: new Date()
    },
    loginTime: { // 最后一次登陆时间
        type: Date,
        default: new Date()
    }
};
const accountInfo = {
    id: Number,
    username: String,
    password: String,
    passport: {
        type: String,
        default: ''
    }
};
const powerInfo = {
    admin: { // 用户级别
        type: {
            type: Number,
            default: 0
        },
        text: {
            type: String,
            default: '普通用户'
        }
    },
    power: {
        showInUserList: {
            type: Boolean,
            default: true
        },
        addFriend: {
            type: Boolean,
            default: true
        },
        
    }
};
var Schemas = new mongoose.Schema({
    ...userInfo,
    ...accountInfo,
    ...powerInfo
}, {
    versionKey: false
});

export default mongoose.model('user', Schemas);
