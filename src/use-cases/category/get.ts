import { EntityNotFound } from "../../errors/entity-not-found";
import prisma from "../../prisma";

interface ICategory {
  category_id: string;
}

export class GetCategoryUseCase {
  async handle(category: ICategory){
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: category.category_id
      }
    })

    if(!categoryExists){
      throw new EntityNotFound("Category not found.");
    }

    return categoryExists;
  }
}