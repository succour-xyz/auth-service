import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models/User";
import { RequestBody } from "./../types/User";
import { RequestParams } from "./../types/User/index";

const router = Router();

let users: User[] = [];

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ users });
});

router.post("/user", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  const newUser: User = { name: body.name, id: new Date().toISOString() };
  users.push(newUser);
  return res.status(201).json({ message: "Added user", users, newUser });
});

router.put(
  "/user/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    const uid = params.userId;
    const body = req.body as RequestBody;
    const userIndex = users.findIndex((userItem) => userItem.id === uid);
    if (userIndex >= 0) {
      users[userIndex] = { id: users[userIndex].id, name: body.name };
      return res.status(200).json({ message: "Updated user", users });
    }
    res.status(404).json({ message: "Could not find user" });
  }
);

router.delete(
  "/user/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    users = users.filter((userItem) => userItem.id !== params.userId);
    res.status(200).json({ message: "Deleted User", users });
  }
);

export default router;
