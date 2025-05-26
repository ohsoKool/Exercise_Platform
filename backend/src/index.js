import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter.js";
import { tokenRouter } from "./routes/tokenRouter.js";
import cookieParser from "cookie-parser";
import { tokenVerification } from "./utils/tokenHandler.js";
import { logoutRouter } from "./routes/logoutRouter.js";
import { exerciseRouter } from "./routes/exerciseRouter.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", tokenVerification, (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/token", tokenRouter);
app.use("/api/auth", logoutRouter);
