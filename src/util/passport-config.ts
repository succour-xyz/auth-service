import prisma from "../util/db";
// const LocalStrategy = require("passport-local").Strategy;

// load all the things we need

// expose this function to our app using module.exports
export default function (passport: {
  serializeUser: (arg0: (user: any, done: any) => void) => void;
  deserializeUser: (arg0: (email: any, done: any) => void) => void;
}) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (
    user: { id: any },
    done: (arg0: null, arg1: any) => void
  ) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (
    email: any,
    done: (arg0: null, arg1: string) => any
  ) {
    prisma.user
      .findUnique({ where: { email } })
      .then(() => done(null, "done"))
      .catch((err) => done(err, err));
  });

  //   passport.use(
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
