import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";

export const router = Router();

// 1. POST: สมัครสมาชิก (Register)
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username, email, password are required" });
    }

    // Hash รหัสผ่านก่อนเซฟ ด้วย salt rounds 12
    const hash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hash,
      passwordHash: hash,
    });

    return res.status(201).json({
      message: "Register successful",
      insertedId: newUser._id,
    });
  } catch (error) {
    next(error);
  }
});

// 2. POST: เข้าสู่ระบบ (Login)
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username and password are required" });
    }

    // 1. ค้นหาผู้ใช้ในฐานข้อมูลด้วย username (ดึง password และ passwordHash ที่ตั้ง select: false ออกมาด้วย)
    const user = await User.findOne({ username }).select(
      "+password +passwordHash",
    );

    // 2. ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return res.status(401).json({ message: "invalid username or password " });
    }

    // 3. เปรียบเทียบรหัสผ่านที่ส่งมา กับ Hash ที่เก็บไว้ในฐานข้อมูล
    const storedHash = user.passwordHash || user.password;
    if (!storedHash) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const isPasswordMatch = await bcrypt.compare(password, storedHash);
    console.log("ตรวจสอบรหัสผ่านตรงกันหรือไม่:", isPasswordMatch);

    if (isPasswordMatch) {
      return res.status(200).json({
        message: "You are Login !",
        username: user.username,
      });
    } else {
      return res.status(401).json({ message: "Password is not correct" });
    }
  } catch (error) {
    next(error);
  }
});
