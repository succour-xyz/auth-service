import flash from "connect-flash";
import connect_redis from "connect-redis";
import express from "express";
import session from "express-session";
import redis from "redis";
import HealthCheck from "./controller/implmentations/healthImpl";
import AuthRoutes from "./routes/auth";
import errorRoute from "./routes/error";
import AdminRoutes from "./routes/user";
import { PORT, REDIS_HOST, REDIS_PORT, SECRET } from "./util/secrets";
import { ADMIN, AUTH, HEALTHCHECK } from "./constants/routes";

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
app.use(ADMIN, AdminRoutes);
app.use(AUTH, AuthRoutes);
/**
 * HealthCheck
 */
app.get(HEALTHCHECK, HealthCheck.healthCheck);
/**
 * Error Route
 */
app.use(errorRoute);
app.listen(PORT, () => {
  console.info("Server running on port:", PORT);
});

/**
 * Exporting for testing purpose
 */
export default app;
