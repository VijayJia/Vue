DELIMITER //
DROP PROCEDURE IF EXISTS `createBlog`//
CREATE PROCEDURE `createBlog` (
    title NVARCHAR(100),
    author NVARCHAR(40),
    content TEXT,
    create_time DATE)
BEGIN
    INSERT INTO blog ( title, author, content, create_time, update_time, is_active) VALUES ( title, author, content, create_time, create_time, true );
    SELECT @@Identity as id;
END;
//
DELIMITER ;