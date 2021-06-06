import { Router } from "express";
import Users from "../controller/implmentations/users";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/", isAuth, Users.getAllUsers);

router.post("/user", Users.addUser);

router.put("/user/:userId", Users.editUser);

router.delete("/user/:userId", Users.deleteUser);

export default router;
