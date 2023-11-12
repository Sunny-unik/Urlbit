import { Router } from "express";
import urlController from "./controller/url";

const urlRouter = Router();

urlRouter.get("/", (req, res) => res.render("pages/home"));
urlRouter.get("/about", (req, res) => res.render("pages/about"));
urlRouter.get("/contact", (req, res) => res.render("pages/contact"));

urlRouter.get("/api/:nanoid", async (req, res) => {
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

export default urlRouter;
