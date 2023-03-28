const express = require("express");
const config = require("../knexfile");
const knex = require("knex")(config);
const yurucharaModel = require("../src/yuruchara/yuruchara.model");
const YURUCHARA_TABLE = yurucharaModel.YURUCHARA_TABLE;
const prefModel = require("../src/pref/pref.model");
const PREF_TABLE = prefModel.PREF_TABLE;

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();

  app.use(express.json());

  app.get("/api/yuruchara", async (req, res) => {
    //console.log("api yuruchara called");
    const query = req.query;
    if (query.limit === undefined) {
      const resultAll = await yurucharaModel.getAll(100);
      res.json(resultAll);
    } else {
      const resultAll = await yurucharaModel.getAll(query.limit);
      res.json(resultAll);
    }
    //console.log(resultAll);
  });

  app.get("/api/yuruchara/:id", async (req, res) => {
    //console.log("api yuruchara called");
    const id = req.params.id;
    const result = await yurucharaModel.getByID(id);
    console.log(result);
    if (result === undefined) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });

  app.get("/api/pref", async (req, res) => {
    //console.log("api pref called");
    const resultAll = await prefModel.getAll();
    //console.log(resultAll);
    res.json(resultAll);
  });

  app.get("/api/pref/:id", async (req, res) => {
    //console.log("api pref called");
    const id = req.params.id;
    const result = await prefModel.getByID(id);
    //console.log(result);
    if (result === undefined) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });

  //POST /yuruchara/
  app.post("/api/yuruchara/", async (req, res) => {
    //console.log("post api yuruchara called");
    const body = req.body;
    //console.log(body);
    //pokeData.pokemon.push(body);
    const result = await yurucharaModel.create(body);
    //res.json(result);

    res.sendStatus(201);
    // const resultAll = await yurucharaModel.getByID(id);
    //console.log(resultAll);
  });

  //PATCH /yuruchara/:name
  app.patch("/api/yuruchara/:name", async (req, res) => {
    //console.log("patch yuruchara called");
    const body = req.body;
    //console.log(`body= ${body}`);
    const name = req.params.name;
    const result = await yurucharaModel.update(name, body);
    //console.log(result);
    //res.json(result);
    res.sendStatus(204);
  });

  //"PUT /yuruchara/:id"
  app.put("/api/yuruchara/:name", async (req, res) => {
    //console.log("put yuruchara called");
    const body = req.body;
    //console.log(`body= ${body}`);
    const name = req.params.name;
    const putData = {
      name: body.name,
      prefectureId: body.prefectureId,
      affiliation: "affiliation" in body ? body.affiliation : "",
      discription: "discription" in body ? body.discription : "",
    };
    const id = await yurucharaModel.update(name, putData);
    res.sendStatus(204);
  });
  //"DELETE /yuruchara/:id"
  app.delete("/api/yuruchara/:name", async (req, res) => {
    //console.log("put yuruchara called");
    const name = req.params.name;
    const id = await yurucharaModel.delete(name);
    res.sendStatus(204);
  });

  return app;
};

module.exports = { setupServer };
