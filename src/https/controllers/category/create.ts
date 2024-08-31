import { Request, Response } from "express";
import { z } from "zod";

import { CreateCategoryUseCase } from "../../../use-cases/category/create";
const createCategoryUseCase = new CreateCategoryUseCase();

const categorySchema = z.object({
  name: z.string().min(1, "Titulo obrigatório"),
  user_id: z.string().uuid(),
});

export class CreateCategory {
  async execute(request: Request, response: Response) {
    const { name, user_id } = categorySchema.parse(request.body);

    try {
      await createCategoryUseCase.handle({
        name,
        user_id,
      });

      return response.status(201).json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
