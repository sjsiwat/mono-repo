import { CURRICULUM } from '../data/curriculum';
import { CodeWalkthrough } from '../components/CodeWalkthrough';
import { BackButton } from '../components/BackButton';
import { BcryptMethodsCheatSheet } from '../components/BcryptMethodsCheatSheet';
import { Shield, KeyRound, Lock, UserCheck, ArrowRight } from 'lucide-react';

export default function SecurityPage() {
  const m3 = CURRICULUM.modules[2];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16 pb-24">
      {/* Editorial Header */}
      <div>
        <BackButton />
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#2457FF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
            CRYPTOGRAPHY & PROTOCOLS / CHAPTER 03
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#20242A]">
          Bcrypt Hashing, Data Sanitization & HttpOnly Cookie
        </h2>
        <p className="text-[#62666B] mt-2 text-base leading-relaxed max-w-3xl font-sans">
          {m3.summary}
        </p>
      </div>

      {/* Two Swiss Architectural Flow Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Diagram 1: Access Control Pipeline */}
        <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2457FF]" />
              <h3 className="font-bold text-sm text-[#20242A] uppercase tracking-wider font-mono">
                1. Access Control Flow
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#62666B]">PRINCIPLE</span>
          </div>

          <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] font-mono text-xs space-y-2 text-[#20242A]" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between">
              <span className="text-[#62666B]">CLIENT</span>
              <span className="text-[#2457FF]">01</span>
            </div>
            <div className="text-center text-[#62666B]">↓ (Sends Credentials)</div>
            <div className="flex items-center justify-between font-bold text-[#20242A]">
              <span>AUTHENTICATION</span>
              <span className="text-[#2457FF]">02 (Who are you?)</span>
            </div>
            <div className="text-center text-[#62666B]">↓ (Generates Token)</div>
            <div className="flex items-center justify-between font-bold text-[#20242A]">
              <span>AUTHORIZATION</span>
              <span className="text-[#2457FF]">03 (What can you do?)</span>
            </div>
            <div className="text-center text-[#62666B]">↓ (Access Granted)</div>
            <div className="flex items-center justify-between text-[#2457FF] font-bold">
              <span>PROTECTED RESOURCE</span>
              <span>04 (/api/v2/users/auth)</span>
            </div>
          </div>
          <p className="text-xs text-[#62666B] font-sans leading-relaxed">
            Authentication ยืนยันว่าคุณคือใคร (Login) ส่วน Authorization ตรวจสอบว่าคุณมีสิทธิ์เข้าถึง Resource นั้นหรือไม่ (Middleware Guard)
          </p>
        </div>

        {/* Diagram 2: JWT Lifecycle */}
        <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#2457FF]" />
              <h3 className="font-bold text-sm text-[#20242A] uppercase tracking-wider font-mono">
                2. JWT Cookie Lifecycle
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#62666B]">PIPELINE</span>
          </div>

          <div className="p-4 bg-[#20242A] text-[#F6F5F1] font-mono text-xs space-y-2" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between">
              <span className="text-[#D9D8D3]">LOGIN</span>
              <span className="text-[#2457FF]">POST /login</span>
            </div>
            <div className="text-center text-[#62666B]">↓</div>
            <div className="flex items-center justify-between">
              <span className="text-[#D9D8D3]">TOKEN ISSUED</span>
              <span className="text-emerald-400">HttpOnly Cookie</span>
            </div>
            <div className="text-center text-[#62666B]">↓ (Browser Attaches Automatically)</div>
            <div className="flex items-center justify-between">
              <span className="text-[#D9D8D3]">MIDDLEWARE</span>
              <span className="text-amber-400">authUser.js</span>
            </div>
            <div className="text-center text-[#62666B]">↓ (jwt.verify with JWT_SECRET)</div>
            <div className="flex items-center justify-between text-white font-bold">
              <span>CONTROLLER</span>
              <span className="text-[#2457FF]">req.user Attached</span>
            </div>
          </div>
          <p className="text-xs text-[#62666B] font-sans leading-relaxed">
            HttpOnly Cookie ป้องกันการขโมย Token ผ่าน XSS ได้ 100% เพราะ JavaScript ภายนอกไม่สามารถเข้าถึงสตริง Token ในเบราว์เซอร์ได้
          </p>
        </div>
      </div>

      {/* Bcrypt Explanation Box */}
      <div className="p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]">
            SALTING & COST FACTOR
          </span>
          <h3 className="font-bold text-lg text-[#20242A]">
            {m3.content.bcryptDeepDive.title}
          </h3>
        </div>
        <div className="whitespace-pre-line text-[#62666B] leading-relaxed text-sm sm:text-base font-sans">
          {m3.content.bcryptDeepDive.explanation}
        </div>
      </div>

      {/* Bcrypt Complete Methods & Functions Cheat Sheet */}
      <BcryptMethodsCheatSheet />

      {/* Register Sanitization Walkthrough */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#D9D8D3]">
          <h3 className="font-bold text-xl text-[#20242A]">
            เทคนิคตัดรหัสผ่านทิ้ง: Destructuring Sanitization
          </h3>
          <span className="font-mono text-xs text-[#62666B]">REST OPERATOR SANITIZATION</span>
        </div>
        <CodeWalkthrough
          file="backend/src/routes/v2/users.routes.js (POST /register)"
          code={`import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";

export const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, role, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // แฮชรหัสผ่าน 12 รอบ (2^12 = 4,096 iterations)
    const hash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      role: role || "user",
      email,
      password: hash,
      passwordHash: hash,
    });

    // ใช้ Rest Operator ดึงเฉพาะส่วนที่ปลอดภัย ตัด password ทิ้ง
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
});`}
          purpose="บันทึกข้อมูลผู้ใช้พร้อมรหัสผ่านที่แฮชแล้ว และตัดรหัสผ่านทิ้งก่อนตอบกลับ Client"
          whySyntax="JavaScript Rest Operator (...rest) จะสร้าง Object ใหม่โดยละทิ้งคีย์ที่ถูกระบุไว้ข้างหน้าอย่างสมบูรณ์แบบ"
          connection="รับข้อมูลจาก Client ทำการบันทึกลง MongoDB และส่ง Object ที่ปลอดภัยกลับไปหาหน้าบ้าน React"
          breakdown={[
            {
              instruction: "const hash = await bcrypt.hash(password, 12)",
              why: "สร้างรหัสผ่านที่มี Salt ผสม 12 รอบ ป้องกัน Rainbow Table Attack อย่างเด็ดขาด"
            },
            {
              instruction: "const { password: _pw, ...userWithoutPassword } = newUser.toObject()",
              why: "การันตี 100% ว่ารหัสผ่าน hash จะไม่หลุดออกไปบน Network ให้บุคคลภายนอกเห็น"
            }
          ]}
          productionTip="การตั้ง password: { select: false } ใน Schema เป็นแนวป้องกันชั้นที่ 1 และการ Destructure เป็นแนวป้องกันชั้นที่ 2 (Defense in Depth)"
        />
      </div>

      {/* authUser Middleware */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#D9D8D3]">
          <h3 className="font-bold text-xl text-[#20242A]">
            ด่านตรวจตั๋วผ่านประตู: authUser.js Middleware
          </h3>
          <span className="font-mono text-xs text-[#62666B]">GUARD MIDDLEWARE</span>
        </div>
        <CodeWalkthrough
          file="backend/src/middlewares/authUser.js"
          code={`import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  // ดึง Token จาก HttpOnly Cookie
  let token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "access denied, No token" });
  }

  try {
    // แกะตรวจ Token ด้วย Secret Key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // แปะข้อมูล user ไว้ใน request เพื่อให้ route ถัดไปหยิบใช้
    req.user = decodedToken;

    // ⭐ สั่งให้ไปต่อที่ Handler ถัดไป
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};`}
          purpose="ตรวจสอบสิทธิ์ในทุก Request ก่อนอนุญาตให้เข้าถึงข้อมูลสำคัญ"
          whySyntax="Express Middleware ตรวจสอบ Cookie ก่อน หากถูกต้องจะเรียก next() เพื่อส่งต่อ req.user ไปให้ Controller ประมวลผลต่อ"
          connection="ทำงานคั่นกลางระหว่าง cookieParser() และ Protected Route เช่น GET /api/v2/users/auth"
          breakdown={[
            {
              instruction: "let token = req.cookies.accessToken",
              why: "ดึง Token ที่เบราว์เซอร์แนบมาใน Header แบบ HttpOnly ป้องกันการถูกขโมยผ่าน XSS"
            },
            {
              instruction: "next()",
              why: "คำสั่งปล่อยให้ Request เดินทางต่อไปยัง Controller ถัดไป ถ้าลืมคำสั่งนี้ API จะค้างทันที"
            }
          ]}
        />
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">บทเรียนที่ 03: <span className="font-mono">Security & Cryptography</span></span>
      </div>
    </div>
  );
}
