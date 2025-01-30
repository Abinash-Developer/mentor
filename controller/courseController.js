const { default: mongoose } = require('mongoose');
const COURSE = require('../model/courseModel');
const BATCH = require('../model/batchModel');
const createCourse = async (req,res)=>{
 
    try {
        const courseRecord = {...req.body,image:`${req.file?.destination}/${req.file?.filename}`};
        const course = new COURSE(courseRecord);
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
           },
           {
            $project:{
                title:1,
                description:1,
                course_fee:1,
                slug:1,
                image:1,
                category_details:{
                    title:1,
                },
                teache_details:{
                    name:1,
                    email:1,
                    description:1,
                    role:1,
                    image:1
                }
             }
           }
      ]);
      res.json({
        message: 'Courses fetches successfully',
        status: true,
        send: (courses)
     })
    } catch (error) {
        res.json({
            message: 'Courses Fetched fail',
            status: false,
         })
    }
}
const fetchCoursesById = async (req,res)=>{
    try {
        const singleCourseResult = await COURSE.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(req.params.id),
                }
            },
            {
                $lookup:{
                    from:"assignedcourses",
                    localField:"_id",
                    foreignField:"course_id",
                    as:"assigned_detail"
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"assigned_detail.user_id",
                    foreignField:"_id",
                    as:"teacher_details"
                }
            },
            {
                $project:{
                    title:1,
                    description:1,
                    image:1,
                    course_fee:1,
                    available_seats:1,
                    schedule:1,
                    teacher_details:{
                        _id:1,
                        name:1,
                        email:1,
                        description:1,
                        image:1,
                    }
                }
             }
        ])
        let availableBatch = await BATCH.findOne({teacher_id:singleCourseResult[0].teacher_details?.[0]?._id}).sort("batch_start");
        singleCourseResult[0].batch_name = availableBatch?.title;
        return res.json({
            message: 'Fetch course successfully',
            status: true,
            send: (singleCourseResult)
         })
    } catch (error) {
        return res.json({
            message: 'Courses Fetched fail',
            status: false,
         })
    }
}
module.exports = {createCourse,fetchCourses,fetchCoursesById};