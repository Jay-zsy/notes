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

    // const options = req.body;
    // console.log(options);
    databaseFuncs.getAllResources(db, null, 2).then(data => {
      console.log("im here ", data);
      res.render("index", { data });
      res.status(200);
    });
  });
  return router;
};
