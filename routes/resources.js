/*
 * All routes for Resources are defined here
 */

const express = require("express");
const router = express.Router();
const databaseFuncs = require("../databaseFuncs");

module.exports = db => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      res.redirect("/");
    }

    const options = req.query;
    console.log(options);
    databaseFuncs.getAllResources(db, options).then(data => {
      console.log("im the data ", data);
      res.render("index", { data });
      res.status(200);
    });
  });

  router.post("/new", (req, res) => {
    // console.log(req.body);

    const { ...newResourceParams } = req.body;
    newResourceParams.owner_id = req.session.userId;

    databaseFuncs.addResource(db, newResourceParams).then(data => {
      // console.log("im the data ", data);
      res.redirect("index", { data });
      res.status(200);
    });
  });

  router.get("/delete/:id", (req, res) => {
    //this alongside some other endpoints needs to be changed using method override to satisfy the RESTful convention

    databaseFuncs.deleteResource(db, req.params.id).then(data => {
      console.log("im the data ", data);
      res.redirect("index", { data });
      res.status(200);
    });
  });
  return router;
};
