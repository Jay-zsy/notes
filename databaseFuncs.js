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
    SELECT resources.*, count(likes.resource_id) as number_of_likes, round(avg(ratings.rating),2) as average_rating
    FROM resources
    LEFT OUTER JOIN likes ON likes.resource_id = resources.id
    LEFT OUTER JOIN ratings ON ratings.resource_id = resources.id
  `;

  if (options.userId) {
    queryParams.push(options.userId);
    queryString += `WHERE (likes.user_id = $${queryParams.length} OR resources.owner_id = $${queryParams.length}) `;
  }

  if (options.category_id) {
    queryParams.push(`${options.category_id}`);

    if (queryParams.length > 1) {
      queryString += `AND resources.category_id = $${queryParams.length} `;
    } else {
      queryString += `WHERE resources.category_id = $${queryParams.length} `;
    }
  }

  if (options.content_type) {
    queryParams.push(`${options.content_type}`);

    if (queryParams.length > 1) {
      queryString += `AND resources.content_type = $${queryParams.length} `;
    } else {
      queryString += `WHERE resources.content_type = $${queryParams.length} `;
    }
  }

  if (options.keyword) {
    queryParams.push(`%${options.keyword.toUpperCase()}%`);

    if (queryParams.length > 1) {
      queryString += `AND (upper(resources.title) LIKE $${queryParams.length} OR upper(resources.description) LIKE $${queryParams.length}) `;
    } else {
      queryString += `WHERE (upper(resources.title) LIKE $${queryParams.length} OR upper(resources.description) LIKE $${queryParams.length}) `;
    }
  }

  queryString += `
    GROUP BY resources.id
  `;

  if (options.rating) {
    queryParams.push(`${options.rating}`);
    queryString += `HAVING avg(ratings.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
    ORDER BY number_of_likes DESC, resources.id
    LIMIT $${queryParams.length};
  `;

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
