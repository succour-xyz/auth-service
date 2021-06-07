"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../controller/users"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = (0, _express.Router)();
router.get("/", _users["default"].getAllUsers);
router.post("/user", _users["default"].addUser);
router.put("/user/:userId", _users["default"].editUser);
router["delete"]("/user/:userId", _users["default"].deleteUser);
var _default = router;
exports["default"] = _default;
