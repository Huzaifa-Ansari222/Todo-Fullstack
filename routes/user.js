// view MVC 
//all user api / route here 
import  express, { Router }  from "express";
import { User } from "../models/user.js";
import { getAllusers,  getMyProfile,  login,  logout,  register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

//view user data
router.get('/all', getAllusers)

//register route
router.post('/new',register)

//login route
router.post('/login',login)

//logout route
router.get('/logout',logout)

//login need to see profile
router.get('/me', isAuthenticated, getMyProfile)



export default router 