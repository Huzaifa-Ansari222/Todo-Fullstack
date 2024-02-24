import express from "express"
import { getMyTask, newTask } from "../controllers/task.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

//create task
router.post("/new", isAuthenticated, newTask)

//view task
router.get("/my", isAuthenticated, getMyTask)

//

export default router