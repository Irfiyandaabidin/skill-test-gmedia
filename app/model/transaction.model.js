const { Model } = require("objection");
const db = require("../../config/database");

Model.knex(db);

class Transaction extends Model {
  static get tableName() {
    return "transactions"
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["id_product", "qty"],

      properties: {
        id_product: {
          type: "integer",
        },
        qty: {
          type: "integer"
        }
      }
    }
  }

  static get relationMappings() {
    const Product = require("../model/product.model");

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "products.id",
          to: "transactions.id_product"
        }
      },
    }
  }
  $beforeUpdate(queryContext) {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Transaction;