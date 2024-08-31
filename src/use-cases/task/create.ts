import { EntityNotFound } from "../../errors/entity-not-found";
import prisma from "../../prisma";

interface ITask {
  title: string;
  description: string;
  owner_id: string;
}

export class CreateTaskUseCase {
  async handle(task: ITask) {
    const user = prisma.user.findUnique({
      where: {
        id: task.owner_id,
      },
    });

    if (!user) {
      throw new EntityNotFound("User not found.");
    }

    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        user_id: task.owner_id,
      },
    });
  }
}
