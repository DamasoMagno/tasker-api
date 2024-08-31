import { Request, Response } from "express";
import { z } from "zod";

import { GetCategoryUseCase } from "../../../use-cases/category/get";
const getCategoryUseCase = new GetCategoryUseCase();

const categoryParamsSchema = z.object({
  category_id: z.string().uuid(),
})

export class GetCategory {
  async execute(request: Request, response: Response) {
    const { category_id } = categoryParamsSchema.parse(request.params);

    try {
      const task = await getCategoryUseCase.handle({ 
        category_id 
      });

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
