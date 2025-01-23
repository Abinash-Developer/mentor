const USER = require("../model/userModel");
const ASSIGNEDCOURSE = require("../model/assignedCourseModel");
const createUser = async (req, res) => {
  try {
    let user = new USER(req.body);
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
          email: 1,
          description:1,
          role: 1,
          assigned_course: {
            course_id: 1,
          },
          course_details: {
            title: 1,
            description: 1,
          },
          category_details: {
            title: 1,
          },
        },
      },
      {
        $limit: 3,
      },
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
module.exports = { createUser, featchTeacher, assignCourse };
