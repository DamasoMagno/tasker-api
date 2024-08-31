import { EntityNotFound } from "../../errors/entity-not-found";
import prisma from "../../prisma";

interface ITask {
  task_id: string;
}

export class FinishTaskUseCase {
  async handle(task: ITask){
    const taskExists = await prisma.task.findUnique({
      where: {
        id: task.task_id
      }
    })

    if(!taskExists){
      throw new EntityNotFound("Task not found.");
    }

    await prisma.task.update({
      where: {
        id: task.task_id
      },
      data: {
        finished: !taskExists.finished
      }
    })
  }
}