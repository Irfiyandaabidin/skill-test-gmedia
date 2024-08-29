const AuthRoute = require("./auth");
const ProductRoute = require("./product");
const CategoryRoute = require("./category");
const CartRoute = require("./cart");
const TransactionRoute = require("./transaction");

module.exports = (app, prefix) => {
  app.use(prefix, AuthRoute);
  app.use(prefix, ProductRoute);
  app.use(prefix, CategoryRoute);
  app.use(prefix, CartRoute);
  app.use(prefix, TransactionRoute);
}