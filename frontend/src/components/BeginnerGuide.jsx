import { useState } from 'react';
import { ChevronDown, ChevronsUpDown, Terminal, CheckCircle2, Server, ShieldCheck, Database, LayoutDashboard, Folder, FileCode, Package } from 'lucide-react';
import { CodeWalkthrough } from './CodeWalkthrough';
import { TerminalCodeBlock } from './TerminalCodeBlock';
import { FunctionAnatomySection } from './FunctionAnatomySection';
import { Step10FrontendResultPreview } from './Step10FrontendResultPreview';
import { FrontendIntegrationSection } from './FrontendIntegrationSection';

export function BeginnerGuide() {
  const [openSteps, setOpenSteps] = useState(new Set([0]));

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
      stepNum: "STEP 00",
      isHighlight: true,
      badge: "PREREQUISITE / START HERE",
      title: "เตรียมสภาพแวดล้อมและขึ้นโครงโปรเจกต์จากศูนย์ (Environment & Monorepo Setup)",
      purpose: "ตรวจเช็กโปรแกรมจำเป็นในเครื่อง (Node.js, Git) และสร้างโฟลเดอร์ Root พร้อมไฟล์แรก .gitignore เพื่อเริ่มต้นโปรเจกต์อย่างเป็นระเบียบและปลอดภัย 100%",
      whySyntax: "ก่อนจะพิมพ์คำสั่ง npm init ใน Step 01 เครื่องคอมพิวเตอร์ต้องมี Node.js ติดตั้งไว้ก่อน และในการพัฒนาเว็บระดับมืออาชีพ เราจัดโครงสร้างเป็นแบบ Monorepo (แยกโฟลเดอร์ backend/ และ frontend/ อยู่ใต้รากเดียวกัน) สิ่งสำคัญที่สุดคือต้องสร้าง .gitignore เป็นไฟล์แรก เพื่อป้องกันไม่ให้เผลอนำความลับ (.env) หรือไฟล์ขยะ (node_modules) ขึ้นสู่ Git ตั้งแต่วินาทีแรก!",
      connection: "การสร้างโฟลเดอร์ mono-repo และไฟล์ .gitignore ระดับ Root จะเป็นเสาเข็มของทั้งระบบ: โฟลเดอร์ backend/ (Step 01 - 08) และ frontend/ (Step 10) จะอยู่ร่วมกันอย่างเป็นสัดส่วน โดยไฟล์ .env ที่สร้างใน Step 03 จะได้รับการปกป้องโดยอัตโนมัติตามกฎของ .gitignore นี้",
      terminalCode: `# 1. ตรวจสอบเวอร์ชัน Node.js และ npm ในเครื่อง (แนะนำ Node v20.6 ขึ้นไป เพื่อรองรับ --env-file)
node -v
npm -v

# 2. สร้างโฟลเดอร์หลักของโปรเจกต์ (Monorepo Root) แล้วเข้าไปข้างใน
mkdir mono-repo
cd mono-repo

# 3. เริ่มต้นระบบควบคุมเวอร์ชันด้วย Git
git init

# 4. สร้างไฟล์แรกสุดระดับรากฐานเพื่อป้องกันข้อมูลรั่วไหล
touch .gitignore`,
      code: `# =========================================================================
# ไฟล์แรกสุดของโปรเจกต์: .gitignore (วางไว้ที่ระดับ Root ของ mono-repo)
# หน้าที่: กรองและบล็อกไฟล์ที่ไม่ควรนำขึ้นระบบ Git Repository
# =========================================================================

# 1. โฟลเดอร์ไลบรารีขนาดใหญ่ (ติดตั้งใหม่ได้เสมอผ่าน npm install)
node_modules/
*/node_modules/

# 2. ไฟล์ความลับระดับสูงสุด (ห้ามขึ้น Git เด็ดขาด ป้องกัน Database ถูกแฮก!)
.env
.env.local
*.env

# 3. โฟลเดอร์ผลลัพธ์การ Build สำหรับ Production
dist/
build/

# 4. ไฟล์ขยะของระบบปฏิบัติการและ Editor
.DS_Store
Thumbs.db
.vscode/
*.log`,
      file: "mono-repo/.gitignore (Root File แรกสุดของโปรเจกต์)",
      breakdown: [
        {
          instruction: "node -v (แนะนำ Node.js v20.6 ขึ้นไป)",
          why: "โปรเจกต์นี้ใช้ฟังก์ชัน node --env-file=.env --watch ในตัวของ Node.js (เริ่มมีตั้งแต่ v20.6+) ทำให้ไม่ต้องลง nodemon หรือ dotenv เพิ่มเติม"
        },
        {
          instruction: "mkdir mono-repo && cd mono-repo && git init",
          why: "สร้างกล่องบรรจุแม่สำหรับจัดโครงสร้าง Monorepo รวม backend และ frontend ไว้ด้วยกัน พร้อมผูกระบบ Git Track ไฟล์ตั้งแต่เริ่มต้น"
        },
        {
          instruction: "ระบุ .env ใน .gitignore",
          why: "กฎเหล็กความปลอดภัย: ไฟล์ .env บรรจุ Password ของ MongoDB Atlas หากเผลอ Push ขึ้น GitHub จะถูกบอทสแกนและโดนยึดฐานข้อมูลทันที"
        },
        {
          instruction: "ระบุ node_modules/ ใน .gitignore",
          why: "โฟลเดอร์นี้มีไฟล์หลายหมื่นไฟล์และขนาดหลายร้อย MB ทุกคนที่ Clone โค้ดไปสามารถรัน npm install เพื่อสร้างใหม่ได้เอง จึงไม่ควรใส่ใน Git"
        }
      ],
      pitfall: "รีบพิมพ์ git add . โดยลืมสร้าง .gitignore ก่อน จะทำให้ไฟล์ .env หรือ node_modules ถูก Track เข้า Git ซึ่งแกะออกยากมากและเสี่ยงต่อความปลอดภัย",
      productionTip: "ในโปรเจกต์จริง แนะนำให้สร้างไฟล์ .env.example ไว้คู่กันเสมอ เพื่อเป็นตัวอย่างระบุชื่อคีย์ที่ต้องตั้งค่า (เช่น PORT=, MONGODB_URI=) โดยเว้นค่าว่างไว้ให้คนอื่นนำไปเติมเอง"
    },
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
  "name": "mono-repo-backend",
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
    "@supabase/supabase-js": "^2.49.1", // ไดรเวอร์เชื่อมต่อฐานข้อมูล Supabase PostgreSQL
    "bcrypt": "^5.1.1",                 // อัลกอริทึมแฮชรหัสผ่าน 12 รอบ
    "cookie-parser": "^1.4.7",          // มิดเดิลแวร์แกะ Cookie จาก Header
    "cors": "^2.8.5",                   // มิดเดิลแวร์เปิดทางข้ามพอร์ต
    "express": "^4.21.2",               // เว็บเฟรมเวิร์กจัดการ HTTP Server ยอดนิยม
    "jsonwebtoken": "^9.0.2",           // ตัวสร้างและตรวจสอบ Token
    "mongoose": "^8.12.0"               // ตัวเชื่อมต่อและจัดการ Schema ของ MongoDB
  }
}`,
      file: "backend/package.json (Dependencies)",
      breakdown: [
        {
          instruction: "express (v4.21.2)",
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
      purpose: "แยกค่า Config พอร์ต, คีย์ฐานข้อมูล (MongoDB/Supabase) และ JWT Secret ออกจาก Source Code เพื่อความปลอดภัยสูงสุด",
      whySyntax: "รูปแบบ KEY=VALUE เป็นมาตรฐานสากลของระบบปฏิบัติการ โดยห้ามใส่เครื่องหมายคำพูดและห้ามมีช่องว่างรอบเครื่องหมายเท่ากับ เพื่อให้ตัวแปลงค่าทำงานได้แม่นยำ 100%",
      connection: "ค่าในไฟล์ .env จะถูก Node.js โหลดเข้าไปเก็บไว้ในตัวแปรระดับโกลบอล process.env ซึ่งจะถูกไฟล์ src/config/db.js (Step 04), src/middlewares/authUser.js (Step 06), และ src/server.js (Step 08) ดึงไปใช้งานต่อ",
      terminalCode: `# 1. สร้างไฟล์ .gitignore เพื่อบล็อก .env ไม่ให้หลุดขึ้น Git
