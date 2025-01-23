const express = require('express');
const router = express.Router()
const {createUser,featchTeacher, assignCourse} = require('../controller/userController');
const {createCourse, fetchCourses}=require('../controller/courseController');
const { createCategory } = require('../controller/categoryController');

//------------------USER ROUTES-----------------//
router.post('/create-user',createUser);

//------------------COURSE ROUTES---------------//
router.post('/create-course',createCourse);
router.get('/fetch-course',fetchCourses);


//------------------TEACHER RELATED ROUTES------//
router.get('/fetch-teacher',featchTeacher);
router.post('/assign-course',assignCourse);

//------------------CATEGORY RELATED ROUTES------//
router.post('/create-category',createCategory);

module.exports = router;