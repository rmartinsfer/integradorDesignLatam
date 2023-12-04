import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();
export const transport: any = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASS,
  },
});
