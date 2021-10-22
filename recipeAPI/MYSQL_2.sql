/* variation of mock db*/
DROP DATABASE IF EXISTS `recipe_finder`;
CREATE DATABASE `recipe_finder`; 
USE `recipe_finder`;

CREATE TABLE `ingredient_recipe` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ingredient_id` INT(10) UNSIGNED NOT NULL,
  `recipe_id` int(10) UNSIGNED NOT NULL,
  `recipe_name` VARCHAR(255) NOT NULL, 
  `ingredient_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
  FOREIGN KEY (ingredient_id) REFERENCES recipes(ingredient_id)
);
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('1', '1', 'chicken thighs');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('2', '1', 'heavy whipping cream');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('3', '1', 'mushrooms');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('4', '2', 'white sugar');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('5', '2', 'vanilla extract');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('6', '2', 'brown sugar');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('6', '3', 'brown sugar');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('7', '3', 'egg');
INSERT INTO `ingredients` (ingredient_id, recipe_id, ingredient_name) VALUES('8', '3', 'sea salt');


CREATE TABLE `ingredient` (
    `ingredient_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `ingredient_name` VARCHAR(255) NOT NULL
    PRIMARY KEY (`ingredient_id`) 
);

INSERT INTO ``

CREATE TABLE `recipes` (
  `recipe_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `recipe_name` VARCHAR(255) NOT NULL,
  `recipe` TEXT NOT NULL,
  `recipe_description` TEXT NOT NULL,
  PRIMARY KEY (`recipe_id`)
); 
INSERT INTO `recipes` (recipe_id, recipe_name, recipe_description, recipe) VALUES('1', 'Keto Smothered Chicken Thighs', 'info1', 'recipe1');
INSERT INTO `recipes` (recipe_id, recipe_name, recipe_description, recipe) VALUES('2', 'Oatmeal Raisin Cookies', 'info2', 'recipe2');
INSERT INTO `recipes` (recipe_id, recipe_name, recipe_description, recipe) VALUES('3', 'Salted Caramel Spritz', 'info3', 'recipe3');



/*
SELECT recipe_id FROM recipe_finder.ingredients WHERE ingredient IN ('chicken thighs', 'heavy whipping cream', 'mushrooms')

