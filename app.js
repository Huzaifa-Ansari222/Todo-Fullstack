import express from "express";
import userRouter from "./routes/user.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
    path:"./data/config.env",
})

//user Router for clean routing
const router = express.Router();

//use middleware
app.use(express.json())//1st
//using route
app.use("/api/v1/users" ,userRouter)//2nd //add /user in every  userROuter
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("hi working")
})

