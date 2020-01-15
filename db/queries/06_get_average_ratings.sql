-- SELECT resources.id, resources.title, resources.owner_id, users.name as owner_name, users.profile_pic, resources.category_id, categories.thumbnail, count(likes.resource_id) as number_of_likes, round(avg(ratings.rating),2) as average_rating
-- FROM resources
-- LEFT OUTER JOIN likes ON likes.resource_id = resources.id
-- LEFT OUTER JOIN ratings ON ratings.resource_id = resources.id
-- LEFT OUTER JOIN users ON resources.owner_id = users.id
-- LEFT OUTER JOIN categories ON resources.category_id = categories.id


-- WHERE resources.category_id = 1
--   AND (upper(resources.title) LIKE '%JAVA%' OR upper(resources.description) LIKE '%JAVA%')
--   -- AND (likes.user_id = 2 OR resources.owner_id = 2)
--   AND resources.id = 1


-- GROUP BY resources.id, users.name, users.profile_pic, categories.thumbnail

-- HAVING avg(ratings.rating) >= 4

-- ORDER BY number_of_likes DESC, resources.id
-- ;

SELECT resources.id, resources.title, users.name as owner_name, resources.category_id, average_rating, count(likes.resource_id) as number_of_likes
FROM resources
LEFT OUTER JOIN likes ON likes.resource_id = resources.id
LEFT OUTER JOIN users ON resources.owner_id = users.id
LEFT OUTER JOIN categories ON resources.category_id = categories.id
LEFT OUTER JOIN (SELECT resource_id, round(avg(rating), 2) as average_rating
                FROM ratings
                GROUP BY resource_id
                ORDER BY resource_id) as average_ratings ON resources.id = average_ratings.resource_id
GROUP BY resources.id, average_ratings.average_rating, users.name, users.profile_pic, categories.thumbnail
ORDER BY resources.id
;


