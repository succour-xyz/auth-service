import { Router } from "express";
import AuthImpl from "../controller/implmentations/authImpl";
import { LOGIN, LOGOUT, SIGN_UP } from "../constants/routes";
import { body } from "express-validator";
const router = Router();

const auth = new AuthImpl();

router.post(
  SIGN_UP,
  body("email").isEmail().withMessage("Must be a valid Email Id"),
  body("password")
    .isLength({ min: 6, max: 30 })
    .withMessage(
      "password must be at least 6 chars long and 30 characters max"
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  auth.signUp
);

router.post(LOGIN, auth.login);

router.post(LOGOUT, auth.logout);

// router.post(RESET_PASSWORD, auth.reset);

export default router;
