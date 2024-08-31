import { Request, Response } from "express";
import { z } from "zod";

import { CreateUserUseCase } from "../../../use-cases/user/create";
const createUserUseCase = new CreateUserUseCase();

const userSchema = z.object({
  username: z.string().min(1, "Nome obrigatório"),
  email: z.string().min(1, "Email obrigatório"),
  password: z.string().min(6, "MInimo de 6 caracteres exigidos"),
});

export class CreateUser {
  async execute(request: Request, response: Response) {
    const user = userSchema.parse(request.body);

    try {
      await createUserUseCase.handle(user);

      return response.status(201).json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
