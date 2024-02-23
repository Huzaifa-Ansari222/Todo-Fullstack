//Model MVC
//all schema written here
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
},{timestamps:true})
//make model
export const User = mongoose.model("User" ,userSchema)
