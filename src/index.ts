import bodyParser from "body-parser";
import express from "express";
import passport from "passport";
import AuthRoutes from "./routes/auth";
import AdminRoutes from "./routes/user";
import passportConfig from "./util/passport-config";
import PORT from "./util/secrets";

const app = express();
passportConfig(passport);
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());
/**
 * - Public and protected routes
 */
app.use("/admin", AdminRoutes);
app.use("/auth", AuthRoutes);

app.listen(PORT, () => {
  console.info("Server running on port:", PORT);
});
