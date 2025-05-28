import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./src/routes/authRouter.js";
import { logoutRouter } from "./src/routes/logoutRouter.js";
import { tokenRouter } from "./src/routes/tokenRouter.js";
import { exerciseRouter } from "./src/routes/exerciseRouter.js";
import { tokenVerification } from "./src/utils/tokenHandler.js";
import {
  getUserProgress,
  saveOrCompleteExercise,
} from "./src/controllers/progressController.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARES =====
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// ===== ROUTES =====
// Public or protected routes with proper middleware
app.get("/", tokenVerification, (req, res) => {
  res.send("Welcome to the / route!");
});

app.use("/api/auth", authRouter);
app.use("/api/auth", logoutRouter); // Consider merging logoutRouter into authRouter
app.use("/api/exercises", exerciseRouter);
app.use("/api/token", tokenRouter);

// User progress routes require auth
app.get("/api/user/getprogress", tokenVerification, getUserProgress);
app.post("/api/user/progress/save", tokenVerification, saveOrCompleteExercise);

// ===== START SERVER =====
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
