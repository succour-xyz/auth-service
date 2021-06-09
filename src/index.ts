import flash from "connect-flash";
import connect_redis from "connect-redis";
import express from "express";
import session from "express-session";
import redis from "redis";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { PORT, REDIS_HOST, REDIS_PORT, SECRET } from "./util/secrets";
import { AdminRoutes, AuthRoutes } from "./routes/routes";
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
    app.use(AdminRoutes);
    app.use(AuthRoutes);
    app.listen(PORT, () => {
      console.info("Server running on port:", PORT);
    });
  })
  .catch((error) => console.log("ERRRR", error));
