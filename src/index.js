import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
