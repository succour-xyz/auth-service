"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = _default;

var _db = _interopRequireDefault(require("../util/db"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// const LocalStrategy = require("passport-local").Strategy;
// load all the things we need
// expose this function to our app using module.exports
function _default(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  }); // used to deserialize the user

  passport.deserializeUser(function (email, done) {
    _db["default"].user
      .findUnique({
        where: {
          email: email,
        },
      })
      .then(function () {
        return done(null, "done");
      })
      ["catch"](function (err) {
        return done(err, err);
      });
  }); //   passport.use(
  //     "local",
  //     new LocalStrategy(
  //       {
  //         // by default, local strategy uses username and password, we will override with email
  //         usernameField: "email",
  //         passwordField: "password",
  //         passReqToCallback: true, // allows us to pass back the entire request to the callback
  //       },
  //       function (
  //         // req: any,
  //         email: any,
  //         // password: any,
  //         done: (arg0: null, arg1: string) => any
  //       ) {
  //         // callback with email and password from our form
  //         prisma.user
  //           .findUnique({ where: { email: email } })
  //           .then(() => done(null, "done"))
  //           .catch((err) => done(err, err));
  //       }
  //     )
  //   );
}
