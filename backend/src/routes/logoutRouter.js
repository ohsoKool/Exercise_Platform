import { Router } from "express";

export const logoutRouter = Router();
logoutRouter.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "User logged out successfully!" });
});
