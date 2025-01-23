const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});
const CATEGORY = mongoose.model('category',categorySchema);
module.exports = CATEGORY;