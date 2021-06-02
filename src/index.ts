import bodyParser from "body-parser";
import express from "express";
import AdminRoutes from "./routes/user";
import PORT from "./util/secrets";

const app = express();

app.use(bodyParser.json());

app.use("/admin", AdminRoutes);

app.listen(PORT, () => {
  console.info("Server running on port:", PORT);
});
