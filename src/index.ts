import express from "express";
import PORT from "./constants/appConstants";
import UserRoutes from "./routes/user";

const app = express();

// app.use(bodyParser.json());

app.use(UserRoutes);
app.listen(PORT, () => {
  console.info("Server running on port:", PORT);
});
