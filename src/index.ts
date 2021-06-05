import bodyParser from "body-parser";
import express from "express";
import AuthRoutes from "./routes/auth";
import AdminRoutes from "./routes/user";
import { PORT, SECRET, REDIS_PORT, REDIS_HOST } from "./util/secrets";
import HealthCheck from "./controller/health";
import errorRoute from "./routes/error";
import session from "express-session";
import redis from "redis";
import connect_redis from "connect-redis";

const RedisStore = connect_redis(session);
const redisClient = redis.createClient({ port: REDIS_PORT, host: REDIS_HOST });

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: SECRET,
    resave: false,
  })
);
app.use(express.json());
/**
 * - Public and protected routes
 */
app.use("/admin", AdminRoutes);
app.use("/auth", AuthRoutes);
/**
 * HealthCheck
 */
app.get("/healthCheck", HealthCheck.healthCheck);
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
