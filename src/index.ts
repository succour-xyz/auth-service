import bodyParser from "body-parser";
import express from "express";
import AuthRoutes from "./routes/auth";
import AdminRoutes from "./routes/user";
import PORT from "./util/secrets";
import { SECRET } from "./util/secrets";
import HealthCheck from "./controller/health";
import errorRoute from "./routes/error";
import session from "express-session";

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: SECRET, resave: false, saveUninitialized: false }));
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
