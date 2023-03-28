const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const yurucharaData = require("../src/data/yuruchara.json");
const prefData = require("../src/data/pref.json");

const server = setupServer();

describe("SoloProject API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /yuruchara", () => {
    it("200 OK が返ってくること", async () => {
      const res = await request.get("/api/yuruchara");
      res.should.have.status(200);
    });
    it("データが全て返却されること", async () => {
      const expected = yurucharaData.yuruchara;
      const res = await request.get("/api/yuruchara");
      res.should.be.json;
      console.log(res.text);
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });
  describe("GET /yuruchara/:id", () => {
    it("200 OK が返ってくること", async () => {
      const res = await request.get("/api/yuruchara/1");
      res.should.have.status(200);
    });
    it("id=1のデータが返却されること", async () => {
      const expected = yurucharaData.yuruchara[0];
      const res = await request.get("/api/yuruchara/1");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
    it("idが存在しない場合404が返却されること", async () => {
      const res = await request.get("/api/yuruchara/100");
      res.should.have.status(404);
    });
  });
  describe("GET /pref", () => {
    it("200 OK が返ってくること", async () => {
      const res = await request.get("/api/pref");
      res.should.have.status(200);
    });
    it("データが全て返却されること", async () => {
      const expected = prefData.pref;
      const res = await request.get("/api/pref");
      res.should.be.json;
      console.log(res.text);
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });
  describe("GET /pref/:id", () => {
    it("200 OK が返ってくること", async () => {
      const res = await request.get("/api/pref/1");
      res.should.have.status(200);
    });
    it("id=1のデータが返却されること", async () => {
      const expected = prefData.pref[0];
      const res = await request.get("/api/pref/1");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
    it("idが存在しない場合404が返却されること", async () => {
      const res = await request.get("/api/pref/100");
      res.should.have.status(404);
    });
  });
  describe("POST /yuruchara/", () => {
    it("201  が返ってくること", async () => {
      const yurucharaToAdd = {
        id: 10000,
        name: "post yuruchara",
        prefectureId: 3,
        affiliation: "テスト所属",
        discription: "テスト記述",
      };
      const res = await request.post("/api/yuruchara/").send(yurucharaToAdd);
      res.should.have.status(201);
    });
    it("登録できていること", async () => {
      const expected = {
        id: 10000,
        name: "post yuruchara",
        prefectureId: 3,
        affiliation: "テスト所属",
        discription: "テスト記述",
      };
      const res = await request.get("/api/yuruchara/10000");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });
  describe("PATCH /yuruchara/:id", () => {
    it("204 が返ってくること", async () => {
      const yurucharaToPatch = {
        name: "patchtest",
      };
      const res = await request
        .patch("/api/yuruchara/10000")
        .send(yurucharaToPatch);
      res.should.have.status(204);
    });
    it("更新できていること", async () => {
      const expected = {
        id: 10000,
        name: "patchtest",
        prefectureId: 3,
        affiliation: "テスト所属",
        discription: "テスト記述",
      };
      const res = await request.get("/api/yuruchara/10000");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });
  describe("PUT /yuruchara/:id", () => {
    it("204 が返ってくること", async () => {
      const yurucharaToPut = {
        name: "puttest",
        prefectureId: 10,
        affiliation: "put affiliation",
      };
      const res = await request
        .put("/api/yuruchara/10000")
        .send(yurucharaToPut);
      res.should.have.status(204);
    });
    it("更新できていること", async () => {
      const expected = {
        id: 10000,
        name: "puttest",
        prefectureId: 10,
        affiliation: "put affiliation",
        discription: "",
      };
      const res = await request.get("/api/yuruchara/10000");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });

  describe("DELETE /yuruchara/:id", () => {
    it("204 が返ってくること", async () => {
      const res = await request.delete("/api/yuruchara/10000");
      res.should.have.status(204);
    });
    it("削除できていること", async () => {
      const res = await request.get("/api/yuruchara/10000");
      res.should.have.status(404);
    });
  });
});
