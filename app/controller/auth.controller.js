const User = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async(req, res) => {
  try {
    const user = await User.query()
     .select([
      "users.id",
      "users.username",
      "users.password"
     ])
     .where("username", req.body.username)
     .first();
    
    if(user && (await bcryptjs.compare(req.body.password, user.password))) {
      const user_data = await User.query()
      .select([
        "users.id",
        "users.email",
        "users.username",
        "users.phone_number"
      ])
      .where("id", user.id)
      .first();

      const token = jwt.sign(user_data.toJSON(), process.env.JWT_SECRET, {
        expiresIn: "6h",
      });

      user_data.token = token;
      res.status(200).json({
        message: "Login successfully!",
        data: user_data
      });
    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
        data: null
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
      data: null
    })
  }
}

module.exports = {
  login
}