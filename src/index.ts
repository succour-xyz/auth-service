import express from "express";
import UserRoutes from "./routes/user";
import PORT from "./util/secrets";

const app = express();

// app.use(bodyParser.json());

app.use(UserRoutes);

app.listen(PORT, () => {
  console.info("Server running on port:", PORT);
});
