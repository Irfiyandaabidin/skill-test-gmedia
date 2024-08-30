const { check, validationResult } = require("express-validator");
const User = require("../model/user.model");

const registerValidator = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("username cannot be empty!")
    .custom(async (username) => {
      const existingUser = await User.query().findOne({ username });
      if (existingUser) {
        throw new Error("Username already in use!");
      }
    }),

  check("email")
    .not()
    .isEmpty()
    .withMessage("email cannot be empty!")
    .isEmail()
    .withMessage("Invalid email format!")
    .custom(async (email) => {
      const existingUser = await User.query().findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use!");
      }
    }),

  check("password")
    .not()
    .isEmpty()
    .withMessage("password cannot be empty!")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long!"),

  check("phone_number")
    .not()
    .isEmpty()
    .withMessage("phone number cannot be empty!")
    .isMobilePhone()
    .withMessage("Invalid phone number format!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: error_data,
      });
    }

    next();
  },
];

module.exports = {
  registerValidator,
};
