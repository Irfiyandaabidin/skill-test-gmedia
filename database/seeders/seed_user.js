const bcyrypt = require("bcryptjs");
const password = bcyrypt.hashSync("secret", 10)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'irfiyanda', password: password, email: "irfi@mail.com", phone_number: 123},
    {id: 2, username: 'yanda', password: password, email: "yanda@mail.com", phone_number: 456},
    {id: 3, username: 'abidin', password: password, email: "abidin@mail.com", phone_number: 789},
  ]);
};
1