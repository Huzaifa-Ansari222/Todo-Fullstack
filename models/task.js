//Model MVC
//all schema written here
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    },
    description: {
    type: String,
    required: true,
    },
    isCompleted: {
    type: Boolean,
    default: false,
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    }
},{timestamps:true})
//make model
export const Task = mongoose.model("Task" ,taskSchema)
