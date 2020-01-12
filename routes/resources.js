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

    let options = req.query;
    databaseFuncs.getAllResources(db, options, 50).then(data => {
      res.render("index", { data });
      res.status(200);
    });
  });

  return router;
};
