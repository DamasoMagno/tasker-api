import { Request, Response } from "express";
import { z } from "zod";

import { DeleteCategoryUseCase } from "../../../use-cases/category/delete"
const deleteCategoryUseCase = new DeleteCategoryUseCase();

const categoryParamsSchema = z.object({
  category_id: z.string().uuid(),
})

export class DeleteCategory {
  async execute(request: Request, response: Response) {
    const { category_id } = categoryParamsSchema.parse(request.params);

    try {
      await deleteCategoryUseCase.handle({
        category_id
      });
      
      return response.status(201).json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
