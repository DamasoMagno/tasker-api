import { Request, Response } from "express";
import { z } from "zod";

import { ListCategoriesUseCase } from "../../../use-cases/category/list";
const listCategoriesUseCase = new ListCategoriesUseCase();

const categorySchema = z.object({
  user_id: z.string().uuid(),
});

export class ListCategories {
  async execute(request: Request, response: Response) {
    const { user_id } = categorySchema.parse(request.body);

    try {
      const tasks = await listCategoriesUseCase.handle({ 
        user_id 
      });

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
