import { Router } from "express";
const taskRoutes = Router();

import { CreateTask } from "./create";
import { UpdateTask } from "./update";
import { FinishTask } from "./finish";
import { DeleteTask } from "./delete";
import { GetTask } from "./get";
import { ListTasks } from "./list";

const createTask = new CreateTask();
const updateTask = new UpdateTask();
const deleteTask = new DeleteTask();
const getTask = new GetTask();
const listTask = new ListTasks();
const finishTask = new FinishTask();

taskRoutes.post("/", createTask.execute);
taskRoutes.patch("/:taskId", updateTask.execute);
taskRoutes.get("/", listTask.execute);
taskRoutes.delete("/:taskId", deleteTask.execute);
taskRoutes.get("/:taskId", getTask.execute);
taskRoutes.patch("/:taskId", finishTask.execute);

export { taskRoutes };
