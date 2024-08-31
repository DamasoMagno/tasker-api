import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface Token {
  subject: string;
}

export function AuthenticatedUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization?.split(" ")[1];

  try {
    if(!token){
      throw new Error("Unauthorized");
    }
  
    const tokenValid = verify(token, "senha") as Token;
  
    if(!tokenValid){
      throw new Error("Unauthorized");
    }

    request.user = tokenValid.subject;
    return next();
  } catch (error) {
    console.log("Erro") 
  }
}
