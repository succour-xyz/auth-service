"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _user = _interopRequireDefault(require("./routes/user"));

var _secrets = _interopRequireDefault(require("./util/secrets"));

var _health = _interopRequireDefault(require("./controller/health"));

var _error = _interopRequireDefault(require("./routes/error"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_express["default"].json());
/**
 * - Public and protected routes
 */

app.use("/admin", _user["default"]);
app.use("/auth", _auth["default"]);
/**
 * HealthCheck
 */

app.get("/healthCheck", _health["default"].healthCheck);
/**
 * Error Route
 */

app.use(_error["default"]);
app.listen(_secrets["default"], function () {
  console.info("Server running on port:", _secrets["default"]);
});
/**
 * Exporting for testing purpose
 */

var _default = app;
exports["default"] = _default;
