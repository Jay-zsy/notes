const { Pool } = require("pg");
const dbParams = require("../lib/dbParams.js");
const db = new Pool(dbParams);
db.connect();
const databaseFuncs = require("../databaseFuncs");

module.exports = async (req, res, next) => {
  try {
    const likeResponse = await databaseFuncs.usersLikedResources(
      db,
      req.session.userId
    );
    userLikes = likeResponse.map(el => Object.values(el)[0]);

    const ratingResponse = await databaseFuncs.usersRatedResources(
      db,
      req.session.userId
    );
    userRatings = ratingResponse.map(el => Object.values(el));
    res.locals.user.likes = userLikes;
    res.locals.user.ratings = userRatings;
    next();
  } catch (err) {
    next(err);
  }
};
