const USER = require('../model/userModel');
const createUser = async (req,res)=>{
    try {
        let user = new USER(req.body);
        const savedUser = await user.save(); 

        res.json({
            message: 'User register success',
            status: true,
            send: (savedUser)
         })
    } catch (error) {
        res.json({
            message: ' User Register fail',
            status: false,
         })
    }
    
}
const featchTeacher = async (req,res)=>{
    try {
        let teachers = await USER.find({$and:[{}]})
    } catch (error) {
        
    }
}
module.exports = {createUser,featchTeacher};
