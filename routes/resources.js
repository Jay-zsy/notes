/*
 * All routes for Resources are defined here
 */

const express = require("express");
const router = express.Router();
const databaseFuncs = require("../databaseFuncs");
const auth = require("../middleware/auth");

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
      // res.render("index", { data });
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
      // res.render("index", { data });
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
    // if (req.session.userId) then allow else send 403

    const { ...newResourceParams } = req.body;
    newResourceParams.owner_id = req.session.userId;

    databaseFuncs.addResource(db, newResourceParams).then(data => {
      // res.redirect("index", { data });         ///this redirect is not working
      res.redirect("/api/resources");
      res.status(200);
    });
  });

  //// 'Delete' an existing resource
  router.post("/delete/:id", auth, (req, res) => {
    //this alongside some other endpoints needs to be changed using method override to satisfy the RESTful convention

    // if req.session.userId !== owner_id then send back 403

    databaseFuncs.deleteResource(db, req.params.id).then(data => {
      res.redirect("/");
      res.status(200);
    });
  });

  router.get("/edit/:id", auth, (req, res) => {
    const resource_id = req.params.id;

    databaseFuncs.getResourceFromId(db, resource_id).then(data => {
      const user = res.locals.user;
      res.render("editResource", { data, user });
    });
  });

  //// Edit an existing resource
  router.post("/edit/:id", auth, (req, res) => {
    // if req.session.userId !== owner_id then send back 403
    // need a way to validate owner_id to user_id (inside the fn or here in the route?)
    const { ...newResourceParams } = req.body;
    newResourceParams.resource_Id = req.params.id;

    // how the fuck do we get the resource_id from the front to back?
    // will we just expect the resource_id to be already in the req.body?
    newResourceParams.owner_id = req.session.userId; //not sure if we need to pass this into the fn
    databaseFuncs.editResource(db, newResourceParams).then(data => {
      res.redirect("/");
      res.status(200);
    });
  });

  //likes
  router.post("/:id/likes", auth, (req, res) => {
    const likeParams = {};
    likeParams.resource_id = req.params.id;
    likeParams.user_id = res.locals.user.id;

    databaseFuncs.addLike(db, likeParams).then(resource_id => {
      databaseFuncs.countLikes(db, resource_id).then(data => {
        const number_of_likes = data[0].count;
        res.json({ number_of_likes });
      });
    });
  });

  return router;
};
