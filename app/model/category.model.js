const db = require("../../config/database");
const { Model } = require("objection");

class Category extends Model {
  static get tableName() {
    return "categories"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string"
        }
      }
    }
  }

  static get relationMappings() {
    const Product = require("./product.model");

    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "categories.id",
          to: "products.id_category"
        }
      }
    }
  }
}

module.exports = Category;