touch .gitignore

# 2. สร้างไฟล์ .env สำหรับใส่ค่าคีย์จริงบนเครื่องตัวเอง
touch .env

# 💡 คำสั่ง Terminal สำหรับสุ่มสร้าง JWT_SECRET ที่ปลอดภัยระดับสูง (64 ตัวอักษร Hex):
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`,
      code: `# =========================================================================
# 1. หมายเลขพอร์ตและโหมดการทำงาน
# =========================================================================
PORT=666
NODE_ENV=development

# =========================================================================
# 2. การเชื่อมต่อ MongoDB Atlas (สมัครฟรี 100% ที่ mongodb.com/cloud/atlas)
# 💡 หมายเหตุสำคัญสำหรับผู้เรียน:
#    หากต้องการรันตามให้ได้ผลลัพธ์ครบตามเว็บนี้ ต้องมี MongoDB Key ของตัวเอง (สมัครฟรี):
#    1. สมัครบัญชีฟรีที่ mongodb.com/cloud/atlas (เลือกคลัสเตอร์ฟรี M0 Sandbox)
#    2. ไปที่ Database Access ➔ สร้าง Database User (กำหนด username และ password)
#    3. ไปที่ Network Access ➔ กด Add IP Address ➔ เลือก "Allow Access from Anywhere" (0.0.0.0/0)
#    4. กดปุ่ม Connect ➔ Drivers (Node.js) ➔ คัดลอก Connection String มาวาง
#    5. เปลี่ยน <username> และ <password> เป็นของตนเอง
# =========================================================================
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.your_host.mongodb.net/your_db?retryWrites=true&w=majority

