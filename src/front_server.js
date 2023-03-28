const express = require("express");
const path = require("path");

const setupFrontServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();
  app.set("views", `${__dirname}/templates`);
  app.set("view engine", "ejs");

  app.use(express.json());
  app.use("/img", express.static(`${__dirname}/img`));

  app.get("/yuruchara", async (req, res) => {
    let url = "http://localhost:3000/api/yuruchara";
    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      const prefId = data[i].prefectureId;
      let prefUrl = "http://localhost:3000/api/pref/" + prefId;
      const prefResponse = await fetch(prefUrl);
      const prefData = await prefResponse.json();
      console.log(prefData);
      data[i].prefectureName = prefData.name;
    }
    console.log(data);
    res.render("index", { yurucharas: data });
  });

  app.get("/yuruchara/:id", async (req, res) => {
    const id = req.params.id;
    let url = "http://localhost:3000/api/yuruchara/" + id;
    const response = await fetch(url);
    const data = await response.json();
    const prefId = data.prefectureId;
    let prefUrl = "http://localhost:3000/api/pref/" + prefId;
    const prefResponse = await fetch(prefUrl);
    const prefData = await prefResponse.json();
    //console.log(data);
    //console.log(prefData);
    data.prefectureName = prefData.name;
    //console.log(data);
    res.render("page", { yuruchara: data });
  });

  return app;
};

module.exports = { setupFrontServer };
