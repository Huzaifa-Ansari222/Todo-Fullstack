import { Task }  from "../models/task.js"


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

//updare task
export const  updateTask = async (req, res) => {

    const { id } = req.params;
    const task = await Task.findById(id);

    if(!task) return res.status(404).json({
        success:false,
        message:"Invaild Id or Task not found!"
    })
    //true->false | false->true
    task.isCompleted = !task.isCompleted;
    await task.save();//task val save


    res.status(200).json({
        success: true,
        message:"Task Updated!"
        });
    
}

//delete ask
export const  deleteTask = async (req, res, next) => {
    
    const { id } = req.params;
    const task = await Task.findById(id);

    if(!task) return res.status(404).json({
        success:false,
        message:"Invaild Id or Task not found!"
    })
    await task.deleteOne();//task val remove

    res.status(200).json({
        success: true,
        message:"Task Deleted!"
        });
    
}