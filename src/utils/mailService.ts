import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_PROVIDER,
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});

export default transporter