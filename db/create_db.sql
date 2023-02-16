DROP USER IF EXISTS 'monty'@'localhost';
DROP DATABASE IF EXISTS monty_hall;

CREATE DATABASE monty_hall DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'monty'@'localhost' IDENTIFIED BY '1q2w3e4r';
GRANT ALL On monty_hall.* TO 'monty'@'localhost';

USE monty_hall;

CREATE TABLE variables (
    seq     INT NOT NULL AUTO_INCREMENT,
    name    VARCHAR(20),
    val     INT,
    PRIMARY KEY(seq)
) ENGINE = InnoDB;

INSERT INTO variables (name, val) VALUE ('CHANGE_WIN', 0);
INSERT INTO variables (name, val) VALUE ('CHANGE_LOSE', 0);
INSERT INTO variables (name, val) VALUE ('UNCHANGE_WIN', 0);
INSERT INTO variables (name, val) VALUE ('UNCHANGE_LOSE', 0);
