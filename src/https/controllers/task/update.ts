import { Request, Response } from "express";
import { z } from "zod";

import { UpdateTaskUseCase } from "../../../use-cases/task/update";
const updateTaskUseCase = new UpdateTaskUseCase();

const taskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const taskParamsSchema = z.object({
  task_id: z.string().uuid()
});

export class UpdateTask {
  async execute(request: Request, response: Response) {
    const { description, title } = taskSchema.parse(request.body);
    const { task_id } = taskParamsSchema.parse(request.params);

    try {
      await updateTaskUseCase.handle({
        task_id,
        description,
        title,
      });

      return response.status(201).json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
