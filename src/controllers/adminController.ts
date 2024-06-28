import { Request, Response } from "express";
import { readFile } from "fs/promises";

export const successController = async (req: Request, res: Response) => {
  const data = await readFile("src/output/success.txt", "utf-8");
  const lines = data.split("\n");

  const students = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split("\t");

    const student = {
      name: line[1],
      email: line[0],
      time: line[3],
      date: line[2],
    };
    students.push(student);
  }

  const htmlResponse = `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
        </head>
        <body>
            <h1>Students who have received the email</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                ${students
                  .map(
                    (student) => `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.time}</td>
                        <td>${student.date}</td>
                    </tr>
                `
                  )
                  .join("")}
            </table>
        </body>
    </html>
    `;
  res.send(htmlResponse);
};

export const errorController = async (req: Request, res: Response) => {
  const data = await readFile("src/output/error.txt", "utf-8");
  const lines = data.split("\n");

  const students = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split("\t");

    const student = {
      name: line[1],
      email: line[0],
      message: line[2],
      time: line[4],
      date: line[3],
    };
    students.push(student);
  }

  const htmlResponse = `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
        </head>
        <body>
            <h1>Students who have received the email</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                ${students
                  .map(
                    (student) => `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.message}</td>
                        <td>${student.time}</td>
                        <td>${student.date}</td>
                    </tr>
                `
                  )
                  .join("")}
            </table>
        </body>
    </html>
    `;

  res.send(htmlResponse);
};

export const systemErrorController = async (req: Request, res: Response) => {
  const data = await readFile("src/output/system-error.txt", "utf-8");
  const lines = data.split("\n");

  const errors = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split("\t");

    const error = {
      message: line[0],
      time: line[2],
      date: line[1],
    };
    errors.push(error);
  }

  const htmlResponse = `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
        </head>
        <body>
            <h1>System Errors</h1>
            <table>
                <tr>
                    <th>Message</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                ${errors
                  .map(
                    (error) => `
                    <tr>
                        <td>${error.message}</td>
                        <td>${error.time}</td>
                        <td>${error.date}</td>
                    </tr>
                `
                  )
                  .join("")}
            </table>
        </body>
    </html>
    `;
  res.send(htmlResponse);
};
