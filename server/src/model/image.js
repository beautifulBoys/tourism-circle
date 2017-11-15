/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';

var Schemas = new mongoose.Schema({
    suff: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      type: 0
    },
    desc: {
      type: String,
      default: ''
    },
    tag: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 1000
    },
    status: {
      type: Boolean,
      default: true
    }
}, {
    versionKey: false
});

export default mongoose.model('image', Schemas);
