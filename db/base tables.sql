/*
this script creates the dummy database for testing purpose
*/
DROP SCHEMA IF EXISTS `recipe_finder`;
CREATE SCHEMA `recipe_finder`; 
USE `recipe_finder`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `ingredients` (
  `ingredient_id` int(10) NOT NULL AUTO_INCREMENT,
  `ingredient` TEXT(5000),
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

CREATE TABLE `recipes` (
  `ingredient_id` int(10) NOT NULL AUTO_Increment UNIQUE,
  `recipe`TEXT(5000),
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;