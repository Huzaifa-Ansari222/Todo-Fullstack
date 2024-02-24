//controller MVC
//all routes funcs written here
import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/feature.js";

export const getAllusers =async (req, res) => {
    console.log(req.query);
    const keywordv = req.query.email //get query key value
    console.log(keywordv)
    const users = await User.find({}) //find Allusers
    // console.log(users);
    res.json({
        success: true, 
        users, //pass users here
    })
}

//login func
export const login = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password")//alldata + password /srch by email
    //if user does not exist
    if (!user)
    return res.status(404).json({
    success: false,
    message: "Invalid email or password",
    })

    const isMatch = await bcrypt.compare(password,user.password)//normal data , encrypted data
    if (!isMatch)
    return res.status(404).json({
    success: false,
    message: "Invalid email or password",
    })
    //if match
    sendCookie(user,res,`welcome back, ${user.name}`,200)
}


//register func
export const register = async (req, res, next) => {

    const {name, email, password }= req.body;

    let user = await User.findOne({
        email
    })
    //if user exist
    if (user) 
    return res.status(404).json({
        success: false,
        message: "User already exist",
    })
    const hashedPassword = await bcrypt.hash(password,10)
    //user not exist
    user = await User.create({
        name,
        email,
        password:hashedPassword 
    })
    sendCookie(user, res, "Register Successfully",201);

}

// getMyProfile func
export const getMyProfile =  (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
}

//logut func
export const logout = (req, res) => {
    //empty cookie to logout
    res
        .status(200)
        .cookie(
            "token",
            "",//empty cookie
            {expire:new Date(Date.now())} //expire 
        )
        .json({
        success: true,
        user: req.user,
    })
}


