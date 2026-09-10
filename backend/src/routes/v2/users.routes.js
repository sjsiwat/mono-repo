import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { authUser } from "../../middlewares/authUser.js";

export const router = Router();

// ==========================================
// 1. AUTHENTICATION ROUTES (ระบบสมาชิก)
// ==========================================

// สมัครสมาชิก (Register) - ยุบรวมมาจาก POST / และ POST /register
router.post("/register", async (req, res, next) => {
  try {
    const { username, role, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username, email, and password are required" });
    }

    const hash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      role: role || "user", // ถ้าไม่ส่ง role มาให้เป็น user เริ่มต้น
      email,
      password: hash,
      passwordHash: hash,
    });

    const {
      password: _password,
      passwordHash: _passwordHash,
      ...userWithoutPassword
    } = newUser.toObject();

    return res.status(201).json({
      message: "Register successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
});

// เข้าสู่ระบบ (Login) - เลือกใช้เวอร์ชัน JWT + Cookie
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
  } catch (err) {
    next(err);
  }
});

// ออกจากระบบ (Logout)
router.post("/logout", (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
  return res.status(200).json({ success: true, message: "Logout Success" });
});

// ตรวจสอบ Token (Check Auth)
router.get("/auth", authUser, async (req, res, next) => {
  try {
    const userId = req.user.userId; // แก้ให้ตรงกับ Payload ของ JWT ตอน Login { userId: user._id }
    const user = await User.findById(userId);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 2. USER MANAGEMENT ROUTES (CRUD ทั่วไป)
// ==========================================

// ดูรายชื่อ User ทั้งหมด
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

// อัปเดต User (รับ ID จาก URL Params)
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

// ลบ User (รองรับทั้ง ObjectId และ Username)
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
