const COURSE = require('../model/courseModel');
const createCourse = async (req,res)=>{
    try {
        const course = new COURSE(req.body);
        const courserInResult = await course.save();    
        res.json({
            message: 'Course register success',
            status: true,
            send: (courserInResult)
         }) 
    } catch (error) {
        res.json({
            message: 'Course Register fail',
            status: false,
         })
    }
}
const fetchCourses = async (req,res)=>{
    try {
        const courses = await COURSE.aggregate([
            {
                $match:{
                    status:true
                }
           },
           {
              $lookup:{
                from:"categories",
                localField:"category_id",
                foreignField:"_id",
                as:"category_details"
              }
           },
           {
             $lookup:{
                from:"assignedcourses",
                localField:"_id",
                foreignField:"course_id",
                as:"assigned_teacher"
             }
           },
           {
              $lookup:{
                from:"users",
                localField:"assigned_teacher.user_id",
                foreignField:"_id",
                as:"teache_details"
            }
           }
      ]);
      res.json({
        message: 'Course register success',
        status: true,
        send: (courses)
     })
    } catch (error) {
        console.log(error); 
    }
}
module.exports = {createCourse,fetchCourses};