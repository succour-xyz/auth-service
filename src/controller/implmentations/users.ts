import e, { Request, Response } from "express";
import { uid } from "uid/secure";
import { User } from "../../models/User";
import { RequestBody } from "../../types/User";
import { RequestParams } from "../../types/User";
import { Service } from "typedi";
let users: User[] = [];

@Service()
export default class Users {
  /**
   * Returns all the users
   *
   * @remarks
   * This is a basic admin Route
   *
   * @param req - getAllUsersRequest
   * @param res - getAllUsersResponse
   */
  static getAllUsers: (req: e.Request, res: e.Response) => void = (
    _req: Request,
    res: Response
  ) => {
    return res.sendStatus(200).json({ users });
  };

  static addUser: (
    req: e.Request,
    res: e.Response
  ) => e.Response<never, Record<string, unknown>> = (
    req: Request,
    res: Response
  ) => {
    const body = req.body as RequestBody;
    const newUser: User = { name: body.name, id: uid() };
    users.push(newUser);
    return res.sendStatus(201).json({ message: "Added user", users, newUser });
  };

  static editUser: (
    req: e.Request,
    res: e.Response
  ) => e.Response<never, Record<string, unknown>> = (
    req: e.Request,
    res: e.Response
  ) => {
    const params = req.params as RequestParams;
    const uid = params.userId;
    const body = req.body as RequestBody;
    const userIndex = users.findIndex((userItem) => userItem.id === uid);
    if (userIndex >= 0) {
      users[userIndex] = { id: users[userIndex].id, name: body.name };
      return res.sendStatus(200).json({ message: "Updated user", users });
    }
    return res.sendStatus(404).json({ message: "Could not find user" });
  };

  static deleteUser: (req: e.Request, res: e.Response) => void = (
    req: Request,
    res: Response
  ) => {
    const params = req.params as RequestParams;
    users = users.filter((userItem) => userItem.id !== params.userId);
    res.sendStatus(200).json({ message: "Deleted User", users });
  };
}
