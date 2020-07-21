CREATE SCHEMA IF NOT EXISTS `fake-instagram` DEFAULT CHARACTER SET utf8;
USE `fake-instagram`;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE users(
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(192),
  `email` VARCHAR(192)  UNIQUE,
  `username` VARCHAR(45) UNIQUE,
  `password` VARCHAR(192),
  `avatar` VARCHAR(192),
  `create_at` DATETIME,
  `update_at` DATETIME
);


-- -----------------------------------------------------
-- Table `mydb`.`publications`
-- -----------------------------------------------------
CREATE TABLE publications(
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `image` VARCHAR(192),
  `like` INT,
  `create_at` DATETIME,
  `update_at` DATETIME,
  `user_id` INT NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);


-- -----------------------------------------------------
-- Table `mydb`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS comments(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` TEXT,
  `create_at` DATETIME,
  `update_at` DATETIME,
  `user_id` INT NOT NULL,
  `publication_id` INT NOT NULL,
    FOREIGN KEY (user_id) 
    REFERENCES users(id),
    FOREIGN KEY (publication_id)
    REFERENCES publications(id)
);