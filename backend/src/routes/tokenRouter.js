import { Router } from "express";
import jwt from "jsonwebtoken";

export const tokenRouter = Router();

tokenRouter.get("/refresh-token", (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "token not provided" });
  }

  // Verifying the refresh token sent from cookies
  jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token or expired",
      });
    }

    // If refresh token is valid, issue a new short-lived access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, name: decoded.name }, // only include essentials in payload
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" } // access token expires in 15 mins
    );

    // Set new access token in a secure HTTP-only cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });

    return res.json({ message: "New access token created successfully" });
  });
});
