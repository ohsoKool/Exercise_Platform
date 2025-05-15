import { db } from "../utils/user.db.js";
import { hash, compareSync } from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, mobile_number, gender, password, confirm_password } =
      req.body;
    let user = await db.user.findFirst({
      where: { email: email },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (
      !name ||
      !email ||
      !mobile_number ||
      !gender ||
      !password ||
      !confirm_password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const passwordConstraint =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordConstraint.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    const hashedPassword = await hash(password, 10);
    user = await db.user.create({
      data: {
        name,
        email,
        mobile_number,
        gender,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await db.user.findFirst({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    console.log("Login successful, redirecting...");
    return res.redirect("/dashboard.html");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login!" });
  }
};
