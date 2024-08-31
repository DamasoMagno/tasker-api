import { EntityNotFound } from "../../errors/entity-not-found";
import prisma from "../../prisma";

interface ICategory {
  category_id: string;
  name?: string;
}

export class UpdateCategoriesUseCase {
  async handle(category: ICategory) {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: category.category_id,
      },
    });

    if (!categoryExists) {
      throw new EntityNotFound("Category not found.");
    }

    await prisma.category.update({
      where: {
        id: category.category_id,
      },
      data: {
        name: category.name,
      },
    });
  }
}
