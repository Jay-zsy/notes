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

  router.post("/new", (req, res) => {});
  return router;
};
