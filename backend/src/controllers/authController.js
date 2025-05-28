import { db } from "../utils/user.db.js";
import { hash, compareSync } from "bcrypt";
import { tokenCreation } from "../utils/tokenHandler.js";

export const register = async (req, res) => {
  try {
    const { name, email, mobile_number, gender, password, confirm_password } =
      req.body;

    let user = await db.user.findFirst({
      where: { email: email },
    });

    if (user) {
      return res.status(400).json({
        message: "Duplicate Email, A user with this email already exists!",
      });
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;

    if (!passwordConstraint.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    // Securely hash the password before saving
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

    // by giving id,email and name to the payload , I'm assigning tokens
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    tokenCreation(user, res);

    console.log(
      "Registration successful!! and Tokens have been successfully created"
    );
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while registering" });
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

    // Compare plaintext password with hashed password stored in DB
    if (!compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    tokenCreation(user, res);

    console.log("Login successfuly! Redirecting...");
    return res.redirect("/dashboard.html");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login!" });
  }
};
