import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { error } from "winston";
import IAuth from "../IAuth";
// import crypto from "crypto";
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
   * @memberof AuthImpl
   */
  login: (req: Request, res: Response) => Promise<unknown> = async (
    req: Request,
    res: Response
  ): Promise<unknown> => {
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

  // reset: (
  //   req: Request,
  //   res: Response
  // ) => {
  //   //     console.log("check")
  //   //         crypto.randomBytes(32,(err,buffer)=>{
  //   //         if(err){
  //   //         console.error(error)
  //   //         return res.sendStatus(500)
  //   //       }
  //   //       const token = buffer.toString('hex')
  //   //     })
  //   // return "hello";
  // };
}
