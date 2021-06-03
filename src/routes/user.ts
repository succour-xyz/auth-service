import { Router } from "express";
import Users from "../controller/users";
const router = Router();

router.get("/", Users.getAllUsers);

router.post("/user", Users.addUser);

router.put("/user/:userId", Users.editUser);

router.delete("/user/:userId", Users.deleteUser);

export default router;
