/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {id: 1, name: 'elektronik'},
    {id: 2, name: 'fashion'},
    {id: 3, name: 'food'}
  ]);
};
