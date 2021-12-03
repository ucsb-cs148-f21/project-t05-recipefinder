/*
this script creates the dummy database for testing purpose
*/
SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE `ingredients` (
  `ingredient_id` int(10) NOT NULL AUTO_INCREMENT,
  `ingredient` TEXT(5000),
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
  `ingredient_id` int(10) NOT NULL AUTO_Increment UNIQUE,
  `recipe`TEXT(5000),
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `entity_users`;
CREATE TABLE `entity_users` (
    `user_id` int(11) NOT NULL AUTO_Increment UNIQUE,
    `user_username` varchar(32) NOT NULL,
    `user_password` varchar(45) NOT NULL,
    `user_allergies` varchar(500),
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
