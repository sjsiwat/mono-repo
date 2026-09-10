import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";

export const router = Router();

// read , get all user
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

// create
router.post("/", async (req, res, next) => {
  try {
    const { username, role, email, password } = req.body;

    if (!username || !role || !email || !password) {
      return res
        .status(400)
        .json({ error: "username ,role, email , password are required" });
    }

    // Hash password ด้วย bcrypt salt rounds 12
    const hash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      role,
      email,
      password: hash,
      passwordHash: hash,
    });

    const {
      password: _password,
      passwordHash: _passwordHash,
      ...userWithoutPassword
    } = newUser.toObject();

    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
});

// PUT: อัปเดตข้อมูล (รับ ID จาก URL Params: /by-param/:id)
router.put("/by-param/:id", async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hash = await bcrypt.hash(password, 12);
    const result = await User.findByIdAndUpdate(
      targetId,
      { $set: { password: hash, passwordHash: hash } },
      { returnDocument: "after" },
    );

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Update via Param successful",
      modifiedCount: 1,
    });
  } catch (err) {
    next(err);
  }
});

// PUT: อัปเดตข้อมูล (รับ ID จาก Body: /by-body)
router.put("/by-body", async (req, res, next) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ error: "id and password are required" });
    }

    const hash = await bcrypt.hash(password, 12);
    const result = await User.findByIdAndUpdate(
      id,
      { $set: { password: hash, passwordHash: hash } },
      { returnDocument: "after" },
    );

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Update via Body successful",
      modifiedCount: 1,
    });
  } catch (err) {
    next(err);
  }
});

// update (รองรับ /:id)
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const hash = await bcrypt.hash(password, 12);
      updateData.password = hash;
      updateData.passwordHash = hash;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      password: _password,
      passwordHash: _passwordHash,
      ...userWithoutPassword
    } = updatedUser.toObject();

    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
});

// delete (รองรับทั้ง ObjectId และ Username)
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    let deletedUser = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedUser = await User.findByIdAndDelete(id);
    }

    if (!deletedUser) {
      deletedUser = await User.findOneAndDelete({ username: id });
    }

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Delete successful",
      deletedCount: 1,
    });
  } catch (err) {
    next(err);
  }
});

// Login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "email and password are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {}
});
