import { CodeWalkthrough } from './CodeWalkthrough';
import { Lock, Sliders, ShieldAlert } from 'lucide-react';

export function EnvAndCorsGuide() {
  return (
    <div className="pt-10 space-y-16">
      {/* Header */}
      <div>
        <div className="inline-block px-2.5 py-1 rounded bg-neutral-900 text-white font-mono text-xs uppercase tracking-wider mb-2">
          CONFIGURATION & SECURITY MASTERCLASS
        </div>
        <h3 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900">
          เจาะลึกการตั้งค่า .env และความลับของ CORS
        </h3>
        <p className="text-neutral-600 mt-2 text-base max-w-3xl leading-relaxed">
          สองเสาหลักที่โปรแกรมเมอร์ทุกคนต้องเจอ: วิธีจัดการความลับของระบบด้วย Environment Variables 
          และวิธีปลดล็อกการเชื่อมต่อข้ามพอร์ตระหว่าง Front-End กับ Back-End ด้วย CORS
        </p>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: .ENV DEEP DIVE */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-8">
        <div className="pb-4 border-b border-neutral-200">
          <span className="font-serif italic text-2xl text-neutral-400">01</span>
          <h4 className="text-2xl font-bold text-neutral-900 mt-1">
            การกำหนดและใช้งานไฟล์ .env (Environment Variables)
          </h4>
          <p className="text-neutral-600 text-sm mt-1">
            ทำไมต้องมี .env? เก็บอะไรข้างใน? และในโปรเจกต์นี้โหลดไฟล์มาใช้ได้อย่างไร?
          </p>
        </div>

        {/* Why .env Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-neutral-200/80">
            <Lock className="w-5 h-5 text-neutral-800 mb-2" />
            <h5 className="font-bold text-sm text-neutral-900">1. ป้องกันรหัสผ่านรั่วไหล</h5>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              ห้าม Hardcode ข้อมูลลับ เช่น Password ฐานข้อมูล หรือ Secret Key ของ JWT ลงในไฟล์โค้ดเด็ดขาด เพราะหากเผลอ Push ขึ้น GitHub จะถูกแฮกทันที
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-neutral-200/80">
            <Sliders className="w-5 h-5 text-neutral-800 mb-2" />
            <h5 className="font-bold text-sm text-neutral-900">2. ยืดหยุ่นตาม Environment</h5>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              ตอนเขียนบนเครื่อง (Development) ใช้ฐานข้อมูลจำลองในเครื่อง แต่ตอนขึ้นเซิร์ฟเวอร์จริง (Production) แค่เปลี่ยนค่าใน .env โดยไม่ต้องแตะโค้ดแม้แต่บรรทัดเดียว
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-neutral-200/80">
            <ShieldAlert className="w-5 h-5 text-rose-600 mb-2" />
            <h5 className="font-bold text-sm text-neutral-900">3. กฎเหล็ก: ใส่ .gitignore เสมอ</h5>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              ต้องเพิ่มบรรทัด <code className="bg-neutral-200 px-1 rounded font-mono">.env</code> ลงในไฟล์ <code className="bg-neutral-200 px-1 rounded font-mono">.gitignore</code> เสมอ และสร้าง <code className="bg-neutral-200 px-1 rounded font-mono">.env.example</code> ไว้แทน
            </p>
          </div>
        </div>

        {/* Code Walkthrough: .env structure */}
        <CodeWalkthrough
          file="backend/.env (ไฟล์ตัวอย่างการกำหนดค่าจริง)"
          code={`# ==========================================
# 1. การตั้งค่าเซิร์ฟเวอร์ (Server Config)
# ==========================================
PORT=666
NODE_ENV=development

# ==========================================
# 2. ฐานข้อมูล MongoDB (Mongoose Connection ตัวอย่าง)
# ==========================================
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.your_host.mongodb.net/your_db?retryWrites=true&w=majority

# ==========================================
# 3. ฐานข้อมูล Supabase (PostgreSQL Cloud ตัวอย่าง)
# ==========================================
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SECRET_KEY=your_supabase_secret_key_here

# ==========================================
# 4. กุญแจลับสำหรับเข้ารหัส JWT Token (ตัวอย่าง)
# ==========================================
JWT_SECRET=your_jwt_secret_encryption_key_here`}
          purpose="ไฟล์เก็บตัวแปรระบบประจำเครื่อง (Environment Variables) ซึ่งเก็บค่า Config และความลับของระบบทั้งหมด"
          breakdown={[
            {
              instruction: "PORT=666 (จำเป็นต้องเป็น 3000 หรือ 3001 ไหม?)",
              why: "ไม่จำเป็นเลย! พอร์ตคือ 'หมายเลขประตู' ของเครื่องคอมพิวเตอร์ นักพัฒนาสามารถกำหนดหมายเลขพอร์ตใดก็ได้ตามใจชอบในช่วง 1024 ถึง 65535 (เช่น 666, 4000, 5000, 8080) ขอเพียงไม่ไปชนกับโปรแกรมอื่นที่กำลังเปิดอยู่ (Port Conflict) และไม่ใช้ช่วง 0-1023 ที่เป็น System Well-Known Ports (เช่น 80 สำหรับ HTTP, 443 สำหรับ HTTPS)"
            },
            {
              instruction: "รูปแบบการเขียน: KEY=VALUE (ไม่มีเว้นวรรครอบเครื่องหมายเท่ากับ)",
              why: "ต้องเขียนติดกัน เช่น PORT=666 ห้ามเขียน PORT = 666 เพราะ Parser อาจมองช่องว่างเป็นส่วนหนึ่งของชื่อตัวแปร"
            },
            {
              instruction: "ไม่ต้องใส่เครื่องหมายคำพูด (Quotes) ครอบข้อความ",
              why: "ในไฟล์ .env ค่าทุกอย่างจะถูกอ่านเป็น String อัตโนมัติอยู่แล้ว ยกเว้นข้อความที่มีการเคาะวรรคภายใน"
            }
          ]}
          pitfall="ห้ามอัปโหลดไฟล์ .env ขึ้น Git เด็ดขาด! ให้สร้างไฟล์ .env.example ที่ใส่เฉพาะชื่อคีย์แต่เว้นค่าว่างไว้ เพื่อให้เพื่อนร่วมทีมรู้ว่าต้องตั้งค่าตัวแปรอะไรบ้าง"
          productionTip="ใน Node.js 20.6 ขึ้นไป สามารถรันคำสั่ง node --env-file=.env src/server.js ได้ทันที โดยไม่ต้องติดตั้งแพ็กเกจ dotenv เพิ่มเติม ดังที่ระบุไว้ใน package.json!"
        />

        {/* How to use in Code */}
        <CodeWalkthrough
          file="backend/src/config/db.js (วิธีดึงค่า .env มาใช้ในโค้ด)"
          code={`import mongoose from "mongoose";

export async function connectDB() {
  // ดึงค่า MONGODB_URI จากตัวแปรแวดล้อมระบบผ่าน process.env
  const uri = process.env.MONGODB_URI;

  // ตรวจสอบก่อนว่าผู้ใช้ได้ตั้งค่าไว้ใน .env หรือไม่
  if (!uri) {
    throw new Error("MONGODB_URI is not set in .env file");
  }

  // ทำการเชื่อมต่อไปยัง MongoDB
  await mongoose.connect(uri);

  console.log("Yo ! MONGODB is connected");
}`}
          purpose="การดึงค่า Environment Variables มาใช้ใน JavaScript ผ่าน global object: process.env"
          breakdown={[
            {
              instruction: "process.env.VARIABLE_NAME",
              why: "เป็น Object สากลของ Node.js ที่รวบรวมค่าทั้งหมดที่ถูกโหลดเข้ามาจากไฟล์ .env"
            },
            {
              instruction: "if (!uri) throw new Error(...)",
              why: "หลักการ Fail Fast: ตรวจสอบความถูกต้องทันทีตั้งแต่เริ่มสตาร์ท หากไม่มีค่า URI ให้หยุดโปรแกรมและแจ้งเตือน แทนที่จะปล่อยให้ไปพังตอนรันคำสั่ง"
            }
          ]}
        />
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: CORS DEEP DIVE */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-8">
        <div className="pb-4 border-b border-neutral-200">
          <span className="font-serif italic text-2xl text-neutral-400">02</span>
          <h4 className="text-2xl font-bold text-neutral-900 mt-1">
            ความลับของ CORS: ทำไมถึงโดนบล็อก และแก้อย่างไรให้ถูกต้อง?
          </h4>
          <p className="text-neutral-600 text-sm mt-1">
            เข้าใจกลไก Same-Origin Policy ของเบราว์เซอร์ และการอนุญาตให้รับ-ส่ง Cookie ข้ามพอร์ต
          </p>
        </div>

        {/* What is Origin Card */}
        <div className="p-5 rounded-xl bg-[#FAF9F5] border border-neutral-200 space-y-4">
          <h5 className="font-bold text-base text-neutral-900">
            คำว่า "Origin" ในเบราว์เซอร์ประกอบด้วย 3 สิ่ง:
          </h5>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded bg-blue-100 text-blue-800 font-bold">1. Protocol (http://)</span>
            <span className="text-neutral-400">+</span>
            <span className="px-3 py-1.5 rounded bg-emerald-100 text-emerald-800 font-bold">2. Domain (localhost)</span>
            <span className="text-neutral-400">+</span>
            <span className="px-3 py-1.5 rounded bg-amber-100 text-amber-800 font-bold">3. Port (:5173 vs :666)</span>
          </div>
          <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
            หากตัวใดตัวหนึ่งใน 3 สิ่งนี้ต่างกัน เบราว์เซอร์จะถือว่าเป็น <strong>"คนละ Origin (Cross-Origin)"</strong> ทันที! 
            และกฎความปลอดภัย Same-Origin Policy จะสั่งบล็อกการอ่านข้อมูลทันที เว้นแต่ว่าเซิร์ฟเวอร์ปลายทางจะส่ง Header อนุญาตมาอย่างชัดเจน
          </p>
        </div>

        {/* Backend CORS Walkthrough */}
        <CodeWalkthrough
          file="backend/src/server.js (การเปิดประตู CORS ฝั่งเซิร์ฟเวอร์)"
          code={`import express from "express";
import cors from "cors";

const app = express();

// กำหนดการอนุญาต CORS อย่างแม่นยำ
app.use(cors({
  // 1. ระบุ Origin ที่อนุญาตให้เรียกใช้ (Frontend React พอร์ต 5173)
  origin: "http://localhost:5173",

  // 2. สำคัญที่สุด: อนุญาตให้รับ-ส่ง Cookie และ Authorization Header ข้าม Origin
  credentials: true,

  // 3. ระบุ Method ที่อนุญาต
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

  // 4. ระบุ Headers ที่ยอมให้ Client แนบมา
  allowedHeaders: ["Content-Type", "Authorization"]
}));`}
          purpose="ติดตั้ง Middleware สำหรับส่ง Header ตอบกลับเบราว์เซอร์ว่าอนุญาตให้ React พอร์ต 5173 ดึงข้อมูลและส่ง Cookie ได้"
          breakdown={[
            {
              instruction: "origin: 'http://localhost:5173'",
              why: "การระบุเจาะจงปลอดภัยกว่าการใช้ origin: '*' (เปิดให้ทุกคน) และที่สำคัญ: หากตั้งค่า origin: '*' เบราว์เซอร์จะไม่อนุญาตให้ใช้ credentials: true เด็ดขาด!"
            },
            {
              instruction: "credentials: true",
              why: "คำสั่งอนุญาตให้เบราว์เซอร์รับส่ง Cookie ข้าม Origin หากขาดบรรทัดนี้ Cookie accessToken จะไม่ถูกบันทึกลงในเบราว์เซอร์"
            }
          ]}
          pitfall="หากตั้งค่า app.use(cors()) แบบลอยๆ ค่าเริ่มต้นจะไม่เปิด credentials: true ทำให้ระบบ Login ด้วย Cookie พังทันที!"
        />

        {/* Frontend CORS Walkthrough */}
        <CodeWalkthrough
          file="frontend/src/services/api.js (การตั้งค่าฝั่ง Client ให้ส่ง Cookie ผ่าน CORS)"
          code={`// ฟังก์ชันเรียก API ฝั่ง React
export async function fetchWithAuth(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    // ⭐ คำสั่งพระเอก: สั่งให้เบราว์เซอร์แนบ HttpOnly Cookie ไปด้วย
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(\`Request failed with status \${response.status}\`);
  }

  return await response.json();
}`}
          purpose="การใช้ Fetch API ฝั่ง React เพื่อสื่อสารกับเซิร์ฟเวอร์ข้ามพอร์ตอย่างถูกต้อง"
          breakdown={[
            {
              instruction: "credentials: 'include'",
              why: "ค่าเริ่มต้นของ fetch ในเบราว์เซอร์คือ 'same-origin' (ไม่ส่ง Cookie ข้ามพอร์ต) เราจึงต้องเปลี่ยนเป็น 'include' เพื่อบังคับให้ส่ง Cookie ข้ามพอร์ตไปยัง :666 เสมอ"
            }
          ]}
          pitfall="หลายคนติดปัญหานี้เป็นวันๆ: ตั้งค่า CORS ใน Backend ถูกแล้ว แต่ฝั่ง React ลืมใส่ credentials: 'include' ทำให้ Backend มองไม่เห็น Cookie และตอบกลับ 401 Unauthorized เสมอ"
        />
      </div>
    </div>
  );
}
