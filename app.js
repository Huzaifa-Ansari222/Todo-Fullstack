import express from "express";
import userRouter from "./routes/user.js"
import { config } from "dotenv";

export const app = express();

config({
    path:"./data/.env",
})

//user Router for clean routing
const router = express.Router();

//use middleware
app.use(express.json())
app.use("/users" ,userRouter) //add /user in every  userROuter

app.get('/', (req, res) => {
    res.send("hi")
})

