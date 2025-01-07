import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/authRouter";
import userRouter from './routes/userRouter'

const app: Express = express();
const port = process.env.PORT || 8080;

// connect databse

// config .env
dotenv.config();

// config cors

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// defind routes
app.use("/auth", authRouter);
app.use("/user", userRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server đang hoạt động tại: http://localhost:${port}`);
});
