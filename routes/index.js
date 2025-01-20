const express = require('express');
const router = express.Router()
const {createUser} = require('../controller/userController');
const {createCourse}=require('../controller/courseController');
//------------------USER ROUTES-----------------//
router.post('/create-user',createUser);
//------------------COURSE ROUTES---------------//
router.post('/create-course',createCourse);
module.exports = router;