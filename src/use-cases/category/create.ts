import { EntityExists } from "../../errors/entity-exists";
import prisma from "../../prisma";

interface ICategory {
  name: string;
  user_id: string;
}

export class CreateCategoryUseCase {
  async handle(category: ICategory) {
    const categoryExists = prisma.category.findFirst({
      where: {
        name: category.name,
        user_id: category.user_id
      },
    });

    if (!categoryExists) {
      throw new EntityExists("Category already exists.");
    }

    await prisma.category.create({
      data: {
        name: category.name,
        user_id: category.user_id,
      },
    });
  }
}
