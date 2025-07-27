// Authentication routes (register/login)//
import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";


const router = express.Router();

// POST /api/users/register - Create a new user
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST /api/users/login - Authenticate a user and return a token
router.post("/login", async (req, res) => {
  try {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Invalid password or email" });
  }

  const correctPw = await user.isCorrectPassword(req.body.password);

  if (!correctPw) {
    return res.status(401).json({ message: "Invalid password or email" });
  }

  const token = signToken(user);
  res.json({ token, user });
} catch (error) {
  res.status(500).json ({ message: "Server error during login attempt" });
}
});


export default router;