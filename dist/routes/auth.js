"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _auth = _interopRequireDefault(require("../controller/auth"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = (0, _express.Router)();
/**
 * @param signup - signup route
 * @param validations - Email must be a valid Email Id
 * @param validations - Password must be at least 6 chars long and 30 characters max
 */

router.post(
  "/signup",
  (0, _expressValidator.body)("email")
    .isEmail()
    .withMessage("Must be a valid Email Id"),
  (0, _expressValidator.body)("password")
    .isLength({
      min: 6,
      max: 30,
    })
    .withMessage(
      "password must be at least 6 chars long and 30 characters max"
    ),
  (0, _expressValidator.body)("confirmPassword").custom(function (value, _ref) {
    var req = _ref.req;

    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    return true;
  }),
  _auth["default"].signUp
);
router.post("/login", _auth["default"].login);
var _default = router;
exports["default"] = _default;
