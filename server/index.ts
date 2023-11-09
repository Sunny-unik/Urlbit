import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./src/db";
import urlRouter from "./src/routes";
import path from "path";

dotenv.config();
ConnectDB();
const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use("/", urlRouter);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send({ message: "All Good :-)" });
});

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
