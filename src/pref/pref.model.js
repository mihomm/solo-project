const knex = require("../knex");

const PREF_TABLE = "prefecture";

module.exports = {
  PREF_TABLE,

  /**
   * @param {number} limit - The max number of customers to return.
   * @return {Promise<Array>} A promise that resolves to an array of customers.
   */
  getAll(limit = 100) {
    return knex
      .select({
        id: "id",
        name: "name",
      })
      .from(PREF_TABLE)
      .limit(limit);
  },

  getByID(id) {
    return knex
      .select({
        id: "id",
        name: "name",
      })
      .from(PREF_TABLE)
      .where({
        id: id,
      })
      .first();
  },
};
