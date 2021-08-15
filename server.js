const cTable = require('console.table');

// EXPRESS
const express = require('express');
const inquirer = require('inquirer');
// const { inherits } = require('util');

const DatabaseCall = require('./db/index.js')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



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


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
// listen PORT
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}!`);
});
