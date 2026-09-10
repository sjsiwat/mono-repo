import { useState } from 'react';
import { ChevronDown, ChevronsUpDown, Terminal } from 'lucide-react';
import { CodeWalkthrough } from './CodeWalkthrough';
import { FunctionAnatomySection } from './FunctionAnatomySection';

export function BeginnerGuide() {
  const [openSteps, setOpenSteps] = useState(new Set());

  const toggleStep = (idx) => {
    setOpenSteps(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenSteps(new Set(steps.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenSteps(new Set());
  };

  const steps = [
    {
      stepNum: "STEP 01",
      title: "เตรียมบ้านให้โปรเจกต์ (Init Project & package.json)",
      purpose: "สร้างไฟล์ package.json เพื่อบอกให้ Node.js รู้จักโปรเจกต์และเปิดใช้มาตรฐาน ESM (import/export)",
      whySyntax: "JavaScript ในอดีตใช้คำสั่ง require() แต่โลกยุคใหม่ใช้มาตรฐานสากล ECMAScript Modules (import/export) การระบุ \"type\": \"module\" จะบังคับให้ Node.js แปลงทั้งโฟลเดอร์ให้รองรับ import ทันที",
      connection: "ไฟล์นี้คือ 'ทะเบียนบ้าน' ของ Backend ทั้งหมด เป็นจุดแรกที่ Node.js จะมาอ่านเมื่อเราสั่งรันคำสั่ง npm run dev โดยคำสั่ง node --env-file=.env จะส่งตัวแปรไปยัง Step 03 และสั่งรัน Step 08 (server.js)",
      terminalCode: `# 1. สร้างโฟลเดอร์ backend แล้วเข้าไปข้างใน
mkdir backend
cd backend

# 2. สร้าง package.json ค่าเริ่มต้น
npm init -y`,
      code: `{
  "name": "jsd-mono-backend",
  "version": "1.0.0",
  "type": "module", // บังคับใส่ เพื่อให้ใช้ import ... from ... ได้
  "main": "src/server.js",
  "scripts": {
    // โหลดไฟล์ .env อัตโนมัติและรีสตาร์ทตัวเองเมื่อเซฟไฟล์
    "dev": "node --env-file=.env --watch src/server.js",
    "start": "node src/server.js"
  }
}`,
      file: "backend/package.json",
      breakdown: [
        {
          instruction: '"type": "module"',
          why: "เปลี่ยนโหมดของ Node.js ให้ใช้มาตรฐาน ES Modules ทำให้สามารถใช้คำสั่ง import express from 'express' ได้ หากไม่ใส่จะเกิด Error ทันที"
        },
        {
          instruction: '"dev": "node --env-file=.env --watch src/server.js"',
          why: "ฟีเจอร์ในตัวของ Node.js (v20.6+) ที่โหลด .env ให้เองโดยไม่ต้องลง dotenv และมี --watch คอยรีสตาร์ทเซิร์ฟเวอร์เมื่อเซฟโค้ด"
        }
      ],
      pitfall: "หากไม่ใส่ \"type\": \"module\" เมื่อรันคำสั่งที่มี import ระบบจะฟ้องว่า: Cannot use import statement outside a module"
    },

    {
      stepNum: "STEP 02",
      title: "ติดตั้งเครื่องมือและแพ็กเกจที่จำเป็น (Dependencies)",
      purpose: "ติดตั้งเครื่องมือสำเร็จรูปจาก npm เพื่อช่วยจัดการเซิร์ฟเวอร์, ความปลอดภัย, และฐานข้อมูล",
      whySyntax: "การสร้างระบบ Web Server ระดับองค์กร หากเขียนด้วย JavaScript ดิบจะยาวหลายพันบรรทัด เราจึงใช้คำสั่ง npm install เพื่อดึงเครื่องมือมาตรฐานระดับโลกมาใช้งาน",
      connection: "แพ็กเกจเหล่านี้จะถูกนำเข้า (import) ไปใช้งานในไฟล์ต่างๆ: express และ cors ใช้ใน server.js (Step 08), bcrypt และ jwt ใช้ใน routes และ middleware (Step 06, 07), และ mongoose ใช้ใน db.js และ user.model.js (Step 04, 05)",
      terminalCode: `npm install express cors cookie-parser bcrypt jsonwebtoken mongoose @supabase/supabase-js`,
      code: `{
  "dependencies": {
    "@supabase/supabase-js": "^2.116.0", // ไดรเวอร์เชื่อมต่อฐานข้อมูล Supabase PostgreSQL
    "bcrypt": "^6.0.0",                 // อัลกอริทึมแฮชรหัสผ่าน 12 รอบ
    "cookie-parser": "^1.4.7",          // มิดเดิลแวร์แกะ Cookie จาก Header
    "cors": "^2.8.6",                   // มิดเดิลแวร์เปิดทางข้ามพอร์ต
    "express": "^5.2.1",                // เว็บเฟรมเวิร์กจัดการ HTTP Server
    "jsonwebtoken": "^9.0.3",           // ตัวสร้างและตรวจสอบ Token
    "mongoose": "^9.9.5"                // ตัวเชื่อมต่อและจัดการ Schema ของ MongoDB
  }
}`,
      file: "backend/package.json (Dependencies)",
      breakdown: [
        {
          instruction: "express (v5)",
          why: "แกนหลักของระบบ คอยเปิดดักฟังคำขอและส่งข้อมูลกลับ"
        },
        {
          instruction: "bcrypt & jsonwebtoken",
          why: "คู่หูความปลอดภัย: ตัวหนึ่งแฮชรหัสผ่านตอนสมัคร อีกตัวออกตั๋วตอนล็อกอิน"
        }
      ]
    },

    {
      stepNum: "STEP 03",
      title: "การตั้งค่าตัวแปรแวดล้อมและความลับ (.env & .gitignore)",
      purpose: "แยกค่า Config พอร์ต และรหัสผ่านฐานข้อมูลออกจาก Source Code เพื่อความปลอดภัยสูงสุด",
      whySyntax: "รูปแบบ KEY=VALUE เป็นมาตรฐานสากลของระบบปฏิบัติการ โดยห้ามใส่เครื่องหมายคำพูดและห้ามมีช่องว่างรอบเครื่องหมายเท่ากับ เพื่อให้ตัวแปลงค่าทำงานได้แม่นยำ 100%",
      connection: "ค่าในไฟล์ .env จะถูก Node.js โหลดเข้าไปเก็บไว้ในตัวแปรระดับโกลบอล process.env ซึ่งจะถูกไฟล์ src/config/db.js (Step 04), src/middlewares/authUser.js (Step 06), และ src/server.js (Step 08) ดึงไปใช้งานต่อ",
      terminalCode: `# สร้างไฟล์ .gitignore เพื่อบล็อก .env ไม่ให้หลุดขึ้น Git
touch .gitignore

# สร้างไฟล์ .env สำหรับใส่ค่าจริงบนเครื่องตัวเอง
touch .env`,
      code: `# ==========================================
# 1. พอร์ตและสภาพแวดล้อม
# ==========================================
PORT=666
NODE_ENV=development

# ==========================================
# 2. การเชื่อมต่อ MongoDB Atlas (ตัวอย่าง)
# ==========================================
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.your_host.mongodb.net/your_db?retryWrites=true&w=majority

# ==========================================
# 3. การเชื่อมต่อ Supabase (ตัวอย่าง)
# ==========================================
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SECRET_KEY=your_supabase_secret_key_here

# ==========================================
# 4. กุญแจลับสำหรับเข้ารหัส JWT Token (ตัวอย่าง)
# ==========================================
JWT_SECRET=your_jwt_secret_encryption_key_here`,
      file: "backend/.env",
      breakdown: [
        {
          instruction: "PORT=666 (กำหนดหมายเลขพอร์ตที่ Express จะเปิดรอรับ Request)",
          why: "ความจริงเรื่องพอร์ต: พอร์ตไม่จำเป็นต้องตั้งเป็น 3000 หรือ 3001 เสมอไป ผู้พัฒนาสามารถเลือกหมายเลขพอร์ตได้เองตามใจชอบ (แนะนำช่วง 1024 ถึง 65535 เช่น 666, 4000, 5000, 8080) ขอเพียงแค่เลขพอร์ตนั้นไม่ไปชนกับโปรแกรมอื่นที่กำลังเปิดใช้งานอยู่ในเครื่อง (Port Conflict) และไม่ใช้พอร์ตระบบ 0-1023 (เช่น 80, 443) ที่สงวนไว้สำหรับระดับ OS"
        },
        {
          instruction: "JWT_SECRET",
          why: "กุญแจลับที่ใช้เซ็นลายเซ็นดิจิทัลบน Token หากค่านี้รั่วไหล ผู้ไม่หวังดีจะสามารถปลอมตัวเป็น Admin ได้ทันที"
        }
      ],
      pitfall: "ห้ามอัปโหลด .env ขึ้น GitHub เด็ดขาด! ต้องใส่คำว่า .env ลงใน .gitignore เสมอ"
    },

    {
      stepNum: "STEP 04",
      title: "สร้างโมดูลเชื่อมต่อฐานข้อมูล (src/config/db.js)",
      purpose: "สร้างฟังก์ชัน connectDB() สำหรับเชื่อมต่อกับ MongoDB Atlas ผ่าน Mongoose",
      whySyntax: "การเชื่อมต่อฐานข้อมูลผ่านเครือข่ายอินเทอร์เน็ตเป็นกระบวนการที่ไม่รู้ว่าจะเสร็จเมื่อไหร่ จึงต้องเขียนเป็น async function และใช้คำสั่ง await เพื่อรอให้เชื่อมต่อสำเร็จก่อน",
      connection: "ไฟล์นี้ดึงค่า MONGODB_URI จาก .env (Step 03) และจะถูกส่งออก (export) ไปให้ server.js (Step 08) เรียกสั่งทำงานก่อนที่เซิร์ฟเวอร์จะเปิดรับคำขอ",
      file: "backend/src/config/db.js",
      code: `import mongoose from "mongoose";

export async function connectDB() {
  // ดึงค่า URI มาจาก .env ผ่านตัวแปรระดับโกลบอลของ Node.js
  const uri = process.env.MONGODB_URI;

  // ตรวจสอบความถูกต้องก่อนเชื่อมต่อ (Fail-Fast Principle)
  if (!uri) {
    throw new Error("MONGODB_URI is not set in .env file");
  }

  // ทำการเชื่อมต่อไปยัง MongoDB Cluster
  await mongoose.connect(uri);

  console.log("Yo ! MONGODB is connected");
}`,
      breakdown: [
        {
          instruction: "const uri = process.env.MONGODB_URI;",
          why: "ดึงค่าคอนฟิกที่ถูกโหลดมาจาก .env ใน Step 03"
        },
        {
          instruction: "if (!uri) throw new Error(...)",
          why: "หากลืมใส่ค่าใน .env ให้สั่งหยุดทันทีตั้งแต่ตอนเริ่มสตาร์ท เพื่อเตือนผู้พัฒนาให้แก้ไข"
        }
      ]
    },

    {
      stepNum: "STEP 05",
      title: "สร้างพิมพ์เขียวข้อมูล User Model (src/models/user.model.js)",
      purpose: "กำหนดโครงสร้างตารางข้อมูลผู้ใช้ (Schema) และกฎความถูกต้อง (Validation) ใน MongoDB",
      whySyntax: "Mongoose ใช้คำสั่ง new mongoose.Schema({ ... }) เพื่อกำหนดพิมพ์เขียว และใช้ mongoose.model('User', schema) เพื่อแปลงให้เป็น Class Object ที่พร้อมสั่งค้นหาหรือบันทึกข้อมูล",
      connection: "Model ตัวนี้คือตัวแทนของคอลเลกชัน 'users' ใน MongoDB ซึ่งจะถูกนำเข้า (import) ไปใช้งานใน Controller ของ Step 07 เพื่อสั่ง User.create(), User.findOne(), User.find()",
      file: "backend/src/models/user.model.js",
      code: `import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true,
      trim: true 
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
    },
    // select: false เพื่อความปลอดภัยสูงสุด: เวลา find ปกติจะไม่ดึงรหัสผ่านติดมาด้วย
    password: { 
      type: String, 
      required: true, 
      select: false 
    },
    passwordHash: { 
      type: String, 
      select: false 
    }
  },
  { timestamps: true } // Mongoose จะสร้าง createdAt และ updatedAt ให้อัตโนมัติ
);

export const User = mongoose.model("User", userSchema);`,
      breakdown: [
        {
          instruction: "password: { select: false }",
          why: "เทคนิคความปลอดภัยระดับสากล: ซ่อนฟิลด์รหัสผ่านไม่ให้ Mongoose ดึงติดมาด้วยเวลา query ปกติ"
        },
        {
          instruction: "timestamps: true",
          why: "บันทึกเวลาสร้างและเวลาแก้ไขข้อมูลล่าสุดให้อัตโนมัติ"
        }
      ]
    },

    {
      stepNum: "STEP 06",
      title: "สร้างด่านตรวจความปลอดภัย (src/middlewares/authUser.js)",
      purpose: "สร้างมิดเดิลแวร์คอยตรวจจับและแกะอ่าน accessToken จาก HttpOnly Cookie",
      whySyntax: "Middleware ใน Express ต้องรับพารามิเตอร์ 3 ตัวเสมอ: (req, res, next) โดยมีฟังก์ชัน next() เป็นกุญแจปล่อยให้คำขอเดินทางต่อไป",
      connection: "ไฟล์นี้เชื่อมต่อระหว่าง CookieParser (Step 08) ซึ่งเป็นคนแกะ Cookie ให้เป็น req.cookies และทำหน้าที่เป็นยามเฝ้าหน้าประตูให้กับ Route ที่ต้องการการยืนยันตัวตน เช่น /api/v2/users/auth (Step 07)",
      file: "backend/src/middlewares/authUser.js",
      code: `import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  // 1. ดึง Token จาก HttpOnly Cookie ที่แนบมากับ Request
  let token = req.cookies.accessToken;

  // ถ้าไม่มี Token แปลว่ายังไม่ได้ล็อกอิน ให้ปฏิเสธทันทีด้วย Status 401
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "access denied, No token" 
    });
  }

  try {
    // 2. แกะตรวจ Token ด้วย JWT_SECRET จาก .env
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 3. ฝากข้อมูลผู้ใช้ไว้ใน req.user เพื่อให้ Handler ถัดไปหยิบใช้ได้
    req.user = decodedToken;

    // 4. ⭐ คำสั่งปล่อยผ่านไปยัง Route ถัดไป
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};`,
      breakdown: [
        {
          instruction: "req.user = decodedToken;",
          why: "เป็นการส่งต่อข้อมูลผู้ใช้ข้ามท่อ (Pipeline) เพื่อให้ฟังก์ชันถัดไปรู้ว่าใครเป็นคนส่งคำขอมา"
        },
        {
          instruction: "next();",
          why: "หากไม่มีบรรทัดนี้ คำขอจะหยุดนิ่งและทำให้เบราว์เซอร์หมุนค้างตลอดกาล (API ค้าง!)"
        }
      ]
    },

    {
      stepNum: "STEP 07",
      title: "สร้างเส้นทางและ Controller (src/routes/v2/users.routes.js)",
      purpose: "สร้างจุดรับส่งข้อมูลสำหรับสมัครสมาชิก (Register), เข้าสู่ระบบ (Login), และตรวจบัตร (Auth)",
      whySyntax: "ใช้ Router() ของ Express ในการแยกกลุ่มเส้นทางย่อย และใช้ async/await ร่วมกับ try...catch เพื่อจัดการข้อผิดพลาดและส่ง next(err)",
      connection: "ไฟล์นี้นำ Model จาก Step 05 มาสั่งบันทึกข้อมูล, นำ Middleware จาก Step 06 มาดักหน้า Route /auth, และจะถูกนำไปเสียบเข้ากับ server.js ใน Step 08",
      file: "backend/src/routes/v2/users.routes.js",
      code: `import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { authUser } from "../../middlewares/authUser.js";

export const router = Router();

// 1. สมัครสมาชิก: แฮชรหัสผ่าน 12 รอบ และตัดรหัสทิ้งก่อนตอบกลับ
router.post("/register", async (req, res, next) => {
  try {
    const { username, role, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // แฮชรหัสผ่านด้วย Bcrypt Cost Factor 12
    const hash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      role: role || "user",
      email,
      password: hash,
      passwordHash: hash
    });

    // ใช้ Destructuring ตัดรหัสผ่านทิ้ง
    const { password: _pw, passwordHash: _hash, ...safeUser } = newUser.toObject();

    return res.status(201).json({ message: "Register successful", user: safeUser });
  } catch (err) {
    next(err);
  }
});

// 2. เข้าสู่ระบบ: เปรียบเทียบรหัสผ่าน และเซ็ต HttpOnly accessToken Cookie
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ success: false, message: "Incorrect Password" });

    // สร้างตั๋ว JWT Token อายุ 1 ชั่วโมง
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const isProd = process.env.NODE_ENV === "production";

    // ฝาก Token ลงใน HttpOnly Cookie ป้องกันการถูกขโมย
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000 // 1 ชั่วโมง
    });

    return res.status(200).json({ success: true, message: "Login Successful" });
  } catch (err) {
    next(err);
  }
});

// 3. ตรวจสอบสิทธิ์ผ่าน authUser Middleware
router.get("/auth", authUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});`,
      breakdown: [
        {
          instruction: "const { password: _pw, ...safeUser } = newUser.toObject()",
          why: "ตัดรหัสผ่านทิ้งก่อนส่ง JSON ออกไป รับประกันว่ารหัสผ่านจะไม่รั่วไหล"
        },
        {
          instruction: "res.cookie('accessToken', token, { httpOnly: true })",
          why: "ส่ง Cookie ให้เบราว์เซอร์เก็บไว้ในกล่องนิรภัยที่ JavaScript เข้าไม่ถึง"
        }
      ]
    },

    {
      stepNum: "STEP 08",
      title: "ประกอบร่างศูนย์กลางเซิร์ฟเวอร์ (src/server.js)",
      purpose: "เชื่อมต่อ Middleware, Database, Routing, และเปิดประตูดักฟังที่พอร์ต 666",
      whySyntax: "ใช้คำสั่ง app.use() เพื่อสร้างท่อ Pipeline และใช้ฟังก์ชัน async start() ครอบไว้ เพื่อรอให้ Database พร้อมก่อนเปิดรับ Request",
      connection: "ไฟล์นี้คือสมองกลศูนย์กลาง: ดึง Database จาก Step 04, ดึง Routes จาก Step 07, รับคำขอผ่าน CORS จากหน้าบ้าน React (Step 10) และส่ง Response กลับไป",
      file: "backend/src/server.js",
      code: `import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { router as apiRoutes } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 666;

// 1. ท่อกรอง CORS: เปิดประตูเฉพาะ React พอร์ต 5173 พร้อมส่ง Cookie
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// 2. ท่อแปลง JSON: แปลง Body ที่ส่งมาให้กลายเป็น Object req.body
app.use(express.json());

// 3. ท่อแปลง Cookie: แปลง Header Cookie ให้กลายเป็น req.cookies
app.use(cookieParser());

// 4. ผูก Routing เข้ากับ URL Prefix /api
app.use("/api", apiRoutes);

// 5. Centralized Error Handling: ตัวรับจบป้องกันเซิร์ฟเวอร์ดับและ API ค้าง
app.use((err, req, res, next) => {
  return res.status(500).json({ 
    error: "Something crash bro", 
    message: err.message 
  });
});

// 6. ฟังก์ชันเริ่มการทำงานของเซิร์ฟเวอร์
async function start() {
  try {
    // เชื่อมต่อฐานข้อมูลให้เสร็จเรียบร้อยก่อน
    await connectDB();

    // เปิดรับ Connection
    app.listen(port, () => {
      console.log(\`Server is running on PORT Localhost:\${port}\`);
    });
  } catch (err) {
    console.error("Failed to connect database:", err.message);
    process.exit(1);
  }
}

start();`,
      breakdown: [
        {
          instruction: "app.use(cors({ origin: 'http://localhost:5173', credentials: true }))",
          why: "อนุญาตการคุยข้ามพอร์ตและเปิดทางให้รับส่ง Cookie"
        },
        {
          instruction: "app.use(express.json())",
          why: "จำเป็นมาก! ถ้าไม่มีบรรทัดนี้ req.body จะเป็น undefined เสมอ"
        }
      ]
    },

    {
      stepNum: "STEP 09",
      title: "ทดสอบยิง API ก่อนต่อหน้าบ้าน (Test HTTP Client)",
      purpose: "ทดสอบความถูกต้องของแต่ละ Endpoint ผ่านไฟล์ .rest หรือ Postman",
      whySyntax: "ไฟล์ .rest เป็นมาตรฐานสากลของ VS Code REST Client ช่วยให้เราคลิก 'Send Request' และเห็นผลลัพธ์ JSON ได้ทันทีโดยไม่ต้องเปิดโปรแกรมอื่น",
      connection: "ยิงคำขอตรงเข้าหา Express Server พอร์ต 666 ที่รันจาก Step 08",
      file: "backend/users-api-test.rest",
      code: `### 1. ทดสอบอ่านรายชื่อ User ทั้งหมด
GET http://localhost:666/api/v1/users
Accept: application/json

### 2. ทดสอบสมัครสมาชิก (v2 Register with Bcrypt)
POST http://localhost:666/api/v2/users/register
Content-Type: application/json

{
  "username": "demo_user",
  "email": "user@example.com",
  "password": "Password999!"
}

### 3. ทดสอบล็อกอินรับ HttpOnly Cookie (v2 Login)
POST http://localhost:666/api/v2/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password999!"
}`,
      breakdown: [
        {
          instruction: "Content-Type: application/json",
          why: "Header บังคับเพื่อบอกให้ express.json() รู้ว่าข้อมูลที่ส่งมาเป็น JSON"
        }
      ]
    },

    {
      stepNum: "STEP 10",
      title: "เชื่อมต่อ Frontend React เข้ากับ Backend (Clean Integration)",
      purpose: "เขียนฟังก์ชันดึงข้อมูลจากหน้าเว็บ React ไปหา Express พอร์ต 666 พร้อมส่ง Cookie",
      whySyntax: "ใช้คำสั่ง fetch() ของเบราว์เซอร์ โดยต้องระบุ credentials: 'include' ในตัวเลือก options",
      connection: "เป็นการเชื่อมโยงปิดลูปทั้งระบบ: React พอร์ต 5173 ──(HTTP + Cookie)──> Express พอร์ต 666 ──(Query)──> MongoDB Atlas",
      file: "frontend/src/services/api.js",
      code: `// ฟังก์ชันเรียก API ฝั่ง React
const API_BASE = "http://localhost:666/api";

export async function fetchUsers() {
  const response = await fetch(\`\${API_BASE}/v1/users\`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // คำสั่งสำคัญที่สุด: สั่งให้เบราว์เซอร์แนบ HttpOnly Cookie ไปกับ Request ข้ามพอร์ต
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
}`,
      breakdown: [
        {
          instruction: "credentials: 'include'",
          why: "หากไม่ใส่คำสั่งนี้ เบราว์เซอร์จะไม่ส่ง Cookie ไปให้พอร์ต 666 ส่งผลให้ถูกปฏิเสธสิทธิ์ (401) ตลอดเวลา"
        }
      ]
    }
  ];

  return (
    <div className="pt-8 space-y-16">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#2457FF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
            CURRICULUM BLUEPRINT / 10 PHASES
          </span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#20242A]">
          คู่มือสร้าง Backend ทีละสเต็ปตามขั้นตอนจริง (10 Steps)
        </h3>
        <p className="text-[#62666B] mt-2 text-base max-w-3xl leading-relaxed font-sans">
          ไล่เรียงขั้นตอนการสร้างระบบ Backend ทั้งหมดตั้งแต่เริ่มต้นตามลำดับความเป็นจริงในโลกการพัฒนาซอฟต์แวร์
          ตั้งแต่เตรียมสภาพแวดล้อม, การตั้งค่า <strong className="text-[#20242A]">.env</strong>, การเชื่อมต่อฐานข้อมูล, 
          การเขียน Controller, Middleware, การทดสอบ, จนถึงการเชื่อมต่อกับหน้าบ้าน React
        </p>
      </div>

      {/* Function, Parameter & Argument Guide for Beginners */}
      <FunctionAnatomySection />

      {/* 10 Steps Accordion Header & Controls */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D8D3]">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#20242A] tracking-tight">
              10 ขั้นตอนตามลำดับความเป็นจริง
            </h4>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 border border-[#D9D8D3] bg-[#FFFFFF] hover:bg-[#F6F5F1] text-[#20242A] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              style={{ borderRadius: '4px' }}
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
              <span>ขยายทั้งหมด</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 border border-[#D9D8D3] bg-[#FFFFFF] hover:bg-[#F6F5F1] text-[#62666B] font-semibold transition-all cursor-pointer"
              style={{ borderRadius: '4px' }}
            >
              พับทั้งหมด
            </button>
          </div>
        </div>

        {/* Accordion Steps List */}
        <div className="space-y-4">
          {steps.map((item, idx) => {
            const isOpen = openSteps.has(idx);
            return (
              <div
                key={idx}
                className={`border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#20242A] bg-[#FFFFFF] shadow-sm'
                    : 'border-[#D9D8D3] bg-[#FFFFFF] hover:border-[#62666B]'
                }`}
                style={{ borderRadius: '6px' }}
              >
                {/* Clickable Header */}
                <button
                  type="button"
                  onClick={() => toggleStep(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none transition-colors hover:bg-[#F6F5F1]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#20242A] text-white shrink-0 self-start sm:self-auto" style={{ borderRadius: '3px' }}>
                      {item.stepNum}
                    </span>
                    <div>
                      <h5 className="text-base sm:text-lg font-bold text-[#20242A] leading-snug">
                        {item.title}
                      </h5>
                      <p className="text-xs text-[#62666B] font-sans mt-0.5 line-clamp-1">
                        {item.purpose}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#62666B] shrink-0 mt-1 sm:mt-0">
                    <span className="hidden md:inline text-[11px]">
                      {isOpen ? 'คลิกเพื่อพับเก็บ' : 'คลิกเพื่อดูโค้ด'}
                    </span>
                    <div className={`p-1.5 border border-[#D9D8D3] transition-transform ${
                      isOpen ? 'border-[#20242A] bg-[#20242A] text-white rotate-180' : 'bg-[#F6F5F1] text-[#20242A]'
                    }`} style={{ borderRadius: '4px' }}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-3 border-t border-[#D9D8D3] space-y-4 bg-[#FFFFFF]">
                    {item.terminalCode && (
                      <div className="p-4 bg-[#20242A] text-[#F6F5F1] font-mono text-xs border border-[#20242A]" style={{ borderRadius: '4px' }}>
                        <div className="text-[10px] uppercase font-bold text-[#FF6B35] mb-1 flex items-center gap-1.5">
                          <Terminal className="w-3 h-3 text-[#FF6B35]" />
                          <span>Terminal Commands:</span>
                        </div>
                        <pre className="overflow-x-auto text-[#EAF0FF]">{item.terminalCode}</pre>
                      </div>
                    )}

                    <CodeWalkthrough
                      file={item.file}
                      code={item.code}
                      purpose={item.purpose}
                      whySyntax={item.whySyntax}
                      connection={item.connection}
                      breakdown={item.breakdown}
                      pitfall={item.pitfall}
                      productionTip={item.productionTip}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
