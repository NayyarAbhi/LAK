import express, { request } from 'express';
import ip from 'ip';
import cors from 'cors';
import dotenv from 'dotenv';
import Response from './domain/response.js';
import prospectsRoutes from './route/prospectRoute.js';
import HttpStatus, { dbOperation } from './controller/prospectController.js';
import prospectController from './controller/prospectController.js';
const Db = require('/model/prospectDetails.js');
const controller = require('/controller/prospectController.js')
const bodyParser = require('body-parser');
const Router = express.Router();
const sqlQuery = require('/variables/Queries.js');


console.log('dfc')

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/prospects',prospectsRoutes)

prospectsRoutes.get('/',async (req,res) => {
    prospectController.getRecord(query = sqlQuery.SELECT_PROSPECT).then(result =>{
        response.json(result[0]);
    })
});

prospectsRoutes.post('/', (req,res) =>{
    let prospect = {...request.body}
    prospectController.insertRecord(prospect).then(result => {
        response.status(201).json(result);
    })
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Prospect API is running at ' + port);
