/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const databaseFuncs = require("../databaseFuncs");

const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      res.redirect("/");
    }
    const options = req.body;
    databaseFuncs.getAllResources(db, options, 20).then(data => {
      console.log(data);
      res.render("index", { data });
      res.status(200);
    });
  });
  return router;
};
