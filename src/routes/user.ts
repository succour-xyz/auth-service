import { Router } from "express";
import UsersRoute from "../controller/users";
const router = Router();

router.get("/", UsersRoute.getAllUsers);

router.post("/user", UsersRoute.addUser);

router.put("/user/:userId", UsersRoute.editUser);

router.delete("/user/:userId", UsersRoute.deleteUser);

export default router;
