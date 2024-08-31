import { EntityNotFound } from "../../errors/entity-not-found";
import prisma from "../../prisma";

interface ITask {
  task_id: string;
  title?: string;
  description?: string;
}

export class UpdateTaskUseCase {
  async handle(task: ITask){
    const taskExists = await prisma.task.findUnique({
      where: {
        id: task.task_id
      }
    })

    if(!taskExists){
      throw new EntityNotFound("Task not found.");
    }

    const { task_id, ...updates } = task

    await prisma.task.update({
      where: {
        id: task_id
      },
      data: updates
    })
  }
}