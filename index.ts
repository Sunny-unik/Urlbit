import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./src/db";
import urlRouter from "./src/routes";
import path from "path";
import { timeOutMiddleware } from "./src/middlewares";

dotenv.config();
ConnectDB();
const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use(timeOutMiddleware);
app.use("/", urlRouter);

app.get("/health", (_req, res) => res.status(200).send("OK"));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server runs on http://localhost:${port}`));
