const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const prefModel = require("../src/pref/pref.model");
const PREF_TABLE = prefModel.PREF_TABLE;

describe("test", () => {
  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(PREF_TABLE)
        .select()
        .catch(() => assert.fail("yuruchara table is not found."));
    });
  });

  describe("getAll", () => {
    it("should return an array of test", async () => {
      const test = await prefModel.getAll();
      expect(test).to.be.an.instanceof(Array);
    });

    it("should accept a limit argument", async () => {
      const test = await prefModel.getAll(3);
      expect(test.length).to.be.at.most(3);
    });
  });

  describe("getById", () => {
    describe("when  data exists", () => {
      it("should get yuruchara by id", async () => {
        const test = await prefModel.getByID(1);
        expect(test).to.exist;
        expect(test.id).to.eq(1);
      });
    });
  });
});
