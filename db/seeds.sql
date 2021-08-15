-- You might also want to include a seeds.sql file to pre-populate your database. This will make the development of individual features much easier.

INSERT INTO department (name)
VALUES ("Sales"), ("Accounting"), ("Human-Resources"), ("Customer-Service");

INSERT INTO role (title, salary, department_id)
VALUE 
("Sales-Associate", 50000.00, 2),
("Customer-Service-Specialist", 40000.00, 3),
("Receptionist", 30000.00, 4), 
("Human-Resources-Specialist", 80000.00, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUE 
("Jim", "Halpert", 1), 
("Pam", "Beasley", 3), 
("Angela", "Martin", 2), 
("Toby", "Flenderson", 4);