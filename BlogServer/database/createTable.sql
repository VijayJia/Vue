USE blog;

CREATE TABLE IF NOT EXISTS `blog`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `title` NVARCHAR(100) NOT NULL,
   `author` NVARCHAR(40) NOT NULL,
   `content` TEXT NOT NULL,
   `create_time` DATE,
   `update_time` DATE,
   `is_active` bit,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;