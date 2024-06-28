import express from "express";
import { sendEmail, delay } from "./services/mailService";
import { students as emailList } from "./data/students";
import router from "./routes/adminRouter";

const app = express();

const sendEmailsInOrder = async (): Promise<void> => {
  for (const student of emailList) {
    await sendEmail(student);
    await delay(1000);
  }
};

app.get("/send-emails", async (req, res) => {
  await sendEmailsInOrder();

  res.send("Emails sent successfully");
});

app.use(router);

export default app;
