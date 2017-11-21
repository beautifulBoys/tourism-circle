/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';

const userInfo = { // 用户相关的信息
    desc: { // 碎碎念
        type: String,
        default: ''
    },
    bg: { // 背景图地址
        type: String,
        default: ''
    },
    avatar: { // 头像地址
        type: String,
        default: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png'
    },
    email: {
        type: String,
        default: ''
    },
    address: {
        type: Array,
        default: []
    },
    sex: {// 男 2   女 1   未设置 0
        type: Number,
        default: 0
    },
    registerTime: {
        type: Date,
        default: new Date()
    },
    loginTime: { // 最后一次登陆时间
        type: Date,
        default: new Date()
    },
    postNum: {
        type: Number,
        default: 0
    }
};
const accountInfo = { // 用户账户相关的信息
    id: Number,
    username: String,
    password: String,
    passport: {
        type: String,
        default: ''
    },
    status: { // 账号当前状态 （冻结则为false）
        type: Boolean,
        default: true
    }
};
const powerInfo = { // 用户权限相关的信息
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
        addFriend: { // 是否可以被添加为好友
            type: Boolean,
            default: true
        },
        webMail: { // 是否接受站内信
            type: Boolean,
            default: true
        }
    },
    status: { // 一些用户当前的状态
        online: { // 在线聊 当前是否在线
            type: Boolean,
            default: false
        }
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
