const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {createUser,featchTeacher, assignCourse, createStudent, fetchStudentById} = require('../controller/userController');
const {createCourse, fetchCourses, fetchCoursesById}=require('../controller/courseController');
const { createCategory } = require('../controller/categoryController');
const { createBatch } = require('../controller/batchController');
const {createPaymentIntent, createBookingDetails} = require('../controller/bookingController');
const {varifyToken, varifySession} = require('../middleware/varifyMiddleware');


router.post('/varifySession/',varifySession)
//------------------USER ROUTES-----------------//
router.post('/create-teacher',upload.single('image'),createUser);
router.post('/create-student',createStudent);
router.post('/fetch-student/',varifyToken,fetchStudentById)

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
router.post('/create-payment-intent',varifyToken,createPaymentIntent);
router.get('/booked-details',varifyToken,createBookingDetails);
module.exports = router;