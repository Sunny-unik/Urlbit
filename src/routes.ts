import { Router } from "express";
import { marked } from "marked"
import urlController from "./controller/url";
import transporter from "./utils/mailService";
import { escapeHTML } from "./utils/escapeHTML";

const urlRouter = Router();

urlRouter.get("/", (req, res) => res.render("pages/home"));
urlRouter.get("/about", (req, res) => res.render("pages/about"));
urlRouter.get("/contact", (req, res) => res.render("pages/contact"));

urlRouter.get("/:nanoid", async (req, res) => {
  const resData = await urlController.getUrl(req.params.nanoid);
  const redirectUrl = (resData as { code: number; redirectUrl: string })
    .redirectUrl;
  redirectUrl
    ? res.redirect(redirectUrl)
    : res.status(resData.code).send(resData);
});

urlRouter.post("/api/saveUrl", async (req, res) => {
  const resData = await urlController.saveUrl(req.body.redirectUrl);
  res.status(resData.code).send(resData);
});
urlRouter.post("/contact", (req, res) => {
  const { title, description } = req.body
  const htmlContent = marked(escapeHTML(description));

  const mailOptions = {
    from: process.env.SENDER,
    to: process.env.RECEPIENT,
    subject: escapeHTML(title),
    htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
      res.status(200)
    }
  });
});

export default urlRouter;
