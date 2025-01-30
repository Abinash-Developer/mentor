const mongoose = require('mongoose');
const batchSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    teacher_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    batch_start:{
        type:Date,
        required:true,
    }   
},{timestamps:true});
const BATCH = mongoose.model('batch',batchSchema);
module.exports = BATCH;