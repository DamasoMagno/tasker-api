import prisma from "../../prisma";

interface ICategory {
  user_id: string;
}

export class ListCategoriesUseCase {
  async handle(category: ICategory) {
    const categories = await prisma.task.findMany({
      where: {
        user_id: category.user_id,
      },
    });

    return categories;
  }
}
