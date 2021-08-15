// const connection = require("./connection");
// const cTable = require('console.table');

// class DatabaseCall {
//     constructor(connection) {
//         this.connection = connection;
//     }

//     // viewAllDepartments() {
 
//     //     // return this.connection.query(`SELECT * FROM department`, response);
//     // }

//     // viewAllRoles(response) {
//     //     return this.connection.query(`SELECT * FROM role`, response);
//     // }

//     // viewAllEmployees() {
//     //     return this.connection.query(`SELECT * FROM employee`, function (err, res) {
//     //         if (err) throw err;
//     //         console.table(res);
//     //         mainMenu();
//     //     }
//     //     )
//     // }
//     // // ????
//     // addRole(response) {
//     //     return this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', response);
//     // }
//     // // ????
//     // addEmployee() {
//     //     return this.connection.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)', response);
//     // }
//     // updateEmployeeRole() {
//     //     // ?????
//     // }

//     // quit() {
//     //     connection.end();
//     //     process.exit();
//     // }


//     // findOneDepartment(response) {
//     //     return this.connection.query(`SELECT * FROM department WHERE id = ?`, response);
//     // }

//     // deleteDepartment(response) {
//     //     return this.connection.query(`DELETE * FROM department WHERE id = ?`, response);
//     // }

//     // createDepartment(response) {
//     //     return this.connection.query(`INSERT INTO department (name) VALUES (?)`, response);
//     // }


// }


// module.exports = new DatabaseCall();



// // // Get all departments
// // app.get('/api/department', (req, res) => {
// //     const sql = `SELECT * FROM department`;

// //     db.query(sql, (err, rows) => {
// //       if (err) {
// //         res.status(500).json({ error: err.message });
// //         return;
// //       }
// //       res.json({
// //         message: 'success',
// //         data: rows
// //       });
// //     });
// //   });

// //   // Get a single department
// // app.get('/api/department/:id', (req, res) => {
// //     const sql = `SELECT * FROM department WHERE id = ?`;
// //     const params = [req.params.id];

// //     db.query(sql, params, (err, row) => {
// //       if (err) {
// //         res.status(400).json({ error: err.message });
// //         return;
// //       }
// //       res.json({
// //         message: 'success',
// //         data: row
// //       });
// //     });
// //   });

// //   // Delete a department
// // app.delete('/api/department/:id', (req, res) => {
// //     const sql = `DELETE FROM department WHERE id = ?`;
// //     const params = [req.params.id];

// //     db.query(sql, params, (err, result) => {
// //       if (err) {
// //         res.statusMessage(400).json({ error: res.message });
// //       } else if (!result.affectedRows) {
// //         res.json({
// //           message: 'Department not found'
// //         });
// //       } else {
// //         res.json({
// //           message: 'deleted',
// //           changes: result.affectedRows,
// //           id: req.params.id
// //         });
// //       }
// //     });
// //   });

// //   // Create a department
// // app.post('/api/department', ({ body }, res) => {
// //     const errors = inputCheck(
// //       body,
// //       'first_name',
// //       'last_name',
// //       'industry_connected'
// //     );
// //     if (errors) {
// //       res.status(400).json({ error: errors });
// //       return;
// //     }

// //     const sql = `INSERT INTO department (name)
// //       VALUES (?)`;
// //     const params = [body.name];

// //     db.query(sql, params, (err, result) => {
// //       if (err) {
// //         res.status(400).json({ error: err.message });
// //         return;
// //       }
// //       res.json({
// //         message: 'success',
// //         data: body
// //       });
// //     });
// //   });