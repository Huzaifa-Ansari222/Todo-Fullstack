import { Task }  from "../models/task.js"
import ErrorHandler from "../middlewares/error.js";
// import express from "express"

//create task
export const newTask = async(req, res, next) => {
try{
    const {title, description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user,//login user can add task
    })

    res.status(201).json({
        sucess:true,
        message:"Task added Successfully",
    });
} catch (error) {
    next(error);
    }
};


//veiw task
export const  getMyTask = async (req, res,next) => {
    //show user task to same login user
try {
        //show user tasks for the same logged-in user
        const userId = req.user._id; //get _id of the logged-in user
        const tasks = await Task.find({ user: userId }); //find tasks of the user

        res.status(200).json({
            success: true,
            tasks: tasks, //provide tasks array here
        });
} catch (error) {
        next(error);
    }
};


// update task
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Task not found", 404));

        // Toggle the completion status of the task
        task.isCompleted = !task.isCompleted;
        await task.save(); // Save the updated task

        res.status(200).json({
            success: true,
            message: "Task Updated!"
        });
} catch (error) {
        next(error);
    }
};


// delete task
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Task not found", 404));

        await task.deleteOne(); // Delete the task

        res.status(200).json({
            success: true,
            message: "Task Deleted!"
        });
    } catch (error) {
        next(error);
    }
};



