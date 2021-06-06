import { Router } from "express";
import AuthImpl from "../controller/implmentations/authImpl";
import { LOGIN, LOGOUT, SIGN_UP } from "../constants/routes";
import Validation from "../util/validations";
const router = Router();

const auth = new AuthImpl();

router.post(SIGN_UP, Validation.signUpValidations, auth.signUp);

router.post(LOGIN, auth.login);

router.post(LOGOUT, auth.logout);

// router.post(RESET_PASSWORD, auth.reset);

export default router;
