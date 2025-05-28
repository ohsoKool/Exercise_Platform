import jwt from "jsonwebtoken";

// Function to create and send both access and refresh tokens as cookies
export const tokenCreation = (user, res) => {
  const payload = {
    id: user.id,
    name: user.name,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "lax",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  console.log("Tokens have been successfully created");
};

// Middleware to verify access token
export const tokenVerification = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Token not provided or Expired" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      // Specific handling for expired token
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    // attaching decoded payload to req.user for use in next middlewares/routes so that the user data is available
    console.log("Token verified successfully");
    req.user = decoded;
    next();
  });
};
