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
    'server.js': {
      title: 'backend/src/server.js',
      category: 'BACKEND CORE ENTRYPOINT',
      badge: 'Port 666 Engine',
      role: 'ศูนย์กลางเปิดเซิร์ฟเวอร์ & ติดตั้งท่อ Pipeline กลางของระบบ',
      desc: 'หัวใจสมองกลของ Backend ทำหน้าที่ผูก Port 666 (หรือ process.env.PORT บน Render), เรียกฟังก์ชัน connectDB() รอให้ฐานข้อมูลพร้อมก่อนรับคำขอ, ติดตั้งท่อกรอง CORS เปิดรับ React :5173 พร้อมส่ง Cookie, แปลง JSON และ Cookie เข้า req, ผูกเส้นทาง /api, และมี Centralized Error Handler ดักจับ Error รวมทุก Controller เพื่อป้องกันเซิร์ฟเวอร์ค้าง',
      keyFunctions: [
        'connectDB(): รอเชื่อมต่อ MongoDB Atlas สำเร็จก่อนเริ่ม listen',
        'cors({ origin, credentials: true }): อนุญาตให้หน้าบ้านส่ง Cookie ข้าม Port',
        'express.json() & cookieParser(): แปลง Body และ Cookie เป็น JavaScript Object',
        'app.use("/api", apiRoutes): รวม Router ทั้งหมดของระบบ',
        'app.use((err, req, res, next) => ...): ท่อดักจับ Error ระดับแอปพลิเคชัน คืน 500'
      ],
      inputOutput: {
        input: 'Incoming HTTP Requests ทุกประเภทจากอินเทอร์เน็ตที่พุ่งเข้าสู่ Port 666',
        output: 'JSON Response ที่ผ่านการกรอง Pipeline และแนบ Header มาตรฐาน'
      },
      rules: [
        'ต้องวาง CORS ไว้บนสุด ก่อน Route เสมอ ไม่เช่นนั้นเบราว์เซอร์จะบล็อกคำขอ',
        'ต้องมี 4 พารามิเตอร์ (err, req, res, next) ใน Error Middleware เพื่อให้ Express รู้ว่าเป็น Error Handler'
      ]
    },
    'db.js': {
      title: 'backend/src/config/db.js',
      category: 'DATABASE CONNECTION POOL',
      badge: 'Mongoose Adapter',
      role: 'โมดูลบริหารจัดการ Connection ไปยัง MongoDB Atlas',
      desc: 'ใช้ Mongoose ในการเปิดท่อ Connection Pool ไปยัง Cloud Database โดยดึง MONGO_URI จาก Environment Variables มีระบบเช็ค readyState ป้องกันการต่อซ้ำ และจัดการ Error Gracefully',
      keyFunctions: [
        'connectDB(): ฟังก์ชัน async ตรวจสอบ connection state ถ้ายังไม่ต่อจะสั่ง mongoose.connect()',
        'mongoose.connection.on("error"): ดักฟังข้อผิดพลาดของ Network แบบ Real-time'
      ],
      inputOutput: {
        input: 'process.env.MONGO_URI (สตริงเชื่อมต่อที่มี username:password)',
        output: 'Mongoose Connection Instance สำหรับให้ Model ต่างๆ ใช้งาน'
      },
      rules: [
        'ห้ามเขียนโค้ดต่อ Database ใน Controller แยกแต่ละ Route เด็ดขาด เพราะจะเกิด Connection Leak',
        'ต้องเช็ค readyState === 1 ก่อนเพื่อป้องกันการสร้าง Connection ทับซ้อน'
      ]
    },
    'user.model.js': {
      title: 'backend/src/models/user.model.js',
      category: 'DATA SCHEMA & BLUEPRINT',
      badge: 'Mongoose Schema',
      role: 'พิมพ์เขียวกำหนดโครงสร้างข้อมูล Validation และความปลอดภัยของ Document',
      desc: 'กำหนดฟิลด์ของ User (username, email, password, role) มีการบังคับ Type, Unique Index, Lowercase, และหัวใจสำคัญคือ select: false บน password เพื่อป้องกันไม่ให้รหัสผ่านรั่วไหลไปกับคำสั่ง User.find() ทั่วไป',
      keyFunctions: [
        'new mongoose.Schema({...}, { timestamps: true }): กำหนดฟิลด์และบันทึก createdAt/updatedAt',
        'password: { type: String, select: false }: ซ่อนรหัสผ่านเป็นค่าเริ่มต้นในทุก Query',
        'mongoose.model("User", userSchema): คอมไพล์ Schema เป็น Model Class'
      ],
      inputOutput: {
        input: 'ข้อมูลดิบที่ต้องการบันทึกลง Database',
        output: 'Mongoose Document ที่ผ่านการ Validate และมี Methods ช่วยจัดการข้อมูล'
      },
      rules: [
        'ต้องใส่ select: false ที่ password เพื่อความปลอดภัยระดับมาตรฐานสากล',
        'ใส่ timestamps: true เพื่อให้มีประวัติเวลาสร้างและแก้ไขข้อมูลโดยอัตโนมัติ'
      ]
    },
    'authUser.js': {
      title: 'backend/src/middlewares/authUser.js',
      category: 'SECURITY GATEKEEPER',
      badge: 'Guard Middleware',
      role: 'ด่านตรวจบัตรและสิทธิ์ (Authentication Guard) ก่อนเข้าถึง Route สำคัญ',
      desc: 'ทำหน้าที่ดักจับ Request ที่ต้องการเข้าถึงข้อมูลส่วนตัว แกะ accessToken ออกจาก HttpOnly Cookie หรือ Authorization Header, ตรวจสอบความถูกต้องของ Signature ด้วย jwt.verify() ร่วมกับ JWT_SECRET หากผ่านจะฉีด req.user = decoded และสั่ง next()',
      keyFunctions: [
        'req.cookies.accessToken: ดึง Token ออกจาก Cookie ที่เบราว์เซอร์แนบมาอัตโนมัติ',
        'jwt.verify(token, secret): ถอดรหัสและตรวจความถูกต้องของตั๋ว Token',
        'req.user = decoded: ฉีด userId เข้า Request Object เพื่อให้ Controller ถัดไปหยิบไปใช้',
        'next(): ปล่อยให้ Request เดินทางต่อไปยัง Controller เป้าหมาย'
      ],
      inputOutput: {
        input: 'Request พร้อม HttpOnly Cookie ที่มี JWT Token',
        output: 'ปล่อยผ่านไปยัง Controller ถัดไปพร้อม req.user หรือตัดบทคืน 401 Unauthorized'
      },
      rules: [
        'ห้ามลืมสั่ง next() เมื่อตรวจผ่าน ไม่เช่นนั้น Request จะค้างเติ่งจน Timeout',
        'หากไม่มี Token หรือ Token หมดอายุ ต้องส่ง 401 ทันที ห้ามปล่อยผ่าน'
      ]
    },
    'routes-index': {
      title: 'backend/src/routes/index.js',
      category: 'ROUTING HUB & NAMESPACE',
      badge: 'Main Router',
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
      rules: [
        'การแยก Versioning (v1, v2) บน URL เป็นแนวทางปฏิบัติที่ดีที่สุดของ RESTful API เพื่อป้องกันการเกิด Breaking Changes กับผู้ใช้เดิม'
      ]
    },
    'routes-v1': {
      title: 'backend/src/routes/v1/users.routes.js',
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
      rules: [
        'ข้อมูลใน v1 จะหายไปทั้งหมดเมื่อรีสตาร์ทเซิร์ฟเวอร์ เพราะอยู่ใน RAM',
        'ต้องคำนวณ highestId + 1 ด้วยตัวเองเพื่อไม่ให้ ID ซ้ำกัน'
      ]
    },
    'routes-v2': {
      title: 'backend/src/routes/v2/users.routes.js',
      category: 'PRODUCTION CONTROLLERS',
      badge: 'Full CRUD + Bcrypt Auth (v2)',
      role: 'ระบบจัดการผู้ใช้และระบบรักษาความปลอดภัยระดับ Production บน MongoDB',
      desc: 'ประกอบด้วยระบบสมัครสมาชิก (POST /register แฮชรหัสผ่าน 12 รอบ), เข้าสู่ระบบ (POST /login สร้าง JWT ใน HttpOnly Cookie), ตรวจสอบตัวตน (GET /auth ผ่าน authUser), และระบบ CRUD ครบถ้วน (GET /, PUT /:id, DELETE /:id)',
      keyFunctions: [
        'bcrypt.hash(password, 12): แฮชรหัสผ่านก่อนบันทึกลง Database',
        'User.create({...}): บันทึก Document ลง MongoDB ถาวร',
        'jwt.sign({ userId }, secret): ออกตั๋วรับรองตัวตนแบบเข้ารหัส',
        'res.cookie("accessToken", token, { httpOnly: true, secure }): ฝากคุกกี้',
        'User.findByIdAndUpdate(id, updateData, { returnDocument: "after" }): อัปเดตข้อมูล'
      ],
      inputOutput: {
        input: 'Credentials (email, password) หรือ Update Data ผ่าน HTTP Request',
        output: 'Sanitized User JSON (ตัดรหัสผ่านทิ้ง) พร้อม HttpOnly Cookie'
      },
      rules: [
        'ต้องใช้ Rest Operator ตัด password และ passwordHash ทิ้งก่อนส่ง Response กลับเสมอ',
        'ต้องครอบด้วย async/await และ try...catch ทุก Route เพื่อส่งต่อ Error ด้วย next(err)'
      ]
    },
    'env': {
      title: 'backend/.env & .gitignore',
      category: 'ENVIRONMENT & SECRETS',
      badge: 'Configuration',
      role: 'เก็บค่าคอนฟิกูเรชันที่เป็นความลับและแปรผันตามสภาพแวดล้อม',
      desc: 'เก็บ PORT=666, MONGO_URI, JWT_SECRET, และ NODE_ENV โดย Node.js เวอร์ชันใหม่โหลดอัตโนมัติผ่านคำสั่ง node --env-file=.env โดยไม่ต้องใช้แพ็กเกจ dotenv เสริม',
      keyFunctions: [
        'PORT=666: กำหนดพอร์ตดักฟังในเครื่อง Localhost',
        'MONGO_URI: สตริงเชื่อมต่อฐานข้อมูล MongoDB Atlas',
        'JWT_SECRET: กุญแจลับสำหรับเซ็นและตรวจสอบลายเซ็นดิจิทัลของ JWT'
      ],
      inputOutput: {
        input: 'ไฟล์ข้อความคู่ Key=Value บนเครื่องโฮสต์',
        output: 'โหลดเข้าสู่ process.env ของกระบวนการ Node.js'
      },
      rules: [
        'ห้าม commit ไฟล์ .env ขึ้น GitHub เด็ดขาด ต้องระบุใน .gitignore เสมอ!',
        'บน Production (Render) ให้นำค่าเหล่านี้ไปกรอกในหน้า Environment Variables Dashboard'
      ]
    },
    'frontend-api': {
      title: 'frontend/src/services/api.js',
      category: 'CLIENT NETWORK LAYER',
      badge: 'Fetch Client',
      role: 'ฟังก์ชันเชื่อมต่อ API จากฝั่ง React 19 ข้ามพอร์ตไปยัง Backend Express',
      desc: 'ใช้ Web Fetch API มาตรฐาน มีการกำหนด API_BASE และที่สำคัญที่สุดคือการตั้งค่า credentials: "include" เพื่อสั่งให้เบราว์เซอร์แนบ HttpOnly Cookie ข้ามพอร์ต 5173 ➔ 666 ไปด้วยทุกคำขอ',
      keyFunctions: [
        'fetch(url, { credentials: "include" }): ส่งคำขอพร้อมแนบ Cookie ข้ามโดเมน/พอร์ต',
        'response.json(): แปลงข้อมูลที่ได้จากเซิร์ฟเวอร์กลับเป็น JavaScript Object'
      ],
      inputOutput: {
        input: 'พารามิเตอร์ของฟังก์ชัน (เช่น ข้อมูลฟอร์มที่ผู้ใช้พิมพ์)',
        output: 'Promise ที่ resolve เป็นข้อมูล JSON หรือ reject เมื่อเกิด HTTP Error'
      },
      rules: [
        'ถ้าลืม credentials: "include" ฝั่งหน้าบ้านจะไม่สามารถใช้ระบบล็อกอินผ่าน Cookie ได้เลย',
        'ต้องตรวจสอบ response.ok เสมอ เพราะคำสั่ง fetch() จะไม่ throw error แม้จะได้ status 400 หรือ 500'
      ]
    },
    'deployment': {
      title: 'Monorepo Deployment Architecture',
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
      rules: [
        'บน Render ต้องตั้ง Environment Variable: MONGO_URI, JWT_SECRET, NODE_ENV=production',
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
              ถอดรหัสโครงสร้างระบบ Monorepo จริงอย่างละเอียด: วิเคราะห์หน้าที่ของทุกไฟล์, ท่อส่งข้อมูล 4 ระดับ (Pipeline Tiers), 
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
                    <Package className="w-4 h-4 text-[#20242A] inline" />
                    <span>JSD-MONO/</span>
                  </div>

                  {/* Root Configs */}
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                    <div 
                      onClick={() => setSelectedNode('deployment')}
                      className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                        selectedNode === 'deployment' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                      }`}
                      style={{ borderRadius: '3px' }}
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 opacity-70" />
                        <span>wrangler.jsonc & package.json</span>
                      </span>
                      <span className="text-[10px] opacity-70">Cloudflare Config</span>
                    </div>
                  </div>

                  {/* Frontend Section */}
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2 pt-2 space-y-1">
                    <div className="font-bold text-[#2457FF] flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-[#2457FF] inline" />
                      <span>frontend/ (React 19 + Tailwind)</span>
                    </div>
                    <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                      <div
                        onClick={() => setSelectedNode('frontend-api')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'frontend-api' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/services/api.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Fetch + Cookie</span>
                      </div>
                      <div className="px-2 py-0.5 text-[#62666B] flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-[#62666B]" />
                        <span>src/App.jsx & components/</span>
                      </div>
                    </div>
                  </div>

                  {/* Backend Section */}
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2 pt-2 space-y-1">
                    <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-emerald-600" />
                      <span>backend/ (Express 5 Engine)</span>
                    </div>

                    <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                      <div
                        onClick={() => setSelectedNode('server.js')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'server.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/server.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Root :666</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('env')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'env' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>.env & .gitignore</span>
                        </span>
                        <span className="text-[10px] opacity-70">Secrets</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('db.js')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'db.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/config/db.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Mongo Pool</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('user.model.js')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'user.model.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/models/user.model.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Schema</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('authUser.js')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'authUser.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/middlewares/authUser.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Guard</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('routes-index')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'routes-index' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/routes/index.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Hub</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('routes-v1')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'routes-v1' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/routes/v1/users.routes.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Array CRUD</span>
                      </div>

                      <div
                        onClick={() => setSelectedNode('routes-v2')}
                        className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                          selectedNode === 'routes-v2' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 opacity-70" />
                          <span>src/routes/v2/users.routes.js</span>
                        </span>
                        <span className="text-[10px] opacity-70">Auth + Mongo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Deep File Technical Inspector (7 Cols) */}
              <div className="lg:col-span-7 bg-[#20242A] text-[#F6F5F1] p-6 sm:p-8 rounded-lg border border-[#20242A] space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#D9D8D3]/20">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#4C7DFF] tracking-wider block">
                      {currentNode.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                      {currentNode.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#2457FF]/20 text-[#4C7DFF] border border-[#2457FF]/40 font-mono text-xs font-bold rounded">
                    {currentNode.badge}
                  </span>
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
                    Router ส่งต่อตาม URL ➔ ด่านตรวจ <code className="text-[#20242A]">authUser</code> ถอดรหัส JWT ตรวจสอบความถูกต้อง ถ้าผ่านจะฉีด <code className="text-[#20242A]">req.user</code>
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
