import app from "./src/app";
import { config } from "./src/config/config";
import { getDate, getTime } from "./src/services/dateService";

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { appendFileSync } from "fs";

process.on("unhandledRejection", (error: any) => {
  const date = getDate();
  const time = getTime();
  appendFileSync(
    "src/output/system-error.txt",
    `Unhandled Rejection: ${
      error instanceof Error ? error.message : "unknown error"
    } ${date}\t  ${time}\n`
  );
  console.error(
    `ERROR : Unhandled Rejection: ${error.message} ${date}\t  ${time}\n`
  );
});

process.on("uncaughtException", (error: any) => {
  const date = getDate();
  const time = getTime();
  appendFileSync(
    "src/output/system-error.txt",
    `Uncaught Exception: ${error.message} ${date}\t  ${time}\n`
  );
  console.error(
    `ERROR : Uncaught Exception: ${error.message} ${date}\t  ${time}\n`
  );
});
