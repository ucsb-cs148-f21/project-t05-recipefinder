/*
this script creates the dummy database for testing purpose
*/
DROP DATABASE IF EXISTS `recipe_finder`;
CREATE DATABASE `recipe_finder`; 
USE `recipe_finder`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `ingredients` (
  `ingredient_id` int(10) NOT NULL AUTO_INCREMENT,
  `ingredient` JSON NOT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
INSERT INTO `ingredients` VALUES (1, '[
      "1 (18.25 ounce) package angel food cake mix",
      "1\\u2009\\u00bc cups water",
      "1 (3.3 gram) packet instant coffee (such as Starbucks VIA\\u00ae)",
      "\\u00be cup water",
      "3 tablespoons coffee-flavored liqueur",
      "1 (8 ounce) package cream cheese, softened",
      "\\u00bd cup heavy cream",
      "2 tablespoons butter, softened",
      "1 (3.5 ounce) package instant French vanilla pudding mix",
      "1 (4 ounce) package cream cheese, softened",
      "2 tablespoons heavy cream",
      "1 cup confectioners\' sugar",
      "1 teaspoon vanilla extract"
    ]');
INSERT INTO `ingredients` VALUES (2, '[
      "1 (18.25 ounce) package angel food cake mix",
      "1\\u2009\\u00bc cups water",
      "1 (3.3 gram) packet instant coffee (such as Starbucks VIA\\u00ae)",
      "\\u00be cup water",
      "3 tablespoons coffee-flavored liqueur",
      "1 (8 ounce) package cream cheese, softened",
      "\\u00bd cup heavy cream",
      "2 tablespoons butter, softened",
      "1 (3.5 ounce) package instant French vanilla pudding mix",
      "1 (4 ounce) package cream cheese, softened",
      "2 tablespoons heavy cream",
      "1 cup confectioners\' sugar",
      "1 teaspoon vanilla extract"
    ]');

CREATE TABLE `recipes` (
  `ingredient_id` int(10) NOT NULL AUTO_Increment UNIQUE,
  `recipe`JSON NOT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `recipes` VALUES (1,  '{
    "name:": "Tiramisu Angel Cake",
    "Prep:": "40 mins",
    "Cook:": "35 mins",
    "Additional:": "30 mins",
    "Total:": "105 mins"}'
      );
INSERT INTO `recipes` VALUES (2, '{
    "name:": "Tiramisu Angel Cake",
    "Prep:": "40 mins",
    "Cook:": "35 mins",
    "Additional:": "30 mins",
    "Total:": "105 mins"}' );

