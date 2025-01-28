const upload = require("../config/multer");

const checkRoleUpload = (req,res,next)=>{
     console.log("Inside middleware")
     console.log(req.body);
}
module.exports = {checkRoleUpload};