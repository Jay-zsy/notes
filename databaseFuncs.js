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
const addUser = function(db, newUserParams) {
  let queryParams = [
    newUserParams.name,
    newUserParams.email,
    newUserParams.password
  ];

  let queryString = `
    INSERT INTO users
    (name, email, password, profile_pic)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

  if (newUserParams.profile_pic) {
    queryParams.push(newUserParams.profile_pic);
  } else {
    queryParams.push(null);
  }

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
  console.log(options);
  const queryParams = [];
  let queryString = `
    SELECT DISTINCT *
    FROM resources
    LEFT OUTER JOIN ratings ON ratings.resource_id = resources.id
    LEFT OUTER JOIN likes ON likes.resource_id = resources.id `;

  if (options.category) {
    queryParams.push(options.category);
    queryString += `WHERE resources.category_id = $${queryParams.length} `;
  }

  if (options.keyword) {
    queryParams.push(`%${options.keyword.toUpperCase()}%`);

    if (queryParams.length > 1) {
      queryString += `AND upper(title) LIKE $${queryParams.length} `;
    } else {
      querySting += `WHERE upper(title) LIKE $${queryParams.length} `;
    }
  }

  queryString += `
    GROUP BY properties.id
  `;
  if (options.ratings) {
    queryParams.push(`${options.ratings}`);
    queryString += `HAVING avg(rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `LIMIT $${queryParams.length}`;
  console.log(queryString, queryParams);
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
