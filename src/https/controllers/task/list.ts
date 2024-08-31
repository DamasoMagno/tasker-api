import { Request, Response } from "express";
import { z } from "zod";

import { ListTaskUseCase } from "../../../use-cases/task/list";
const listTaskUseCase = new ListTaskUseCase();

const taskSchema = z.object({
  owner_id: z.string().uuid(),
});

export class ListTasks {
  async execute(request: Request, response: Response) {
    const { owner_id } = taskSchema.parse(request.body);

    try {
      const tasks = await listTaskUseCase.handle({ owner_id });

      return response.status(200).json({
        tasks,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
