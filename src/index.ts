import bodyParser from "body-parser";
import express from "express";
import AuthRoutes from "./routes/auth";
import AdminRoutes from "./routes/user";
import PORT from "./util/secrets";
const app = express();

app.use(bodyParser.json());

app.use("/admin", AdminRoutes);
app.use("/auth", AuthRoutes);

app.listen(PORT, () => {
  console.info("Server running on port:", PORT);
});
