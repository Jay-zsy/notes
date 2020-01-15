/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const databaseFuncs = require("../databaseFuncs");
const moment = require("moment");
const auth = require("../middleware/auth");

module.exports = db => {
  // MOST LIKELY NOT GONNA USE THIS ROUTE LUL
  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.get("/login", (req, res) => {
    //if they are already signed in
    if (req.session.userId) {
      res.redirect("/");
      return;
    }
    res.render("login");
  });

  router.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("login");
  });

  router.post("/login", (req, res) => {
    const loginInput = req.body;
    databaseFuncs
      .getUserWithEmail(db, loginInput)
      .then(userInfo => {
        if (userInfo) {
          req.session.userId = userInfo.id;
          res.redirect("/");
        } else {
          res.status(404).render("register");
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //---------------------USER PROFILE-------------------------//

  router.get("/me", auth, (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.redirect("/login");
      return;
    }

    databaseFuncs.getUserWithId(db, userId).then(user => {
      user.created_at = moment(user.created_at).format(
        "dddd, MMMM Do YYYY, h:mm:ss a"
      );
      res.render("usersProfile", { user });
    });
  });

  router.post("/me", auth, (req, res) => {
    if (!req.body.name && !req.body.email && !req.body.password) {
      res.redirect("me");
    } else {
      const { ...newUserParams } = req.body;
      newUserParams.userId = req.session.userId;

      databaseFuncs.updateUserWithId(db, newUserParams).then(user => {
        res.render("usersProfile", { user });
      });
    }
  });

  //----------------------------------------------------------//

  //---------------------NEW USER-------------------------//

  router.get("/new", (req, res) => {
    if (req.session.userId) {
      res.redirect("/");
    }
    res.render("register");
  });

  router.post("/new", (req, res) => {
    const newUserParams = req.body;
    console.log(req.body);
    databaseFuncs.addUser(db, newUserParams).then(user => {
      req.session.userId = user.id;
      res.redirect("/");
    });
  });

  return router;
};
