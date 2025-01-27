const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {createUser,featchTeacher, assignCourse} = require('../controller/userController');
const {createCourse, fetchCourses, fetchCoursesById}=require('../controller/courseController');
const { createCategory } = require('../controller/categoryController');

//------------------USER ROUTES-----------------//
router.post('/create-user',upload.single('image'),createUser);

//------------------COURSE ROUTES---------------//
router.post('/create-course',upload.single('image'),createCourse);
router.get('/fetch-course',fetchCourses);
router.get('/single-course/:id',fetchCoursesById);


//------------------TEACHER RELATED ROUTES------//
router.get('/fetch-teacher',featchTeacher);
router.post('/assign-course',assignCourse);

//------------------CATEGORY RELATED ROUTES------//
router.post('/create-category',createCategory);
module.exports = router;