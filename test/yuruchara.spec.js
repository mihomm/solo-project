const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const yurucharaModel = require("../src/yuruchara/yuruchara.model");
const YURUCHARA_TABLE = yurucharaModel.YURUCHARA_TABLE;
//const prefModel = require("../src/yuruchara/yuruchara.model");
//const PREF_TABLE = yurucharaModel.PREF_TABLE;

describe("test", () => {
  before(async () => {
    await knex(YURUCHARA_TABLE)
      .insert({ id: 999, name: "testtesttest", prefecture_id: 1 })
      .returning("id")
      .then((result) => {
        console.log("inserted test data");
      })
      .catch(console.error);
  });

  /*
  after(async () => {
    await knex(YURUCHARA_TABLE)
      .where("id", 999)
      .returning("id")
      .del()
      .then((result) => {
        console.log("removed test yuruchara");
      })
      .catch(console.error);
  });*/

  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(YURUCHARA_TABLE)
        .select()
        .catch(() => assert.fail("yuruchara table is not found."));
    });
  });

  describe("getAll", () => {
    it("should return an array of test", async () => {
      const test = await yurucharaModel.getAll(100);
      expect(test).to.be.an.instanceof(Array);
    });

    it("should accept a limit argument", async () => {
      const test = await yurucharaModel.getAll(3);
      expect(test.length).to.be.at.most(3);
    });
  });

  describe("getById", () => {
    describe("when  data exists", () => {
      it("should get yuruchara by id", async () => {
        const test = await yurucharaModel.getByID(1);
        expect(test).to.exist;
        expect(test.id).to.eq(1);
      });
    });
  });

  describe("create", () => {
    const newId = 9999;

    after(async () => {
      await knex
        .from(YURUCHARA_TABLE)
        .where("id", newId)
        .del()
        .catch(console.error);

      console.log("Deleted test yuruchara");
    });

    describe("with valid properties", () => {
      it("should be able to create a new yuruchara", async () => {
        const newYuruchara = {
          id: newId,
          name: "testchara",
          prefectureId: 1,
        };

        const id = await yurucharaModel.create(newYuruchara);
        const yuruchara = await knex(YURUCHARA_TABLE)
          .select()
          .where("id", newId)
          .first();
        expect(yuruchara).to.exist;
        expect(yuruchara.id).to.eq(newId);
      });
    });
  });

  describe("update", () => {
    describe("with valid parameters", () => {
      after(async () => {
        await knex(YURUCHARA_TABLE)
          .update({
            discription: "aaaaa",
          })
          .where("id", 999)
          .returning("id")
          .then((result) => {
            console.log("updated test yuruchara");
          })
          .catch(console.error);
      });

      it("should return the id", async () => {
        const id = await yurucharaModel.update(999, {
          discription: "aaaaa",
        });
        expect(id).to.eq(999);
      });
    });
  });
  describe("delete", () => {
    describe("with valid parameters", () => {
      it("should return the id", async () => {
        const id = await yurucharaModel.delete(999);
        expect(id).to.eq(999);
      });
    });
  });
});
