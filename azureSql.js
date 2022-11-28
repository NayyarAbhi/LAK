// Import the mssql package
var sql = require("mssql");

// declaring variables
var conn;
let req;

// Create a configuration object for our Azure SQL connection parameters
var dbConfig = {
 server: "<servername>",
 database: "<dbname>", 
 user: "<username>",
 password: "<password>",
 port: 1433,
 options: {
       encrypt: true
   }
};

function setConnection() {
    conn = new sql.ConnectionPool(dbConfig);
}

function closeConnection() {
    conn.close();
}

function setRequest() {
    req = new sql.Request(conn);
}

function getRecord(query) {
    conn.connect()
    .then(function () {
      req.query(query)
      .then(function (recordset) {
        closeConnection();
        console.log(recordset);
      })
      .catch(function (err) {
        console.log(err);
        closeConnection();
      })
    })
    .catch(function (err) {
      console.log(err);
      closeConnection();
    });
}

var query = "SELECT TOP 2 * FROM [SalesLT].[Customer]";
setConnection();
setRequest();
getRecord(query);
