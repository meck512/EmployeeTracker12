const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require(".");


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shenendoah1234',
    database: 'employeetracker'
  },
  console.log('Connected to the employeetracker database.')
  );

  connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
  });

// MAIN MENU PROMPT
const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Choose action:",
            choices: ["View all departments", "View all roles", "View all Employees", "Add a role", "Add an Employee", "Update an employee role", "Quit"],
        },
    ]).then(choice => {
        // console.log("Current Action:" + result.choice);

        switch (choice.menu) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all Employees":
                viewAllEmployees();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an employee role":
                createDepartment();
                break;
            case "Quit":
                connection.end();
                break;
        }
    });
}

//INIT
mainMenu()

// VIEW All departments
const viewAllDepartments = () =>
  connection.query('SELECT id, name AS department FROM department',(err, res) => {
      if (err) throw err;
      console.table(res);
      mainMenu();
    }
  );
// VIEW ALL ROLES
const viewAllRoles = () => {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}
//VIEW ALL EMPLOYEES
const viewAllEmployees = () => {
    return this.connection.query(`SELECT * FROM employee`, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    }
    )
}
//ADD A ROLE
const addRole = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salaryTotal"
            },
            {
                type: "input",
                message: "What is the department id number?",
                name: "deptID"
            }
        ])
        .then(function (input) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [input.roleName, input.salaryTotal, input.deptID], function (err, res) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
        });
}
//ADD AN EMPLOYEE
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "New Employee's first name?",
                name: "newFirstName"
            },
            {
                type: "input",
                message: "New Employee's first name?",
                name: "newLastName"
            },
            {
                type: "input",
                message: "New Employee's role ID?",
                name: "roleID"
            },
            {
                type: "input",
                message: "New employee's manager's ID #?",
                name: "managerID"
            }
        ])
        .then(function (input) {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [input.newFirstName, input.newLastName, input.roleID, input.managerID], (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
        });
}
//CREATE NEW DEPARTMENT
const createDepartment = () => {
    inquirer.prompt({

        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function (input) {
        connection.query("INSERT INTO department (name) VALUES (?)", [input.deptName], function (err, res) {
            if (err) throw err;
            console.table(res)
            mainMenu()
        })
    })
}

// const updateEmployee = () => {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "Which employee?",
//                 name: "empUpdate"
//             },

//             {
//                 type: "input",
//                 message: "Employee's new role?",
//                 name: "updateRole"
//             }
//         ])
//         .then(function (input) {
//             connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [input.updateRole, input.empUpdate], function (err, res) {
//                 if (err) throw err;
//                 console.table(res);
//                 mainMenu();
//             });
//         });
// }






// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
// listen PORT
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}!`);
});