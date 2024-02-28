import { Task }  from "../models/task.js"
import express from "express"

//create task
export const newTask = async(req, res, next) => {
    const {title, description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user,//login user can add task
    })

    res.status(201).json({
        sucess:true,
        message:"Task added Successfully",
    })
}


//veiw ask
export const  getMyTask = async (req, res) => {
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
        console.error("Error retrieving tasks:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tasks",
            error: error.message
        });
    }
}

// update task
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id or Task not found!"
            });
        }

        // Toggle the completion status of the task
        task.isCompleted = !task.isCompleted;
        await task.save(); // Save the updated task

        res.status(200).json({
            success: true,
            message: "Task Updated!"
        });
    } catch (error) {
        // Handle any errors that might occur during the execution of the function
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the task.",
            error: error.message
        });
    }
}

// delete task
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Invalid Id or Task not found!"
            });
        }

        await task.deleteOne(); // Delete the task

        res.status(200).json({
            success: true,
            message: "Task Deleted!"
        });
    } catch (error) {
        // Handle any errors that might occur during the execution of the function
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the task.",
            error: error.message
        });
    }
}


// //updare task
// export const  updateTask = async (req, res, next) => {

//     const { id } = req.params;
//     const task = await Task.findById(id);

//     //return next(new Error("nice"))
//     if(!task) 
//     return res.status(404).json({
//         success: false,
//         message:"Invaild Id or Task not found!"
//     });
//     //true->false | false->true
//     task.isCompleted = !task.isCompleted;
//     await task.save();//task val save


//     res.status(200).json({
//         success: true,
//         message:"Task Updated!"
//         });
    
// }


// //delete ask
// export const  deleteTask = async (req, res, next) => {
    
//     const { id } = req.params;
//     const task = await Task.findById(id);

//     if(!task) 
//         return res.status(404).json({
//         success: false,
//         message:"Invaild Id or Task not found!"
//     });
//     await task.deleteOne();//task val remove

//     res.status(200).json({
//         success: true,
//         message:"Task Deleted!"
//         });
    
// }
//add taks 
