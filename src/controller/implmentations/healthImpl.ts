import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export default class HealthCheck {
  static healthCheck: (_req: Request, res: Response) => void = (
    _req: Request,
    res: Response
  ) => {
    return res.sendStatus(200).end();
  };
}
