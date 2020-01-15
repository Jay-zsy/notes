/*
 * All routes for Resources are defined here
 */
//  NEED TO USE THIS IN OUT QUERIES WHEN WE RETRIVE TIMESTAMPS BACK
//  select created_at at time zone 'utc' at time zone 'pst' as created_at
//  from resources;

const express = require("express");
const router = express.Router();
const databaseFuncs = require("../databaseFuncs");
const auth = require("../middleware/auth");
const moment = require("moment");

module.exports = db => {
  router.get("/", auth, (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      res.redirect("/api/users/login");
    }

    let options = req.query;

    databaseFuncs.getAllResources(db, options, 60).then(data => {
      const user = res.locals.user;
      res.render("index", { data, user });
      res.status(200);
    });
  });

  router.get("/myResources", auth, (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      res.redirect("/api/users/login");
    }

    let options = {};
    options.userId = userId;

    databaseFuncs.getAllResources(db, options, 60).then(data => {
      const user = res.locals.user;
      res.render("index", { data, user });
      res.status(200);
    });
  });

  //// Getting to the creation page
  router.get("/new", auth, (req, res) => {
    const user = res.locals.user;
    if (req.session.userId) {
      res.render("newResource", { user });
    } else {
      res.redirect("/api/users/login");
    }
  });

  //// Submit a new resource
  router.post("/new", auth, (req, res) => {
    const { ...newResourceParams } = req.body;
    newResourceParams.owner_id = req.session.userId;

    databaseFuncs.addResource(db, newResourceParams).then(data => {
      res.redirect("/api/resources");
      res.status(200);
    });
  });

  //// 'Delete' an existing resource
  router.post("/delete/:id", auth, (req, res) => {
    databaseFuncs.deleteResource(db, req.params.id).then(data => {
      res.redirect("/");
      res.status(200);
    });
  });

  router.get("/edit/:id", auth, (req, res) => {
    const resource_id = req.params.id;

    databaseFuncs.getResourceFromId(db, resource_id).then(data => {
      const user = res.locals.user;
      console.log(
        "here: ",
        moment(data.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")
      );
      // data.created_at = moment(data.created_at).format(
      //   "dddd, MMMM Do YYYY, h:mm:ss a"
      // );
      res.render("editResource", { data, user });
    });
  });

  //// Edit an existing resource
  router.post("/edit/:id", auth, (req, res) => {
    const { ...newResourceParams } = req.body;
    newResourceParams.resource_Id = req.params.id;
    newResourceParams.owner_id = req.session.userId;
    databaseFuncs.editResource(db, newResourceParams).then(data => {
      res.redirect("/");
      res.status(200);
    });
  });
  return router;
};
