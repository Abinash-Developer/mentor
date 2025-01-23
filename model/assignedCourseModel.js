const mongoose = require('mongoose');
const assignedCourseSchema = mongoose.Schema({
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',     
        required:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
},{timestamps:true});
const ASSIGNEDCOURSE = mongoose.model('assignedcourse',assignedCourseSchema);
module.exports = ASSIGNEDCOURSE;