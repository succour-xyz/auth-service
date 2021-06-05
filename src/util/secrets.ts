import dotenv from "dotenv";
import fs from "fs";
import logger from "./logger";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT: string = process.env.NODE_ENV || "dev";
export const DATABASE_URL: string =
  process.env.DATABASE_URL || "mysql://root:pass@localhost:3306";
export const SECRET: string = process.env.SECRET || "secret";

const PORT = process.env.PORT;

export default PORT;
