/**
 * Created by user on 2017/3/9.
 */
import mongoose from 'mongoose';

var Schemas = new mongoose.Schema({
    type: String,
    value: {
      type: Number,
      default: 1000
    }
}, {
    versionKey: false
});

var ids = mongoose.model('Ids', Schemas);

export default ids;
