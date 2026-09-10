export const CURRICULUM = {
  hero: {
    badge: "ENGINEERING PLAYBOOK & ARCHITECTURE",
    title: "Not just how it connects — how it thinks.",
    subtitle: "คู่มือฉบับสมบูรณ์สำหรับทำความเข้าใจ API ตั้งแต่รากฐาน สถาปัตยกรรม Request-Response จนถึงการต่อระบบ Front-End และ Back-End จริง โดยเรียนรู้จริงจากโค้ดจริงในโปรเจกต์ JSD-MONO",
    meta: [
      { label: "Architecture", value: "RESTful + Express (v4)" },
      { label: "Data Tier", value: "In-Memory / MongoDB / Supabase" },
      { label: "Security", value: "Bcrypt (12 Rounds) + JWT Cookie" },
      { label: "Port Binding", value: "Client :5173 ⟷ Server :666" }
    ]
  },

  modules: [
    {
      id: "01",
      number: "01",
      tag: "FOUNDATIONS & ACTORS",
      title: "The Essence of API: อะไรคือ API และมันทำงานกับใคร?",
      summary: "ทำความเข้าใจตัวกลางที่เชื่อมต่อโลกดิจิทัล เปรียบเสมือนบริกรที่นำคำสั่งจากโต๊ะอาหารส่งตรงถึงครัว และนำอาหารกลับมาเสิร์ฟ",
      content: {
        whatIsApi: {
          title: "1. อะไรคือ API (Application Programming Interface)?",
          explanation: `API เปรียบเสมือน "สัญญาตกลง (Contract)" หรือ "ช่องทางสื่อสารมาตรฐาน" ที่เปิดให้ซอฟต์แวร์ 2 ตัวที่อาจจะเขียนด้วยคนละภาษา หรืออยู่คนละเครื่อง สามารถคุยกันและส่งข้อมูลหากันได้อย่างเป็นระเบียบ

หากเปรียบเทียบกับชีวิตจริง:
• ลูกค้า (Client / Frontend เช่น เว็บแอปพลิเคชัน หรือแอปบนมือถือ) นั่งอยู่ที่โต๊ะ
• ห้องครัว (Database / Database Server) เป็นที่เก็บวัตถุดิบและปรุงอาหาร
• บริกร (API / Express Server) คือผู้ถือเมนูมารับออเดอร์ (HTTP Request) ตรวจสอบความถูกต้อง แล้วเดินไปหยิบของจากครัว (Query DB) ก่อนจะนำจานอาหารที่จัดเสร็จแล้ว (JSON Response) กลับมาเสิร์ฟที่โต๊ะ`,
        },
        whoDoesItWorkWith: {
          title: "2. API ทำงานกับใครบ้าง? (The Actors in System)",
          actors: [
            {
              role: "The Client (Frontend)",
              tech: "React 19, Browser Fetch, Mobile App, Postman",
              desc: "เป็นผู้ริเริ่มการสื่อสาร (Initiator) มีหน้าที่แสดงผล UI และรวบรวมสิ่งที่ผู้ใช้พิมพ์หรือกดคลิก แปลงเป็น HTTP Request แล้วส่งข้าม Network"
            },
            {
              role: "The API Server (Backend Controller)",
              tech: "Node.js, Express (v4.21.2 รันที่ localhost:666)",
              desc: "เป็นหัวใจสมองกล คอยเปิดประตูดักฟัง (Port Listener) ตรวจสอบสิทธิ์ (Auth Middleware), Validate ความถูกต้องของข้อมูล และกำหนดทิศทาง (Routing)"
            },
            {
              role: "The Data Store (Persistence Layer)",
              tech: "MongoDB (Mongoose), Supabase, FakeDB In-Memory",
              desc: "แหล่งเก็บข้อมูลถาวร API จะเป็นผู้สั่งค้นหา (Query), บันทึก (Insert), หรืออัปเดต (Update) ข้อมูลตามสิทธิ์ที่ได้รับ"
            }
          ]
        },
        prerequisites: {
          title: "3. ต้องมีความรู้เรื่องไหนเป็นพื้นฐานก่อนเริ่ม?",
          skills: [
            {
              topic: "HTTP Protocol & Methods",
              detail: "ต้องเข้าใจความหมายของ GET (อ่าน), POST (สร้างใหม่), PUT (อัปเดตทั้งก้อน/แก้ไข), DELETE (ลบ) และ Status Code มาตรฐาน เช่น 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error"
            },
            {
              topic: "JSON (JavaScript Object Notation)",
              detail: "ภาษามาตรฐานของ API ยุคใหม่ ข้อมูลทุกอย่างที่ส่งผ่าน Body ทั้งขาไปและขากลับจะอยู่ในรูป Key-Value ของ JSON"
            },
            {
              topic: "Asynchronous JavaScript (Promises & async/await)",
              detail: "เพราะการส่งข้อมูลข้ามอินเทอร์เน็ตไม่ได้ผลลัพธ์ทันทีใน 0 วินาที โค้ดทั้งฝั่ง Server และ Client จึงต้องใช้ async/await เพื่อรอรับข้อมูลโดยไม่ทำให้โปรแกรมค้าง"
            },
            {
              topic: "Node.js & Modules (ESM: import/export)",
              detail: "ความเข้าใจเรื่อง package.json, การแบ่งโมดูล และการรัน JavaScript นอกเบราว์เซอร์"
            }
          ]
        },
        codeSample: {
          title: "โค้ดจริงจากโปรเจกต์: จุดเริ่มต้นของ Server (backend/src/server.js)",
          file: "backend/src/server.js",
          code: `import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as apiRoutes } from "./routes/index.js";

const app = express();
const port = 666; // พอร์ตที่เซิร์ฟเวอร์เปิดรอรับ Request

// 1. Middlewares สากลสำหรับทุก Request
app.use(cors());              // อนุญาตให้โดเมนอื่น (เช่น React พอร์ต 5173) เรียกใช้ได้
app.use(express.json());      // แปลง Raw JSON ใน Body ให้อยู่ใน req.body
app.use(cookieParser());      // แกะ Cookie ที่ส่งมากับ Header ให้อยู่ใน req.cookies

// 2. ผูก Routing เข้ากับ URL Prefix
app.use("/api", apiRoutes);

// 3. เริ่มต้นเปิดรับ Connection
app.listen(port, () => {
  console.log(\`Server is running on PORT Localhost:\${port}\`);
});`,
          takeaway: "ทุกครั้งที่ Frontend เรียก http://localhost:666/api/... ข้อมูลจะผ่าน cors() -> express.json() -> cookieParser() ก่อนจะส่งต่อไปยัง Route ที่ตรงกัน"
        }
      }
    },

    {
      id: "02",
      number: "02",
      tag: "LIFECYCLE & ARCHITECTURE",
      title: "Request Lifecycle: เจาะลึกการเดินทางของข้อมูล (v1 vs v2)",
      summary: "เปรียบเทียบวิวัฒนาการสถาปัตยกรรม API จาก v1 (In-Memory Data) สู่ v2 (Production Database Architecture)",
      content: {
        lifecycleSteps: [
          {
            step: "1. Client Request",
            desc: "Frontend ส่ง HTTP Request พร้อม Method, URL, Headers (เช่น Content-Type: application/json) และ Body (ถ้ามี)"
          },
          {
            step: "2. Server Middleware Chain",
            desc: "Express นำ Request ผ่านด่านตรวจ CORS, Body Parser, และ Auth Validator หากไม่ผ่านจะตีกลับทันที (เช่น 401 Unauthorized)"
          },
          {
            step: "3. Route & Controller Matching",
            desc: "Express จับคู่ URL เข้ากับ Handler ฟังก์ชัน เช่น router.post('/register', async (req, res, next) => { ... })"
          },
          {
            step: "4. Business Logic & Database Operation",
            desc: "Controller ประมวลผล เช่น แฮชรหัสผ่านด้วย Bcrypt แล้วสั่ง Mongoose บันทึกลง MongoDB หรือ Supabase"
          },
          {
            step: "5. Response Dispatch",
            desc: "Controller ส่ง HTTP Status Code พร้อมข้อมูล JSON ตอบกลับ Client ผ่าน res.status(200).json(data)"
          }
        ],
        comparison: {
          title: "วิวัฒนาการทางสถาปัตยกรรมในระบบ: v1 vs v2",
          v1: {
            title: "v1: In-Memory FakeDB (เบา เร็ว แต่ข้อมูลหายเมื่อรีสตาร์ท)",
            file: "backend/src/routes/v1/users.routes.js",
            code: `// อ่านข้อมูลจาก Array ใน Memory
router.get("/", (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// สร้างข้อมูลใหม่โดยคำนวณ ID ถัดไปเอง
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  const highestId = users.reduce((max, u) => Math.max(max, Number(u.id)), 0);
  const newUser = { id: String(highestId + 1), username, email, password };
  users.push(newUser);
  return res.status(201).json(newUser);
});`,
            pros: "เขียนง่าย เหมาะสำหรับการเรียนรู้โครงสร้าง CRUD และทดสอบเร็ว",
            cons: "ข้อมูลไม่ถาวร ปิดเซิร์ฟเวอร์แล้วรีเซ็ต รหัสผ่านเก็บเป็น Plaintext"
          },
          v2: {
            title: "v2: Real Production DB with Mongoose (ข้อมูลถาวร ปลอดภัย สเกลได้)",
            file: "backend/src/routes/v2/users.routes.js",
            code: `// เชื่อมต่อ MongoDB ผ่าน Mongoose Model
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});`,
            pros: "จัดเก็บลง Disk ถาวร มี Schema validation ค้นหาข้อมูลซับซ้อนได้",
            cons: "ต้องจัดการ Connection, จัดการ Async Error และดักจับ Schema Exception ให้รอบคอบ"
          }
        }
      }
    },

    {
      id: "03",
      number: "03",
      tag: "SECURITY & AUTHENTICATION",
      title: "Security, Hashing & Identity: รหัสผ่านและระบบสมาชิก",
      summary: "หลักการรักษาความปลอดภัยขั้นสูงสุด: ทำไมห้ามเก็บรหัสผ่านตรงๆ, เทคนิค Sanitize ข้อมูล และการยืนยันตัวตนด้วย HttpOnly Cookie",
      content: {
        bcryptDeepDive: {
          title: "1. ทำไมต้อง Bcrypt และ Salt Rounds คืออะไร?",
          explanation: `รหัสผ่านของผู้ใช้เป็นความลับสูงสุด หากเราเก็บรหัสผ่านเช่น "123456" ลงฐานข้อมูล แล้ววันหนึ่งฐานข้อมูลหลุด แฮกเกอร์จะได้รหัสผ่านทุกคนทันที
Bcrypt เป็นการแฮชแบบทางเดียว (One-Way Hashing) ที่ไม่สามารถย้อนกลับได้ และมีการสุ่มค่า Salt ผสมเข้าไป เพื่อป้องกัน Rainbow Table Attack

ในโค้ดมาตรฐาน: bcrypt.hash(password, 12)
เลข 12 คือ Cost Factor (Salt Rounds): ยิ่งเลขสูงยิ่งปลอดภัย แต่ใช้ CPU ในการคำนวณนานขึ้น 10-12 ถือเป็นตัวเลขระดับ Gold Standard ในปัจจุบัน`
        },
        sanitizationSecret: {
          title: "2. กฎเหล็กด้านความปลอดภัย: ห้ามส่งรหัสผ่านกลับไปให้ Client!",
          file: "backend/src/routes/v2/users.routes.js (Register Endpoint)",
          code: `// สร้าง User ลงฐานข้อมูล
const newUser = await User.create({
  username,
  role: role || "user",
  email,
  password: hash,
  passwordHash: hash,
});

// ⭐ ทริคสำคัญ: ใช้ Destructuring แยก password ออกมาทิ้ง
const {
  password: _password,
  passwordHash: _passwordHash,
  ...userWithoutPassword
} = newUser.toObject();

// ส่งเฉพาะ Object ที่ถูกล้างข้อมูลลับแล้วกลับไปให้ Client
return res.status(201).json({
  message: "Register successful",
  user: userWithoutPassword,
});`,
          insight: "การใช้ JavaScript Rest Operator (...userWithoutPassword) ช่วยรับประกันได้ 100% ว่ารหัสผ่าน hash จะไม่มีวันหลุดกลับไปบน Network ให้ใครดักฟัง"
        },
        cookieAuthFlow: {
          title: "3. ระบบตรวจบัตรผ่าน: HttpOnly Cookie + authUser Middleware",
          file: "backend/src/middlewares/authUser.js",
          code: `import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  // 1. ดึง Token จาก HttpOnly Cookie
  let token = req.cookies.accessToken;
  if (!token)
    return res.status(401).json({ success: false, message: "access denied, No token" });

  try {
    // 2. แกะและตรวจสอบความถูกต้องของ Token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. ฝากข้อมูลผู้ใช้ไว้ใน Request Object เพื่อให้ Route ถัดไปหยิบใช้ได้
    req.user = decodedToken;
    
    // 4. ⭐ ปล่อยผ่านไปยัง Middleware หรือ Route ถัดไป
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};`,
          whyHttpOnly: "การเก็บ Token ใน HttpOnly Cookie ปลอดภัยกว่า LocalStorage มหาศาล เพราะ JavaScript (รวมถึงโค้ดฝังตัวไวรัส XSS) ไม่สามารถอ่าน Cookie นี้ได้โดยตรง เบราว์เซอร์จะส่งไปกับ Request อัตโนมัติ"
        }
      }
    },

    {
      id: "04",
      number: "04",
      tag: "REAL WAR STORIES",
      title: "War Stories & Bug Fixes: ถอดบทเรียนจากปัญหาจริงหน้างาน",
      summary: "รวมบั๊กจริงที่พบบ่อยระหว่างพัฒนาโปรเจกต์ JSD-MONO: ปัญหา API ค้าง, CORS Blocked, และการรับมือข้อผิดพลาด",
      content: {
        bugs: [
          {
            badge: "CRITICAL BUG 01",
            title: "ปัญหา 'API ค้าง' (Request Pending ตลอดกาล ไม่มีวันจบ)",
            symptom: "เวลายิง Postman หรือ Fetch หน้าเว็บจะขึ้นสถานะ Loading หมุนติ้วๆ แล้วหมดเวลา (Timeout) ไม่มีอะไรตอบกลับมาเลย",
            rootCause: "ใน Express ทุกคำขอจะเดินทางเป็นท่อ (Pipeline) หาก Controller หรือ Middleware ไม่ได้สั่งส่งผลลัพธ์ (res.send / res.json) และไม่ได้สั่งให้ไปต่อ (next()) หรือเกิด Error ใน Async Function แต่ไม่มีใครจับ Express จะถือว่างานยังไม่เสร็จและปล่อยให้ Request ค้างเติ่งไว้!",
            badCode: `// [Anti-pattern] โค้ดที่ทำให้ค้าง: ลืมส่ง response ในบางเงื่อนไข หรือลืม next()
router.get("/profile", authUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    // ลืมใส่ return res.status(404).json(...) ตรงนี้!
    console.log("user not found"); // โปรแกรมจะหยุดตรงนี้ และ Client จะค้างรอไปเรื่อยๆ!
  }
});`,
            goodCode: `// [Best Practice] วิธีแก้ที่ถูกต้อง: การันตีว่าทุกเส้นทางต้องมี return res หรือ next(err)
router.get("/profile", authUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err); // ส่ง error ไปให้ Error Handling Middleware ด้านล่างสุดจัดการ
  }
});`,
            serverLevelFix: `// และใน server.js ต้องมีตัวรับจบเสมอ (Centralized Error Handler)
app.use((err, req, res, next) => {
  return res.status(500).json({ error: "Something crash bro", message: err.message });
});`
          },
          {
            badge: "CRITICAL BUG 02",
            title: "ปัญหา CORS Blocked & Cookie หายเมื่อเชื่อมข้ามพอร์ต",
            symptom: "React (localhost:5173) เรียก API ไปที่ Express (localhost:666) แล้วขึ้นสีแดงใน Console: 'Access to fetch at ... has been blocked by CORS policy'",
            rootCause: "เบราว์เซอร์มีนโยบายรักษาความปลอดภัย Same-Origin Policy หาก Protocol, Domain หรือ Port ไม่ตรงกัน จะถูกสั่งบล็อกทันที และถ้าใช้ CORS แบบ default จะไม่ยอมแนบ HttpOnly Cookie ไปด้วย",
            badCode: `// [Anti-pattern] ตั้ง CORS แบบลอยๆ ไม่รองรับ Credentials (Cookie)
app.use(cors()); // ค่าเริ่มต้นจะบล็อก Cookie ข้าม Origin ทันที`,
            goodCode: `// [Best Practice] ฝั่ง Backend (Express server.js):
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // ระบุ origin ของ Frontend
  credentials: true // อนุญาตให้รับ-ส่ง Cookie ได้
}));

// [Best Practice] ฝั่ง Frontend (React): ต้องระบุ credentials: "include" ใน fetch เสมอ
fetch("http://localhost:666/api/v2/users/auth", {
  method: "GET",
  credentials: "include" // คำสั่งสำคัญที่สุดเพื่อให้เบราว์เซอร์แนบ Cookie ไปด้วย
});`
          },
          {
            badge: "EDGE CASE 03",
            title: "ปัญหา MongoDB CastError เมื่อส่ง ID ผิดรูปแบบ",
            symptom: "เมื่อผู้ใช้ส่ง ID ที่ไม่ใช่ 24-character Hex string (เช่น ส่งชื่อ username มาใน param /users/:id) Mongoose จะพังทันทีด้วย CastError",
            rootCause: "User.findById(id) บังคับว่า id ต้องเป็น ObjectId ที่ถูกต้องตามสเปกของ MongoDB",
            goodCode: `// [Best Practice] โค้ดแนวปฏิบัติที่ดีในโปรเจกต์ (v2/users.routes.js: L198-205)
let deletedUser = null;

// ตรวจสอบก่อนว่า ID ถูกรูปแบบ MongoDB ไหม
if (mongoose.Types.ObjectId.isValid(id)) {
  deletedUser = await User.findByIdAndDelete(id);
}

// ถ้าไม่ใช่ ObjectId ให้ลองค้นหาจาก Username แทน!
if (!deletedUser) {
  deletedUser = await User.findOneAndDelete({ username: id });
}`
          }
        ]
      }
    },

    {
      id: "05",
      number: "05",
      tag: "FULLSTACK INTEGRATION",
      title: "Connecting Frontend to Backend: วิธีต่อระบบจริงใน React",
      summary: "เทคนิคการสร้าง Service Layer ที่สะอาด มีระเบียบ จัดการสถานะ Loading, Success, และ Error ได้อย่างมืออาชีพ",
      content: {
        patternIntro: "อย่าเขียน fetch() กระจัดกระจายใน JSX Component แต่ควรสร้าง API Client Layer หรือ Service Module แยกออกมา เพื่อให้แก้ Endpoint ที่เดียวได้ทั้งระบบ",
        reactCode: `// src/services/userService.js
const API_BASE_URL = "http://localhost:666/api";

export const userService = {
  // ดึงรายชื่อผู้ใช้
  async getUsers(version = "v1") {
    const response = await fetch(\`\${API_BASE_URL}/\${version}/users\`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include" // จำเป็นมากเมื่อใช้ Cookie
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || \`HTTP error \${response.status}\`);
    }

    return await response.json();
  },

  // สมัครสมาชิก (v2)
  async register(userData) {
    const response = await fetch(\`\${API_BASE_URL}/v2/users/register\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include"
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Register failed");
    return data;
  }
};`,
        reactHookCode: `// ตัวอย่างการนำไปใช้ใน React Component ด้วย State 3 สถานะ
import { useState, useEffect } from "react";
import { userService } from "./services/userService";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService.getUsers("v1")
      .then(data => setUsers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-neutral-500">กำลังเชื่อมต่อไปยังพอร์ต 666...</p>;
  if (error) return <p className="text-red-600">เกิดข้อผิดพลาด: {error}</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.username} ({u.email})</li>)}
    </ul>
  );
}`
      }
    }
  ]
};
