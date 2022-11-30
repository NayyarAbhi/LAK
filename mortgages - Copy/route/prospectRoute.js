import express  from "express";
import {getRecord} from "../controller/prospectController.js";
import { insertRecord } from "../controller/prospectController.js";
const prosRoutes = express.Router()

prosRoutes.route('/')
    .get(getRecord)
    .post(insertRecord);
    
    
export default prosRoutes;