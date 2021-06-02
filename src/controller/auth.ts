import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { SignUpBody } from "./../types/User/index";
const prisma = new PrismaClient();
export default class Auth {
  static postSignUp = async (req: Request, res: Response): Promise<unknown> => {
    const body = req.body as SignUpBody;
    const { email, name } = body;
    const result = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return res.sendStatus(200).json(result);
  };
}
