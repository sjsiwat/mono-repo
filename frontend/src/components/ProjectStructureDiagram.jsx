import { useState } from 'react';
import { Package, Folder, FileCode, Sparkles, ArrowRight } from 'lucide-react';

export function ProjectStructureDiagram() {
  const [selectedNode, setSelectedNode] = useState('server.js');

  const fileDetails = {
    'server.js': {
      title: 'backend/src/server.js',
      role: 'Core Server Engine & Pipeline Entrypoint (Port 666)',
      desc: 'ไฟล์หลักที่เปิด Port 666 ติดตั้ง Middlewares ระดับแอปพลิเคชัน (cors, express.json, cookieParser), ผูกเส้นทาง /api เข้ากับ Router หลัก, และมี Centralized Error Handler ป้องกัน API ค้าง'
    },
    'routes-v1': {
      title: 'backend/src/routes/v1/users.routes.js',
      role: 'In-Memory CRUD Sandbox (FakeDB)',
      desc: 'สอนพื้นฐาน CRUD (GET, POST, PUT, DELETE) โดยเก็บข้อมูลใน JavaScript Array ในแรม ไม่ต้องต่อฐานข้อมูล เหมาะสำหรับผู้เริ่มต้นเข้าใจ HTTP Methods'
    },
    'routes-v2': {
      title: 'backend/src/routes/v2/users.routes.js',
      role: 'Production Auth & Mongoose Controllers',
      desc: 'ระบบระดับ Production จัดการ /register (แฮชรหัสผ่าน Bcrypt 12 รอบ), /login (เซ็ต HttpOnly accessToken Cookie), /auth (ตรวจ Token), และ CRUD บน MongoDB'
    },
    'authUser.js': {
      title: 'backend/src/middlewares/authUser.js',
      role: 'Security Gatekeeper (Guard Middleware)',
      desc: 'ด่านตรวจก่อนเข้าถึง Route ลับ ทำหน้าที่แกะ Cookie `req.cookies.accessToken` มา verify กับ JWT_SECRET หากถูกต้องจะส่ง req.user ให้ handler ถัดไปทำงานต่อ'
    },
    'frontend-app': {
      title: 'frontend/src/App.jsx & Services',
      role: 'Client Interface & API Service Layer (Port 5173)',
      desc: 'หน้าเว็บ React 19 เชื่อมต่อไปยัง Express พอร์ต 666 ด้วย Fetch API (credentials: include) พร้อมจัดการ 3 สภาวะ (Loading, Success, Error)'
    }
  };

  return (
    <section className="py-12 bg-transparent font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#D9D8D3]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#2457FF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
                MONOREPO BLUEPRINT / ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#20242A] tracking-tight">
              แผนผังโครงสร้างโปรเจกต์ & การไหลของข้อมูล
            </h2>
            <p className="mt-2 text-[#62666B] text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
              มองเห็นภาพรวมทั้งระบบ ตั้งแต่สถาปัตยกรรมระดับสูง ลำดับท่อส่งข้อมูล จนถึงโครงสร้างไฟล์จริงในโปรเจกต์ JSD-MONO
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#62666B]">
            JSD-MONO Architecture
          </div>
        </div>

        {/* 1. Visual Request Pipeline Diagram (Swiss Technical Instrument) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#62666B]">
              1. ระบบการไหลของข้อมูล (End-to-End Request Pipeline)
            </h3>
            <span className="font-mono text-xs text-[#62666B]">4 TIERS</span>
          </div>

          <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9D8D3] overflow-x-auto" style={{ borderRadius: '6px' }}>
            <div className="min-w-[700px] flex items-center justify-between gap-3 relative">
              {/* Tier 1: Client */}
              <div
                onClick={() => setSelectedNode('frontend-app')}
                className={`flex-1 p-4 border transition-all cursor-pointer text-center ${
                  selectedNode === 'frontend-app'
                    ? 'border-[#2457FF] bg-[#EAF0FF]/50 ring-1 ring-[#2457FF]'
                    : 'border-[#D9D8D3] bg-[#F6F5F1] hover:border-[#20242A]'
                }`}
                style={{ borderRadius: '4px' }}
              >
                <div className="font-mono text-[10px] font-bold text-[#2457FF] uppercase tracking-wider">
                  TIER 01 / CLIENT
                </div>
                <div className="font-bold text-base text-[#20242A] mt-1">React 19 (Vite)</div>
                <div className="font-mono text-xs text-[#62666B] mt-0.5">:5173</div>
                <div className="mt-2 text-[11px] text-[#62666B] leading-tight">
                  Browser UI, credentials: 'include'
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex flex-col items-center justify-center text-[#62666B] font-mono text-[10px] px-1 shrink-0">
                <span>HTTP</span>
                <span className="text-base text-[#20242A]">→</span>
                <span>Cookie</span>
              </div>

              {/* Tier 2: Middlewares */}
              <div
                onClick={() => setSelectedNode('server.js')}
                className={`flex-1 p-4 border transition-all cursor-pointer text-center ${
                  selectedNode === 'server.js'
                    ? 'border-[#2457FF] bg-[#EAF0FF]/50 ring-1 ring-[#2457FF]'
                    : 'border-[#D9D8D3] bg-[#F6F5F1] hover:border-[#20242A]'
                }`}
                style={{ borderRadius: '4px' }}
              >
                <div className="font-mono text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  TIER 02 / MIDDLEWARE
                </div>
                <div className="font-bold text-base text-[#20242A] mt-1">Express Engine</div>
                <div className="font-mono text-xs text-[#62666B] mt-0.5">:666</div>
                <div className="mt-2 text-[11px] text-[#62666B] leading-tight">
                  cors() → json() → cookieParser()
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex flex-col items-center justify-center text-[#62666B] font-mono text-[10px] px-1 shrink-0">
                <span>Dispatch</span>
                <span className="text-base text-[#20242A]">→</span>
                <span>Match</span>
              </div>

              {/* Tier 3: Routes & Security */}
              <div
                onClick={() => setSelectedNode('routes-v2')}
                className={`flex-1 p-4 border transition-all cursor-pointer text-center ${
                  selectedNode === 'routes-v2' || selectedNode === 'routes-v1' || selectedNode === 'authUser.js'
                    ? 'border-[#2457FF] bg-[#EAF0FF]/50 ring-1 ring-[#2457FF]'
                    : 'border-[#D9D8D3] bg-[#F6F5F1] hover:border-[#20242A]'
                }`}
                style={{ borderRadius: '4px' }}
              >
                <div className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  TIER 03 / ROUTING
                </div>
                <div className="font-bold text-base text-[#20242A] mt-1">v1 & v2 Routes</div>
                <div className="font-mono text-xs text-[#62666B] mt-0.5">authUser + Bcrypt</div>
                <div className="mt-2 text-[11px] text-[#62666B] leading-tight">
                  Token Verify, Password Hash (12)
                </div>
              </div>

              {/* Arrow 3 */}
              <div className="flex flex-col items-center justify-center text-[#62666B] font-mono text-[10px] px-1 shrink-0">
                <span>Query</span>
                <span className="text-base text-[#20242A]">→</span>
                <span>Save</span>
              </div>

              {/* Tier 4: Storage */}
              <div className="flex-1 p-4 border border-[#D9D8D3] bg-[#F6F5F1] text-center" style={{ borderRadius: '4px' }}>
                <div className="font-mono text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                  TIER 04 / STORAGE
                </div>
                <div className="font-bold text-base text-[#20242A] mt-1">Database Layer</div>
                <div className="font-mono text-xs text-[#62666B] mt-0.5">Mongo + Supabase</div>
                <div className="mt-2 text-[11px] text-[#62666B] leading-tight">
                  Mongoose Models & PG Cloud
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Directory Tree + Node Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* File Tree (6 cols) */}
          <div className="lg:col-span-6 p-6 bg-[#FFFFFF] border border-[#D9D8D3] font-mono text-xs" style={{ borderRadius: '6px' }}>
            <div className="font-bold uppercase tracking-wider text-[#62666B] mb-4 flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
              <span>PROJECT DIRECTORY TREE</span>
              <span className="text-[10px] text-[#62666B]">คลิกที่ไฟล์เพื่อดูหน้าที่</span>
            </div>

            <div className="space-y-2 text-[#20242A]">
              <div className="font-bold flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#20242A] inline" />
                <span>JSD-MONO/</span>
              </div>

              {/* Frontend folder */}
              <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                <div className="font-bold text-[#2457FF] flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-[#2457FF] inline" />
                  <span>frontend/ (React 19 + Tailwind CSS)</span>
                </div>
                <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                  <div
                    onClick={() => setSelectedNode('frontend-app')}
                    className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                      selectedNode === 'frontend-app' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                    }`}
                    style={{ borderRadius: '3px' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 opacity-70" />
                      <span>src/App.jsx</span>
                    </span>
                    <span className="text-[10px] opacity-70">UI Interface</span>
                  </div>
                  <div className="px-2 py-0.5 text-[#62666B] flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[#62666B]" />
                    <span>src/services/api.js (Fetch client)</span>
                  </div>
                  <div className="px-2 py-0.5 text-[#62666B] flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[#62666B]" />
                    <span>vite.config.js & package.json</span>
                  </div>
                </div>
              </div>

              {/* Backend folder */}
              <div className="pl-4 border-l border-[#D9D8D3] ml-2 pt-2 space-y-1">
                <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-emerald-600" />
                  <span>backend/ (Express 5 Server)</span>
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
                    <span className="text-[10px] opacity-70">Port 666 Root</span>
                  </div>

                  <div className="font-semibold text-[#20242A] pt-1 flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-[#62666B]" />
                    <span>src/routes/</span>
                  </div>
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2 space-y-1">
                    <div
                      onClick={() => setSelectedNode('routes-v1')}
                      className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                        selectedNode === 'routes-v1' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                      }`}
                      style={{ borderRadius: '3px' }}
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 opacity-70" />
                        <span>v1/users.routes.js</span>
                      </span>
                      <span className="text-[10px] opacity-70">FakeDB CRUD</span>
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
                        <span>v2/users.routes.js</span>
                      </span>
                      <span className="text-[10px] opacity-70">Bcrypt + Mongo</span>
                    </div>
                  </div>

                  <div className="font-semibold text-[#20242A] pt-1 flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-[#62666B]" />
                    <span>src/middlewares/</span>
                  </div>
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2">
                    <div
                      onClick={() => setSelectedNode('authUser.js')}
                      className={`cursor-pointer px-2 py-1 transition-colors flex items-center justify-between ${
                        selectedNode === 'authUser.js' ? 'bg-[#20242A] text-white' : 'hover:bg-[#F6F5F1]'
                      }`}
                      style={{ borderRadius: '3px' }}
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 opacity-70" />
                        <span>authUser.js</span>
                      </span>
                      <span className="text-[10px] opacity-70">JWT Cookie Guard</span>
                    </div>
                  </div>

                  <div className="font-semibold text-[#20242A] pt-1 flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-[#62666B]" />
                    <span>src/models/</span>
                  </div>
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2">
                    <div className="px-2 py-0.5 text-[#62666B] flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-[#62666B]" />
                      <span>user.model.js (Mongoose Schema)</span>
                    </div>
                  </div>

                  <div className="font-semibold text-[#20242A] pt-1 flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-[#62666B]" />
                    <span>src/config/</span>
                  </div>
                  <div className="pl-4 border-l border-[#D9D8D3] ml-2">
                    <div className="px-2 py-0.5 text-[#62666B] flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-[#62666B]" />
                      <span>db.js (MongoDB) & supabase.js</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Node Inspector Card (6 cols) */}
          <div className="lg:col-span-6 p-6 bg-[#20242A] text-white border border-[#20242A]" style={{ borderRadius: '6px' }}>
            <div className="font-mono text-xs text-[#D9D8D3] uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>FILE ARCHITECTURE INSPECTOR</span>
              <span className="text-[#2457FF]">● VERIFIED</span>
            </div>
            <h4 className="text-xl font-bold font-mono text-white tracking-tight mt-2">
              {fileDetails[selectedNode]?.title}
            </h4>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#20242A] border border-[#D9D8D3]/30 font-mono text-xs text-emerald-400 font-medium" style={{ borderRadius: '3px' }}>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{fileDetails[selectedNode]?.role}</span>
            </div>
            <p className="mt-4 text-sm text-[#D9D8D3] font-sans leading-relaxed">
              {fileDetails[selectedNode]?.desc}
            </p>

            <div className="mt-8 pt-4 border-t border-[#D9D8D3]/20 flex items-center justify-between text-xs font-mono text-[#D9D8D3]">
              <span>Status: Active in Monorepo</span>
              <span className="text-[#2457FF]">Port :666 Linked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
