"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var options = {
  transports: [
    new _winston["default"].transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
    }),
    new _winston["default"].transports.File({
      filename: "debug.log",
      level: "debug",
    }),
  ],
};

var logger = _winston["default"].createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

var _default = logger;
exports["default"] = _default;
