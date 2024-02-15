import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import auth from "../middleware/auth.js"
import User from '../models/userModel.js';

const router = express.Router();

// CRUD
//const secret = "secret";

// 1-  Register a user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashPassword });
  await newUser.save();
  res.json(newUser);
});

// 2- Login a user

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("User does not exist");
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) throw new Error("Password is not correct");
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.json(token);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3- Get a user (/user/me)
router.get('/me', auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  res.json(user);
});

export default router;
