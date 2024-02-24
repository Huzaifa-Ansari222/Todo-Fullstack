//connect database 
import mongoose from "mongoose";


export const connectDB = () =>{
mongoose
    .connect(process.env.MONGO_URI, {
    dbName:"BackendTODOapi",
})
.then(() => console.log("database conntecd"))
.catch((e) => console.log(e));
};