import { Request, Response } from "express";
import { z } from "zod";

import { DeleteTaskUseCase } from "../../../use-cases/task/delete"
const deleteTaskUseCase = new DeleteTaskUseCase();

const taskParamsSchema = z.object({
  task_id: z.string().uuid()
});

export class DeleteTask {
  async execute(request: Request, response: Response) {
    const { task_id } = taskParamsSchema.parse(request.params);

    try {
      await deleteTaskUseCase.handle({
        task_id
      });
      
      return response.status(201).json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
