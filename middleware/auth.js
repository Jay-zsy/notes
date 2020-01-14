const { Pool } = require("pg");
const dbParams = require("../lib/dbParams.js");
const db = new Pool(dbParams);
db.connect();
const databaseFuncs = require("../databaseFuncs");

module.exports = (req, res, next) => {
  databaseFuncs
    .getUserWithId(db, req.session.userId)
    .then(user => {
      console.log("user is: ", user);
      if (!user) {
        res.render("login");
      }
      console.log(user);
      res.locals.user = {};
      res.locals.user.id = user.id;
      res.locals.user.name = user.name;
      // res.locals.user = user.id;
      // res.locals.userName = user.name;
      next();
    })
    .catch(next);
};
