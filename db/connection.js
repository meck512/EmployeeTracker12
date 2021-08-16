const mysql = require('mysql2');
const util = require("util");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shenendoah1234',
    database: 'employeetracker'
  });

  connection.connect();

//   db.query = util.promisify(connection.query);

  module.exports = connection;