const { check, validationResult } = require("express-validator");
const Product = require("../model/product.model");

const cartValidator = [
  check("qty").not().isEmpty().withMessage("qty can not be empty!"),
  check("qty").isInt({ min: 1}).withMessage("qty min 1!"),
  check("id_product").not().isEmpty().withMessage("id_product can not be empty!")
  .custom(async (value) => {
    if(!value) {
      return new Error("id_product can not be empty!");
    }

    const product = await Product.query().findById(value);
    if(!product) {
      throw new Error("id_product does not exist!");
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
]

module.exports = {
  cartValidator
}