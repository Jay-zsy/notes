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
  let queryParams = [];

  let queryString = `
    SELECT *
    FROM users
    WHERE users.id = $1; `;

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

//Edit current user profile
const updateUserWithId = function(db, newUserParams) {
  let queryParams = [];

  let queryString = `
    UPDATE users `;

  if (newUserParams.name) {
    queryParams.push(`${newParams.name}`);
    queryString += `SET name = $${queryParams.length} `;
  }

  if (newUserParams.email) {
    queryParams.push(`${newParams.email}`);

    if (queryParams.length > 1) {
      queryString += `, email = $${queryParams.length} `;
    } else {
      queryString += `SET email = $${queryParams.length} `;
    }
  }

  if (newUserParams.password) {
    queryParams.push(`${newParams.password}`);

    if (queryParams.length > 1) {
      queryString += `, password = $${queryParams.length} `;
    } else {
      queryString += `SET password = $${queryParams.length} `;
    }
  }

  if (newUserParams.profile_pic) {
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
  const queryParams = [];
  let queryString = `
    SELECT DISTINCT *
    FROM resources
    LEFT OUTER JOIN ratings ON ratings.resource_id = resources.id
    LEFT OUTER JOIN likes ON likes.resource_id = resources.id `;

  if (options.category_id) {
    queryParams.push(options.category_id);
    queryString += `WHERE resources.category_id = $${queryParams.length} `;
  }

  if (options.keyword) {
    queryParams.push(`%${options.keyword.toUpperCase()}%`);
    if (queryParams.length > 1) {
      queryString += `AND upper(title) LIKE $${queryParams.length} `;
    } else {
      queryString += `WHERE upper(title) LIKE $${queryParams.length} `;
    }
  }

  queryString += `
    GROUP BY resources.id, ratings.id, likes.id
  `;
  if (options.ratings) {
    queryParams.push(`${options.ratings}`);
    queryString += `HAVING avg(ratings.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `LIMIT $${queryParams.length} `;
  console.log(queryString, queryParams);
  return db
    .query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.getAllResources = getAllResources;

//// Add new resource
const addResource = function(db, newResourceParams) {
  // console.log(newResourceParams);
  const queryParams = [
    newResourceParams.owner_id,
    newResourceParams.category_id,
    newResourceParams.title
  ];
  let queryString = `
    INSERT INTO resources
      (owner_id, category_id, title, description, url)
    VALUES($1, $2, $3, $4, $5) `;
  if (newResourceParams.description) {
    queryParams.push(newResourceParams.description);
  } else {
    queryParams.push(null);
  }
  queryParams.push(newResourceParams.url);
  queryString += `RETURNING *`;
  console.log(queryString, queryParams);
  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.addResource = addResource;

//// Delete a resource
const deleteResource = function(db, resource_Id) {
  let queryParams = [resource_Id];
  let queryString = `
    UPDATE resources
    SET is_active = false
    WHERE resources.id = $1
    RETURNING * `;
  // console.log(queryString, queryParams);
  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.deleteResource = deleteResource;

//// Edit an existing resource
//// THIS ROUTE HAS NOT BEEN TESTED, HIGHLY DEPENDENT ON FRONTEND ////
const editResource = function(db, newResourceParams) {
  let queryParams = [];
  let queryString = `
    UPDATE resources `;
  if (newResourceParams.category_id) {
    queryParams.push(newResourceParams.category_id);
    queryString += `SET category_id = $${queryParams.length} `;
  }
  if (newResourceParams.title) {
    queryParams.push(`${newResourceParams.title}`);
    if (queryParams.length > 1) {
      queryString += `, title = $${queryParams.length} `;
    } else {
      queryString += `SET title = $${queryParams.length} `;
    }
  }
  if (newResourceParams.description) {
    queryParams.push(`${newResourceParams.description}`);
    if (queryParams.length > 1) {
      queryString += `, description = $${queryParams.length} `;
    } else {
      queryString += `SET description = $${queryParams.length} `;
    }
  }
  if (newResourceParams.url) {
    queryParams.push(`${newResourceParams.url}`);
    if (queryParams.length > 1) {
      queryString += `, url = $${queryParams.length} `;
    } else {
      queryString += `SET url = $${queryParams.length} `;
    }
  }
  queryParams.push(newResourceParams.resource_Id); //expecting a key from the front/route
  queryString += `WHERE resources.id = ${queryParams.length} RETURNING *`;
  console.log(queryString, queryParams);
  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.deleteResource = deleteResource;
