import prisma from "../../prisma";

interface ITask {
  owner_id: string;
}

export class ListTaskUseCase {
  async handle(task: ITask) {
    const tasks = await prisma.task.findMany({
      where: {
        user_id: task.owner_id,
      },
    });

    return tasks;
  }
}
