import nodemailer from "nodemailer";
import fs from "fs/promises";
import { appendFileSync } from "fs";
import { Student } from "../types";

import { config } from "../config/config";
import { getDate, getTime } from "./dateService";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const sendEmail = async (student: Student): Promise<void> => {
  try {
    const htmlTemplate = await fs.readFile(
      "src/templates/template.html",
      "utf-8"
    );

    const htmlContent = htmlTemplate
      .replace("{{name}}", student.name)
      .replace("{{time}}", student.time)
      .replace("{{location}}", student.location);

    const info = await transporter.sendMail({
      from: '"Parth" <parthsali@gmail.com>',
      to: student.email,
      subject: "Interview Notification",
      html: htmlContent,
    });

    const date = getDate();
    const time = getTime();

    appendFileSync(
      "src/output/success.txt",
      `${student.email}\t  ${student.name}\t ${date}\t  ${time}\n`
    );
    console.log(
      `SUCCESS : ${student.email}\t ${student.name}\t  ${date}\t  ${time}\n`
    );
  } catch (error: any) {
    const date = getDate();
    const time = getTime();
    appendFileSync(
      "src/output/error.txt",
      `${student.email}\t  ${student.name}\t ${error.message}\t ${date}\t  ${time}\n`
    );
    console.error(
      `ERROR : ${student.email}\t  ${student.name}\t  ${date}\t  ${time}\n`
    );
  }
};
