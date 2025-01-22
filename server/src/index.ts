import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import comicRouter from "./routes/comicRouter";
import searchRouter from "./routes/searchRouter"; 
import commentRouter from "./routes/commentRouter";
import adminRouter from "./routes/adminRouter";
import connectMongoDB from "./database/mongodb";
import initSocketIO from "./lib/socket";

const app: Express = express();
const port = process.env.PORT || 8080;


const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});


// check connect database
connectMongoDB();

// config .env
dotenv.config();

// config cors

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// defind routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/comic", comicRouter);
app.use("/search", searchRouter);
app.use("/comment", commentRouter);

// admin router
app.use("/admin", adminRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

initSocketIO(io);

server.listen(port, () => {
  console.log(`[server]: Server đang hoạt động tại: http://localhost:${port}`);
});
