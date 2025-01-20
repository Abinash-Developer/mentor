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

courseSchema.pre('save', function(next) {
    function generate_slug(text) {
        return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-').trim();
    };
    this.slug = generate_slug(this.title);
    next();
});

const COURSE = mongoose.model('course',courseSchema);
module.exports = COURSE;