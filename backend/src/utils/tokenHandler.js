import jwt from "jsonwebtoken";
export const tokenCreation = (user, res) => {
  const payload = {
    id: user.id,
    name: user.name,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "30s", // reduced for testing
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 1000, //30 seconds for testing purposes
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    sameSite: "strict",
  });
  console.log("Tokens have been successfully created");
};

export const tokenVerification = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Invalid token or Invalid token" });
      }
    } else {
      console.log("Token verified successfully");
      req.user = decoded;
    }

    next();
  });
};
