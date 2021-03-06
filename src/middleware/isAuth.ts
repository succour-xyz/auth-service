import { NextFunction, Request, Response } from "express";

const isAuth: (
  req: Request,
  res: Response,
  next: NextFunction
) => Response<unknown, Record<string, unknown>> | void = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return !req.session.isLoggedIn ? res.sendStatus(403) : next();
};

export default isAuth;
