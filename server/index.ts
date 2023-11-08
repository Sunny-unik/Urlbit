import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "hey there 👋" });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send({ message: "All Good :-)" });
});

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
