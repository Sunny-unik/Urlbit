import { Router } from "express";
import urlController from "./controller/url";

const urlRouter = Router();

urlRouter.get("/", (_req, res) => res.render("pages/home"));
urlRouter.get("/about", (_req, res) => res.render("pages/about"));
urlRouter.get("/contact", (_req, res) => res.render("pages/contact"));

urlRouter.get("/:nanoid", async (req, res) => {
  const resData = await urlController.getUrl(req.params.nanoid);
  const redirectUrl = (resData as { code: number; redirectUrl: string })
    .redirectUrl;
  redirectUrl
    ? res.redirect(redirectUrl)
    : res.status(resData.code).send(resData);
});

urlRouter.post("/api/saveUrl", async (req, res) => {
  const resData = await urlController.saveUrl(
    (req.body as { redirectUrl: string }).redirectUrl
  );
  res.status(resData.code).send(resData);
});

urlRouter.post("/api/contact", async (req, res) => {
  const { title, description } = req.body as {
    title: string;
    description: string;
  };
  const resData = await urlController.contactMail(title, description);
  res.status(resData.code).send(resData);
});

export default urlRouter;
