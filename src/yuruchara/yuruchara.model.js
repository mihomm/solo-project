const knex = require("../knex");

const YURUCHARA_TABLE = "yuruchara";
//const PREF_TABLE = "prefecture";

module.exports = {
  YURUCHARA_TABLE,
  //PREF_TABLE,

  /**
   * @param {number} limit - The max number of customers to return.
   * @return {Promise<Array>} A promise that resolves to an array of customers.
   */
  getAll(limit) {
    return (
      knex(YURUCHARA_TABLE)
        .select({
          id: "id",
          name: "name",
          prefectureId: "prefecture_id",
          //prefectureName: "PREF_TABLE.name",
          affiliation: "affiliation",
          discription: "discription",
        })
        //.join(PREF_TABLE, "YURUCHARA_TABLE.prefecture_id", "PREF_TABLE.id")
        //.where({ prefecture_id: id })
        .orderBy("id")
        .limit(limit)
    );
  },

  getByID(id) {
    return knex
      .select({
        id: "id",
        name: "name",
        prefectureId: "prefecture_id",
        affiliation: "affiliation",
        discription: "discription",
      })
      .from(YURUCHARA_TABLE)
      .where({
        id: id,
      })
      .first();
  },

  create(yuruchara) {
    yuruchara.prefecture_id = yuruchara.prefectureId;
    delete yuruchara.prefectureId;
    //console.log(yuruchara);
    return knex(YURUCHARA_TABLE).insert(yuruchara);
  },

  update(id, yuruchara) {
    // YOUR CODE HERE
    if (yuruchara.prefectureId !== undefined) {
      yuruchara.prefecture_id = yuruchara.prefectureId;
      delete yuruchara.prefectureId;
    }

    return knex(YURUCHARA_TABLE)
      .where({
        id: id,
      })
      .update(yuruchara)
      .returning("id")
      .then(function (results) {
        //console.log(results);
        //console.log(results[0].id);
        return results[0].id;
      });
  },

  delete(id) {
    // YOUR CODE HERE
    return knex(YURUCHARA_TABLE)
      .where({
        id: id,
      })
      .del()
      .returning("id")
      .then(function (results) {
        //console.log(results);
        //console.log(results[0].id);
        return results[0].id;
      });
  },
};
