DROP DATABASE IF EXISTS `recipe_finder`;
CREATE DATABASE `recipe_finder`; 
USE `recipe_finder`;

CREATE TABLE `ingredients` (
  `ingredient_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ingredient` TEXT NOT NULL,
  PRIMARY KEY (`ingredient_id`)
);
INSERT INTO `ingredients` VALUES (1, "water,milk,apple,chicken stock,shrimp");
INSERT INTO `ingredients` VALUES (2, "butter,brown sugar,heavy whipping cream");

CREATE TABLE `recipes` (
  `recipe_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `recipe`JSON NOT NULL,
  PRIMARY KEY (`recipe_id`)
);
INSERT INTO `recipes` VALUES (1,  '{
    "name:": "random dish 1",
    "Prep:": "40 mins",
    "Cook:": "35 mins",
    "Additional:": "30 mins",
    "Total:": "105 mins"}'
);
INSERT INTO `recipes` VALUES (2, '{
    "name:": "random dish 2",
    "Prep:": "55 mins",
    "Cook:": "35 mins",
    "Additional:": "20 mins",
    "Total:": "110 mins"}' 
);

