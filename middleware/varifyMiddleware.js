const jwt = require("jsonwebtoken");
const varifyToken = async (req,res,next)=>{
    try {
        const varifyTokenRes = await jwt.verify(req.body.token,'mentor-app-jwt');
        req.body.userId = varifyTokenRes.userId;
        next();
    } catch (error) {
        return res.json({
            message:"Invalid Token",
            status:false
        })
    }
}
const varifySession = async (req,res)=>{
    try {
        const varifyTokenRes = await jwt.verify(req.body.token,'mentor-app-jwt');
        console.log(varifyTokenRes);
    } catch (error) {
        return res.json({
            message:"Session Expired",
            status:false
        })
    }
}
module.exports = {varifyToken,varifySession};