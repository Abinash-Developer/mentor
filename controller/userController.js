const USER = require("../model/userModel");
const ASSIGNEDCOURSE = require("../model/assignedCourseModel");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const createUser = async (req, res) => {
  try {
    const userRecord = {...req.body,image:`${req.file?.destination}/${req.file?.filename}`};
    let user = new USER(userRecord);
    const savedUser = await user.save();
    res.json({
      message: "User register success",
      status: true,
      send: savedUser,
    });
  } catch (error) {
    res.json({
      message: " User Register fail",
      status: false,
    });
  }
};
const createStudent = async (req,res)=>{
  try {
    let checkExistUser = await USER.find({$and:[{email:req.body.email},{status:true},{role:'student'}]});
    if(Array.isArray(checkExistUser) && !checkExistUser.length){
      let user = new USER(req.body);
      const savedUser = await user.save();
      const token = jwt.sign({ userId: savedUser._id }, 'mentor-app-jwt', {
          expiresIn: '1h',
        });
        return res.json({
          message: "User logged in successfully",
          status: true,
          token:token,
        });
    }
    const token = jwt.sign({ userId: checkExistUser[0]._id }, 'mentor-app-jwt', {
        expiresIn: '1h',
      });
    return res.json({
      message: "User logged in successfully",
      status: true,
      token:token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });;
  }
} 
const featchTeacher = async (req, res) => {
  try {
    let teachers = await USER.aggregate([
      {
        $match: {
          role: "teacher",
          status: true,
        },
      },
      {
        $lookup: {
          from: "assignedcourses",
          localField: "_id",
          foreignField: "user_id",
          as: "assigned_course",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "assigned_course.course_id",
          foreignField: "_id",
          as: "course_details",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "course_details.category_id",
          foreignField: "_id",
          as: "category_details",
        },
      },
     {
        $project: {
          name: 1,
          description:1,
          image:1,
          category_details: {
            title: 1,
          },
        },
      }
    ]);
    res.json({
      message: "Teachers fetched successfully",
      status: true,
      send: teachers,
    });
  } catch (error) {
    res.json({
      message: "Teachers fetched fail",
      status: false,
    });
  }
};
const assignCourse = async (req, res) => {
  try {
    const assign = new ASSIGNEDCOURSE(req.body);
    const assignCourseResult = await assign.save();
    res.json({
      message: "Course assgned successfully",
      status: true,
      send: assignCourseResult,
    });
  } catch (error) {
    res.json({
      message: "Course assigned to teacher is failed",
      status: false,
    });
  }
};
const fetchStudentById = async (req,res)=>{
  try {
    const studentRes = await USER.findOne({_id:new mongoose.Types.ObjectId(req.body.userId)});
    res.json({
      message: "Student fetched  successfully",
      status: true,
      send: studentRes,
    });
  } catch (error) {
    res.json({
      message: "Student fetched failed",
      status: false,
    });
  }
}
module.exports = { createUser, featchTeacher, assignCourse,createStudent,fetchStudentById };
