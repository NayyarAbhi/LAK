// Importing packages
const sql = require("mssql");
const conf = require('../config/serverConfig.js');

// declaring variables
let conn;
let req;

// initiating azure sql connection
function setConnection() {
  conn = new sql.ConnectionPool(conf.dbConfig);
}

// closing azure sql connection
function closeConnection() {
  conn.close();
}

function setRequest() {
  req = new sql.Request(conn);
}

function dbOperation(sql) {
  setConnection();
  setRequest();
  return conn.connect()
    .then(function () {
      const response = req.query(sql)
        .then(function (recordset) {
          closeConnection();
          return recordset;
        })
        .catch(function (err) {
          console.log(err);
          closeConnection();
        })
      return response;
    })
    .catch(function (err) {
      console.log(err);
      closeConnection();
    });
}

// exporting modules, to be used in the other .js files
module.exports = { dbOperation };
