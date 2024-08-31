import { Request, Response } from "express";
import { z } from "zod";

import { UpdateCategoriesUseCase } from "../../../use-cases/category/update";
const updateCategoriesUseCase = new UpdateCategoriesUseCase();

const categorySchema = z.object({
  name: z.string().min(1, "Titulo obrigatório"),
});

const categoryParamsSchema = z.object({
  category_id: z.string().uuid(),
})

export class UpdateCategory {
  async execute(request: Request, response: Response) {
    const { name } = categorySchema.parse(request.body);
    const { category_id } = categoryParamsSchema.parse(request.params);

    try {
      await updateCategoriesUseCase.handle({
        name,
        category_id,
      });

      return response.status(201).json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
