SELECT resources.id, resources.title, resources.owner_id, resources.category_id, count(likes.resource_id) as number_of_likes, round(avg(ratings.rating),2) as average_rating
FROM resources
LEFT OUTER JOIN likes ON likes.resource_id = resources.id
LEFT OUTER JOIN ratings ON ratings.resource_id = resources.id


WHERE resources.category_id = 1
  AND (upper(resources.title) LIKE '%JAVA%' OR upper(resources.description) LIKE '%JAVA%')
  -- AND (likes.user_id = 2 OR resources.owner_id = 2)


GROUP BY resources.id

HAVING avg(ratings.rating) >= 4

ORDER BY number_of_likes DESC, resources.id
;
