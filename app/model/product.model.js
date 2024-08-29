const db = require("../../config/database");
const { Model } = require("objection");
const Transaction = require("./transaction.model");

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "id_category", "price"],

      properties: {
        name: {
          type: "string",
        },
        price: {
          type: "string",
        },
        id_category: {
          type: "string"
        },
        updated_at: {
          type: "string",
          format: "date-time"
        }
      }
    }
  }

  static get relationMappings() {
    const Category = require("./category.model");
    const Cart = require("./cart.model");

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "products.id_category",
          to: "categories.id"
        }
      },

      transactions: {
        relation: Model.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: "products.id",
          to: "transactions.id_product"
        }
      }
    }
  }
  $beforeUpdate(queryContext) {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Product;