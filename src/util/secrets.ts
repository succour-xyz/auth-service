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
/**
 * Constant Environment
 */
export const ENVIRONMENT: string = process.env.NODE_ENV || "dev";
/**
 * Constant Database Host
 */
export const DB_HOST: string = process.env.DB_HOST || "localhost";
/**
 * Constant Database Port
 */
export const DB_PORT: number = Number(process.env.DB_PORT) || 3306;
/**
 * Constant Database Username
 */
export const DB_USERNAME: string = process.env.DB_USERNAME || "root";
/**
 * Constant Database Password
 */
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "password";
/**
 * Constant Database Password
 */
export const DB_NAME: string = process.env.DB_NAME || "test";
/**
 * Constant Secret
 */
export const SECRET: string = process.env.SECRET || "secret";
/**
 * Constant Redis Host
 */
export const REDIS_HOST: string = process.env.REDIS_HOST || "127.0.0.1";
/**
 * Constant Redis Port
 */
export const REDIS_PORT: number = Number(String(process.env.REDIS_PORT)) | 6379;
/**
 * Constant Application Port
 */
export const PORT = process.env.PORT || 3000;
/**
 * Constant Db Type
 */
export const DB_TYPE = process.env.DB_TYPE || "mysql";
