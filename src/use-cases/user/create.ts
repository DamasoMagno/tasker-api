import { hash } from "bcryptjs";
import prisma from "../../prisma";

interface IUser {
  username: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async handle(user: IUser){
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    });

    if(userAlreadyExists){
      throw new Error("User already registered on system.");
    }

    const passwordHashed = await hash(user.password, 6)

    await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: passwordHashed,
        created_at: new Date()
      }
    })
  }
}