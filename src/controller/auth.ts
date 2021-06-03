import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../util/db";
import { SignUpBody } from "./../types/User/index";
import {PASSWORD_MISMATCH, EMAIL_DUPLICATE} from "../constants/message"

export default class Auth {
  static signUp = async (req: Request, res: Response): Promise<unknown> => {
    const body = req.body as SignUpBody;
    const { name, email, password, confirmPassword } = body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      bcrypt.compare(confirmPassword, hashedPassword).then(async (same) => {
        if (same) {
          try {
            const result = await prisma.user.create({
              data: {
                email,
                password: hashedPassword,
                name,
              },
            });
            return res.sendStatus(201).json(result);
          } catch (error) {
            res.json({ message: EMAIL_DUPLICATE });
            return res.status(409).end();
          }
        } else {
          return res.sendStatus(406).json({ message: PASSWORD_MISMATCH });
        }
      });
    } catch (error) {
      return res.sendStatus(406).json({ message: "Error" });
    }
  };

  static login = async (req: Request, res: Response): Promise<unknown> => {
    const body = req.body as SignUpBody;
    const email = body.email;

    const result = await prisma.user
      .findUnique({ where: { email } })
      .then((result) => {
        if (result?.password === body.password)
          return res.sendStatus(200).json(result);
      })
      .catch((err) => {
        if (err) return res.sendStatus(404).json(err);
      });

    return result;
  };
}
