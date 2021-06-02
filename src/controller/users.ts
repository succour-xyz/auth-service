import e, { Request, Response } from "express";
import { uid } from "uid/secure";
import { User } from "../models/User";
import { RequestBody } from "./../types/User";
import { RequestParams } from "./../types/User/index";
let users: User[] = [];

export default class UsersRoute {
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
    req: Request,
    res: Response
  ) => {
    console.log("request", req.body);
    res.status(200).json({ users });
  };

  static addUser: (
    req: e.Request,
    res: e.Response
  ) => e.Response<any, Record<string, any>> = (req: Request, res: Response) => {
    const body = req.body as RequestBody;
    const newUser: User = { name: body.name, id: uid() };
    users.push(newUser);
    return res.status(201).json({ message: "Added user", users, newUser });
  };

  static editUser: (
    req: e.Request,
    res: e.Response
  ) => e.Response<any, Record<string, any>> = (req: Request, res: Response) => {
    const params = req.params as RequestParams;
    const uid = params.userId;
    const body = req.body as RequestBody;
    const userIndex = users.findIndex((userItem) => userItem.id === uid);
    if (userIndex >= 0) {
      users[userIndex] = { id: users[userIndex].id, name: body.name };
      return res.status(200).json({ message: "Updated user", users });
    }
    return res.status(404).json({ message: "Could not find user" });
  };

  static deleteUser: (req: e.Request, res: e.Response) => void = (
    req: Request,
    res: Response
  ) => {
    const params = req.params as RequestParams;
    users = users.filter((userItem) => userItem.id !== params.userId);
    res.status(200).json({ message: "Deleted User", users });
  };
}
