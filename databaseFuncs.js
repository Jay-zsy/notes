//USERS
//Get a single user from the database given their email
const getUserWithEmail = function(db, email) {
  let queryString = ``;
  let queryParams = [];
  queryParams.push(email);

  return db
    .query(queryString, queryParams)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.getUserWithEmail = getUserWithEmail;

//Get a single user from the database given their id
const getUserWithId = function(db, userId) {
  let queryString = `
    SELECT *
    FROM users
    WHERE users.id = $1; `;

  let queryParams = [];
  queryParams.push(userId);

  return db
    .query(queryString, queryParams)
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.getUserWithId = getUserWithId;

//edit current user profile
const updateUserWithId = function(db, newParams) {
  let queryParams = [];

  let queryString = `
    UPDATE users `;

  if (newParams.name) {
    queryParams.push(`${newParams.name}`);
    queryString += `SET name = $${queryParams.length} `;
  }

  if (newParams.email) {
    queryParams.push(`${newParams.email}`);

    if (queryParams.length > 1) {
      queryString += `, email = $${queryParams.length} `;
    } else {
      queryString += `SET email = $${queryParams.length} `;
    }
  }

  if (newParams.password) {
    queryParams.push(`${newParams.password}`);

    if (queryParams.length > 1) {
      queryString += `, password = $${queryParams.length} `;
    } else {
      queryString += `SET password = $${queryParams.length} `;
    }
  }

  if (newParams.profile_pic) {
    queryParams.push(`${newParams.profile_pic}`);

    if (queryParams.length > 1) {
      queryString += `, profile_pic = $${queryParams.length} `;
    } else {
      queryString += `SET profile_pic = $${queryParams.length} `;
    }
  }

  queryParams.push(newParams.userId);
  queryString += `WHERE users.id = $${queryParams.length} RETURNING *`;

  console.log(queryString);
  console.log(queryParams);

  return db
    .query(queryString, queryParams)
    .then(res => {
      console.log(res);
      return res.rows[0];
    })
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.updateUserWithId = updateUserWithId;

//Add a new user to the database
const addUser = function(db, user) {
  let queryString = ``;
  let queryParams = [];
  queryParams.push(user.name, user.email, user.password, user.profilePic);

  return db
    .query(queryString, queryParams)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error("query error", error.stack);
    });
};
exports.addUser = addUser;

///RESOURCES
//get all resources depending on the options
const getAllResources = function(db, options, limit = 20) {
  let queryString = ``;
  const queryParams = []; //build up based on options

  return db
    .query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.getAllResources = getAllResources;

//add new resource
const addResource = function(db, resources) {
  let queryString = ``;
  const queryParams = [];

  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.addResource = addResource;
