import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { error } from "winston";
import IAuth from "../IAuth";
import {
  EMAIL_DUPLICATE,
  EMAIL_NOT_FOUND,
  INVALID_EMAIL_OR_PASSWORD,
  PASSWORD_MISMATCH,
} from "../../constants/messages";
import prisma from "../../util/db";
import {
  ENCRYPTION_COMPARE_FAIL,
  ENCRYPTION_FAIL,
} from "../../constants/errors";
import { LoginType, SignUpBody } from "../../types/User";
import { Service } from "typedi";

declare module "express-session" {
  interface Session {
    isLoggedIn: boolean;
    user: LoginType;
  }
}

@Service()
export default class AuthImpl implements IAuth {
  /**
   * Signup
   * @static
   * @param req
   * @param res
   */
  signUp: (req: Request, res: Response) => Promise<unknown> = async (
    req: Request,
    res: Response
  ): Promise<unknown> => {
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
              const err = new Error(EMAIL_DUPLICATE);
              res.json({ message: EMAIL_DUPLICATE });
              res.status(409).end();
              throw err;
            }
          } else {
            const err = new Error(PASSWORD_MISMATCH);
            res.sendStatus(406).json({ message: PASSWORD_MISMATCH });
            throw err;
          }
        })
        .catch((error) => {
          const err = new Error(ENCRYPTION_FAIL);
          console.error(ENCRYPTION_FAIL, error);
          throw err;
        });
    } catch (error) {
      return res.json({ message: error }).sendStatus(406);
    }
  };

  /**
   *  Logins a User
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthImpl
   */
  login: (req: Request, res: Response) => Promise<unknown> = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const body = req.body as SignUpBody;
    const { email, password } = body;
    try {
      await prisma.user
        .findUnique({ where: { email } })
        .then((user) => {
          if (user) {
            bcrypt
              .compare(password, user.password)
              .then((doMatch) => {
                if (doMatch) {
                  req.session.isLoggedIn = true;
                  req.session.user = user;
                  res.sendStatus(200);
                } else {
                  const err = new Error(INVALID_EMAIL_OR_PASSWORD);
                  res.statusCode = 406;
                  res.json({ message: INVALID_EMAIL_OR_PASSWORD, error }).end();
                  throw err;
                }
              })
              .catch((error) => {
                const err = new Error(ENCRYPTION_COMPARE_FAIL);
                console.error(ENCRYPTION_COMPARE_FAIL, error);
                throw err;
              });
          } else {
            const err = new Error(EMAIL_NOT_FOUND);
            res.json({ message: EMAIL_NOT_FOUND }).sendStatus(404).end();
            throw err;
          }
        })
        .catch((error) => {
          if (error) {
            console.error(error);
          }
        });
    } catch (error) {
      const err = new Error(EMAIL_NOT_FOUND);
      res.json({ message: EMAIL_NOT_FOUND });
      res.status(404).end();
      throw err;
    }
  };

  /**
   * Logout
   * @static
   * @param req
   * @param res
   */
  logout: (req: Request, res: Response) => void = (
    req: Request,
    res: Response
  ) => {
    req.session.destroy(() => {
      return res.sendStatus(204);
    });
  };
}
