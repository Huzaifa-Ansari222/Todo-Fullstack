import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"


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
app.use(
    cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET","POST","PUT","DELETE"],
    credentails: true,//api work but not cookie /headers for frontend
    })
) //pass option and domain{} 
// if req come from same domain then it respones else not

app.use("/api/v1/task", taskRouter); 



app.get('/', (req, res) => {
    res.send("hi working")
})

//error handler
// app.use((err, req, res, next) => {
//     return  res.status(404).json({
//         success: false,
//         message:"Invaild Id or Task not found!"
//     });
// })

// 4:55hr error handling