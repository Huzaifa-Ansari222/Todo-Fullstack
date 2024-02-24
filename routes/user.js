// view MVC 
//all user api / route here 
import  express, { Router }  from "express";
import { User } from "../models/user.js";
import { getAllusers,  getMyProfile,  login,  register } from "../controllers/user.js";

const router = express.Router()

//view user data
router.get('/all', getAllusers)

//register route
router.post('/new',register)

//login route
router.post('/login',login)

//single route for view, login,register
router.get("/me", getMyProfile)



export default router 