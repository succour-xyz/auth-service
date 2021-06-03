import e, { Request, Response } from "express";

export default class HealthCheck {
  static healthCheck: (_req: e.Request, res: e.Response) => void = (
    _req: Request,
    res: Response
  ) => {
    return res.sendStatus(200).end();
  };
}
