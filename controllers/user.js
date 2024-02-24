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



// getUserdetail func
export const getMyProfile = async (req, res) => {

    const id = "myid";

    //we have cookie &login
    const {token} = req.cookies;
    console.log(token);

    // const user = await User.findById(id);
    res.status(200).json({
        success:true,
        user,
    })
}




































































// export const register = async (req, res) => {

//     const {name, email, password} = req.body;
//     await User.create({
//         name ,
//         email ,
//         password ,
//     }) //create user

//     res.status(201).cookie("tempi","mssgfrmcok").json({
//         success: true,
//         message: "Register successful",
//     })
// }



// export const getUserDetails = async(req,res) => {
//     // const {id} = req.query;
//     const {id} = req.params;
//     const user = await User.findById(id);
//     // console.log(req.params); //{} empty object without :id
//     res.json({
//         success: true,
//         user,
//     })
// }


// export const updateUser = async(req,res) => {
//    // const {id} = req.query;
//     const {id} = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success: true,
//         message: "updated",
//     })
// }



// export const deleteUser =  async (req, res) => {
//     try {
//         // Call the deleteUser function and pass the request and response objects
//         const {id} = req.params;
//         const user = await User.findById(id);
    
//         await user.deleteOne()
//             res.json({
//         success: true,
//         message: "delete",
//     })
//         } catch (error) {
//         // Handle any errors that occur during the deletion process
//         console.error("Error deleting user:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete user",
//             error: error.message
//         });
//     }
// };


