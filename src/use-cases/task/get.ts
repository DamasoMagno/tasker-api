import { EntityNotFound } from "../../errors/entity-not-found";
import prisma from "../../prisma";

interface ITask {
  task_id: string;
}

export class GetTaskUseCase {
  async handle(task: ITask){
    const taskExists = await prisma.task.findUnique({
      where: {
        id: task.task_id
      }
    })

    if(!taskExists){
      throw new EntityNotFound("Task not found.");
    }

    return taskExists;
  }
}