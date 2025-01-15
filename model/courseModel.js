const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
      type:String,
    },
    description:{
        type:String,
        required:true,
    },
    course_fee:{
        type:Decimal128,
        required:true,
    },
    available_seats:{
        type:Number,
        required:true,
    },
    schedule:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
},{timestamps:true});
courseSchema.pre('save',(next)=>{
  
})
const COURSE = mongoose.model('course',courseSchema);
module.exports = COURSE;