import { config as configEnv } from "dotenv";

configEnv();

const _config = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  PORT: process.env.PORT,
};

export const config = Object.freeze(_config);
