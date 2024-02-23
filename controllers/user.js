//controller MVC
//all routes funcs written here
import { User } from "../models/user.js";

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

export const register = async (req, res) => {

    const {name, email, password} = req.body;
    await User.create({
        name ,
        email ,
        password ,
    }) //create user

    res.status(201).cookie("tempi","mssgfrmcok").json({
        success: true,
        message: "Register successful",
    })
}

export const specialFunc = (req, res) => {
    res.json({
        success: true,
        message: "just testing",
    })
}

export const getUserDetails = async(req,res) => {
    // const {id} = req.query;
    const {id} = req.params;
    const user = await User.findById(id);
    // console.log(req.params); //{} empty object without :id
    res.json({
        success: true,
        user,
    })

}