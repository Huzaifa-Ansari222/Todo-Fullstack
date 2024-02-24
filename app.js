import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";


export const app = express();

config({
    path:"./data/config.env",
})

//user Router for clean routing
const router = express.Router();

// Use middleware
app.use(express.json()); //1st Parse JSON bodies of incoming requests
app.use(cookieParser()); //0th Use cookie-parser middleware first
app.use("/api/v1/users", userRouter); //2nd Route for users

app.use("/api/v1/task", taskRouter); 



app.get('/', (req, res) => {
    res.send("hi working")
})

// app.use((err,req,res,next) => {

// })

// 4:55hr error handling