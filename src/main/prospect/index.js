const express = require("express");
const bodyParser = require('body-parser');
const azureSql = require('../utils/azureSql.js');

// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 9015;
let server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


// get the record, if the prospect id exist in the system
app.get("/prospect", async function (req, res) {
    let id = req.query.id;
    sql = `SELECT * FROM TestSchema.Intent WHERE ProspectId = ${id}`
    const result = await azureSql.dbOperation(sql);
    if (result.rowsAffected[0] === 1) {
        res.status(200)
            .json(result.recordset)
    }
    else {
        res.status(404)
            .json({ message: `Prospect id: ${id}, does not exist in the system` })
    }
})