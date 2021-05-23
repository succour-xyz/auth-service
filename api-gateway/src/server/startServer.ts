import express from "express";

const startServer = () => {
  const app = express();

  app.listen(7000, "0.0.0.0", () => {
    console.info("API gateway listening on 7000");
  });
};

export default startServer;
