import React, { useState } from 'react';
import { 
  Globe, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  ChevronDown, 
  ChevronsUpDown, 
  ExternalLink,
  Zap,
  ArrowRight,
  Code2
} from 'lucide-react';
import { CodeWalkthrough } from './CodeWalkthrough';
import { TerminalCodeBlock } from './TerminalCodeBlock';
import { Step10FrontendResultPreview } from './Step10FrontendResultPreview';

export function FrontendIntegrationSection({ embedded = false }) {
  const [openParts, setOpenParts] = useState(new Set([0, 1, 2, 3, 4]));

  const togglePart = (index) => {
    setOpenParts(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => setOpenParts(new Set([0, 1, 2, 3, 4]));
  const collapseAll = () => setOpenParts(new Set());

  const integrationParts = [
    {
      partNum: "PHASE 01",
      badge: "SERVICE LAYER",
      badgeColor: "bg-[#2457FF]",
      title: "1. สร้าง API Service Layer (frontend/src/services/userService.js)",
      purpose: "แยกตรรกะการยิง Network HTTP ออกจากหน้าจอ UI อย่างเด็ดขาด พร้อมตั้งค่า credentials: 'include' เพื่อส่ง HttpOnly Cookie ข้ามพอร์ต",
      file: "frontend/src/services/userService.js",
      code: `// =========================================================================
// 1. API SERVICE LAYER: แยกตรรกะการเรียก HTTP ออกจากหน้าจอ (Clean Architecture)
// =========================================================================
const API_BASE = "http://localhost:666/api/v2";

export const userService = {
  // 1. ดึงรายชื่อผู้ใช้ทั้งหมดจาก MongoDB
  async getAllUsers() {
    const response = await fetch(\`\${API_BASE}/users\`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      // ⭐ สำคัญที่สุด: สั่งให้เบราว์เซอร์แนบ HttpOnly Cookie ไปกับ Request ข้ามพอร์ต
      credentials: "include"
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || err.message || \`HTTP error! status: \${response.status}\`);
    }

    return await response.json();
  },

  // 2. ดึงข้อมูลโปรไฟล์ของตัวเองหลังตรวจบัตร (ต้องผ่าน authUser Middleware)
  async getMyProfile() {
    const response = await fetch(\`\${API_BASE}/users/auth\`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Unauthorized: ไม่พบตั๋ว Cookie หรือ Token หมดอายุ");
    }

    return await response.json();
  }
};`,
      whySyntax: "1. Clean Architecture: หากในอนาคตต้องการเปลี่ยนจาก fetch เป็น axios หรือเปลี่ยน URL พอร์ต สามารถแก้ที่ไฟล์นี้ที่เดียวโดยไม่ต้องแก้ไฟล์ Component อื่น\n2. credentials: 'include': คำสั่งของ Fetch API สำหรับอนุญาตส่ง Cookie ข้าม Origin (localhost:5173 ➔ localhost:666)",
      connection: "เป็นด่านแรกฝั่ง Frontend ที่ยิง HTTP Request ข้ามพอร์ตไปยัง Express Server (:666) และรับ JSON Data กลับมาส่งต่อให้ React State",
      breakdown: [
        {
          instruction: "credentials: 'include'",
          why: "หากไม่ใส่คำสั่งนี้ เบราว์เซอร์จะบล็อกไม่ส่ง HttpOnly Cookie ส่งผลให้เซิร์ฟเวอร์ตอบกลับเป็น 401 Unauthorized เสมอ"
        },
        {
          instruction: "if (!response.ok) throw new Error(...)",
          why: "คำสั่ง fetch() ของเบราว์เซอร์จะไม่ throw Error เองเมื่อเจอสถานะ 404 หรือ 500 จึงต้องตรวจจับ response.ok เองเสมอ"
        }
      ],
      pitfall: "เขียน fetch() ฝังในปุ่มกดหรือใน JSX โดยตรง ทำให้โค้ดกระจัดกระจาย ยุ่งเหยิง และเมื่อต้องเปลี่ยน Port หรือ Domain จะต้องตามแก้ทุกไฟล์",
      productionTip: "ในระดับ Enterprise นิยมสร้าง Axios Client หรือ Fetch Wrapper เพื่อมี Request Interceptor แนบ Access Token และ Response Interceptor คอย Refresh Token เมื่อหมดอายุ"
    },
    {
      partNum: "PHASE 02",
      badge: "REACT HOOKS",
      badgeColor: "bg-purple-600",
      title: "2. สร้าง Component ดึงข้อมูลด้วย useEffect (frontend/src/components/UserDashboard.jsx)",
      purpose: "สร้างคอมโพเนนต์ React ที่รองรับวงจรชีวิต (Lifecycle) จัดการครบทั้ง 3 สภาวะ: กำลังโหลด (Loading), เกิดข้อผิดพลาด (Error), และแสดงข้อมูลสำเร็จ (Success Data)",
      file: "frontend/src/components/UserDashboard.jsx",
      code: `import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export function UserDashboard() {
  // 1. จัดการ 3 สถานะหลักของ UI (State Management)
  const [users, setUsers] = useState([]);          // เก็บข้อมูลผู้ใช้ (เริ่มต้นเป็น Array ว่าง)
  const [loading, setLoading] = useState(true);    // สถานะกำลังโหลด (เริ่มต้นเป็น true เพื่อโชว์ Spinner)
  const [error, setError] = useState(null);        // สถานะข้อผิดพลาด (เริ่มต้นเป็น null)

  // 2. Hook เชื่อมโยงวงจรชีวิต: สั่งดึงข้อมูลเมื่อ Component แสดงผลครั้งแรก
  useEffect(() => {
    // Flag ป้องกัน Memory Leak กรณีผู้ใช้กดเปลี่ยนหน้าก่อน API จะตอบกลับ
    let isMounted = true;

    // ⚠ กฎเหล็ก React: ห้ามใส่ async ที่ callback ของ useEffect โดยตรง
    // ต้องประกาศฟังก์ชัน async ภายในแล้วสั่งรันแทน
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // ยิง API ผ่าน Service Layer ข้ามไปยังพอร์ต 666
        const res = await userService.getAllUsers();
        const data = res?.data || res || [];

        // อัปเดตข้อมูลเข้า State เฉพาะเมื่อ Component ยังอยู่บนหน้าจอ
        if (isMounted) {
          setUsers(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ Backend ได้");
        }
      } finally {
        if (isMounted) {
          setLoading(false); // ปิดการหมุนโหลดไม่ว่าจะสำเร็จหรือล้มเหลว
        }
      }
    }

    loadData(); // สั่งรันฟังก์ชันดึงข้อมูล

    // Cleanup Function: ทำงานอัตโนมัติเมื่อ Component ถูกถอดออกจากหน้าจอ (Unmount)
    return () => {
      isMounted = false;
    };
  }, []); // ⭐ [] Dependency Array ว่าง = สั่งให้รันเพียง "ครั้งเดียว" ตอน Mount

  // 3. จังหวะที่ 1: หน้าจอกำลังรอข้อมูล (Loading State)
  if (loading) {
    return (
      <div className="p-8 text-center font-mono text-sm text-[#62666B]">
        <div className="animate-spin w-6 h-6 border-2 border-[#2457FF] border-t-transparent rounded-full mx-auto mb-2" />
        <p>กำลังเชื่อมต่อ API พอร์ต 666 เพื่อดึงข้อมูลจาก MongoDB...</p>
      </div>
    );
  }

  // 4. จังหวะที่ 2: หน้าจอเมื่อเกิดปัญหา (Error State)
  if (error) {
    return (
      <div className="p-5 bg-[#FFF0EA] border border-[#FF6B35] rounded font-sans text-sm space-y-3">
        <div className="font-bold text-[#FF6B35]">เกิดข้อผิดพลาดในการโหลดข้อมูล:</div>
        <p className="font-mono text-xs text-[#20242A] bg-white p-2.5 rounded border border-[#FF6B35]/30">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1.5 bg-[#FF6B35] text-white text-xs font-mono rounded hover:bg-[#E0531F] cursor-pointer"
        >
          ลองใหม่อีกครั้ง (Retry)
        </button>
      </div>
    );
  }

  // 5. จังหวะที่ 3: หน้าจอแสดงผลข้อมูลสำเร็จ (Success Data State)
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
        <h4 className="font-bold text-lg text-[#20242A]">
          รายชื่อสมาชิกจากฐานข้อมูล MongoDB ({users.length} คน)
        </h4>
        <span className="font-mono text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
          ● 200 OK Live Connected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {users.map((user) => (
          <div
            key={user._id || user.id}
            className="p-4 bg-white border border-[#D9D8D3] rounded hover:border-[#2457FF] transition-all shadow-2xs"
          >
            <div className="font-bold text-sm text-[#20242A]">{user.username}</div>
            <div className="font-mono text-xs text-[#62666B] mt-0.5">{user.email}</div>
            <div className="mt-2 text-[11px] font-mono text-[#2457FF] uppercase font-semibold">
              Role: {user.role || "user"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      whySyntax: "1. ห้ามเขียน useEffect(async () => ...): React ต้องการ Cleanup Function หรือ undefined เท่านั้น หากใส่ async จะคืนค่าเป็น Promise ทำให้เกิด Error\n2. Dependency Array []: ป้องกันการวนลูปยิง API ซ้ำซ้อนไม่รู้จบ (Infinite Loop)",
      connection: "เมื่อ Component ถูก Mount เข้าสู่หน้าจอ useEffect จะสั่งรัน userService.getAllUsers() ดึงข้อมูลแล้วเซ็ตลงใน users State ทำให้ React วาดผลลัพธ์ลงจอ",
      breakdown: [
        {
          instruction: "useEffect(() => { ... }, [])",
          why: "สั่งให้ดึงข้อมูลครั้งแรกเมื่อหน้าจอเปิดขึ้นมาเพียงครั้งเดียว"
        },
        {
          instruction: "let isMounted = true & return () => { isMounted = false }",
          why: "ป้องกันข้อผิดพลาด Can't perform a React state update on an unmounted component เมื่อกดย้ายหน้าก่อนเซิร์ฟเวอร์ตอบ"
        },
        {
          instruction: "const [loading, setLoading] = useState(true)",
          why: "สลับ UI โชว์ตัวหมุนเพื่อบอกให้ผู้ใช้ทราบว่าระบบกำลังติดต่อเซิร์ฟเวอร์ ไม่ได้ค้าง"
        }
      ],
      pitfall: "ลืมใส่ [] ใน useEffect จะทำให้เกิด Infinite Loop ยิงคำขอไปที่ backend หลายพันครั้งต่อวินาทีจน Server และ MongoDB ล่มทันที",
      productionTip: "ในโปรเจกต์ขนาดใหญ่ นิยมใช้ React Query (@tanstack/react-query) ซึ่งจัดการทั้ง Cache, Retry, Refetch on focus และ Loading state ให้อัตโนมัติ"
    },
    {
      partNum: "PHASE 03",
      badge: "ROOT APP",
      badgeColor: "bg-emerald-600",
      title: "3. ประกอบ UserDashboard เข้าสู่ Root Layout (frontend/src/App.jsx)",
      purpose: "นำเข้า (import) UserDashboard มาวางเป็นเนื้อหาหลักในหน้าจอของ App.jsx เพื่อให้คอมโพเนนต์แสดงผลสู่สายตาผู้ใช้งาน",
      file: "frontend/src/App.jsx",
      code: `import { UserDashboard } from "./components/UserDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F6F5F1] p-6 sm:p-12 font-sans text-[#20242A]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header ส่วนหัวของหน้าจอ */}
        <header className="pb-4 border-b border-[#D9D8D3]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2457FF]">
            FULL-STACK MONOREPO
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20242A] mt-1">
            ระบบจัดการสมาชิก (User Management Dashboard)
          </h1>
          <p className="text-sm text-[#62666B] mt-1">
            เชื่อมต่อสดจาก React (:5173) ข้ามพอร์ตไปยัง Express (:666) และ MongoDB Atlas
          </p>
        </header>

        {/* ⭐ นำ Component UserDashboard ที่สร้างไว้มาประกอบใช้งานตรงนี้ */}
        <main className="bg-white p-6 rounded border border-[#D9D8D3] shadow-xs">
          <UserDashboard />
        </main>
      </div>
    </div>
  );
}`,
      whySyntax: "React ใช้แนวคิด Component Hierarchy โดยมี App.jsx ทำหน้าที่เป็นกล่องบรรจุหลัก (Root Container) รวบรวมคอมโพเนนต์ย่อยเข้ามาไว้ด้วยกัน",
      connection: "เมื่อ App.jsx ถูกเรนเดอร์ มันจะสั่ง Mount <UserDashboard /> ลงบนหน้าจอทันที ส่งผลให้ useEffect ใน UserDashboard เริ่มต้นยิง API",
      breakdown: [
        {
          instruction: 'import { UserDashboard } from "./components/UserDashboard";',
          why: "นำเข้าคอมโพเนนต์ที่เราสร้างไว้จาก Phase 02"
        },
        {
          instruction: "<UserDashboard />",
          why: "สั่งให้ React วาดส่วน UI ของ UserDashboard ลงในแท็ก <main>"
        }
      ],
      pitfall: "สร้างไฟล์ Component เสร็จแล้ว แต่ลืมนำมาเรียกใช้ใน App.jsx ส่งผลให้หน้าเว็บขาวหรือว่างเปล่า และโค้ดยิง API จะไม่ถูกรันเลยแม้แต่บรรทัดเดียว",
      productionTip: "ในแอปที่มีหลายหน้า สามารถใช้ React Router (<Routes> และ <Route>) ครอบใน App.jsx เพื่อสลับหน้าระหว่าง Dashboard, Login, Register ได้"
    },
    {
      partNum: "PHASE 04",
      badge: "ROOT DOM & ROUTES",
      badgeColor: "bg-amber-600",
      title: "4. เชื่อมโยงระดับรากฐาน (main.jsx, index.html & routes/v2/index.js)",
      purpose: "ปิดลูปการเชื่อมต่อระดับรากฐาน (Root Entrypoints) ทั้งสองฝั่ง: เชื่อมหน้าบ้านเข้ากับ HTML DOM และเชื่อมต่อ Route ฝั่งหลังบ้านครบทุกชั้นเข้าสู่ URL /api/v2/users",
      file: "frontend/src/main.jsx, index.html, backend/src/routes/index.js & routes/v2/index.js",
      code: `// =========================================================================
// 1. ฝั่งหน้าบ้าน (FRONTEND ROOT MOUNT): frontend/src/main.jsx
// =========================================================================
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// สั่งให้ React นำคอมโพเนนต์ App ทั้งหมดไปยึดโยง (Mount) กับแท็ก <div id="root"> ใน HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// =========================================================================
// 2. ไฟล์ HTML หลัก (DOM ROOT): frontend/index.html
// =========================================================================
/*
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Management Dashboard</title>
  </head>
  <body>
    <!-- จุดที่ React นำ App ทั้งหมดมาฉีดวาดลงบนหน้าจอ -->
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
*/

// =========================================================================
// 3. ฝั่งหลังบ้าน - รวมท่อหลัก (BACKEND ROUTE HUB): backend/src/routes/index.js
// =========================================================================
import { Router } from "express";
import { router as v1Routes } from "./v1/index.js";
import { router as v2Routes } from "./v2/index.js";

export const router = Router();
router.use("/v1", v1Routes); // ท่อสำหรับเวอร์ชัน 1 (/api/v1)
router.use("/v2", v2Routes); // ท่อสำหรับเวอร์ชัน 2 (/api/v2)

// =========================================================================
// 4. ฝั่งหลังบ้าน - แตกท่อ V2 (V2 ROUTER HUB): backend/src/routes/v2/index.js
// =========================================================================
import { Router as V2Router } from "express";
import { router as usersRoutes } from "./users.routes.js";
import { router as usersSupabaseRoutes } from "./users.supabase.routes.js";

export const router = V2Router();
router.use("/users/pg", usersSupabaseRoutes); // PostgreSQL via Supabase
router.use("/users", usersRoutes);             // MongoDB via Mongoose (ตรงกับ /api/v2/users)`,
      whySyntax: "1. ReactDOM.createRoot: คำสั่งมาตรฐานสำหรับสร้างราก Virtual DOM และผูกเข้ากับ DOM จริงของเบราว์เซอร์\n2. Nested Router: Express รองรับการต่อท่อซ้อนกันเป็นระดับชั้น (server.js /api ➔ routes/index.js /v2 ➔ routes/v2/index.js /users) ทำให้ URL ประกอบกันเป็น /api/v2/users ได้อย่างเป็นระเบียบ สะอาด และขยายระบบง่าย",
      connection: "สายใยเชื่อมต่อทั้งระบบแบบปิดลูปสมบูรณ์ (The Closed-Loop Architecture):\nHTML (index.html) ➔ main.jsx ➔ App.jsx ➔ UserDashboard.jsx ➔ userService.js ──[HTTP GET :666]──➔ server.js ➔ routes/index.js ➔ routes/v2/index.js ➔ routes/v2/users.routes.js ➔ MongoDB Atlas ➔ ส่ง JSON 200 กลับมาวาดบนหน้าจอ",
      breakdown: [
        {
          instruction: "ReactDOM.createRoot(document.getElementById('root')).render(<App />)",
          why: "จุดเริ่มต้นของ React ทั้งหมดที่นำแอปไปฉีดใส่ในแท็ก <div id='root'> ของผู้ใช้"
        },
        {
          instruction: 'router.use("/v2", v2Routes);',
          why: "ฮับกลาง routes/index.js ที่ส่งต่อคำขอที่มี prefix /v2 เข้าสู่ routes/v2/index.js"
        },
        {
          instruction: 'router.use("/users", usersRoutes);',
          why: "ท่อใน routes/v2/index.js ที่รับคำขอ /users แล้วส่งตรงเข้าหา users.routes.js (MongoDB)"
        }
      ],
      pitfall: "หากใน index.html ลืมใส่ <div id=\"root\"></div> เบราว์เซอร์จะ Error ทันทีว่า 'Target container is not a DOM element' หรือถ้าลืม router.use('/users', usersRoutes) ใน v2/index.js คำขอจะติด 404 Cannot GET /api/v2/users ทันที",
      productionTip: "ในโปรเจกต์ขนาดใหญ่ การทำ Nested Routing แยก index.js ย่อยตามเวอร์ชัน (v1, v2) ช่วยให้การ Deprecate API เก่าทำได้อย่างปลอดภัยโดยไม่กระทบโค้ดเวอร์ชันใหม่"
    },
    {
      partNum: "PHASE 05",
      badge: "HOW TO RUN",
      badgeColor: "bg-cyan-600",
      title: "5. วิธีรันจริง (Dual-Terminal) ให้ได้ผลลัพธ์เหมือนหน้าเว็บ 100%",
      purpose: "คำสั่งเปิดเซิร์ฟเวอร์ Backend และ Frontend พร้อมวิธี Seed ข้อมูลผู้ใช้ทดสอบคนแรกเข้าสู่ MongoDB เพื่อให้ระบบแสดงผลข้อมูลจริงทันที",
      file: "Dual-Terminal Execution Guide",
      isExecutionGuide: true
    }
  ];

  return (
    <section className={`${embedded ? 'pt-2 space-y-8' : 'pt-12 border-t-2 border-[#20242A] space-y-10'} font-sans`}>
      {/* Section Header */}
      {!embedded && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#2457FF]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#2457FF] font-bold">
              SPECIAL MODULE / FRONTEND INTEGRATION
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#20242A]">
            คู่มือการต่อ Frontend React เข้ากับ Backend (Step-by-Step)
          </h3>
          <p className="text-[#62666B] text-sm sm:text-base max-w-4xl leading-relaxed">
            เชื่อมต่อระบบฝั่งหน้าบ้านอย่างละเอียดครบทั้งวงจร: สร้าง <strong className="text-[#20242A]">userService.js</strong>, 
            เขียน Component <strong className="text-[#20242A]">UserDashboard.jsx</strong> ดึงข้อมูลด้วย React Hooks, 
            นำไปประกอบใน <strong className="text-[#20242A]">App.jsx</strong> และต่อสายใยเข้ากับ <strong className="text-[#20242A]">main.jsx</strong> + <strong className="text-[#20242A]">index.html</strong> จนถึงวิธีรันจริง 100%
          </p>
        </div>
      )}

      {/* Global Architecture Path Diagram */}
      <div className="p-4 sm:p-5 bg-[#F6F5F1] border border-[#D9D8D3] rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#20242A]">
          <Layers className="w-4 h-4 text-[#2457FF]" />
          <span>แผนภาพเส้นทางการไหลของข้อมูลแบบปิดลูป (Closed-Loop Data Flow)</span>
        </div>
        <div className="overflow-x-auto text-xs font-mono text-[#20242A] py-2">
          <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
            <span className="px-2.5 py-1 bg-white border border-[#D9D8D3] rounded font-bold">index.html (#root)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#62666B]" />
            <span className="px-2.5 py-1 bg-white border border-[#D9D8D3] rounded font-bold">main.jsx (createRoot)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#62666B]" />
            <span className="px-2.5 py-1 bg-white border border-[#D9D8D3] rounded font-bold">App.jsx (Layout)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#62666B]" />
            <span className="px-2.5 py-1 bg-white border border-[#2457FF] text-[#2457FF] rounded font-bold">UserDashboard.jsx (useEffect)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#62666B]" />
            <span className="px-2.5 py-1 bg-white border border-[#2457FF] text-[#2457FF] rounded font-bold">userService.js</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded font-bold">HTTP GET :666/api/v2/users</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded font-bold">MongoDB Atlas</span>
          </div>
        </div>
      </div>

      {/* Accordion Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
        <h4 className="text-lg font-bold text-[#20242A]">
          เนื้อหาทั้ง 5 ขั้นตอน (Phases 01 – 05)
        </h4>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 border border-[#D9D8D3] bg-white hover:bg-[#F6F5F1] text-[#20242A] font-medium rounded cursor-pointer flex items-center gap-1.5"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
            <span>ขยายทั้งหมด</span>
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 border border-[#D9D8D3] bg-white hover:bg-[#F6F5F1] text-[#62666B] font-medium rounded cursor-pointer"
          >
            พับทั้งหมด
          </button>
        </div>
      </div>

      {/* Integration Phases Accordion */}
      <div className="space-y-4">
        {integrationParts.map((item, idx) => {
          const isOpen = openParts.has(idx);

          return (
            <div
              key={idx}
              className={`border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#20242A] bg-white shadow-xs'
                  : 'border-[#D9D8D3] bg-white hover:border-[#62666B]'
              }`}
              style={{ borderRadius: '6px' }}
            >
              {/* Header Button */}
              <button
                type="button"
                onClick={() => togglePart(idx)}
                className="w-full p-5 sm:p-6 text-left cursor-pointer focus:outline-none transition-colors hover:bg-[#F6F5F1]"
              >
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <span className={`font-mono text-xs font-bold px-2.5 py-1 text-white shrink-0 rounded block ${item.badgeColor}`}>
                      {item.partNum}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-base sm:text-lg font-bold text-[#20242A] leading-snug truncate">
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
                <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-3 border-t border-[#D9D8D3] space-y-4 bg-white">
                  {!item.isExecutionGuide ? (
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
                  ) : (
                    /* Phase 05: How to run */
                    <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] space-y-6" style={{ borderRadius: '6px' }}>
                      <div className="space-y-2">
                        <h5 className="font-bold text-base text-[#20242A]">
                          ขั้นตอนการรันโปรเจกต์จริงจากเครื่อง (Dual-Terminal Execution Guide)
                        </h5>
                        <p className="text-xs sm:text-sm text-[#62666B] font-sans leading-relaxed">
                          ในการทำให้ระบบแสดงผลลัพธ์เหมือนหน้าตัวอย่างด้านล่าง 100% คุณต้องเปิด Terminal แยก 2 หน้าต่าง (Backend และ Frontend) และเพิ่มข้อมูลผู้ใช้เริ่มต้น 1 คนเข้า MongoDB Atlas:
                        </p>
                      </div>

                      {/* Terminal 1: Backend */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#2457FF] text-white rounded">
                            TERMINAL 1
                          </span>
                          <span className="text-xs font-mono font-bold text-[#20242A]">
                            สตาร์ท Backend Server (Node.js + Express)
                          </span>
                        </div>
                        <TerminalCodeBlock
                          code={`cd backend
npm run dev

# ข้อความ Log ที่จะปรากฏใน Terminal 1 เมื่อรันสำเร็จ:
# > backend@1.0.0 dev
# > node --env-file=.env --watch src/server.js
#
# Yo ! MONGODB is connected
# Server is running on PORT Localhost:666`}
                          title="Terminal 1: Start Backend (Port 666)"
                        />
                      </div>

                      {/* Step 2: Seed data */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-amber-600 text-white rounded">
                            ACTION REQUIRED
                          </span>
                          <span className="text-xs font-mono font-bold text-[#20242A]">
                            ส่ง Request ยิงสร้าง User ตัวแรกผ่าน REST Client หรือ Curl
                          </span>
                        </div>
                        <p className="text-xs text-[#62666B] font-sans">
                          เปิดไฟล์ <code className="text-[#20242A] bg-white px-1 border border-[#D9D8D3]">backend/users-api-test.rest</code> ใน VS Code แล้วคลิก <strong>Send Request</strong> ตรง <strong>Register user</strong> หรือรันคำสั่งนี้ใน Terminal:
                        </p>
                        <TerminalCodeBlock
                          code={`curl -X POST http://localhost:666/api/v2/users/register \\
  -H "Content-Type: application/json" \\
  -d '{"username":"siwat","email":"siwat@example.com","password":"Password123!"}'

# ผลลัพธ์ Response กลับมาเป็น HTTP 201 Created:
# {"message":"User created successfully","data":{"id":"65f1a2b3c4d5e6f7a8b9c0d1","username":"siwat","email":"siwat@example.com","role":"user"}}`}
                          title="Terminal Command (Optional): Seed Test User"
                        />
                      </div>

                      {/* Terminal 2: Frontend */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">
                            TERMINAL 2
                          </span>
                          <span className="text-xs font-mono font-bold text-[#20242A]">
                            สตาร์ท Frontend App (Vite + React)
                          </span>
                        </div>
                        <TerminalCodeBlock
                          code={`cd frontend
npm run dev

# ข้อความ Log ที่จะปรากฏใน Terminal 2 เมื่อรันสำเร็จ:
#   VITE v5.x.x  ready in 240 ms
#
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
#   ➜  press h + enter to show help`}
                          title="Terminal 2: Start Frontend (Port 5173)"
                        />
                      </div>

                      {/* Verification */}
                      <div className="p-4 bg-white border border-[#D9D8D3] space-y-2" style={{ borderRadius: '4px' }}>
                        <span className="font-mono text-xs font-bold text-[#20242A] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          เปิดเบราว์เซอร์ดูผลลัพธ์จริงที่: http://localhost:5173
                        </span>
                        <p className="text-xs text-[#62666B] font-sans">
                          เมื่อหน้าเว็บเปิดขึ้นมา React Component <code className="text-[#20242A]">UserDashboard.jsx</code> จะทำงานอัตโนมัติผ่าน <code className="text-[#20242A]">useEffect</code> ยิงดึงข้อมูลจากพอร์ต 666 และนำข้อมูลที่ได้มา Render ลงบนตารางผลลัพธ์เหมือนหน้าตัวอย่างด้านล่างนี้ทันที 100%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Real Live Result Preview Card */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-600" />
          <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-700">
            ผลลัพธ์หน้าจอจริงที่ได้เมื่อทำครบทั้ง 5 PHASES (REAL UI RESULT)
          </h4>
        </div>
        <Step10FrontendResultPreview />
      </div>
    </section>
  );
}
