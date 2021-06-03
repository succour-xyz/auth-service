import { expect } from "chai";
import {
  ENCRYPTION_COMPARE_FAIL,
  ENCRYPTION_FAIL,
} from "../src/constants/errors";
import {
  EMAIL_DUPLICATE,
  EMAIL_NOT_FOUND,
  ENTER_CORRECT_PASSWORD,
  PASSWORD_MISMATCH,
} from "../src/constants/messages";

/**
 * Simple Constants Test
 */
it("Checking all constants", () => {
  expect(ENCRYPTION_COMPARE_FAIL, "Comparison Fail String Test ").to.string(
    "## Encryption Comparison failing, reason: "
  );
  expect(ENCRYPTION_FAIL, "ENCRYPTION_FAIL").to.string(
    "## Encryption is failing, reason: "
  );

  expect(EMAIL_DUPLICATE, "ENCRYPTION_FAIL").to.string(
    "This email is already registered"
  );
  expect(PASSWORD_MISMATCH, "ENCRYPTION_FAIL").to.string(
    "Passwords Don't match"
  );
  expect(EMAIL_NOT_FOUND, "ENCRYPTION_FAIL").to.string(
    "Email Not Registered, Please Sign Up"
  );
  expect(ENTER_CORRECT_PASSWORD, "ENCRYPTION_FAIL").to.string(
    "Please enter correct password"
  );
});
