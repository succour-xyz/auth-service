import { body } from "express-validator";

export default class Validation {
  static signUpValidations = (): void => {
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
      });
  };
}
