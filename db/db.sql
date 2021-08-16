DROP DATABASE IF EXISTS employeetracker;
CREATE DATABASE employeetracker;
USE employeetracker;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);
 
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10.2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('Accounting'), ('Engineering'), ('Sales'), ('Customer Service');


INSERT INTO role (title, salary, department_id)
VALUES ("Accounting", 200000, 1), ("Engineer", 250000, 2) , ("Engineer", 150000, 2), ("Accountant", 135000, 3), ("Customer Service", 350000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 1, 3), ("Mike", "Ike", 2, 1), ("Jim", "Halpert", 3, null), ("Derryl", "Doe", 4, 3), ("Steve", "Mack", 5, null), ("Sam", "Smith", 2, null),
 ("Tom", "Hanks", 4, 7), ("Mac", "Cheese", 1, 2);

