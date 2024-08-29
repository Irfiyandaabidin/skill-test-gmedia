/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("carts", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("id_user").unsigned()
    table.integer("id_product").unsigned()
    table.foreign("id_user").references("id").inTable("users").onDelete("cascade");
    table.foreign("id_product").references("id").inTable("products").onDelete("cascade");
    table.integer("qty");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("carts");
};
