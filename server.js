const express = require('express');
const inquirer = require('inquirer');
require('console.table');
const db = require("./db/connection");

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
            name: "menu",
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
                updateEmployeeRole();
                break;
            case "Quit":
                console.log("Goodbye!")
                db.end();
                break;
        }
    });
}



// VIEW All departments
function viewAllDepartments() {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        mainMenu()
    }
    )

};
// VIEW ALL ROLES
function viewAllRoles() {
    const sql = 'SELECT * FROM role';
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        mainMenu()
    }
    )
};
//VIEW ALL EMPLOYEES
function viewAllEmployees() {
    const sql = 'SELECT * FROM employee';
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        mainMenu()
    }
    )
}
//ADD A ROLE
const addRole = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "New role title?",
                name: "title"
            },
            {
                type: "input",
                message: "New role salary?",
                name: "salary"
            },
            {
                type: "input",
                message: "New role's department ID #?",
                name: "department_id"
            }
        ])
        .then(function (input) {
            db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [input.title, input.salary, input.department_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
        });
}
//ADD AN EMPLOYEE
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "New Employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "New Employee's last name?",
            name: "last_name"
        },
        {
            type: "input",
            message: "New Employee's role ID?",
            name: "role_id"
        },
        {
            type: "input",
            message: "New employee manager's ID #?",
            name: "manager_id"
        }
    ])
        .then(function (input) {

            const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            db.query(sql, [input.first_name, input.last_name, input.role_id, input.manager_id], (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
        });
}
// //CREATE NEW DEPARTMENT
// const createDepartment = () => {
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "New department name?",
//             name: "deptName"
//         }
//     ]).then(function (input) {
//         db.query("INSERT INTO department (name) VALUES (?)", [input.deptName], function (err, res) {
//             if (err) throw err;
//             console.table(res)
//             mainMenu()
//         })
//     })
// }

// UPDATE EMPLOYEE ROLE

const updateEmployeeRole = () => {
    let employeeList = [];
    let roleList = [];

    db.query('SELECT * FROM `employee`', function (err, res) {
        for (let i = 0; i < res.length; i++) {
            employeeList.push(res[i]['first_name']);
        }
    })
    db.query('SELECT * FROM `role`', function (err, res) {
        for (let i = 0; i < results.length; i++) {
            roleList.push(res[i]['title']);
        }
    })

    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee?",
                name: "first_name",
                choices: employeeList
            },

            {
                type: "input",
                message: "Employee's new role?",
                name: "updateRole",
                choices: roleList
            }
        ])
        .then((input) => {
            db.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [input.first_name, input.updateRole], function (err, res) {
                if (err) throw err;
                console.table(res);
                mainMenu();
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
//INIT
mainMenu()