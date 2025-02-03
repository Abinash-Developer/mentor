const jwt = require("jsonwebtoken");
const varifyToken = async (req, res, next) => {
    const [token] = req.headers?.authorization.split('Bearer').reverse();
  try {
    const varifyTokenRes = await jwt.verify(token.trim(), "mentor-app-jwt");
    req.body.userId = varifyTokenRes.userId;
    next();
  } catch (error) {
    return res.json({
      message: "Invalid Token",
      status: false,
    });
  }
};
const varifySession = async (req, res) => {
  const [token] = req.headers?.authorization.split('Bearer').reverse();
  try {
    const varifyTokenRes = await jwt.verify(token.trim(), "mentor-app-jwt");
    if (varifyTokenRes)
      return res.json({
        message: "Valid token",
        status: true,
      });
  } catch (error) {
    return res.json({
      message: "Session Expired",
      status: false,
    });
  }
};
module.exports = { varifyToken, varifySession };
