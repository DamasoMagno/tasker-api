import { Request, Response } from "express";
import { z } from "zod";

import { GetTaskUseCase } from "../../../use-cases/task/get";
const getTaskUseCase = new GetTaskUseCase();

const taskParamsSchema = z.object({
  task_id: z.string().uuid()
});

export class GetTask {
  async execute(request: Request, response: Response) {
    const { task_id } = taskParamsSchema.parse(request.params);

    try {
      const task = await getTaskUseCase.handle({ task_id });

      return response.status(200).json({
        task,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
