import bodyParser from "body-parser";
import express from "express";
import AuthRoutes from "./routes/auth";
import AdminRoutes from "./routes/user";
import PORT from "./util/secrets";
import HealthCheck from "./controller/health";

const app = express();

app.use(bodyParser.json());
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

app.listen(PORT, () => {
  console.info("Server running on port:", PORT);
});

/**
 * Exporting for testing purpose
 */
export default app;
