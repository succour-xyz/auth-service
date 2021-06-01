import { Request, Response, Router } from "express";
import { User } from "../models/User";

const router = Router();

let users: User[] = [];

router.get("/", (res: Response, req: Request) => {
  res.status(200).json(users);
});

router.post("/user", (res: Response, req: Request) => {
  const newUser: User = { name: req.body.name, id: new Date().toISOString() };
  users.push(newUser);
  return res.status(201).json({ message: "Added user", users, newUser });
});

router.put("/user/:userId", (res: Response, req: Request) => {
  const uid = req.params.userId;
  const userIndex = users.findIndex((userItem) => userItem.id === uid);
  if (userIndex >= 0) {
    users[userIndex] = { id: users[userIndex].id, name: users[userIndex].name };
    return res.status(200).json({ message: "Updated user", users });
  }
  res.status(404).json({ message: "Could not find user" });
});

router.delete("/user/:userId", (res: Response, req: Request) => {
  users = users.filter((userItem) => userItem.id !== req.params.userId);
  res.status(200).json({ message: "Deleted User", users });
});

export default Router;
