"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = exports.DATABASE_URL = exports.ENVIRONMENT = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _fs = _interopRequireDefault(require("fs"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

if (_fs["default"].existsSync(".env")) {
  _logger["default"].debug(
    "Using .env file to supply config environment variables"
  );

  _dotenv["default"].config({
    path: ".env",
  });
} else {
  _logger["default"].debug(
    "Using .env.example file to supply config environment variables"
  );

  _dotenv["default"].config({
    path: ".env.example",
  }); // you can delete this after you create your own .env file!
}

var ENVIRONMENT = process.env.NODE_ENV || "dev";
exports.ENVIRONMENT = ENVIRONMENT;
var DATABASE_URL =
  process.env.DATABASE_URL || "mysql://root:pass@localhost:3306";
exports.DATABASE_URL = DATABASE_URL;
var PORT = process.env.PORT;
var _default = PORT;
exports["default"] = _default;
