DROP DATABASE IF EXISTS express;

CREATE DATABASE IF NOT EXISTS express;

USE express;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY auto_increment,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    project_id INT(11) NOT NULL,
    role ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser',
    age INT(11) DEFAULT 0,
    FOREIGN KEY project_id REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE NO ACTION
);