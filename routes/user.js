// view MVC 
//all user api / route here 
import  express, { Router }  from "express";
import { User } from "../models/user.js";
import { getAllusers, getUserDetails, register, specialFunc } from "../controllers/user.js";

const router = express.Router()

//view user data
router.get('/all', getAllusers)

//make user data / register
router.post('/new',register )

router.get("/userid/special", specialFunc)

//dynamic url :id put it on last
router.get("/userid/:id", getUserDetails)

export default router 