import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_PROVIDER,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});

export default transporter