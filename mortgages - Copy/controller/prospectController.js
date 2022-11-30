//dboperation ki tarah query ka krdena hai maamla

const sql = require("mssql");
const config = require('../config/serverConfig.js');

// declaring variables
let conn;
let req;
var sqlQuery = require('/variables/Queries.js');

// const HttpStatus = {
//     OK: {code: 200, status: 'OK'},
//     CREATED: {code: 201, status: 'CREATED'},
//     NO_CONTENT: {code: 204, status: 'NO_CONTENT'},
//     BAD_REQUEST: {code: 400, status: 'BAD_REQUEST'},
//     NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
//     INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'}
// }

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

async function getRecord(query) {
    const result = await azureSql.dbOperation(query);
    console.log(result);
    return
}

// async function getRecord(query) {
//     const result = await azureSql.dbOperation(query);
//     if (!results) {
//         res.status(HttpStatus.OK.code)
//         .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status,`No Prospects found`))
//     } else {
//         res.status(HttpStatus.OK.code)
//         .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status,`Prospects retrieved`, {prospects: results}))
//     }
//     console.log(result);
//     return result;
// }


async function insertRecord(query) {
    const result = await azureSql.dbOperation(query);
    console.log(result);
    return
}


module.exports = { 
    dbOperation : dbOperation,
    getRecord : getRecord,
    insertRecord : insertRecord
};