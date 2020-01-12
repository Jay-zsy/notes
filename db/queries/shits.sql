--GET USER INFO FOR LOG IN
SELECT *
FROM users
WHERE users.id = 2;

--POST ADD NEW USER ACC
INSERT INTO users
    (name, email, password, profile_pic)
VALUES
    ('Molli', '5050@foo.com', 'password', 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/listening_1u79.svg');

--POST EDIT USER ACC
UPDATE users
SET name = 'Kevin', password = 'newPassword', email = 'newEmail.com'
WHERE users.id = 3;

--POST ADD NEW RESOURCE
INSERT INTO resources
    (owner_id, category_id, title, description, url)
VALUES
    (3, 1, 'HIGHER', 'Blog post about higher order functions', 'https://blog.bitsrc.io/understanding-higher-order-functions-in-javascript-75461803bad');

--POST EDIT/UPDATE AN EXISTING RESOURCE
UPDATE resources
SET category_id = 1, title = 'HIGHER HIGHER'
WHERE resources.id = 51;

--POST 'DELETE' AN EXISTING RESOURCE
UPDATE resources
SET is_active = false
WHERE resources.id = 50;

--GET DISPLAY ALL RESOURCES FOR SAID USER 'MY POSTS'
SELECT *
FROM resources
    JOIN users ON owner_id = users.id
WHERE users.id = 1;

--GET DISPLAY ALL LIKED RESOURCES FOR SAID USER 'MY LIKES'
SELECT resources.*
FROM resources
    JOIN likes ON likes.resource_id = resources.id
    JOIN users ON likes.user_id = users.id
WHERE users.id = 1;
--question here, will a user be able to like their own post?
--if so will we filter out the repeated entry on the frontend?

--GET DISPLAY ALL RESOURCES FROM QUERY PARAMS
SELECT distinct resources.category_id, resources.title, COUNT(likes.resource_id) as number_of_likes
FROM resources
    JOIN likes ON likes.resource_id = resources.id
WHERE resources.category_id = 1 AND resources.title LIKE '%ava%'
GROUP BY likes.resource_id, resources.category_id, resources.title
ORDER BY number_of_likes DESC;

--category? title?
--category = num, title need to treat as all case when comparing
--number of comments? TRENDING NOW? HOT TOPIC filter by date and num of comments

--POST DEACTIVATE A USER ACCOUNT
UPDATE users
SET is_active = false
WHERE users.id = 3;
