import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataPengurusController from "./data-pengurus/controller";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors<Request>());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/data-pengurus", dataPengurusController);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
