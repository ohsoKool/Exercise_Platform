import { Router } from "express";
import jwt from "jsonwebtoken";

export const tokenRouter = Router();

tokenRouter.get("/refresh-token", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "token not provided" });
  jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token or expired",
      });
    }
    const newAccessToken = jwt.sign(
      { id: decoded.id, name: decoded.name },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 1000, // 30 seconds
      sameSite: "strict",
    });
    return res.json({ message: "New access token created successfully" });
  });
});
