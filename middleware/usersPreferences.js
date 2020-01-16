const { Pool } = require("pg");
const dbParams = require("../lib/dbParams.js");
const db = new Pool(dbParams);
db.connect();
const databaseFuncs = require("../databaseFuncs");
const flatMap = require("array.prototype.flatmap");

module.exports = async (req, res, next) => {
  try {
    const response = await databaseFuncs.usersLikedResources(
      db,
      req.session.userId
    );
    userLikes = response.map(el => Object.values(el)[0]);
    console.log(userLikes);
    res.locals.user.likes = userLikes;
    next();
  } catch (err) {
    next(err);
  }
};
