import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter.js";
import { tokenRouter } from "./routes/tokenRouter.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { tokenVerification } from "./utils/tokenHandler.js";
import { logoutRouter } from "./routes/logoutRouter.js";

dotenv.config();
const app = express();
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
app.use("/api/token", tokenRouter);
app.use("/api/auth", logoutRouter);
