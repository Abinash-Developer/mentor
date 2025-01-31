const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {createUser,featchTeacher, assignCourse, createStudent} = require('../controller/userController');
const {createCourse, fetchCourses, fetchCoursesById}=require('../controller/courseController');
const { createCategory } = require('../controller/categoryController');
const { createBatch } = require('../controller/batchController');
const createPaymentIntent = require('../controller/bookingController');

//------------------USER ROUTES-----------------//
router.post('/create-teacher',upload.single('image'),createUser);
router.post('/create-student',createStudent);

//------------------COURSE ROUTES---------------//
router.post('/create-course',upload.single('image'),createCourse);
router.get('/fetch-course',fetchCourses);
router.get('/single-course/:id',fetchCoursesById);


//------------------TEACHER RELATED ROUTES------//
router.get('/fetch-teacher',featchTeacher);
router.post('/assign-course',assignCourse);

//------------------CATEGORY RELATED ROUTES------//
router.post('/create-category',createCategory);

//------------------BATCH RELATED ROUTES---------//
router.post('/create-batch',createBatch);

//------------------BOOKING RELATED ROUTES-------//
router.get('/create-payment-intent',createPaymentIntent);
module.exports = router;