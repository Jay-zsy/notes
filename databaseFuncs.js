const bcrypt = require("bcrypt");

//USERS
//Get a single user from the database given their email
const getUserWithEmail = function(db, loginInput) {
  let queryParams = [loginInput.email];
  let queryString = `
    SELECT *
    FROM users
    WHERE users.email = $1 `;

  return db
    .query(queryString, queryParams)
    .then(res => {
      if (bcrypt.compareSync(loginInput.password, res.rows[0].password)) {
        return res.rows[0];
      } else {
        console.log("goes here");
        return ""; //this means they fucked up n pw is wrong
      }
    })
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.getUserWithEmail = getUserWithEmail;

//Get a single user from the database given their id
const getUserWithId = function(db, userId) {
  let queryParams = [userId];
  let queryString = `
    SELECT *
    FROM users
    WHERE users.id = $1; `;
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
    queryParams.push(`${newUserParams.name}`);
    queryString += `SET name = $${queryParams.length} `;
  }

  if (newUserParams.email) {
    queryParams.push(`${newUserParams.email}`);

    if (queryParams.length > 1) {
      queryString += `, email = $${queryParams.length} `;
    } else {
      queryString += `SET email = $${queryParams.length} `;
    }
  }

  if (newUserParams.password) {
    queryParams.push(`${bcrypt.hashSync(newUserParams.password, 10)}`);

    if (queryParams.length > 1) {
      queryString += `, password = $${queryParams.length} `;
    } else {
      queryString += `SET password = $${queryParams.length} `;
    }
  }

  if (newUserParams.profile_pic) {
    queryParams.push(`${newUserParams.profile_pic}`);

    if (queryParams.length > 1) {
      queryString += `, profile_pic = $${queryParams.length} `;
    } else {
      queryString += `SET profile_pic = $${queryParams.length} `;
    }
  }

  queryParams.push(newUserParams.userId);
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
    bcrypt.hashSync(newUserParams.password, 10)
  ];

  let queryString = `
      INSERT INTO users `;
  if (newUserParams.profile_pic) {
    queryParams.push(newUserParams.profile_pic);
    queryString += `
      (name, email, password, profile_pic)
      VALUES ($1, $2, $3, $4)
      RETURNING * `;
  } else {
    queryString += `
      (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING * `;
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
    SELECT resources.*, users.name as owner_name, users.profile_pic as owner_profile_pic, categories.thumbnail as category_thumbnail, count(likes.resource_id) as number_of_likes, average_rating
    FROM resources
    LEFT OUTER JOIN likes ON likes.resource_id = resources.id
    LEFT OUTER JOIN users ON resources.owner_id = users.id
    LEFT OUTER JOIN categories ON resources.category_id = categories.id
    LEFT OUTER JOIN (SELECT resource_id, round(avg(rating), 2) as average_rating
                FROM ratings
                GROUP BY resource_id
                ORDER BY resource_id) as average_ratings ON resources.id = average_ratings.resource_id
    WHERE resources.is_active = true
  `;

  if (options.userId) {
    queryParams.push(options.userId);
    queryString += `AND (likes.user_id = $${queryParams.length} OR resources.owner_id = $${queryParams.length}) `;
  }

  if (options.category_id) {
    queryParams.push(`${options.category_id}`);

    queryString += `AND resources.category_id = $${queryParams.length} `;
  }

  if (options.content_type) {
    queryParams.push(`${options.content_type}`);

    queryString += `AND resources.content_type = $${queryParams.length} `;
  }

  if (options.keyword) {
    queryParams.push(`%${options.keyword.toUpperCase()}%`);

    queryString += `AND (upper(resources.title) LIKE $${queryParams.length} OR upper(resources.description) LIKE $${queryParams.length}) `;
  }

  queryString += `
    GROUP BY resources.id, average_ratings.average_rating, users.name, users.profile_pic, categories.thumbnail
  `;

  if (options.rating) {
    queryParams.push(`${options.rating}`);
    queryString += `HAVING average_rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
    ORDER BY resources.created_at DESC, number_of_likes DESC, resources.id
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

const getAverageRatings = function(db) {
  const queryParams = [];
  let queryString = `

  `;
};
exports.getAverageRatings = getAverageRatings;

////get resource from resource_id
const getResourceFromId = function(db, resource_id) {
  const queryParams = [resource_id];
  let queryString = `
    SELECT resources.*, users.name as owner_name, users.profile_pic as owner_profile_pic, categories.thumbnail as category_thumbnail, count(likes.resource_id) as number_of_likes, average_rating
    FROM resources
    LEFT OUTER JOIN likes ON likes.resource_id = resources.id
    LEFT OUTER JOIN users ON resources.owner_id = users.id
    LEFT OUTER JOIN categories ON resources.category_id = categories.id
    LEFT OUTER JOIN (SELECT resource_id, round(avg(rating), 2) as average_rating
                FROM ratings
                GROUP BY resource_id
                ORDER BY resource_id) as average_ratings ON resources.id = average_ratings.resource_id
    WHERE resources.id = $${queryParams.length}
    GROUP BY resources.id, average_ratings.average_rating, users.name, users.profile_pic, categories.thumbnail;
  `;

  return db
    .query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.getResourceFromId = getResourceFromId;

//// Add new resource
const addResource = function(db, newResourceParams) {
  const queryParams = [
    newResourceParams.owner_id,
    newResourceParams.category_id,
    newResourceParams.title,
    newResourceParams.url,
    newResourceParams.content_type
  ];
  let queryString = `
    INSERT INTO resources
      (owner_id, category_id, title, url, content_type, description)
    VALUES($1, $2, $3, $4, $5, $6) `;

  if (newResourceParams.description) {
    queryParams.push(newResourceParams.description);
  } else {
    queryParams.push(null);
  }

  queryString += `RETURNING *`;

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
  queryString += `WHERE resources.id = $${queryParams.length} RETURNING *`;
  console.log(queryString, queryParams);
  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.error("query error", err.stack);
    });
};
exports.editResource = editResource;
