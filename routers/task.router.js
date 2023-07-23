import express from "express";
import {
  getTask,
  addTask,
  getTaskList,
  completeTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.get("/get-task/:task_id", getTask);

taskRouter.post("/add-task", addTask);

taskRouter.get("/task-list", getTaskList);

taskRouter.put("/complete-task/:task_id", completeTask);

taskRouter.delete("/delete-task/:task_id", deleteTask);

taskRouter.put("/update-task/:task_id", updateTask);

export default taskRouter;
