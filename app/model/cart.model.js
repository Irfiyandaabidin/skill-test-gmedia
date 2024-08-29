const db = require("../../config/database");
const { Model } = require("objection");

Model.knex(db);

class Cart extends Model {
  static get tableName() {
    return "carts";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["id_product", "qty"],

      properties: {
        id_product: {
          type: "integer"
        },
        qty: {
          type: "integer"
        }
      },
    }
  }

  static get relationMappings() {
    const Product = require("./product.model");

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "carts.id_product",
          to: "products.id"
        }
      }
    }
  }

  $beforeUpdate(queryContext) {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Cart;