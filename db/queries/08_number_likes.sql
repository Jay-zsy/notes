SELECT resources.id, count(likes.resource_id)
FROM resources
LEFT OUTER JOIN likes ON resources.id = resource_id
GROUP BY resources.id
ORDER BY resources.id;
