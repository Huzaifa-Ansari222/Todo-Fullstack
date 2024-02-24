//Model MVC
//all schema written here
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
    type: String,
    required: true,
    select: false,// manual select
    },
},{timestamps:true})
//make model
export const User = mongoose.model("User" ,userSchema)
