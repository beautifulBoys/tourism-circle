/**
 * Created by user on 2017/3/9.
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

export default mongoose.model('follow', Schemas);
