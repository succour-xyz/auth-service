import { Router } from "express";
import { body } from "express-validator";
import AuthRouter from "../controller/auth";
const router = Router();

/**
 * @param signup - signup route
 * @param validations - Email must be a valid Email Id
 * @param validations - Password must be at least 6 chars long and 30 characters max
 */
router.post(
  "/signup",
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
  AuthRouter.signUp
);

router.post("/login", AuthRouter.login);

router.post("/logout", AuthRouter.logout);

export default router;
