import express from "express";
import mongoose from "mongoose";

const app = express();

//use middleware
app.use(express.json())

//connect database 
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName:"BackendTODOapi",
})
.then(() => console.log("database conntecd"))
.catch((e) => console.log(e))

//make schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
},{timestamps:true})
//make model
const User = mongoose.model("User" ,userSchema)

app.get('/', (req, res) => {
    res.send("hi")
})

//API set
//make user dta
app.get('/users/all', async (req, res) => {

    const users =await User.find({}) //find Allusers

    res.json({
        success: true,
        users: [], //pass users here
    })
})
app.post('/users/new', async (req, res) => {

    const {name, email, password} = req.body;
    await User.create({
        name ,
        email ,
        password ,
    }) //create user

    res.status(201).json({
        success: true,
        message: "Register successful",
    })
})


app.listen(4000,() => {
    console.log("server is working");
})