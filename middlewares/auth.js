import { User } from "../models/user.js"
import jwt from "jsonwebtoken"



export const isAuthenticated = async (req, res, next) => {
        //make sure we logged in we acess token by cookie
        const { token } = req.cookies;
        // console.log(token);
    
        if(!token){
        return res.status(404).json({
            success: false,
            message: "Please Login First!",
            })
        }
        // if token exists, verify it
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
        req.user = await User.findById(decoded._id);
        next(); // Call next middleware
}