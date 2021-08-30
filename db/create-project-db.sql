USE express;

DROP TABLE IF EXISTS projects;

CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY auto_increment,
    projectname VARCHAR(25) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
);