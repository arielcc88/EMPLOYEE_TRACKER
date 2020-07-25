DROP DATABASE IF EXISTS EMPLOYEE_MGMT;
CREATE DATABASE EMPLOYEE_MGMT;

USE EMPLOYEE_MGMT;

-- Create the Department Table
CREATE TABLE `department` (
    `id` INT NOT NULL AUTO_INCREMENT, -- primary key column
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(`id`)
);

-- Create the Role Table
CREATE TABLE `role`( 
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `DPT_FK` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
);

​
-- Create the Employee Table
CREATE TABLE `employee`
(
    `id` INT NOT NULL AUTO_INCREMENT, -- primary key column
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INT NOT NULL,
    `manager_id` INT,
    -- constraints
    PRIMARY KEY(`id`),
    CONSTRAINT `RL_FK` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT `EM_FK` FOREIGN KEY (`manager_id`) REFERENCES `employee`(`id`) ON UPDATE CASCADE ON DELETE RESTRICT
);