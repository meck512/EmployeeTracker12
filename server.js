
const cTable = require('console.table');
const mysql = require('mysql2');
const DatabaseCall = require('./db/index.js')
// const { inherits } = require('util');

// EXPRESS
const express = require('express');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MAIN MENU PROMPT
const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Choose action:",
            choices: ["View all departments", "View all roles", "View all Employees", "Add a role", "Add an Employee", "Update an employee role", "Quit"],
        },
    ]).then(function (choice) {
        // console.log("Current Action:" + result.choice);

        switch (choice) {
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
                console.log("QUUIITT");
                break;
        }
    });
}

//INIT
mainMenu()


function addDepartment() {
    inquirer.prompt({

        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function (answer) {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
        })
    })
}

function addRole() {
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
        .then(function (answer) {


            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
                if (err) throw err;
                console.table(res);
                startScreen();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the first name of the employee?",
                name: "eeFirstName"
            },
            {
                type: "input",
                message: "What's the last name of the employee?",
                name: "eeLastName"
            },
            {
                type: "input",
                message: "What is the employee's role id number?",
                name: "roleID"
            },
            {
                type: "input",
                message: "What is the manager id number?",
                name: "managerID"
            }
        ])
        .then(function (answer) {


            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function (err, res) {
                if (err) throw err;
                console.table(res);
                startScreen();
            });
        });
}

//Since we're using inquirer, we can pass the query into the method as an array

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "eeUpdate"
            },

            {
                type: "input",
                message: "What do you want to update to?",
                name: "updateRole"
            }
        ])
        .then(function (answer) {
            // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
            //let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
            //console.log(query);

            connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.eeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                startScreen();
            });
        });
}


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
// listen PORT
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}!`);
});