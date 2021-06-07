import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { error } from "winston";
import {
  EMAIL_DUPLICATE,
  EMAIL_NOT_FOUND,
  INVALID_EMAIL_OR_PASSWORD,
  PASSWORD_MISMATCH,
} from "../../constants/messages";
import {
  ENCRYPTION_COMPARE_FAIL,
  ENCRYPTION_FAIL,
} from "../../constants/errors";
import { LoginType, SignUpBody } from "../../types/User";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import IAuth from "../IAuth";
declare module "express-session" {
  interface Session {
    isLoggedIn: boolean;
    user: LoginType;
  }
}

export default class Auth implements IAuth {
  /**
   * @remarks
   * Repository - User Repository
   */
  private userRepository = getRepository(User);

  /**
   * Signup
   * @param req - Signup Request
   * @param res - Signup Response
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
              const result = await this.userRepository.save({
                email,
                password: hashedPassword,
                name,
              });

              return res.sendStatus(201).json(result);
            } catch (error) {
              res.json({ message: EMAIL_DUPLICATE });
              return res.status(409).end();
            }
          } else {
            res.sendStatus(406);
            res.json({ message: PASSWORD_MISMATCH }).end();
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
   * Login
   * @param req - Login Request
   * @param res - Login Response
   */
  login: (req: Request, res: Response) => Promise<unknown> = async (
    req: Request,
    res: Response
  ): Promise<unknown> => {
    const body = req.body as SignUpBody;
    const { email, password } = body;
    try {
      await this.userRepository
        .findOne({ email })
        .then((user: User | undefined) => {
          if (user) {
            bcrypt
              .compare(password, user.password)
              .then((doMatch) => {
                if (doMatch) {
                  req.session.isLoggedIn = true;
                  req.session.user = user;
                  //Not required right now
                  // console.log(req.csrfToken());
                  // req.csrfToken();
                  // res.cookie("XSRF-TOKEN", req.csrfToken());
                  res.sendStatus(200);
                } else {
                  res.statusCode = 406;
                  res.json({ message: INVALID_EMAIL_OR_PASSWORD, error }).end();
                }
              })
              .catch((error) => {
                return console.error(ENCRYPTION_COMPARE_FAIL, error);
              });
          } else {
            return res.status(404).json({ message: EMAIL_NOT_FOUND }).end();
          }
        })
        .catch((error: any) => {
          if (error) {
            console.error(error);
          }
        });
    } catch (error) {
      res.json({ message: EMAIL_NOT_FOUND });
      return res.status(404).end();
    }
  };

  /**
   * Logout
   * @param req - Logout Request
   * @param res - Logout Response
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