# =========================================================================
# 3. การเชื่อมต่อ Supabase PostgreSQL (สมัครฟรี 100% ที่ supabase.com)
# 💡 หากต้องการทดสอบ Route ฝั่ง PostgreSQL (/users/pg) ต้องมี Supabase Key ของตัวเอง:
#    1. สมัครฟรีที่ supabase.com ➔ กด New Project
#    2. ไปที่ Project Settings ➔ API
#    3. Project URL ➔ คัดลอกมาใส่ที่ SUPABASE_URL
#    4. Project API Keys (anon หรือ service_role) ➔ คัดลอกมาใส่ที่ SUPABASE_SECRET_KEY
# =========================================================================
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SECRET_KEY=your_supabase_secret_key_here

# =========================================================================
# 4. กุญแจลับสำหรับเข้ารหัส JWT Token (JWT_SECRET หาจากไหน?)
# 💡 JWT_SECRET หาจากไหนมาใส่ตรงนี้?:
#    • มันคือข้อความลับ (Secret Passphrase) ที่คุณ "คิดขึ้นมาเองได้เลย" เหมือนรหัสผ่านแม่กุญแจ!
#    • ตัวอย่างแบบคิดเอง: "MySecretKey_JSDMono_2026_!@#"
#    • วิธีสร้างแบบมาตรฐานความปลอดภัยสูง (สุ่มผ่าน Node.js ใน Terminal):
#      node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
#      แล้วคัดลอกสตริงยาวๆ 64 ตัวอักษรที่ได้มาวางเป็นค่าของ JWT_SECRET
# =========================================================================
JWT_SECRET=your_jwt_secret_encryption_key_here`,
      file: "backend/.env",
      breakdown: [
        {
          instruction: "MONGODB_URI (สมัครฟรีที่ MongoDB Atlas)",
          why: "หากผู้เรียนต้องการทำตามให้ได้ผลลัพธ์ครบตามเว็บนี้ ต้องมี MongoDB Connection String ของตัวเอง สมัครฟรีได้ที่ mongodb.com/cloud/atlas (เลือกคลัสเตอร์ฟรี M0 Sandbox) แล้วนำ Connection String มาเปลี่ยน <username> และ <password> เป็นของตนเอง"
        },
        {
          instruction: "SUPABASE_URL & SUPABASE_SECRET_KEY (สมัครฟรีที่ Supabase)",
          why: "หากต้องการทดสอบ Route ฝั่ง PostgreSQL (/api/v2/users/pg) ผู้เรียนสามารถสมัครฟรีได้ที่ supabase.com จากนั้นไปที่เมนู Project Settings ➔ API เพื่อคัดลอก URL และ Secret Key มาใส่"
        },
        {
          instruction: "JWT_SECRET หาจากไหนมาใส่ตรงนี้?",
          why: "JWT_SECRET ไม่จำเป็นต้องไปขอจากเว็บไหน! มันคือข้อความลับที่คุณ 'คิดขึ้นมาเองได้เลย' หรือจะใช้คำสั่ง Terminal ของ Node.js: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\" เพื่อสุ่มสร้างรหัสลับ 64 ตัวอักษรที่มีความปลอดภัยระดับสูงแล้วนำมาวางตรงนี้"
        },
        {
          instruction: "PORT=666 (กำหนดหมายเลขพอร์ตที่ Express จะเปิดรอรับ Request)",
          why: "ความจริงเรื่องพอร์ต: พอร์ตไม่จำเป็นต้องตั้งเป็น 3000 หรือ 3001 เสมอไป ผู้พัฒนาสามารถเลือกหมายเลขพอร์ตได้เองตามใจชอบ (แนะนำช่วง 1024 ถึง 65535 เช่น 666, 4000, 5000, 8080) ขอเพียงแค่เลขพอร์ตนั้นไม่ไปชนกับโปรแกรมอื่นที่กำลังเปิดใช้งานอยู่ในเครื่อง (Port Conflict) และไม่ใช้พอร์ตระบบ 0-1023 ที่สงวนไว้สำหรับระดับ OS"
        }
      ],
      pitfall: "หากผู้เรียนไม่ได้ใส่ MONGODB_URI ของตนเอง หรือลืมแก้ <password> เซิร์ฟเวอร์จะเชื่อมต่อฐานข้อมูลไม่ผ่านและฟ้องว่า Authentication Failed ทันที และห้ามนำไฟล์ .env นี้ Push ขึ้น GitHub เด็ดขาด!",
      productionTip: "ไฟล์ .env บนเครื่องแต่ละคนจะมี Key ของตัวเอง จึงควรสร้างไฟล์ .env.example ไว้บน Git โดยใส่เฉพาะชื่อตัวแปรว่างๆ (เช่น MONGODB_URI=, JWT_SECRET=) เพื่อบอกเพื่อนร่วมทีมว่าต้องไปสมัคร Key อะไรมาใส่บ้าง"
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
      match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, "Invalid email format"]
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
          instruction: "password & passwordHash",
          why: "เก็บค่า Hash ของรหัสผ่านคู่กันเพื่อรองรับความเข้ากันได้ย้อนหลัง (Backward Compatibility) ระหว่าง Route เวอร์ชัน v1 และ v2 ในโปรเจกต์นี้"
        },
        {
          instruction: "timestamps: true",
          why: "บันทึกเวลาสร้าง (createdAt) และเวลาแก้ไขข้อมูลล่าสุด (updatedAt) ให้อัตโนมัติ"
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
      title: "สร้างเส้นทาง CRUD และ Auth Controller ครบวงจร (C-R-U-D Architecture)",
      purpose: "สร้างจุดรับส่งข้อมูลครบทั้ง 4 มิติ CRUD (Create, Read, Update, Delete) พร้อมระบบยืนยันตัวตนที่ปลอดภัย",
      whySyntax: "ใช้ Router() ของ Express แยกกลุ่มเส้นทาง, ใช้ req.params สำหรับระบุตัวตน ID, ใช้ req.body สำหรับรับข้อมูล, และใช้ async/await ครอบด้วย try...catch เพื่อส่งต่อ Error ด้วย next(err)",
      connection: "ไฟล์นี้นำ User Model จาก Step 05 มาสั่งงาน Database, นำ authUser จาก Step 06 มาเป็นยามเฝ้าประตู, และจะถูกนำไปติดตั้งลงใน server.js ใน Step 08",
      file: "backend/src/routes/v2/users.routes.js",
      code: `import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { authUser } from "../../middlewares/authUser.js";

