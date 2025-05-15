import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "dashboard.html"));
});
