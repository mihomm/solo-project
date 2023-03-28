/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("yuruchara", function (table) {
    table.increments("id").primary(); // Set this column as the primary key
    table.string("name", 32).notNullable;
    table
      .integer("prefecture_id")
      .notNullable()
      .references("id")
      .inTable("prefecture");
    table.string("affiliation", 32);
    table.string("discription", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("prefecture");
};
