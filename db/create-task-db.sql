
USE express;

DROP TABLE IF EXISTS tasks;

CREATE TABLE IF NOT EXISTS tasks (
    task_id INT PRIMARY KEY auto_increment,
    task_name VARCHAR(25) NOT NULL,
    project_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
);