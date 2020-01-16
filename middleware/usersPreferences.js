const { Pool } = require("pg");
const dbParams = require("../lib/dbParams.js");
const db = new Pool(dbParams);
db.connect();
const databaseFuncs = require("../databaseFuncs");
const flatMap = require("array.prototype.flatmap");

module.exports = (req, res, next) => {
  databaseFuncs
    .usersLikedResources(db, req.session.userId)
    .then(x => {
      let y = x.map(x => Object.values(x)[0]);
      console.log(y);
      res.locals.user.likes = y;
      next();
    })
    .catch(next);
};
