//main file is server.js
import { app } from "./app.js";
import { connectDB } from "./data/database.js";


//connect database 
connectDB();

// console.log(process.env.PORT); //4000
app.listen(process.env.PORT || 4000,() => {
    console.log("server is working");
})

