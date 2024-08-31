import prisma from "../../prisma";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IUser {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async handle(user: IUser) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    // Checking if exists some user with this email
    if (!userAlreadyExists) {
      throw new Error("Email/Senha incorreto.");
    }

    const passwordIsValid = await compare(
      user.password,
      userAlreadyExists.password
    );

    // Checking if exists the password vinculed to this email is the same to password sended
    if (!passwordIsValid) {
      throw new Error("Email/Senha incorreto.");
    }

    // Creating a Token with user id as subject and validation to 7 days
    const token = sign({}, "senha", {
      subject: userAlreadyExists.id,
      expiresIn: "7d",
    });

    return {
      user: userAlreadyExists,
      token: token
    }
  }
}
