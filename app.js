import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js"

const app = express();

const router = express.Router();
// router.post 

//use middleware
app.use(express.json())
app.use("/users" ,userRouter) //add /user in every  userROuter

//connect database 
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName:"BackendTODOapi",
})
.then(() => console.log("database conntecd"))
.catch((e) => console.log(e))


app.get('/', (req, res) => {
    res.send("hi")
})

app.listen(4000,() => {
    console.log("server is working");
})