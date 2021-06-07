import "reflect-metadata";
import flash from "connect-flash";
import connect_redis from "connect-redis";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import redis from "redis";
import { PORT, REDIS_HOST, REDIS_PORT, SECRET } from "./util/secrets";
import { createConnection } from "typeorm";

const RedisStore = connect_redis(session);
const redisClient = redis.createClient({ port: REDIS_PORT, host: REDIS_HOST });

createConnection()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: false,
        secret: SECRET,
        resave: false,
      })
    );
    app.use(flash());
    app.use(express.json());
    const Routes = import("./routes/routes");

    Routes.then(({ Routes }) =>
      Routes.forEach((route: any) => {
        (app as any)[route.method](
          route.route,
          (req: Request, res: Response, next: NextFunction) => {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            if (result instanceof Promise) {
              result.then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined
              );
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        );
      })
    );
    app.listen(PORT, () => {
      console.info("Server running on port:", PORT);
    });
  })
  .catch((error) => console.log("ERRRR", error));
