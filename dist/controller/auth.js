"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressValidator = require("express-validator");

var _winston = require("winston");

var _messages = require("../constants/messages");

var _db = _interopRequireDefault(require("../util/db"));

var _errors = require("./../constants/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Auth = function Auth() {
  _classCallCheck(this, Auth);
};

exports["default"] = Auth;

_defineProperty(Auth, "signUp", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var body, name, email, password, confirmPassword, errors, hashedPassword;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = req.body;
            name = body.name, email = body.email, password = body.password, confirmPassword = body.confirmPassword;
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 5:
            _context2.prev = 5;
            _context2.next = 8;
            return _bcrypt["default"].hash(password, 10);

          case 8:
            hashedPassword = _context2.sent;

            _bcrypt["default"].compare(confirmPassword, hashedPassword).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(same) {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!same) {
                          _context.next = 14;
                          break;
                        }

                        _context.prev = 1;
                        _context.next = 4;
                        return _db["default"].user.create({
                          data: {
                            email: email,
                            password: hashedPassword,
                            name: name
                          }
                        });

                      case 4:
                        result = _context.sent;
                        return _context.abrupt("return", res.sendStatus(201).json(result));

                      case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](1);
                        res.json({
                          message: _messages.EMAIL_DUPLICATE
                        });
                        return _context.abrupt("return", res.status(409).end());

                      case 12:
                        _context.next = 15;
                        break;

                      case 14:
                        return _context.abrupt("return", res.sendStatus(406).json({
                          message: _messages.PASSWORD_MISMATCH
                        }));

                      case 15:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[1, 8]]);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (error) {
              return console.error(_errors.ENCRYPTION_FAIL, error);
            });

            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](5);
            return _context2.abrupt("return", res.sendStatus(406).json({
              message: "Error"
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

_defineProperty(Auth, "login", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var body, email, password;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = req.body;
            email = body.email, password = body.password;
            _context3.prev = 2;
            _context3.next = 5;
            return _db["default"].user.findUnique({
              where: {
                email: email
              }
            }).then(function (user) {
              if (user) {
                _bcrypt["default"].compare(password, user.password).then(function (doMatch) {
                  if (doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user = user; //Not required right now
                    // console.log(req.csrfToken());
                    // req.csrfToken();
                    // res.cookie("XSRF-TOKEN", req.csrfToken());

                    //Not required right now
                    // console.log(req.csrfToken());
                    // req.csrfToken();
                    // res.cookie("XSRF-TOKEN", req.csrfToken());
                    res.sendStatus(200);
                  } else {
                    res.statusCode = 406;
                    res.json({
                      message: _messages.INVALID_EMAIL_OR_PASSWORD,
                      error: _winston.error
                    }).end();
                  }
                })["catch"](function (error) {
                  return console.error(_errors.ENCRYPTION_COMPARE_FAIL, error);
                });
              } else {
                return res.status(404).json({
                  message: _messages.EMAIL_NOT_FOUND
                }).end();
              }
            })["catch"](function (error) {
              if (error) {
                console.error(error);
              }
            });

          case 5:
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](2);
            res.json({
              message: _messages.EMAIL_NOT_FOUND
            });
            return _context3.abrupt("return", res.status(404).end());

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 7]]);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());

_defineProperty(Auth, "logout", function (req, res) {
  req.session.destroy(function () {
    return res.sendStatus(204);
  });
});