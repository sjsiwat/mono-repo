import { useState } from 'react';
import { 
  Package, 
  Folder, 
  FileCode, 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Database, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Cloud, 
  Server, 
  Globe, 
  Key, 
  Lock,
  Code2
} from 'lucide-react';

export function ProjectStructureDiagram() {
  const [selectedNode, setSelectedNode] = useState('server.js');
  const [activeTab, setActiveTab] = useState('tree'); // 'tree', 'lifecycle', 'deployment'

  const fileDetails = {
    'package.json': {
      title: 'backend/package.json',
      step: 'STEP 01 & STEP 02',
      category: 'PROJECT INITIALIZATION & DEPENDENCIES',
      badge: 'ESM & Core Tools',
      role: 'เปิดใช้มาตรฐาน ECMAScript Modules (ESM), ติดตั้ง 7 Dependencies สำคัญ และกำหนดสคริปต์รันระบบ',
      desc: 'ไฟล์ทะเบียนบ้านของ Backend ทุกอย่าง Node.js จะอ่านไฟล์นี้ก่อนเป็นอันดับแรก การระบุ "type": "module" บังคับให้ทั้งโฟลเดอร์รองรับคำสั่ง import/export ยุคใหม่ ส่วนสคริปต์ "dev": "node --env-file=.env --watch src/server.js" ใช้ฟีเจอร์ในตัวของ Node.js (v20.6+) โหลดไฟล์ .env อัตโนมัติและรีสตาร์ทเซิร์ฟเวอร์ทันทีเมื่อบันทึกโค้ด พร้อมทั้งบันทึกรายชื่อ 7 ไลบรารีระดับโลก (Express, CORS, Cookie-Parser, Bcrypt, JWT, Mongoose, Supabase)',
      keyFunctions: [
        '"type": "module": ปลดล็อกไวยากรณ์ import express from "express" ทั้งโฟลเดอร์',
        '"dev": "node --env-file=.env --watch src/server.js": สคริปต์รันเซิร์ฟเวอร์แบบตรวจจับการเซฟไฟล์',
        'express (^4.21.2): แกนหลักสร้าง Web Server และจัดการ HTTP Request-Response',
        'cors & cookie-parser: เครื่องมือเปิดประตูข้ามพอร์ตและแกะอ่าน Cookie จาก Header',
        'bcrypt (แฮช 12 รอบ) & jsonwebtoken (สร้างตั๋ว): คู่หูระบบความปลอดภัยและการยืนยันตัวตน',
        'mongoose & @supabase/supabase-js: ไดรเวอร์เชื่อมต่อฐานข้อมูล MongoDB Atlas และ Supabase'
      ],
      inputOutput: {
        input: 'คำสั่ง npm init -y (Step 01) และ npm install express cors ... (Step 02)',
        output: 'ไฟล์ manifest ควบคุมโปรเจกต์ และโฟลเดอร์ node_modules พร้อมรันทั้งระบบ'
      },
      connection: 'กำหนดโหมดการรันและเตรียมแพ็กเกจให้ทุกไฟล์ในโปรเจกต์ (Step 03 ถึง Step 08) นำไป import ใช้งานต่อได้อย่างถูกต้อง',
      rules: [
        'ห้ามลืมใส่ "type": "module" เด็ดขาด ไม่เช่นนั้น Node.js จะแจ้ง Error: Cannot use import statement outside a module',
        'ต้องใช้ Node.js เวอร์ชัน >= 20.6.0 เพื่อให้คำสั่ง --env-file=.env ทำงานได้โดยไม่ต้องพึ่งพาแพ็กเกจ dotenv'
      ]
    },
    'env': {
      title: 'backend/.env & .gitignore',
      step: 'STEP 03',
      category: 'ENVIRONMENT VARIABLES & SECRETS',
      badge: 'System Secrets',
      role: 'เก็บค่าคอนฟิกูเรชันที่เป็นความลับและหมายเลขพอร์ต แยกขาดจาก Source Code เพื่อความปลอดภัยสูงสุด',
      desc: 'จัดเก็บค่าความลับของระบบในรูปแบบ KEY=VALUE: หมายเลขพอร์ต (PORT=666), Connection String ของ MongoDB Atlas (MONGODB_URI), กุญแจลับสำหรับเซ็น JWT (JWT_SECRET) และ Supabase Credentials โดยมีไฟล์ .gitignore ทำหน้าที่เป็นเกราะป้องกันไม่ให้ไฟล์ .env หลุดขึ้นไปบน GitHub สาธารณะ',
      keyFunctions: [
        'PORT=666: กำหนดหมายเลขพอร์ตที่ Express จะเปิดรับฟัง (เลือกพอร์ตช่วง 1024–65535 ที่ไม่ชนกับโปรแกรมอื่น)',
        'MONGODB_URI: สตริงเข้ารหัสพร้อมชื่อผู้ใช้และรหัสผ่านสำหรับเชื่อมต่อคลัสเตอร์ MongoDB Atlas บนคลาวด์',
        'JWT_SECRET: ข้อความกุญแจลับเฉพาะของเซิร์ฟเวอร์ สำหรับใช้เซ็นลายเซ็นดิจิทัลบน Token ป้องกันการปลอมแปลง',
        'touch .gitignore && echo ".env" >> .gitignore: ป้องกันไม่ให้ Git ติดตามไฟล์ความลับ'
      ],
      inputOutput: {
        input: 'ค่าความลับที่ผู้พัฒนากรอกลงในไฟล์ข้อความ .env หรือกรอกบน Dashboard ของ Render',
        output: 'โหลดเข้าสู่ตัวแปรระดับโกลบอลของระบบ: process.env.PORT, process.env.MONGODB_URI, ฯลฯ'
      },
      connection: 'ค่าใน process.env จะถูก db.js (Step 04), authUser.js (Step 06), routes (Step 07) และ server.js (Step 08) ดึงไปใช้งาน',
      rules: [
        'ห้าม commit หรือ push ไฟล์ .env ขึ้น GitHub เด็ดขาด (ต้องระบุใน .gitignore ทันทีหลังสร้าง)',
        'ห้ามใส่เครื่องหมายคำพูดรอบค่าสตริง และห้ามมีช่องว่างรอบเครื่องหมายเท่ากับ (=) เพื่อป้องกันตัวแปลงค่าสับสน'
      ]
    },
    'db.js': {
      title: 'backend/src/config/db.js',
      step: 'STEP 04',
      category: 'DATABASE CONNECTION POOL',
      badge: 'Mongoose Adapter',
      role: 'เปิดท่อเชื่อมต่อ Network Socket ไปยัง MongoDB Atlas Cluster พร้อมระบบตรวจความพร้อมล่วงหน้า (Fail-Fast)',
      desc: 'ใช้ Mongoose ในการเปิดท่อ Connection Pool ไปยัง Cloud Database ดึงค่า MONGODB_URI จาก process.env พร้อมระบบตรวจสอบค่า URI ล่วงหน้า หากผู้พัฒนาลืมใส่ค่าใน .env ฟังก์ชันจะ throw Error สั่งหยุดการทำงานทันทีเพื่อป้องกันข้อผิดพลาดที่เงียบงัน',
      keyFunctions: [
        'const uri = process.env.MONGODB_URI: ดึงสตริงเชื่อมต่อจากตัวแปรแวดล้อมที่ตั้งไว้ใน Step 03',
        'if (!uri) throw new Error(...): หลักการ Fail-Fast ดักจับกรณีผู้พัฒนาลืมตั้งค่าใน .env ตั้งแต่เริ่มสตาร์ท',
        'await mongoose.connect(uri): คำสั่ง Asynchronous เปิดท่อ Network Socket ไปยัง MongoDB Atlas Cluster',
        'console.log("Yo ! MONGODB is connected"): ข้อความยืนยันสถานะการเชื่อมต่อสำเร็จใน Terminal'
      ],
      inputOutput: {
        input: 'สตริง MONGODB_URI จาก process.env',
        output: 'Mongoose Connection Instance สำหรับให้ Model ต่างๆ นำไปใช้ค้นหาหรือบันทึกข้อมูล'
      },
      connection: 'ส่งออกฟังก์ชัน connectDB() ไปให้ server.js (Step 08) เรียกสั่ง await ให้ต่อฐานข้อมูลสำเร็จก่อนเปิดรับคำขอ',
      rules: [
        'ต้องครอบด้วย async/await เสมอ เพราะการเชื่อมต่อข้ามเครือข่ายไปยัง Cloud Database ต้องใช้เวลา',
        'ห้ามเขียนโค้ดต่อ Database ซ้ำในแต่ละ Route เพราะจะทำให้เกิด Connection Leak จน Database ค้าง'
      ]
    },
    'user.model.js': {
      title: 'backend/src/models/user.model.js',
      step: 'STEP 05',
      category: 'DATA SCHEMA & MODEL LAYER',
      badge: 'Mongoose Model',
      role: 'พิมพ์เขียวกำหนดโครงสร้างข้อมูล (Schema), กฎ Validation, และความปลอดภัยระดับ Database',
      desc: 'นิยาม Schema ของ User Collection ใน MongoDB: กำหนดฟิลด์ username, email (มี regex format check และ unique index ป้องกันอีเมลซ้ำ), role (enum: user, admin), timestamps (createdAt, updatedAt อัตโนมัติ) และที่สำคัญที่สุดคือการตั้งค่า select: false ที่ฟิลด์รหัสผ่าน เพื่อป้องกันไม่ให้คำสั่ง find() ทั่วไปดึงรหัสผ่านติดไปด้วย',
      keyFunctions: [
        'username: { type: String, required: true, trim: true }: บังคับกรอกชื่อและตัดช่องว่างหัวท้าย',
        'email: { match: [regex], unique: true }: ตรวจสอบฟอร์แมตอีเมลและสร้าง Unique Index ในฐานข้อมูล',
        'password & passwordHash: { select: false }: ซ่อนฟิลด์รหัสผ่านไม่ให้ Mongoose ดึงติดมาด้วยเวลา query ปกติ',
        '{ timestamps: true }: บันทึกเวลาสร้าง (createdAt) และเวลาแก้ไขข้อมูลล่าสุด (updatedAt) ให้อัตโนมัติ',
        'export const User = mongoose.model("User", userSchema): ส่งออกเป็น Model Class พร้อมใช้งาน'
      ],
      inputOutput: {
        input: 'Object ข้อมูลผู้ใช้จาก Controller (req.body)',
        output: 'Mongoose Document ที่ผ่านการตรวจสอบกฎ Schema และบันทึกลงดิสก์ของ MongoDB Atlas'
      },
      connection: 'ถูกนำเข้า (import) ไปใช้งานใน Route Controller (Step 07) เพื่อสั่ง User.create(), User.find(), ฯลฯ',
      rules: [
        'ต้องใส่ select: false บนฟิลด์รหัสผ่าน เพื่อสร้างแนวป้องกันระดับฐานข้อมูลไม่ให้รหัสผ่านหลุดไปหน้าเว็บ',
        'เมื่อกำหนด unique: true ต้องมั่นใจว่าในฐานข้อมูลไม่มีข้อมูลซ้ำเดิม มิเช่นนั้นจะสร้าง index ไม่สำเร็จ'
      ]
    },
    'authUser.js': {
      title: 'backend/src/middlewares/authUser.js',
      step: 'STEP 06',
      category: 'SECURITY GATEKEEPER MIDDLEWARE',
      badge: 'Auth Guard',
      role: 'ด่านตรวจตั๋วความปลอดภัย คอยตรวจจับและแกะอ่าน accessToken จาก HttpOnly Cookie',
      desc: 'ทำหน้าที่เป็นมิดเดิลแวร์คอยดักจับคำขอที่ต้องการการยืนยันตัวตน แกะ Token จาก req.cookies.accessToken, ตรวจสอบความถูกต้องและวันหมดอายุด้วยคำสั่ง jwt.verify() ร่วมกับ JWT_SECRET หากถูกต้องจะถอดรหัสแล้วแนบ payload เข้า req.user และเรียก next() ให้คำขอเดินทางต่อไปยัง Controller ปลายทาง',
      keyFunctions: [
        'let token = req.cookies.accessToken: ดึง Token ออกจาก Cookie ที่ cookieParser (Step 08) แกะมาให้',
        'if (!token) return res.status(401).json(...): ปฏิเสธทันทีกรณีไม่มี Token ด้วย Status 401 Unauthorized',
        'const decodedToken = jwt.verify(token, process.env.JWT_SECRET): ตรวจสอบลายเซ็นดิจิทัลและวันหมดอายุ',
        'req.user = decodedToken: แนบข้อมูลผู้ใช้ (userId) เข้า Request Object ให้ Handler ถัดไปหยิบใช้ได้',
        'next(): คำสั่งปล่อยผ่านไปยัง Route ถัดไป (หัวใจสำคัญป้องกันไม่ให้คำขอค้าง)'
      ],
      inputOutput: {
        input: 'Incoming HTTP Request ที่มี HttpOnly Cookie แนบมาใน Header',
        output: 'ส่งต่อคำขอพร้อม req.user ไปยัง Route ถัดไป หรือตอบกลับ 401 Unauthorized หากไม่ผ่าน'
      },
      connection: 'รับข้อมูลต่อจาก cookieParser ใน server.js (Step 08) และทำหน้าที่เป็นยามเฝ้าหน้าประตูให้ Route /auth ใน Step 07',
      rules: [
        'ห้ามลืมเรียก next() เมื่อตรวจสอบผ่าน เพราะจะทำให้คำขอหยุดนิ่งและหน้าเว็บหมุนค้างตลอดกาล',
        'ต้องครอบ jwt.verify() ด้วยบล็อก try...catch เสมอ เพื่อดักจับ Token ที่หมดอายุหรือถูกแก้ไขปลอมแปลง'
      ]
    },
    'routes-v2': {
      title: 'backend/src/routes/v2/users.routes.js',
      step: 'STEP 07',
      category: 'API CONTROLLERS & ENDPOINTS',
      badge: 'Full CRUD + Bcrypt Auth',
      role: 'ศูนย์รวมตรรกะทางธุรกิจ (Business Logic) สำหรับระบบจัดการผู้ใช้และระบบล็อกอินครบวงจร 7 Endpoints',
      desc: 'ให้บริการ API ครบทั้ง 4 มิติ CRUD + Authentication บน MongoDB Atlas: สมัครสมาชิก (POST /register แฮช 12 รอบ คืน 201), ล็อกอิน (POST /login ตรวจ bcrypt.compare ออก JWT ใน HttpOnly Cookie), ล็อกเอ้าท์ (POST /logout ล้าง Cookie), ดูรายชื่อทั้งหมด (GET /), ดูข้อมูลโปรไฟล์ตนเอง (GET /auth ผ่าน authUser), แก้ไข (PUT /:id), และลบ (DELETE /:id)',
      keyFunctions: [
        'POST /register: ตรวจสอบข้อมูล ➔ bcrypt.hash(password, 12) ➔ User.create() ➔ Sanitization ตัดรหัสทิ้ง ➔ คืน 201 (ดัก Error 11000 คืน 409)',
        'POST /login: User.findOne().select("+password") ➔ bcrypt.compare() ➔ jwt.sign() ➔ res.cookie("accessToken", ..., { httpOnly: true }) ➔ คืน 200',
        'POST /logout: res.clearCookie("accessToken") ➔ คืน 200 OK',
        'GET /: User.find() ดึงข้อมูลผู้ใช้ทั้งหมดจาก MongoDB Atlas (รหัสผ่านถูกซ่อนอัตโนมัติ) ➔ คืน 200 OK',
        'GET /auth: ตรวจผ่าน authUser ➔ User.findById(req.user.userId) ➔ คืนข้อมูลโปรไฟล์ 200 OK',
        'PUT /:id: User.findByIdAndUpdate(id, updateData, { returnDocument: "after" }) ➔ ตัดรหัสทิ้ง ➔ คืน 200 OK',
        'DELETE /:id: User.findByIdAndDelete(id) ➔ คืน 200 OK หรือ 404 หากไม่พบ ID'
      ],
      inputOutput: {
        input: 'req.body (JSON), req.params.id (URL Parameter), req.cookies (HttpOnly Cookie)',
        output: 'Sanitized User JSON (ตัดรหัสผ่านทิ้ง) พร้อม HTTP Status Codes (200, 201, 400, 401, 404, 409)'
      },
      connection: 'ดึง User Model จาก Step 05, ดึง authUser จาก Step 06 และถูกนำไปผูกเข้ากับ /api/v2/users ใน server.js (Step 08)',
      rules: [
        'ต้องใช้ Rest Operator ({ password: _pw, ...safeUser }) ตัดรหัสผ่านทิ้งก่อนส่ง Response กลับเสมอ',
        'กรณีค้นหาผู้ใช้ตอน Login ต้องใส่ .select("+password") ชัดเจน ไม่เช่นนั้นจะไม่มีรหัสมาเทียบ bcrypt'
      ]
    },
    'server.js': {
      title: 'backend/src/server.js',
      step: 'STEP 08',
      category: 'BACKEND CORE ENTRYPOINT',
      badge: 'Port 666 Engine',
      role: 'ศูนย์กลางเปิดเซิร์ฟเวอร์ & ติดตั้งท่อ Middleware Pipeline กลางของระบบทั้งหมด',
      desc: 'หัวใจสมองกลของ Backend: ผูก Port 666 (หรือ process.env.PORT), ติดตั้งท่อกรอง CORS เปิดรับ React พอร์ต 5173 พร้อมส่ง Cookie ข้ามพอร์ต, ติดตั้ง express.json() แปลง Body, ติดตั้ง cookieParser() แกะ Cookie, ผูกเส้นทาง /api, ติดตั้ง Centralized Error Handler (ดักรับทุก Error คืน 500 ป้องกันเซิร์ฟเวอร์ดับและแก้ปัญหา API ค้าง) และสั่ง await connectDB() รอให้ฐานข้อมูลพร้อมก่อนเริ่มดักฟังคำขอ',
      keyFunctions: [
        'app.use(cors({ origin: "http://localhost:5173", credentials: true })): อนุญาตให้หน้าบ้านส่ง Cookie ข้ามพอร์ต',
        'app.use(express.json()): มิดเดิลแวร์แปลงข้อมูล JSON ใน Body มาเป็น Object req.body',
        'app.use(cookieParser()): มิดเดิลแวร์แกะข้อมูล Cookie ใน Header มาเป็น Object req.cookies',
        'app.use("/api", apiRoutes): รวม Router ทั้งหมดของระบบเข้าสู่ Prefix /api',
        'app.use((err, req, res, next) => ...): Centralized Error Handler ดักจับ Error รวมทุก Controller คืน 500',
        'async function start(): รอเชื่อมต่อ MongoDB Atlas (Step 04) สำเร็จก่อน แล้วจึงสั่ง app.listen(port)'
      ],
      inputOutput: {
        input: 'Incoming HTTP Requests ทุกประเภทจากอินเทอร์เน็ตที่พุ่งเข้าสู่ Port 666',
        output: 'JSON Response ที่ผ่านการประมวลผลท่อ Pipeline และแนบ Header มาตรฐานครบถ้วน'
      },
      connection: 'เป็นศูนย์กลางรับ Request จากหน้าบ้าน React (Step 10), ส่งผ่านท่อไปยัง Router (Step 07) และเชื่อมโยง Database (Step 04)',
      rules: [
        'ต้องวาง CORS ไว้บนสุด ก่อน Route เสมอ ไม่เช่นนั้นเบราว์เซอร์จะบล็อกคำขอตั้งแต่ด่านแรก',
        'ต้องมี 4 พารามิเตอร์ (err, req, res, next) ใน Error Middleware เพื่อให้ Express รู้ว่าเป็น Error Handler'
      ]
    },
    'users-api-test.rest': {
      title: 'backend/users-api-test.rest',
      step: 'STEP 09',
      category: 'API TESTING & VERIFICATION',
      badge: 'HTTP Test Client',
      role: 'ชุดไฟล์ทดสอบยิง Request ตรงเข้าหาเซิร์ฟเวอร์ใน VS Code เพื่อยืนยันความถูกต้องก่อนต่อหน้าบ้าน',
      desc: 'ใช้ร่วมกับส่วนขยาย REST Client ใน VS Code ช่วยให้ผู้พัฒนาสามารถคลิก "Send Request" บนแต่ละ Endpoint ได้โดยตรง ไม่ต้องเปิดโปรแกรมภายนอกอย่าง Postman ช่วยทดสอบการดึงข้อมูล (GET /users), ทดสอบสมัครสมาชิก (POST /register รับ 201 Created), และทดสอบล็อกอิน (POST /login รับ HttpOnly Cookie) เพื่อยืนยันว่า Backend ทำงานได้สมบูรณ์ 100% ก่อนเริ่มทำ Frontend',
      keyFunctions: [
        'GET http://localhost:666/api/v1/users: ทดสอบอ่านรายชื่อ User ทั้งหมด',
        'POST http://localhost:666/api/v2/users/register: ส่ง JSON ทดสอบสร้าง User ใหม่พร้อมแฮชรหัสผ่าน',
        'POST http://localhost:666/api/v2/users/login: ส่ง Email/Password ทดสอบการออกบัตรผ่าน HttpOnly Cookie',
        'Content-Type: application/json: Header บังคับเพื่อให้ express.json() ใน Step 08 แปลงข้อมูลได้ถูกต้อง'
      ],
      inputOutput: {
        input: 'การคลิกปุ่ม Send Request ในหน้าต่าง VS Code Editor',
        output: 'หน้าต่าง Response Panel แสดง Status Code, Headers, Set-Cookie, และ JSON Data จริงจากเซิร์ฟเวอร์'
      },
      connection: 'ยิงคำขอตรงเข้าหา Express Server พอร์ต 666 ที่เปิดทำงานจาก Step 08 เพื่อตรวจสอบผลลัพธ์ก่อนเชื่อมต่อหน้าบ้านใน Step 10',
      rules: [
        'ต้องเว้นบรรทัดว่าง 1 บรรทัดระหว่าง Headers และ Body เสมอตามข้อกำหนดของ HTTP Protocol',
        'ต้องแน่ใจว่าเซิร์ฟเวอร์รันอยู่ที่พอร์ต 666 และเชื่อมต่อ MongoDB สำเร็จแล้วก่อนกดยิงคำขอ'
      ]
    },
    'userService.js': {
      title: 'frontend/src/services/userService.js',
      step: 'STEP 10 (SERVICE LAYER)',
      category: 'CLIENT NETWORK & SERVICE LAYER',
      badge: 'API Service Layer',
      role: 'เลเยอร์รวบรวมฟังก์ชันการยิงคำขอ HTTP ข้ามพอร์ตไปยัง Backend Express อย่างเป็นระบบ',
      desc: 'แยกตรรกะการเรียกเครือข่ายออกจาก UI Component ตามหลัก Clean Architecture กำหนด API_BASE = "http://localhost:666/api/v2" และรวบรวมฟังก์ชันสำหรับเรียก API เช่น getAllUsers(), register(), login() โดยใส่ credentials: "include" ในทุกคำขอ เพื่อสั่งให้เบราว์เซอร์ส่งและรับ HttpOnly Cookie ข้ามพอร์ต 5173 ➔ 666 ได้อย่างถูกต้อง',
      keyFunctions: [
        'const API_BASE = "http://localhost:666/api/v2": จุดศูนย์กลางกำหนด Base URL ของ Backend',
        'getAllUsers(): ฟังก์ชัน async ยิงคำขอ GET ดึงข้อมูลผู้ใช้ทั้งหมดจาก MongoDB ผ่าน Backend',
        'fetch(url, { credentials: "include" }): บังคับให้เบราว์เซอร์ส่งและรับ Cookie ข้ามพอร์ต',
        'if (!res.ok) throw new Error(...): ตรวจสอบ HTTP Status หากพบข้อผิดพลาดให้โยน Error ไปให้ UI จัดการ',
        'return await res.json(): แปลงข้อมูล Response กลับเป็น JavaScript Object ส่งคืนให้ Component'
      ],
      inputOutput: {
        input: 'คำสั่งเรียกฟังก์ชันจาก React Component ใน Step 10',
        output: 'Promise ที่ resolve เป็นข้อมูล Array ผู้ใช้ หรือ reject เป็น Error Message'
      },
      connection: 'เชื่อมโยงระหว่าง React Component (UserDashboard.jsx) กับ Express Backend (พอร์ต 666)',
      rules: [
        'ห้ามลืมใส่ credentials: "include" เด็ดขาด ไม่เช่นนั้นเบราว์เซอร์จะไม่ส่ง Cookie ไปให้ authUser Middleware',
        'ต้องตรวจสอบ !res.ok เสมอ เพราะคำสั่ง fetch() ของเบราว์เซอร์จะไม่ throw error แม้จะได้รับ Status 400 หรือ 500'
      ]
    },
    'UserDashboard.jsx': {
      title: 'frontend/src/components/UserDashboard.jsx',
      step: 'STEP 10 (UI COMPONENT)',
      category: 'REACT COMPONENT & STATE LIFECYCLE',
      badge: 'React Hooks Component',
      role: 'คอมโพเนนต์หน้าบ้านสำหรับดึงข้อมูลผ่าน useEffect และจัดการ State ทั้ง 3 ระยะของ Asynchronous Lifecycle',
      desc: 'นำข้อมูลจาก userService.getAllUsers() มาแสดงผลบนหน้าจอจริง จัดการ State ครบทั้ง 3 สภาวะ: Loading (แสดง Spinner และข้อความกำลังเชื่อมต่อไปยังพอร์ต 666), Error (แสดงกล่องสีแดงแจ้งเตือนเมื่อเซิร์ฟเวอร์ปิดหรือเกิดข้อผิดพลาด), และ Data (เรนเดอร์รายชื่อผู้ใช้ที่ดึงมาจาก MongoDB Atlas บนตาราง UI อย่างสวยงาม)',
      keyFunctions: [
        'useEffect(() => { loadUsers(); }, []): สั่งดึงข้อมูลทันทีเมื่อ Component ถูก Mount บนหน้าจอ',
        'const [users, setUsers] = useState([]): เก็บข้อมูลรายชื่อผู้ใช้ที่ได้จาก Database',
        'const [loading, setLoading] = useState(true): ควบคุมการแสดงผลสถานะกำลังดาวน์โหลดข้อมูล',
        'const [error, setError] = useState(null): บันทึกข้อความ Error เพื่อนำไปแสดงผลเมื่อการเชื่อมต่อล้มเหลว',
        'users.map(u => (...)): วนลูปแสดงข้อมูล username, email, role และวันที่สมัครบน UI'
      ],
      inputOutput: {
        input: 'State ข้อมูลผู้ใช้จาก userService.getAllUsers()',
        output: 'หน้าจอ UI แบบ Interactive ที่แสดงสถานะ Loading, Error หรือตารางข้อมูลจริง'
      },
      connection: 'เป็นจุดปิดลูปของระบบทั้งวงจร (End-to-End Complete Loop): รับข้อมูลจาก userService ➔ แสดงผลสู่สายตาผู้ใช้',
      rules: [
        'ต้องใส่ Dependency Array ว่าง [] ใน useEffect เพื่อป้องกันไม่ให้ฟังก์ชันยิงคำขอซ้ำแบบ Infinite Loop',
        'ต้องจัดการทั้งกรณี Loading และ Error เสมอ เพื่อให้ UX ของแอปพลิเคชันไม่พังเมื่อเครือข่ายมีปัญหา'
      ]
    },
    'routes-index': {
      title: 'backend/src/routes/index.js',
      step: 'SUPPORTING ARCHITECTURE',
      category: 'ROUTING HUB & NAMESPACE',
      badge: 'Main Router Hub',
      role: 'ศูนย์กลางแยก Namespace ระหว่างเวอร์ชัน v1 (Sandbox) และ v2 (Production)',
      desc: 'รวม Route ทั้งหมดในระบบเข้าด้วยกัน โดยแบ่งกลุ่ม URL อย่างชัดเจน เช่น /v1/users สำหรับเวอร์ชันศึกษา และ /v2/users สำหรับเวอร์ชันเชื่อมต่อ Database จริง',
      keyFunctions: [
        'router.use("/v1/users", v1UserRoutes): ผูก Route เวอร์ชัน Array',
        'router.use("/v2/users", v2UserRoutes): ผูก Route เวอร์ชัน MongoDB + Bcrypt'
      ],
      inputOutput: {
        input: 'Request URL ที่ขึ้นต้นด้วย /api/v1 หรือ /api/v2',
        output: 'ส่งต่อให้ Sub-router ของแต่ละโมดูลจัดการต่อ'
      },
      connection: 'ถูกนำไปผูกเข้ากับ app.use("/api", apiRoutes) ใน server.js (Step 08)',
      rules: [
        'การแยก Versioning (v1, v2) บน URL เป็นแนวทางปฏิบัติที่ดีที่สุดของ RESTful API เพื่อป้องกันการเกิด Breaking Changes กับผู้ใช้เดิม'
      ]
    },
    'routes-v1': {
      title: 'backend/src/routes/v1/users.routes.js',
      step: 'SUPPORTING ARCHITECTURE',
      category: 'IN-MEMORY SANDBOX',
      badge: 'Array CRUD (v1)',
      role: 'สนามฝึกหัด CRUD ขั้นพื้นฐานบนหน่วยความจำ RAM (JavaScript Array)',
      desc: 'จำลองการทำงานของ CRUD ครบ 4 เมธอด (GET อ่านทั้งหมด, GET /:id อ่านรายคน, POST สร้างใหม่, PUT อัปเดต, DELETE ลบ) โดยใช้ Array ในแรม ไม่ต้องพึ่งพา Database เหมาะสำหรับทำความเข้าใจ HTTP Verbs และ Status Codes',
      keyFunctions: [
        'users.push(newUser): เพิ่มข้อมูลใหม่ลงใน Array (คืน 201)',
        'users.find(u => u.id === req.params.id): ค้นหาข้อมูลตาม ID (ถ้าไม่พบคืน 404)',
        'users.splice(index, 1): ลบข้อมูลออกจาก Array (คืน 200)'
      ],
      inputOutput: {
        input: 'req.body (JSON) หรือ req.params.id',
        output: 'JSON ข้อมูลใน Array users พร้อม HTTP Status ที่ถูกต้อง'
      },
      connection: 'ผูกเข้ากับ /api/v1/users ใน routes/index.js เพื่อเป็นจุดเปรียบเทียบกับ v2',
      rules: [
        'ข้อมูลใน v1 จะหายไปทั้งหมดเมื่อรีสตาร์ทเซิร์ฟเวอร์ เพราะอยู่ใน RAM',
        'ต้องคำนวณ highestId + 1 ด้วยตัวเองเพื่อไม่ให้ ID ซ้ำกัน'
      ]
    },
    'deployment': {
      title: 'Monorepo Deployment Architecture',
      step: 'PRODUCTION CLOUD TOPOLOGY',
      category: 'PRODUCTION INFRASTRUCTURE',
      badge: 'Cloudflare + Render',
      role: 'สถาปัตยกรรมการเผยแพร่ระบบจริงแยก 2 คลาวด์ระดับโลก',
      desc: 'Frontend ทำงานบน Cloudflare Workers/Pages ให้ความเร็วระดับ Global Edge CDN โหลดไฟล์เว็บเร็วหลักมิลลิวินาที ส่วน Backend ทำงานบน Render Linux Web Service จัดการประมวลผล Express และต่อเชื่อมกับ MongoDB Atlas ในต่างประเทศ',
      keyFunctions: [
        'Cloudflare: รองรับ Single Page Application ผ่าน wrangler.jsonc assets',
        'Render: รันคำสั่ง npm start ใน backend, ผูก PORT อัตโนมัติ, ต่อ MongoDB Atlas'
      ],
      inputOutput: {
        input: 'โค้ดที่ push เข้า git branch main',
        output: 'เว็บจริงที่เข้าถึงได้ทั่วโลกพร้อมระบบความปลอดภัย HTTPS อัตโนมัติ'
      },
      connection: 'สถาปัตยกรรมภาพรวมที่ครอบคลุมโค้ดทั้งหมดตั้งแต่ Step 01 ถึง Step 10 เมื่อนำขึ้นใช้งานจริงบนอินเทอร์เน็ต',
      rules: [
        'บน Render ต้องตั้ง Environment Variable: MONGODB_URI, JWT_SECRET, NODE_ENV=production',
        'บน Cloudflare ต้องมี assets configuration แบบ single-page-application เพื่อให้ Routing ไม่หลุด 404'
      ]
    }
  };

  const currentNode = fileDetails[selectedNode] || fileDetails['server.js'];

  return (
    <section className="py-12 bg-transparent font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#D9D8D3]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#2457FF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
                SYSTEM BLUEPRINT & MONOREPO ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#20242A] tracking-tight">
              แผนผังโครงสร้างโปรเจกต์เชิงลึก (Architecture Deep-Dive)
            </h2>
            <p className="mt-2 text-[#62666B] text-sm sm:text-base max-w-3xl font-sans leading-relaxed">
              เรียนรู้โครงสร้างระบบ Monorepo จริงอย่างละเอียด: วิเคราะห์หน้าที่ของทุกไฟล์, ท่อส่งข้อมูล 4 ระดับ (Pipeline Tiers), 
              วงจรการเดินทางของ Request-Response, จนถึงสถาปัตยกรรมการ Deploy ขึ้น <strong className="text-[#20242A]">Cloudflare</strong> และ <strong className="text-[#20242A]">Render</strong>
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mt-4 md:mt-0 flex items-center gap-1 p-1 bg-[#FFFFFF] border border-[#D9D8D3] rounded font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer font-medium ${
                activeTab === 'tree' ? 'bg-[#20242A] text-white' : 'text-[#62666B] hover:text-[#20242A]'
              }`}
            >
              1. DIRECTORY TREE & INSPECTOR
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lifecycle')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer font-medium ${
                activeTab === 'lifecycle' ? 'bg-[#20242A] text-white' : 'text-[#62666B] hover:text-[#20242A]'
              }`}
            >
              2. REQUEST LIFECYCLE (4 TIERS)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('deployment')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer font-medium ${
                activeTab === 'deployment' ? 'bg-[#20242A] text-white' : 'text-[#62666B] hover:text-[#20242A]'
              }`}
            >
              3. CLOUD TOPOLOGY (CLOUDFLARE + RENDER)
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: INTERACTIVE DIRECTORY TREE & DEEP FILE INSPECTOR */}
        {/* ========================================================================= */}
        {activeTab === 'tree' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Monorepo Tree (5 Cols) */}
              <div className="lg:col-span-5 p-6 bg-[#FFFFFF] border border-[#D9D8D3] font-mono text-xs shadow-xs" style={{ borderRadius: '6px' }}>
                <div className="font-bold uppercase tracking-wider text-[#62666B] mb-4 flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
                  <span>MONOREPO FILE EXPLORER</span>
                  <span className="text-[11px] text-[#2457FF] font-sans font-medium">คลิกไฟล์เพื่อดูเจาะลึก</span>
                </div>

                <div className="space-y-2 text-[#20242A]">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <Package className="w-4 h-4 text-[#2457FF] inline" />
                    <span>mono-repo/</span>
                  </div>

                  {/* Root Configs */}
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                    <div 
                      onClick={() => setSelectedNode('deployment')}
                      className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                        selectedNode === 'deployment' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                      }`}
                      style={{ borderRadius: '3px' }}
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 opacity-70" />
                        <span>wrangler.jsonc & root package.json</span>
                      </span>
                      <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-300 shrink-0">DEPLOY</span>
                    </div>
                  </div>

                  {/* Backend Section (STEP 01 - 09) */}
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2 pt-2 space-y-1">
                    <div className="font-bold text-emerald-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5 text-emerald-600" />
                        <span>backend/ (Express + MongoDB)</span>
                      </span>
                      <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300">
                        STEP 01–09
                      </span>
                    </div>

                    <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                      {/* STEP 01, 02: package.json */}
                      <div
                        onClick={() => setSelectedNode('package.json')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'package.json' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">package.json</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 01, 02
                        </span>
                      </div>

                      {/* STEP 03: .env & .gitignore */}
                      <div
                        onClick={() => setSelectedNode('env')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'env' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">.env & .gitignore</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 03
                        </span>
                      </div>

                      {/* STEP 04: src/config/db.js */}
                      <div
                        onClick={() => setSelectedNode('db.js')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'db.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/config/db.js</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 04
                        </span>
                      </div>

                      {/* STEP 05: src/models/user.model.js */}
                      <div
                        onClick={() => setSelectedNode('user.model.js')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'user.model.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/models/user.model.js</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 05
                        </span>
                      </div>

                      {/* STEP 06: src/middlewares/authUser.js */}
                      <div
                        onClick={() => setSelectedNode('authUser.js')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'authUser.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/middlewares/authUser.js</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 06
                        </span>
                      </div>

                      {/* STEP 07: src/routes/v2/users.routes.js */}
                      <div
                        onClick={() => setSelectedNode('routes-v2')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'routes-v2' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/routes/v2/users.routes.js</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 07
                        </span>
                      </div>

                      {/* STEP 08: src/server.js */}
                      <div
                        onClick={() => setSelectedNode('server.js')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'server.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/server.js</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 08
                        </span>
                      </div>

                      {/* STEP 09: users-api-test.rest */}
                      <div
                        onClick={() => setSelectedNode('users-api-test.rest')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'users-api-test.rest' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">users-api-test.rest</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          STEP 09
                        </span>
                      </div>

                      {/* Supporting: routes/index.js & routes/v1 */}
                      <div
                        onClick={() => setSelectedNode('routes-index')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'routes-index' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 text-[#62666B] truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/routes/index.js</span>
                        </span>
                        <span className="text-[8px] font-mono text-[#62666B] shrink-0">Hub</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('routes-v1')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'routes-v1' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 text-[#62666B] truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/routes/v1/users.routes.js</span>
                        </span>
                        <span className="text-[8px] font-mono text-[#62666B] shrink-0">v1 RAM</span>
                      </div>
                    </div>
                  </div>

                  {/* Frontend Section (STEP 10) */}
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2 pt-2 space-y-1">
                    <div className="font-bold text-[#2457FF] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5 text-[#2457FF] inline" />
                        <span>frontend/ (React 19 Dashboard)</span>
                      </span>
                      <span className="text-[9px] font-mono font-bold text-[#2457FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-300">
                        STEP 10
                      </span>
                    </div>

                    <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                      {/* STEP 10 Service: userService.js */}
                      <div
                        onClick={() => setSelectedNode('userService.js')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'userService.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/services/userService.js</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-blue-50 text-[#2457FF] border border-blue-200 shrink-0">
                          STEP 10 Svc
                        </span>
                      </div>

                      {/* STEP 10 Component: UserDashboard.jsx */}
                      <div
                        onClick={() => setSelectedNode('UserDashboard.jsx')}
                        className={`cursor-pointer px-2 py-1.5 transition-colors flex items-center justify-between ${
                          selectedNode === 'UserDashboard.jsx' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <FileCode className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          <span className="truncate">src/components/UserDashboard.jsx</span>
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-blue-50 text-[#2457FF] border border-blue-200 shrink-0">
                          STEP 10 UI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Deep File Technical Inspector (7 Cols) */}
              <div className="lg:col-span-7 bg-[#20242A] text-[#F6F5F1] p-6 sm:p-8 rounded-lg border border-[#20242A] space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D9D8D3]/20">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#4C7DFF] tracking-wider block">
                      {currentNode.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 break-all">
                      {currentNode.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                    <span className="px-2.5 py-1 bg-[#2457FF]/20 text-[#4C7DFF] border border-[#2457FF]/40 font-mono text-xs font-bold rounded">
                      {currentNode.badge}
                    </span>
                    {currentNode.step && (
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold rounded">
                        📍 {currentNode.step}
                      </span>
                    )}
                  </div>
                </div>

                {/* Role Description */}
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#9A9E9F] font-bold">
                    บทบาทและหน้าที่สำคัญ (Core Responsibility)
                  </h4>
                  <p className="text-sm text-white font-medium mt-1 font-sans leading-relaxed">
                    {currentNode.role}
                  </p>
                  <p className="text-xs text-[#D9D8D3] mt-2 font-sans leading-relaxed">
                    {currentNode.desc}
                  </p>
                </div>

                {/* System Pipeline Connection */}
                {currentNode.connection && (
                  <div className="p-3.5 bg-[#14161B] rounded border border-[#2D3139] space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold uppercase text-[11px]">
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>ท่อส่งข้อมูลที่เชื่อมต่อกับส่วนอื่น (Pipeline Connection):</span>
                    </div>
                    <p className="text-[#D9D8D3] font-sans leading-relaxed">
                      {currentNode.connection}
                    </p>
                  </div>
                )}

                {/* Key Functions / Instructions */}
                {currentNode.keyFunctions && (
                  <div className="space-y-2 pt-2 border-t border-[#D9D8D3]/15">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-[#9A9E9F] font-bold">
                      คำสั่ง & เมธอดหลักในไฟล์นี้ (Key Implementations)
                    </h4>
                    <div className="space-y-1.5 font-mono text-xs">
                      {currentNode.keyFunctions.map((fn, idx) => (
                        <div key={idx} className="p-2.5 bg-[#14161B] rounded border border-[#2D3139] flex items-start gap-2">
                          <Code2 className="w-3.5 h-3.5 text-[#2457FF] shrink-0 mt-0.5" />
                          <span className="text-[#D9D8D3]">{fn}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input / Output Specs */}
                {currentNode.inputOutput && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#D9D8D3]/15 font-mono text-xs">
                    <div className="p-3 bg-[#14161B] rounded border border-[#2D3139] space-y-1">
                      <span className="text-[10px] text-[#9A9E9F] font-bold block uppercase">📥 ขาเข้า (Input):</span>
                      <span className="text-[#4C7DFF] font-sans text-xs">{currentNode.inputOutput.input}</span>
                    </div>
                    <div className="p-3 bg-[#14161B] rounded border border-[#2D3139] space-y-1">
                      <span className="text-[10px] text-[#9A9E9F] font-bold block uppercase">📤 ขาออก (Output):</span>
                      <span className="text-emerald-400 font-sans text-xs">{currentNode.inputOutput.output}</span>
                    </div>
                  </div>
                )}

                {/* Architectural Rules / Gotchas */}
                {currentNode.rules && (
                  <div className="p-3.5 bg-[#FFF0EA]/10 border border-[#FF6B35]/30 rounded space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[#FF6B35] font-mono font-bold uppercase text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>กฎเหล็กทางวิศวกรรม (Architectural Rule):</span>
                    </div>
                    <ul className="space-y-1 text-[#F6F5F1] font-sans list-disc list-inside">
                      {currentNode.rules.map((rule, idx) => (
                        <li key={idx} className="leading-relaxed">{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Traceability Table: Map between Step-by-Step and Project Structure */}
            <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#2457FF]" />
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#20242A]">
                    ตารางจับคู่โครงสร้างไฟล์กับขั้นตอนการพัฒนา (Step-by-Step Traceability Matrix)
                  </h4>
                  <p className="text-xs text-[#62666B] font-sans">
                    ไล่เรียงความเชื่อมโยงของไฟล์ทั้ง 11 ขั้นตอนตามลำดับความเป็นจริง (STEP 00 – STEP 10) ตั้งแต่การตั้งค่าระบบจนถึงหน้าจอแสดงผล
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#D9D8D3] text-[#62666B] font-mono text-[11px] bg-[#F6F5F1]">
                      <th className="p-2.5 font-bold">ขั้นตอน</th>
                      <th className="p-2.5 font-bold">พาธไฟล์ในระบบ</th>
                      <th className="p-2.5 font-bold">หน้าที่สำคัญในระบบ</th>
                      <th className="p-2.5 font-bold">ท่อที่เชื่อมต่อ (Connection Flow)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9D8D3] text-[#20242A]">
                    <tr className="hover:bg-blue-50/50 cursor-pointer bg-blue-50/20" onClick={() => setSelectedNode('env')}>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF] whitespace-nowrap">STEP 00</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">.gitignore & Root Setup</td>
                      <td className="p-2.5">ตรวจสอบ Node.js v20.6+, สร้างโฟลเดอร์แม่ mono-repo และ .gitignore แรก</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">ป้องกัน .env และ node_modules หลุดขึ้น Git</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('package.json')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 01, 02</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/package.json</td>
                      <td className="p-2.5">ตั้ง "type": "module" เปิดใช้ ESM, สคริปต์ dev และ 7 ไลบรารี</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">รัน node --watch src/server.js</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('env')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 03</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/.env & .gitignore</td>
                      <td className="p-2.5">เก็บค่าพอร์ต 666, URI ฐานข้อมูล, JWT_SECRET ป้องกันหลุดขึ้น Git</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">โหลดเข้า process.env ➔ db.js & server.js</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('db.js')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 04</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/src/config/db.js</td>
                      <td className="p-2.5">ฟังก์ชัน connectDB() เปิดท่อ Network Socket ไปยัง MongoDB Atlas</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">server.js เรียก await ก่อนเปิด listen</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('user.model.js')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 05</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/src/models/user.model.js</td>
                      <td className="p-2.5">Schema ผู้ใช้ บังคับ Validation และซ่อนรหัสผ่านด้วย select: false</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">users.routes.js ใช้สั่ง User.create(), find()</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('authUser.js')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 06</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/src/middlewares/authUser.js</td>
                      <td className="p-2.5">ยามตรวจ accessToken ใน Cookie แกะด้วย jwt.verify แนบ req.user</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">เฝ้าประตูหน้า Route /api/v2/users/auth</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('routes-v2')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 07</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/src/routes/v2/users.routes.js</td>
                      <td className="p-2.5">CRUD 7 เมธอด: Register แฮช 12 รอบ, Login ออก HttpOnly Cookie, Logout, CRUD</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">ผูกเข้ากับ app.use("/api", apiRoutes)</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('server.js')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 08</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/src/server.js</td>
                      <td className="p-2.5">ศูนย์กลางเซิร์ฟเวอร์: CORS credentials, JSON, Cookie, Error Handler, Listen 666</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">เปิดประตูดักฟังคำขอจาก Frontend :5173</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('users-api-test.rest')}>
                      <td className="p-2.5 font-mono font-bold text-emerald-700 whitespace-nowrap">STEP 09</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">backend/users-api-test.rest</td>
                      <td className="p-2.5">ชุดทดสอบยิง Request ตรงใน VS Code ตรวจ 201, 200, และ Set-Cookie</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">ยิงเข้าหาพอร์ต 666 ก่อนเริ่มต่อหน้าบ้าน</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('userService.js')}>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF] whitespace-nowrap">STEP 10 Service</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">frontend/src/services/userService.js</td>
                      <td className="p-2.5">Service Layer แยกฟังก์ชัน fetch() ข้ามพอร์ตพร้อม credentials: "include"</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">ยิงข้ามพอร์ตไปยัง http://localhost:666/api/v2</td>
                    </tr>
                    <tr className="hover:bg-[#F6F5F1]/50 cursor-pointer" onClick={() => setSelectedNode('UserDashboard.jsx')}>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF] whitespace-nowrap">STEP 10 UI</td>
                      <td className="p-2.5 font-mono font-bold text-[#2457FF]">frontend/src/components/UserDashboard.jsx</td>
                      <td className="p-2.5">React Component รัน useEffect ดึงข้อมูล พร้อมจัดการ Loading, Error, Data Table</td>
                      <td className="p-2.5 text-[#62666B] font-mono text-[11px]">เรนเดอร์ข้อมูลผู้ใช้จริงจาก MongoDB บนจอ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: 4-TIER REQUEST PIPELINE & STEP-BY-STEP LIFECYCLE */}
        {/* ========================================================================= */}
        {activeTab === 'lifecycle' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-6" style={{ borderRadius: '6px' }}>
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D8D3]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#2457FF] font-bold">
                    STEP-BY-STEP SEQUENCE TRACE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#20242A] tracking-tight mt-1">
                    การเดินทาง 1 คำขอ: จากคลิกปุ่มบนหน้าจอ สู่ฮาร์ดดิสก์ของ Database
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#62666B]">E2E PIPELINE</span>
              </div>

              {/* 4 Tiers Visual Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Tier 1 */}
                <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] rounded space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[#2457FF]">
                    <span>TIER 01</span>
                    <span>CLIENT LAYER</span>
                  </div>
                  <h4 className="font-bold text-base text-[#20242A]">React 19 (Vite)</h4>
                  <div className="font-mono text-xs text-[#62666B]">Port 5173 / Cloudflare</div>
                  <p className="text-xs text-[#62666B] font-sans leading-relaxed">
                    ผู้ใช้กดปุ่ม ฟังก์ชัน <code className="text-[#20242A]">fetch()</code> ยิง Request พร้อมแนบ <code className="text-[#20242A]">credentials: 'include'</code> เพื่อส่ง HttpOnly Cookie
                  </p>
                </div>

                {/* Tier 2 */}
                <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] rounded space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold text-amber-700">
                    <span>TIER 02</span>
                    <span>GATEWAY PIPELINE</span>
                  </div>
                  <h4 className="font-bold text-base text-[#20242A]">Global Middlewares</h4>
                  <div className="font-mono text-xs text-[#62666B]">backend/src/server.js</div>
                  <p className="text-xs text-[#62666B] font-sans leading-relaxed">
                    ตรวจ CORS ว่ามาจากพอร์ตที่อนุญาตไหม ➔ แปลง JSON เข้า <code className="text-[#20242A]">req.body</code> ➔ แปลง Cookie เข้า <code className="text-[#20242A]">req.cookies</code>
                  </p>
                </div>

                {/* Tier 3 */}
                <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] rounded space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold text-emerald-700">
                    <span>TIER 03</span>
                    <span>ROUTING & GUARD</span>
                  </div>
                  <h4 className="font-bold text-base text-[#20242A]">authUser & Routing</h4>
                  <div className="font-mono text-xs text-[#62666B]">middlewares/authUser.js</div>
                  <p className="text-xs text-[#62666B] font-sans leading-relaxed">
                    Router ส่งต่อตาม URL ➔ ด่านตรวจ <code className="text-[#20242A]">authUser</code> ถอดรหัส JWT ตรวจสอบความถูกต้อง ถ้าผ่านจะแนบข้อมูลผู้ใช้เข้า <code className="text-[#20242A]">req.user</code>
                  </p>
                </div>

                {/* Tier 4 */}
                <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] rounded space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold text-purple-700">
                    <span>TIER 04</span>
                    <span>CONTROLLER & DB</span>
                  </div>
                  <h4 className="font-bold text-base text-[#20242A]">Mongoose & Mongo</h4>
                  <div className="font-mono text-xs text-[#62666B]">models/user.model.js</div>
                  <p className="text-xs text-[#62666B] font-sans leading-relaxed">
                    Controller สั่ง Query หรือ Insert ผ่าน Mongoose Model ➔ บันทึกลง Disk ใน MongoDB Atlas ➔ ส่งคืน 200/201 JSON กลับหน้าบ้าน
                  </p>
                </div>
              </div>

              {/* Detailed Real Code Sequence Trace */}
              <div className="p-5 bg-[#20242A] text-white rounded font-mono text-xs space-y-2">
                <span className="text-[#4C7DFF] font-bold uppercase tracking-wider block text-[11px]">
                  CHRONOLOGICAL REQUEST LIFECYCLE:
                </span>
                <div className="space-y-1.5 text-[#D9D8D3]">
                  <div>01. Browser Fetch ──[HTTP POST /api/v2/users/login]──➔ Port 666 (Render Server)</div>
                  <div>02. server.js (cors) ──[Origin &amp; Method Allowed]──➔ express.json()</div>
                  <div>03. server.js (cookieParser) ──[Cookie Decoded to req.cookies]──➔ router (routes/index.js)</div>
                  <div>04. router (routes/v2/users.routes.js) ──[Find by Email]──➔ User.findOne()</div>
                  <div>05. bcrypt.compare() ──[Password Matched]──➔ jwt.sign(token)</div>
                  <div>06. res.cookie("accessToken", token, &#123; httpOnly: true &#125;) ──[Cookie Set]──➔ res.status(200).json()</div>
                  <div>07. Browser receives 200 OK ──[Stores Cookie in Secure Sandbox]──➔ UI State Re-renders</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CLOUD TOPOLOGY (CLOUDFLARE + RENDER + ATLAS) */}
        {/* ========================================================================= */}
        {activeTab === 'deployment' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-6" style={{ borderRadius: '6px' }}>
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D8D3]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B35] font-bold">
                    PRODUCTION CLOUD TOPOLOGY
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#20242A] tracking-tight mt-1">
                    สถาปัตยกรรมการเผยแพร่จริง: Cloudflare Workers + Render Web Service
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#62666B]">PRODUCTION READY</span>
              </div>

              {/* 3 Cloud Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cloudflare Card */}
                <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30 font-mono text-xs font-bold rounded">
                      FRONTEND TIER
                    </span>
                    <Cloud className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <h4 className="font-bold text-lg text-[#20242A]">Cloudflare Workers</h4>
                  <div className="font-mono text-xs text-[#62666B]">mono-repo-web.workers.dev</div>
                  <ul className="space-y-1.5 text-xs text-[#62666B] font-sans leading-relaxed">
                    <li>• ทำหน้าที่เสิร์ฟ Static Assets (HTML, CSS, JS) ทั่วโลกผ่าน Edge CDN</li>
                    <li>• คอนฟิกใน <code className="text-[#20242A]">wrangler.jsonc</code> แบบ single-page-application</li>
                    <li>• ไม่มีการประมวลผล Node.js จึงประหยัดทรัพยากรและเร็วระดับเสี้ยววินาที</li>
                  </ul>
                </div>

                {/* Render Card */}
                <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-emerald-600/10 text-emerald-700 border border-emerald-600/30 font-mono text-xs font-bold rounded">
                      BACKEND API TIER
                    </span>
                    <Server className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h4 className="font-bold text-lg text-[#20242A]">Render Web Service</h4>
                  <div className="font-mono text-xs text-[#62666B]">jsd-mono-backend.onrender.com</div>
                  <ul className="space-y-1.5 text-xs text-[#62666B] font-sans leading-relaxed">
                    <li>• รันคำสั่ง <code className="text-[#20242A]">npm start</code> (node src/server.js) ใน Linux Container</li>
                    <li>• รับ Request ผ่าน HTTPS อัตโนมัติและส่งต่อเข้า Port 666</li>
                    <li>• เก็บ Environment Variables ความลับ (MONGO_URI, JWT_SECRET)</li>
                  </ul>
                </div>

                {/* Database Cloud Card */}
                <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#2457FF]/10 text-[#2457FF] border border-[#2457FF]/30 font-mono text-xs font-bold rounded">
                      DATA PERSISTENCE TIER
                    </span>
                    <Database className="w-5 h-5 text-[#2457FF]" />
                  </div>
                  <h4 className="font-bold text-lg text-[#20242A]">MongoDB Atlas</h4>
                  <div className="font-mono text-xs text-[#62666B]">cluster0.mongodb.net</div>
                  <ul className="space-y-1.5 text-xs text-[#62666B] font-sans leading-relaxed">
                    <li>• เก็บ Document ผู้ใช้ถาวรบน Cloud NoSQL Database</li>
                    <li>• มีระบบ Replica Set สำรองข้อมูลอัตโนมัติ 3 โหนด</li>
                    <li>• เข้ารหัสข้อมูลที่จัดเก็บบนดิสก์ (Encryption at Rest)</li>
                  </ul>
                </div>
              </div>

              {/* Monorepo Build Command Note */}
              <div className="p-4 bg-[#14161B] text-[#D9D8D3] rounded border border-[#2D3139] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-white font-bold block">ROOT BUILD SCRIPT:</span>
                  <span className="text-[#4C7DFF]">npm --prefix frontend install && npm --prefix frontend run build</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded self-start sm:self-auto">
                  ✓ Monorepo Supported
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
