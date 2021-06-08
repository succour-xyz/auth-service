import { Request, Response } from "express";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";

@Service()
export default class Admin {
  static allUsers: (req: Request, res: Response) => void = async (
    _req: Request,
    res: Response
  ): Promise<unknown> => {
    try {
      await getRepository(User)
        .findAndCount()
        .then((user) => {
          return res.send(user);
        })
        .catch((error) => {
          console.error(error);
          return res.send(error);
        });
    } catch (e) {
      console.log(e);
      return res.status(404);
    }
  };
}
