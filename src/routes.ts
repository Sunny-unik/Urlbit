import { Router } from "express";

const urlRouter = Router();

urlRouter.get("/", (req, res) => res.render("pages/home"));
urlRouter.get("/about", (req, res) => res.render("pages/about"));
urlRouter.get("/contact", (req, res) => res.render("pages/contact"));

export default urlRouter;