export const router = Router();

// =========================================================================
// [C] CREATE: สร้างข้อมูลผู้ใช้ใหม่ (POST /register หรือ POST /)
// =========================================================================
router.post("/register", async (req, res, next) => {
  try {
    const { username, role, email, password } = req.body;

    // 1. ตรวจสอบว่าส่งข้อมูลครบไหม (Validation)
    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email, and password are required" });
    }

    // 2. แฮชรหัสผ่านด้วย Bcrypt 12 รอบ (Security)
    const hash = await bcrypt.hash(password, 12);

    // 3. สั่ง Mongoose บันทึกลง MongoDB
    const newUser = await User.create({
      username,
      role: role || "user",
      email,
      password: hash,
      passwordHash: hash
    });

    // 4. ตัดฟิลด์รหัสผ่านทิ้งก่อนส่งกลับ (Data Sanitization)
    const { password: _pw, passwordHash: _hash, ...safeUser } = newUser.toObject();

    // 5. ตอบกลับด้วย Status 201 Created
    return res.status(201).json({ message: "Register successful", user: safeUser });
  } catch (err) {
    // ดักจับกรณี Email หรือ Username ซ้ำ (MongoDB Duplicate Key Error Code 11000)
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email or username already exists" });
    }
    next(err);
  }
});

// =========================================================================
// [AUTH] LOGIN: เข้าสู่ระบบ, ยืนยันรหัสผ่าน, ออก JWT และส่ง HttpOnly Cookie (POST /login)
// =========================================================================
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "email and password are required" });
    }

    // 2. ค้นหาผู้ใช้จากอีเมล (ต้องใช้ .select("+password") ดึงรหัสผ่านที่ซ่อนไว้ออกมา)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // 3. เทียบรหัสผ่านที่ส่งมา กับ Hash ใน Database ด้วย bcrypt.compare()
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ success: false, message: "Incorrect Password" });
    }

    // 4. สร้าง JWT Token บรรจุ payload { userId: user._id } อายุ 1 ชั่วโมง
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const isProd = process.env.NODE_ENV === "production";

    // 5. ส่ง Token ผ่าน HttpOnly Cookie (ป้องกันสคริปต์ XSS ขโมย Token)
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

// =========================================================================
// [AUTH] LOGOUT: ล้าง HttpOnly Cookie ออกจากเบราว์เซอร์ (POST /logout)
// =========================================================================
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

