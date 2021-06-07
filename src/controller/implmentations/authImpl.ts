import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Service } from "typedi";
import { getConnection } from "typeorm";
import { error } from "winston";
import {
  ENCRYPTION_COMPARE_FAIL,
  ENCRYPTION_FAIL,
} from "../../constants/errors";
import {
  EMAIL_DUPLICATE,
  EMAIL_NOT_FOUND,
  INVALID_EMAIL_OR_PASSWORD,
  PASSWORD_MISMATCH,
} from "../../constants/messages";
import { LoginType, SignUpBody } from "../../types/User";
import IAuth from "../IAuth";
import { User } from "./../../entity/User";
declare module "express-session" {
  interface Session {
    isLoggedIn: boolean;
    user: LoginType;
  }
}

@Service()
export default class AuthImpl implements IAuth {
  private userRepository = getConnection().getRepository(User);

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
    const { password, confirmPassword } = body;

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
              this.userRepository
                .save(body)
                .then((result) => res.json(result).sendStatus(201));
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
      await this.userRepository
        .findOne(email)
        .then((user: any) => {
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
        .catch((error: any) => {
          if (error) {
            console.error(error);
          }
        });
    } catch (error) {
      console.error(EMAIL_NOT_FOUND, error);
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
