SELECT resources.id, count(likes.resource_id) as number_of_likes, round(avg(ratings.rating),2) as average_rating
FROM resources
LEFT OUTER JOIN likes ON likes.resource_id = resources.id
LEFT OUTER JOIN ratings ON ratings.resource_id = resources.id
GROUP BY resources.id
ORDER BY resources.id
;

SELECT resources.id, count(likes.resource_id) as number_of_likes
FROM resources
LEFT OUTER JOIN likes ON likes.resource_id = resources.id
GROUP BY resources.id
ORDER BY resources.id
;

SELECT resources.id, count(likes.resource_id) as number_of_likes, round(avg(ratings.rating),2) as average_rating
FROM resources
LEFT OUTER JOIN ratings ON ratings.resource_id = resources.id
LEFT OUTER JOIN likes ON likes.resource_id = resources.id
GROUP BY resources.id
ORDER BY resources.id
;
