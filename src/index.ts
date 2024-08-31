import express from "express";
const app = express();

import { userRoutes } from "./https/controllers/user";
import { taskRoutes } from "./https/controllers/task";

import { EntityNotFound } from "./errors/entity-not-found";
import { categoryRoutes } from "./https/controllers/category";

app.use(express.json());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/category", categoryRoutes);

app.use((req: any, res: any, error: any, next: any) => {
  if (error instanceof EntityNotFound) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
    });
  }

  next();
});

app.listen(3333, () => console.log("Server running"));
