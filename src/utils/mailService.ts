import nodemailer from "nodemailer";

interface InterfaceMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const sendMail = (mailOptions: InterfaceMailOptions, appPassword: string) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: { user: mailOptions.from, pass: appPassword }
    });

    transporter.sendMail(mailOptions, function (error, info) {
      error ? reject(error) : resolve(info);
    });
  });

export default sendMail;
