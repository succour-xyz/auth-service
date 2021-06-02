import { Router } from "express";
import AuthRouter from "../controller/auth";
const router = Router();

router.post("/signup", AuthRouter.postSignUp);

export default router;
