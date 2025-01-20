const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const courseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
      type:String,
      slug:'title',
    },
    description:{
        type:String,
        required:true,
    },
    course_fee:{
        type:mongoose.Schema.Types.Decimal128,
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

const COURSE = mongoose.model('course',courseSchema);
module.exports = COURSE;