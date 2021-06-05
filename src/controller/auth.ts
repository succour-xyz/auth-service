import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { error } from "winston";
import {
  EMAIL_DUPLICATE,
  EMAIL_NOT_FOUND,
  PASSWORD_MISMATCH,
} from "../constants/messages";
import prisma from "../util/db";
import {
  ENCRYPTION_COMPARE_FAIL,
  ENCRYPTION_FAIL,
} from "./../constants/errors";
import { ENTER_CORRECT_PASSWORD } from "./../constants/messages";
import { SignUpBody } from "./../types/User/index";

export default class Auth {
  /**
   *
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @memberof Auth
   */
  static signUp = async (req: Request, res: Response): Promise<unknown> => {
    const body = req.body as SignUpBody;
    const { name, email, password, confirmPassword } = body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      bcrypt
        .compare(confirmPassword, hashedPassword)
        .then(async (same) => {
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
        })
        .catch((error) => {
          return console.error(ENCRYPTION_FAIL, error);
        });
    } catch (error) {
      return res.sendStatus(406).json({ message: "Error" });
    }
  };

  /**
   *  Logins a User
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @memberof Auth
   */
  static login = async (req: Request, res: Response): Promise<unknown> => {
    const body = req.body as SignUpBody;
    const { email, password } = body;
    try {
      await prisma.user
        .findUnique({ where: { email } })
        .then((result) => {
          if (result) {
            bcrypt
              .compare(password, result.password)
              .then((doMatch) => {
                if (doMatch) {
                  // @ts-ignore
                  req.session.isLoggedIn = true;
                  res.sendStatus(200);
                } else {
                  res.statusCode = 406;
                  res.json({ message: ENTER_CORRECT_PASSWORD, error }).end();
                }
              })
              .catch((error) => {
                return console.error(ENCRYPTION_COMPARE_FAIL, error);
              });
          } else {
            return res.status(404).json({ message: EMAIL_NOT_FOUND }).end();
          }
        })
        .catch((error) => {
          if (error) {
            console.error(error);
          }
        });
    } catch (error) {
      res.json({ message: EMAIL_NOT_FOUND });
      return res.status(404).end();
    }
  };
}
