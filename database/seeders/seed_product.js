/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {id: 1, name: 'HP', price: 1000000, image_product: "example.com", id_category: 1},
    {id: 2, name: 'Baju', price: 20000, image_product: "example.com", id_category: 2},
    {id: 3, name: 'Nasi', price: 4000, image_product: "example.com", id_category: 3},
  ]);
};
