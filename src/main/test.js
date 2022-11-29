// Importing packages
const azureSql = require('./utils/azureSql.js');

// create schema in the db
async function createSchema(sql) {
    const result = await azureSql.dbOperation(sql);
    console.log(result);
    return
}

// create table in the db
async function createTable(sql) {
    const result = await azureSql.dbOperation(sql);
    console.log(result);
    return
}

// insert record in the db
async function insertRecord(sql) {
    const result = await azureSql.dbOperation(sql);
    console.log(result);
    return
}

// get record from the db
async function getRecord(sql) {
    const result = await azureSql.dbOperation(sql);
    console.log(result);
    return
}

// update record in the db
async function updateRecord(sql) {
    const result = await azureSql.dbOperation(sql);
    console.log(result);
    return
}

/* 
Sql Operation
*/
// let createSchemaSql = "CREATE SCHEMA TestSchema";
// let createTableSql = "CREATE TABLE TestSchema.Table1 (PersonID int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255))";
// let insertSql = "INSERT INTO TestSchema.Table1 (PersonID, LastName, FirstName, Address, City) VALUES (1, 'Nayyar', 'Abhi', 'Street1', 'Swindon'), (2, 'Singh', 'Ankush', 'Street2', 'London'), (3, 'Kumar', 'Ravi', 'Street3', 'Reading')"
let readSql = "SELECT * FROM [SalesLT].[Customer] WHERE CustomerID = 1";
// let updateSql = "UPDATE [SalesLT].[Customer] SET FirstName = 'ABHISHEK' WHERE CustomerID = 1"

// createSchema(createSchemaSql)
// createTable(createTableSql)
// insertRecord(insertSql)
getRecord(readSql);
// updateRecord(updateSql);

