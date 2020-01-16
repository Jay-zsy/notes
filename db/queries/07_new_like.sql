-- INSERT INTO likes (user_id, resource_id)
-- VALUES(2, 1)
-- RETURNING (SELECT count(likes.resource_id)
--           FROM likes
--           GROUP BY resource_id
--           HAVING resource_id = 1);

INSERT INTO likes (user_id, resource_id)
    VALUES (1, 2)
    RETURNING (SELECT count(likes.resource_id)
          FROM likes
          GROUP BY resource_id
          HAVING resource_id = 2)
