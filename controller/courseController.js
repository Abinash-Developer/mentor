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
module.exports = {createCourse};