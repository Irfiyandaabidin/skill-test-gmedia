require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../app/model/user.model")

module.exports = async(req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if(!bearerToken) {
      return res.status(401).json({
        message: "You are unauthorized to make this request, Login please!",
        data: null        
      })
    }
    const token = bearerToken.split('Bearer ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.query().findById(payload.id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}