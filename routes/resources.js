/*
 * All routes for Resources are defined here
 */

const express = require("express");
const router = express.Router();
const databaseFuncs = require("../databaseFuncs");

module.exports = db => {
  router.get("/", (req, res) => {
    //right now this works for all intended routes as long as for the 'my resources route' we send the userId within the request, not assign it within here. if we do it in here, a user will only ever see their own posts!
    //im thinking we use ajax for that one
    const userId = req.session.userId;

    if (!userId) {
      res.redirect("/");
    }

    let options = req.query;

    databaseFuncs.getAllResources(db, options, 60).then(data => {
      res.render("index", { data });
      res.status(200);
    });
  });

  //// Submit a new resource
  router.post("/new", (req, res) => {
    console.log(req.body);
    // if (req.session.userId) then allow else send 403

    const { ...newResourceParams } = req.body;
    newResourceParams.owner_id = req.session.userId;

    databaseFuncs.addResource(db, newResourceParams).then(data => {
      console.log("im the data ", data);
      // res.redirect("index", { data });         ///this redirect is not working
      res.redirect("/api/resources");
      res.status(200);
    });
  });

  //// 'Delete' an existing resource
  router.post("/delete/:id", (req, res) => {
    //this alongside some other endpoints needs to be changed using method override to satisfy the RESTful convention

    // if req.session.userId !== owner_id then send back 403

    databaseFuncs.deleteResource(db, req.params.id).then(data => {
      console.log("im the data ", data);
      res.redirect("/");
      res.status(200);
    });
  });

  //// Edit an existing resource
  router.post("/edit", (req, res) => {
    // if req.session.userId !== owner_id then send back 403
    // need a way to validate owner_id to user_id (inside the fn or here in the route?)
    const { ...newResourceParams } = req.body;
    // how the fuck do we get the resource_id from the front to back?
    // will we just expect the resource_id to be already in the req.body?
    newResourceParams.owner_id = req.session.userId; //not sure if we need to pass this into the fn
    databaseFuncs.editResource(db, newResourceParams).then(data => {
      console.log("im the data ", data);
      res.redirect("/");
      res.status(200);
    });
  });
  return router;
};
