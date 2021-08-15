DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    -- manager_id: INT,
    CONSTRAINT FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
    -- CONSTRAINT FOREIGN KEY (manager_id) REFERENCES ********(id) ON DELETE SET NULL
);
-- to hold reference to another employee that is manager of the current employee. This field might be null if the employee has no manager.