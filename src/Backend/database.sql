DROP DATABASE IF EXISTS comments;
CREATE DATABASE comments;

USE comments;

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `reference` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `initials` VARCHAR(255) NOT NULL,
    `content` TEXT(8000) NOT NULL
);