import express from "express"
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

//create task
router.post("/new", isAuthenticated, newTask)

//view task
router.get("/my", isAuthenticated, getMyTask)

//dynamic url
//update=put ; delete
router
    .route("/:id")
    .put( isAuthenticated, updateTask)
    .delete( isAuthenticated, deleteTask)

export default router