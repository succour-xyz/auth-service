import flash from "connect-flash";
import connect_redis from "connect-redis";
import express from "express";
import session from "express-session";
import { createConnection } from "net";
import redis from "redis";
import { ADMIN, AUTH, HEALTHCHECK } from "./constants/routes";
import HealthCheck from "./controller/implmentations/healthImpl";
import { User } from "./entity/User";
import AuthRoutes from "./routes/auth";
import errorRoute from "./routes/error";
import AdminRoutes from "./routes/user";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USERNAME,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
  SECRET,
} from "./util/secrets";
import { ConnectionManager } from "typeorm";

const RedisStore = connect_redis(session);
const redisClient = redis.createClient({ port: REDIS_PORT, host: REDIS_HOST });

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

/**
 * - Public and protected routes
 */
// app.use(ADMIN, AdminRoutes);
// app.use(AUTH, AuthRoutes);
/**
 * HealthCheck
 */
app.get(HEALTHCHECK, HealthCheck.healthCheck);
/**
 * Error Route
 */
app.use(errorRoute);
app.listen(PORT, async () => {
  console.info("Server running on port:", PORT);
  const connectionManager = new ConnectionManager();

  const connection = connectionManager.create({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User],
    synchronize: true,
    logging: true,
  });
  await connection.connect();
});

/**
 * Exporting for testing purpose
 */
export default app;
