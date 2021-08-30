USE express;

DROP TABLE IF EXISTS projects;

CREATE TABLE IF NOT EXISTS projects (
    project_id INT PRIMARY KEY auto_increment,
    project_name VARCHAR(25) NOT NULL,
    proj_duration VARCHAR(50) NOT NULL
);