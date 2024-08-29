const { check, validationResult } = require("express-validator");
const Category = require("../model/category.model");

const productValidator = [
  check("name").not().isEmpty().withMessage("name can not be empty!"),
  check("price").not().isEmpty().withMessage("price can not be empty!"),
  check("price").isInt().withMessage("price must be integer!"),
  check("id_category").not().isEmpty().withMessage("id category can not be empty!")
  .custom(async (value) => {
    if(!value) {
      return new Error("id category can not be empty!");
    }
    
    const category = await Category.query().findById(value);
    if(!category) {
      throw new Error("id category does not exist!");
    }
  }),
  

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg
      }
    })

    if(!errors.isEmpty()) {
      return res.status(422).json({
        errors: error_data,
      });
    }
    next();
  }
];

module.exports = {
  productValidator
}