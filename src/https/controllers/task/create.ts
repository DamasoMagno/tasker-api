import { Request, Response } from "express";
import { z } from "zod";

import { CreateTaskUseCase } from "../../../use-cases/task/create"
const createTaskUseCase = new CreateTaskUseCase();

const taskSchema = z.object({
  title: z.string().min(1, "Titulo obrigatório"),
  description: z.string().min(1, "Decrição obrigatória"),
  owner_id: z.string().uuid()
});

export class CreateTask {
  async execute(request: Request, response: Response) {
    const task = taskSchema.parse(request.body);

    try {
      await createTaskUseCase.handle(task);
      
      return response.status(201).json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
