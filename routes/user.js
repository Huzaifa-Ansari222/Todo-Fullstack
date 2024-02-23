//all user api here
import  express, { Router }  from "express";
import { User } from "../models/user.js";

const router = express.Router()

//make user dta / register
router.get('/all', async (req, res) => {
    console.log(req.query);
    const keywordv = req.query.email //get query key value
    console.log(keywordv)
    const users = await User.find({}) //find Allusers
    // console.log(users);
    res.json({
        success: true, 
        users, //pass users here
    })
})

router.post('/new', async (req, res) => {

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
})

router.get("/userid/special", (req, res) => {
    res.json({
        success: true,
        message: "just testing",
    })
})


//dynamic url :id put it on last
router.get("/userid/:id",async(req,res) => {
    // const {id} = req.query;
    const {id} = req.params;
    const user = await User.findById(id);
    // console.log(req.params); //{} empty object without :id
    res.json({
        success: true,
        user,
    })

})

export default router