//connect database 
import mongoose from "mongoose";


export const connectDB = () =>{
mongoose
    .connect(process.env.MONGO_URI, {
    dbName:"BackendTODOapi",
})
.then((c) => console.log(`database connected ${c.connection.host}`))
.catch((e) => console.log("error:",e));
};