// =========================================================================
// [R] READ ALL: ดึงรายชื่อผู้ใช้ทั้งหมด (GET /)
// =========================================================================
router.get("/", async (req, res, next) => {
  try {
    // ดึง Document ทั้งหมดจาก MongoDB (Password ถูก select: false ซ่อนไว้ตาม Schema)
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// =========================================================================
// [R] READ ONE: ดึงข้อมูลโปรไฟล์ของตัวเองหลังตรวจบัตร (GET /auth)
// =========================================================================
router.get("/auth", authUser, async (req, res, next) => {
  try {
    // req.user ถูกแนบเข้ามาโดย authUser Middleware (หลังถอดรหัส JWT สำเร็จ)
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

// =========================================================================
// [U] UPDATE: อัปเดตแก้ไขข้อมูลผู้ใช้รายบุคคล (PUT /:id)
// =========================================================================
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // รับ ID จาก URL เช่น /api/v2/users/650abc...
    const { username, email, password } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const hash = await bcrypt.hash(password, 12);
      updateData.password = hash;
      updateData.passwordHash = hash;
    }

    // returnDocument: 'after' สั่งให้ Mongoose คืนค่าข้อมูล 'หลังแก้ไขแล้ว' กลับมา
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _p, passwordHash: _h, ...safeUser } = updatedUser.toObject();
    return res.status(200).json(safeUser);
  } catch (err) {
    next(err);
  }
});

// =========================================================================
// [D] DELETE: ลบข้อมูลผู้ใช้ออกจากระบบ (DELETE /:id)
// =========================================================================
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // ตรวจสอบความถูกต้องของ MongoDB ObjectId
    let deletedUser = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedUser = await User.findByIdAndDelete(id);
    } else {
      // ถ้าส่งมาเป็น username ก็ค้นหาลบได้เช่นกัน
      deletedUser = await User.findOneAndDelete({ username: id });
    }

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Delete successful", deletedCount: 1 });
  } catch (err) {
    next(err);
  }
});`,
      breakdown: [
        {
          instruction: "[C] User.create() & res.status(201)",
          why: "การบันทึกข้อมูลใหม่ต้องคืน 201 Created เสมอ และต้องตัดรหัสผ่านทิ้งด้วย Rest Operator ก่อนส่ง JSON ออกไป"
        },
        {
          instruction: "err.code === 11000 ➔ 409 Conflict",
          why: "ดักจับกรณีอีเมลหรือ Username ซ้ำจาก MongoDB unique index เพื่อตอบกลับ 409 Conflict แทนที่จะปล่อยให้เซิร์ฟเวอร์พังเป็น 500"
        },
        {
          instruction: "[AUTH] User.findOne().select('+password') & bcrypt.compare()",
          why: "ดึงฟิลด์รหัสผ่านที่ถูกซ่อนไว้ด้วย select: false ออกมาเฉพาะตอน Login เพื่อนำมาเปรียบเทียบ hash อย่างปลอดภัย"
        },
        {
          instruction: "res.cookie('accessToken', token, { httpOnly: true })",
          why: "สร้างเซสชันด้วย HttpOnly Cookie ที่เบราว์เซอร์ไม่อนุญาตให้ JavaScript ภายนอกอ่าน ป้องกันการขโมย Token ผ่านช่องโหว่ XSS"
        },
        {
          instruction: "[R] User.find() & res.status(200)",
          why: "ดึงข้อมูลทั้งหมดจาก Database โดย Mongoose Schema ป้องกันรหัสผ่านรั่วไหลด้วย select: false ไว้อัตโนมัติ"
        },
        {
          instruction: "[U] User.findByIdAndUpdate(id, updateData, { returnDocument: 'after' })",
          why: "อัปเดตเฉพาะฟิลด์ที่ส่งมา และออปชัน 'after' ทำให้เราได้ข้อมูลเวอร์ชันล่าสุดส่งกลับไปให้หน้าบ้านทันที"
        },
        {
          instruction: "[D] User.findByIdAndDelete(id) & เช็ค 404",
          why: "หากไม่พบ ID ที่ต้องการลบ ต้องรีบคืน 404 Not Found ทันที อย่าปล่อยให้เซิร์ฟเวอร์ตอบ 200 หลอกผู้ใช้งาน"
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
      title: "คู่มือการต่อ Frontend React เข้ากับ Backend (Step-by-Step)",
      purpose: "เชื่อมโยงระบบทั้งวงจรอย่างสมบูรณ์แบบ: สร้าง Service Layer (userService.js), ประกอบร่าง React Component (UserDashboard.jsx) ด้วย useEffect, เชื่อม App.jsx เข้ากับ Root Entrypoint (main.jsx, index.html, routes/index.js) และวิธีรันจริง",
      isFrontendIntegrationModule: true
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
              11 ขั้นตอนตามลำดับความเป็นจริง (STEP 00 – STEP 10)
            </h4>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-sans text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 border border-[#D9D8D3] bg-[#FFFFFF] hover:bg-[#F6F5F1] text-[#20242A] font-medium transition-all cursor-pointer flex items-center gap-1.5"
              style={{ borderRadius: '4px' }}
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
              <span>ขยายทั้งหมด</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 border border-[#D9D8D3] bg-[#FFFFFF] hover:bg-[#F6F5F1] text-[#62666B] font-medium transition-all cursor-pointer"
              style={{ borderRadius: '4px' }}
            >
              พับทั้งหมด
            </button>
          </div>
        </div>

        {/* Real Deliverables Card: ผลลัพธ์จริงที่ได้จากการทำตาม Step 00 - 10 */}
        <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-base sm:text-lg text-[#20242A]">
                ผลลัพธ์ที่ได้จริงเมื่อทำตาม STEP 00 – STEP 10 ครบถ้วน (Realistic Deliverables)
              </h5>
              <p className="text-xs sm:text-sm text-[#62666B] font-sans mt-0.5">
                อ้างอิงจากโค้ดจริงทุกบรรทัดในโปรเจกต์นี้ 100% — เมื่อทำครบ 11 ขั้นตอน คุณจะได้ระบบ Full-Stack ที่พร้อมทำงานร่วมกันจริง ดังนี้:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Box 1: Backend Server */}
            <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] space-y-2.5" style={{ borderRadius: '4px' }}>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#2457FF]" />
                <span className="font-mono text-xs font-bold text-[#20242A]">
                  1. Backend REST API Server (พอร์ต 666)
                </span>
              </div>
              <ul className="text-xs text-[#62666B] space-y-1.5 list-disc list-inside font-sans">
                <li>เซิร์ฟเวอร์ <strong>Node.js + Express (ES Modules)</strong> รันด้วย <code className="text-[#20242A]">node --env-file=.env --watch src/server.js</code></li>
                <li>ท่อ <strong>CORS</strong> อนุญาตเฉพาะ React พอร์ต 5173 พร้อม <code className="text-[#20242A]">credentials: true</code> เพื่อรับส่ง Cookie ข้ามพอร์ต</li>
                <li>ท่อ <strong>express.json()</strong> และ <strong>cookieParser()</strong> แปลงข้อมูลใน Request</li>
                <li><strong>Centralized Error Handler</strong> ป้องกันเซิร์ฟเวอร์แครชและแก้ปัญหา API หมุนค้าง</li>
              </ul>
              <span className="inline-block text-[10px] font-mono text-[#62666B] bg-[#FFFFFF] px-2 py-0.5 border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
                สร้างจาก: STEP 00, 01, 02, 03, 08
              </span>
            </div>

            {/* Box 2: Database Layer */}
            <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] space-y-2.5" style={{ borderRadius: '4px' }}>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span className="font-mono text-xs font-bold text-[#20242A]">
                  2. ฐานข้อมูล Cloud MongoDB Atlas + Mongoose
                </span>
              </div>
              <ul className="text-xs text-[#62666B] space-y-1.5 list-disc list-inside font-sans">
                <li>โมดูล <strong>connectDB()</strong> เชื่อมต่อ Network Socket ไปยัง MongoDB Atlas พร้อมระบบ Fail-Fast ตรวจ URI ก่อนรัน</li>
                <li><strong>User Model Schema</strong> พร้อมกฎ Validation: username, email (unique + regex), role, timestamps</li>
                <li>การตั้งค่าความปลอดภัยระดับตาราง: <code className="text-[#20242A]">select: false</code> ป้องกันฟิลด์รหัสผ่านหลุดตอน Query ปกติ</li>
              </ul>
              <span className="inline-block text-[10px] font-mono text-[#62666B] bg-[#FFFFFF] px-2 py-0.5 border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
                สร้างจาก: STEP 03, 04, 05
              </span>
            </div>

            {/* Box 3: Security & Auth */}
            <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] space-y-2.5" style={{ borderRadius: '4px' }}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="font-mono text-xs font-bold text-[#20242A]">
                  3. ระบบความปลอดภัยและการยืนยันตัวตน (Auth)
                </span>
              </div>
              <ul className="text-xs text-[#62666B] space-y-1.5 list-disc list-inside font-sans">
                <li><strong>Bcrypt Hashing:</strong> แฮชรหัสผ่าน 12 รอบ (4,096 iterations) ป้องกันการแฮก</li>
                <li><strong>HttpOnly Cookie:</strong> ออกตั๋ว JWT Token ฝังลง Cookie ที่ JS ฝั่ง Client อ่านไม่ได้ ป้องกัน XSS</li>
                <li><strong>authUser Middleware:</strong> ด่านตรวจ Token ด้วย <code className="text-[#20242A]">jwt.verify()</code> และส่งต่อข้อมูลผู้ใช้ผ่าน <code className="text-[#20242A]">req.user</code></li>
                <li><strong>Data Sanitization:</strong> ตัดรหัสผ่านทิ้งด้วย JavaScript Rest Operator ก่อนส่ง JSON เสมอ</li>
              </ul>
              <span className="inline-block text-[10px] font-mono text-[#62666B] bg-[#FFFFFF] px-2 py-0.5 border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
                สร้างจาก: STEP 05, 06, 07
              </span>
            </div>

            {/* Box 4: End-to-End Frontend Integration */}
            <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] space-y-2.5" style={{ borderRadius: '4px' }}>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-purple-600" />
                <span className="font-mono text-xs font-bold text-[#20242A]">
                  4. API 7 เส้นทาง + หน้าเว็บ React Dashboard
                </span>
              </div>
              <ul className="text-xs text-[#62666B] space-y-1.5 list-disc list-inside font-sans">
                <li><strong>7 Endpoints:</strong> Register (201/409), Login, Logout, Read All, Read One (/auth), Update (PUT), Delete</li>
                <li><strong>Test Suite:</strong> ไฟล์ <code className="text-[#20242A]">users-api-test.rest</code> สำหรับคลิกส่ง Request ทดสอบผลลัพธ์ใน VS Code</li>
                <li><strong>React Dashboard:</strong> Component ดึงข้อมูลผ่าน <code className="text-[#20242A]">userService.getAllUsers()</code> ด้วย <code className="text-[#20242A]">useEffect</code></li>
                <li><strong>Lifecycle State:</strong> จัดการครบทั้ง 3 สภาวะ: กำลังโหลด (Loading), จัดการ Error, และตารางแสดงข้อมูลจริง</li>
              </ul>
              <span className="inline-block text-[10px] font-mono text-[#62666B] bg-[#FFFFFF] px-2 py-0.5 border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
                สร้างจาก: STEP 07, 09, 10
              </span>
            </div>
          </div>
        </div>

        {/* Accordion Steps List */}
        <div className="space-y-4">
          {steps.map((item, idx) => {
            const isOpen = openSteps.has(idx);
            const isHighlight = item.isHighlight;
            return (
              <div
                key={idx}
                className={`border transition-all duration-200 overflow-hidden ${
                  isHighlight
                    ? isOpen
                      ? 'border-[#2457FF] bg-[#FFFFFF] shadow-md ring-2 ring-[#2457FF]/20'
                      : 'border-[#2457FF]/70 bg-gradient-to-r from-blue-50/40 via-white to-white hover:border-[#2457FF] shadow-xs'
                    : isOpen
                    ? 'border-[#20242A] bg-[#FFFFFF] shadow-sm'
                    : 'border-[#D9D8D3] bg-[#FFFFFF] hover:border-[#62666B]'
                }`}
                style={{ borderRadius: '6px' }}
              >
                {/* Clickable Header */}
                <button
                  type="button"
                  onClick={() => toggleStep(idx)}
                  className={`w-full p-5 sm:p-6 text-left cursor-pointer focus:outline-none transition-colors ${
                    isHighlight && !isOpen ? 'hover:bg-blue-50/60' : 'hover:bg-[#F6F5F1]'
                  }`}
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                      <div className="shrink-0 flex items-center gap-2 pt-0.5 sm:pt-0">
                        <span
                          className={`inline-flex items-center justify-center font-mono text-xs font-bold px-2.5 py-1 text-white shrink-0 rounded block ${
                            isHighlight ? 'bg-[#2457FF] shadow-xs' : 'bg-[#20242A]'
                          }`}
                          style={{ borderRadius: '3px' }}
                        >
                          {item.stepNum}
                        </span>
                        {isHighlight && (
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-[#2457FF]/10 text-[#2457FF] border border-[#2457FF]/30 rounded shrink-0">
                            ★ PREREQUISITE / START HERE
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className={`text-base sm:text-lg font-bold leading-snug ${isHighlight ? 'text-[#2457FF]' : 'text-[#20242A]'}`}>
                          {item.title}
                        </h5>
                        <p className="text-xs text-[#62666B] font-sans mt-0.5 line-clamp-1">
                          {item.purpose}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-sans text-[#62666B] shrink-0 mt-1 sm:mt-0 ml-2">
                      <span className="hidden md:inline text-xs font-medium">
                        {isOpen ? 'คลิกเพื่อพับเก็บ' : 'คลิกเพื่อดูโค้ด'}
                      </span>
                      <div className={`p-1.5 border border-[#D9D8D3] transition-transform ${
                        isOpen ? 'border-[#20242A] bg-[#20242A] text-white rotate-180' : 'bg-[#F6F5F1] text-[#20242A]'
                      }`} style={{ borderRadius: '4px' }}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-3 border-t border-[#D9D8D3] space-y-4 bg-[#FFFFFF]">
                    {/* Visual Checklist for STEP 00 */}
                    {isHighlight && (
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 border border-blue-200 rounded-md space-y-3 font-sans">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2457FF] animate-pulse" />
                            <h6 className="font-bold text-sm text-[#2457FF] font-mono uppercase tracking-wider">
                              CHECKLIST: 3 สิ่งที่ต้องพร้อมก่อนเริ่มสร้างโค้ดใน STEP 01
                            </h6>
                          </div>
                          <span className="text-[11px] font-mono text-[#2457FF] bg-blue-100/60 font-semibold px-2 py-0.5 rounded border border-blue-200">
                            ZERO-TO-HERO SETUP
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-white border border-blue-100 rounded shadow-2xs space-y-1">
                            <div className="font-bold text-[#20242A] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>1. ตรวจสอบ Node.js (v20.6+)</span>
                            </div>
                            <p className="text-[#62666B] leading-relaxed">
                              รัน <code className="text-[#20242A] bg-[#F6F5F1] px-1 py-0.5 rounded border border-[#D9D8D3]">node -v</code> เพื่อยืนยันว่ารองรับแฟล็ก <code className="text-[#20242A] bg-[#F6F5F1] px-1 py-0.5 rounded border border-[#D9D8D3]">--env-file</code> สำหรับโหลด <code className="text-[#20242A] bg-[#F6F5F1] px-1 py-0.5 rounded border border-[#D9D8D3]">.env</code> ในตัว
                            </p>
                          </div>
                          <div className="p-3 bg-white border border-blue-100 rounded shadow-2xs space-y-1">
                            <div className="font-bold text-[#20242A] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>2. ขึ้นโครง Root Monorepo</span>
                            </div>
                            <p className="text-[#62666B] leading-relaxed">
                              สร้างโฟลเดอร์แม่ <code className="text-[#20242A] bg-[#F6F5F1] px-1 py-0.5 rounded border border-[#D9D8D3]">mono-repo/</code> และสั่ง <code className="text-[#20242A] bg-[#F6F5F1] px-1 py-0.5 rounded border border-[#D9D8D3]">git init</code> เพื่อแยก <code className="text-[#20242A]">backend/</code> และ <code className="text-[#20242A]">frontend/</code> ชัดเจน
                            </p>
                          </div>
                          <div className="p-3 bg-white border border-blue-100 rounded shadow-2xs space-y-1">
                            <div className="font-bold text-[#20242A] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>3. สร้างไฟล์แรก .gitignore</span>
                            </div>
                            <p className="text-[#62666B] leading-relaxed">
                              สร้างทันทีก่อนเขียนโค้ด เพื่อเป็นเกราะป้องกันไม่ให้ <code className="text-[#20242A] bg-[#F6F5F1] px-1 py-0.5 rounded border border-[#D9D8D3]">.env</code> และ <code className="text-[#20242A] bg-[#F6F5F1] px-1 py-0.5 rounded border border-[#D9D8D3]">node_modules/</code> เผลอหลุดขึ้น GitHub
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual Monorepo Folder Tree Blueprint */}
                    {isHighlight && (
                      <div className="p-4 sm:p-5 bg-[#F6F5F1] border border-[#D9D8D3] rounded-md space-y-3 font-sans">
                        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#D9D8D3]">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#2457FF]" />
                            <h6 className="font-mono text-xs font-bold uppercase tracking-wider text-[#20242A]">
                              โครงสร้างโฟลเดอร์ MONO-REPO ที่ถูกต้อง (PROJECT DIRECTORY BLUEPRINT)
                            </h6>
                          </div>
                          <span className="text-[10px] font-mono text-[#62666B] bg-white px-2 py-0.5 rounded border border-[#D9D8D3]">
                            TREE VISUALIZATION
                          </span>
                        </div>

                        {/* Interactive-style Visual Tree */}
                        <div className="p-4 bg-white border border-[#D9D8D3] rounded font-mono text-xs text-[#20242A] space-y-2.5">
                          {/* Root */}
                          <div className="flex items-center gap-2 font-bold text-sm text-[#20242A]">
                            <Package className="w-4 h-4 text-[#2457FF]" />
                            <span>mono-repo/</span>
                            <span className="text-[10px] font-mono font-normal px-2 py-0.5 bg-blue-50 text-[#2457FF] border border-blue-200 rounded">
                              Root Directory (โฟลเดอร์หลัก)
                            </span>
                          </div>

                          {/* Children branch */}
                          <div className="pl-4 ml-2 border-l-2 border-[#D9D8D3] space-y-2.5">
                            {/* 1. .gitignore */}
                            <div className="p-2.5 rounded bg-amber-50/60 border border-amber-200/80 flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <FileCode className="w-4 h-4 text-amber-600 shrink-0" />
                                <span className="font-bold text-[#20242A]">.gitignore</span>
                                <span className="text-[11px] text-[#62666B] font-sans">
                                  ← ไฟล์แรกสุดระดับ Root (บล็อก .env และ node_modules ไม่ให้หลุดขึ้น Git)
                                </span>
                              </div>
                              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                                STEP 00 (สร้างทันที)
                              </span>
                            </div>

                            {/* 2. backend/ */}
                            <div className="p-2.5 rounded bg-[#F6F5F1] border border-[#D9D8D3] space-y-2">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <Folder className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span className="font-bold text-emerald-800">backend/</span>
                                  <span className="text-[11px] text-[#62666B] font-sans">
                                    ← ฝั่งเซิร์ฟเวอร์ Node.js + Express (พอร์ต 666)
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 shrink-0">
                                  STEP 01 – STEP 09
                                </span>
                              </div>
                              <div className="pl-4 ml-2 border-l border-[#D9D8D3] space-y-1 text-[11px] text-[#62666B]">
                                <div className="flex items-center gap-1.5">
                                  <Folder className="w-3.5 h-3.5 text-emerald-600/70" />
                                  <span>src/ (server.js, config/db.js, models, routes, middlewares)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <FileCode className="w-3.5 h-3.5 text-[#62666B]" />
                                  <span>package.json & .env</span>
                                </div>
                              </div>
                            </div>

                            {/* 3. frontend/ */}
                            <div className="p-2.5 rounded bg-[#F6F5F1] border border-[#D9D8D3] space-y-2">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <Folder className="w-4 h-4 text-purple-600 shrink-0" />
                                  <span className="font-bold text-purple-800">frontend/</span>
                                  <span className="text-[11px] text-[#62666B] font-sans">
                                    ← ฝั่งหน้าบ้าน React + Vite (พอร์ต 5173)
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-300 shrink-0">
                                  STEP 10 (เชื่อมต่อหน้าบ้าน)
                                </span>
                              </div>
                              <div className="pl-4 ml-2 border-l border-[#D9D8D3] space-y-1 text-[11px] text-[#62666B]">
                                <div className="flex items-center gap-1.5">
                                  <Folder className="w-3.5 h-3.5 text-purple-600/70" />
                                  <span>src/ (App.jsx, main.jsx, services/userService.js, components)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <FileCode className="w-3.5 h-3.5 text-[#62666B]" />
                                  <span>package.json & index.html</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.isFrontendIntegrationModule ? (
                      <FrontendIntegrationSection embedded={true} />
                    ) : (
                      <>
                        {item.terminalCode && (
                          <TerminalCodeBlock code={item.terminalCode} title="Terminal Command" />
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
                      </>
                    )}
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
