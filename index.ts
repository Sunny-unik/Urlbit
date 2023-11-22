import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./src/db";
import urlRouter from "./src/routes";
import path from "path";
import { ExtendedError } from "src/interfaces/utils";

dotenv.config();
ConnectDB();
const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // Set 1min timeout for all HTTP requests
  req.setTimeout(60000, () => {
    const err = new Error("Request Timeout") as ExtendedError;
    err.status = 408;
    next(err);
  });
  // Set 1min server response timeout for all HTTP requests
  res.setTimeout(60000, () => {
    res.statusCode = 408;
    res.send({
      code: 408,
      name: "REQUESTTIMEOUT",
      message: "Request has timed out",
    });
  });
  next();
});
app.use("/", urlRouter);

app.get("/health", (req, res) => res.status(200).send("OK"));

app.listen(port, () => console.log(`Server runs on http://localhost:${port}`));
