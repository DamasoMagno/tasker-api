import { Request, Response } from "express";
import { z } from "zod";

import { FinishTaskUseCase } from "../../../use-cases/task/finish"
const finishTaskUseCase = new FinishTaskUseCase();

const taskParamsSchema = z.object({
  task_id: z.string().uuid()
});

export class FinishTask {
  async execute(request: Request, response: Response) {
    const { task_id } = taskParamsSchema.parse(request.params);

    try {
      await finishTaskUseCase.handle({
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
