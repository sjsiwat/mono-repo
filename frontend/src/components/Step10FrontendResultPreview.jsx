import { useState } from 'react';
import { 
  Globe, 
  Server, 
  Database, 
  ShieldCheck, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Terminal, 
  Laptop, 
  ExternalLink,
  Layers,
  Code
} from 'lucide-react';

export function Step10FrontendResultPreview() {
  const [simulatedState, setSimulatedState] = useState('success'); // 'success' | 'loading' | 'error' | 'network'
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mockUsers = [
    {
      _id: "65f2a1b9e843c0012f9a7812",
      username: "alex_fullstack",
      email: "alex@jsdmono.dev",
      role: "admin",
      createdAt: "2026-03-08T10:15:30.000Z"
    },
    {
      _id: "65f2a24ce843c0012f9a7813",
      username: "sarah_backend",
      email: "sarah@jsdmono.dev",
      role: "user",
      createdAt: "2026-03-08T11:20:15.000Z"
    },
    {
      _id: "65f2a31fe843c0012f9a7814",
      username: "tony_stark",
      email: "tony@starkindustries.io",
      role: "user",
      createdAt: "2026-03-09T08:45:00.000Z"
    },
    {
      _id: "65f2a402e843c0012f9a7815",
      username: "natasha_sec",
      email: "natasha@shield.gov",
      role: "user",
      createdAt: "2026-03-09T14:10:22.000Z"
    }
  ];

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setSimulatedState('loading');
    setTimeout(() => {
      setIsRefreshing(false);
      setSimulatedState('success');
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9D8D3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-600">
              PART 03: LIVE BROWSER PREVIEW (ผลลัพธ์หน้าจอจริงของ Frontend)
            </span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-[#20242A]">
            จำลองหน้าจอ Frontend ที่รันคำขอครบวงจร (Step 01 - 10)
          </h4>
          <p className="text-xs text-[#62666B] mt-1 font-sans">
            ภาพจำลองเบราว์เซอร์จริงที่พอร์ต <strong className="text-[#20242A]">5173</strong> เมื่อ <code className="font-mono bg-[#EAE8E3] px-1 rounded text-[#2457FF]">UserDashboard.jsx</code> ยิงขอข้อมูลจาก Express Backend พอร์ต <strong className="text-[#20242A]">666</strong> และดึงจาก MongoDB Atlas
          </p>
        </div>

        {/* State Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EAE8E3] rounded-md shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSimulatedState('success')}
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all ${
              simulatedState === 'success'
                ? 'bg-white text-[#20242A] shadow-xs'
                : 'text-[#62666B] hover:text-[#20242A]'
            }`}
          >
            ✅ 200 OK (Loaded)
          </button>
          <button
            type="button"
            onClick={() => setSimulatedState('loading')}
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all ${
              simulatedState === 'loading'
                ? 'bg-white text-[#2457FF] shadow-xs'
                : 'text-[#62666B] hover:text-[#20242A]'
            }`}
          >
            ⏳ Loading State
          </button>
          <button
            type="button"
            onClick={() => setSimulatedState('error')}
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all ${
              simulatedState === 'error'
                ? 'bg-white text-[#FF6B35] shadow-xs'
                : 'text-[#62666B] hover:text-[#20242A]'
            }`}
          >
            ⚠️ Error State
          </button>
          <button
            type="button"
            onClick={() => setSimulatedState('network')}
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all ${
              simulatedState === 'network'
                ? 'bg-[#20242A] text-white shadow-xs'
                : 'text-[#62666B] hover:text-[#20242A]'
            }`}
          >
            🔍 DevTools Tab
          </button>
        </div>
      </div>

      {/* Cross-Port Architecture Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
        <div className="p-2.5 bg-white border border-[#D9D8D3] rounded flex items-center gap-2">
          <Laptop className="w-4 h-4 text-[#2457FF] shrink-0" />
          <div className="overflow-hidden">
            <div className="text-[10px] text-[#62666B] uppercase font-bold">Client Host</div>
            <div className="text-[#20242A] font-bold truncate">localhost:5173 (Vite)</div>
          </div>
        </div>

        <div className="p-2.5 bg-white border border-[#D9D8D3] rounded flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="overflow-hidden">
            <div className="text-[10px] text-[#62666B] uppercase font-bold">Backend API (Step 03, 08)</div>
            <div className="text-[#20242A] font-bold truncate">localhost:666 (Express)</div>
          </div>
        </div>

        <div className="p-2.5 bg-white border border-[#D9D8D3] rounded flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="overflow-hidden">
            <div className="text-[10px] text-[#62666B] uppercase font-bold">Database (Step 04, 05)</div>
            <div className="text-[#20242A] font-bold truncate">MongoDB Atlas Cluster</div>
          </div>
        </div>

        <div className="p-2.5 bg-white border border-[#D9D8D3] rounded flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
          <div className="overflow-hidden">
            <div className="text-[10px] text-[#62666B] uppercase font-bold">Security (Step 05, 06)</div>
            <div className="text-[#20242A] font-bold truncate">HttpOnly Cookie + select:false</div>
          </div>
        </div>
      </div>

      {/* Realistic Browser Window Frame */}
      <div 
        role="region" 
        aria-label="Realistic Browser Window Mockup" 
        className="border-2 border-[#20242A] rounded-lg overflow-hidden bg-white shadow-lg"
      >
        {/* macOS Browser Header */}
        <div className="bg-[#20242A] text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2D333B]">
          {/* Traffic Lights & Tabs */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block border border-[#1AAB29]" />
            </div>

            <div className="flex items-center gap-1.5 bg-[#2D333B] px-3 py-1 rounded-t-md text-xs font-mono text-neutral-200 border-t border-l border-r border-[#3E4651]">
              <Globe className="w-3.5 h-3.5 text-[#2457FF]" />
              <span className="truncate max-w-[180px]">JSD-MONO | Members</span>
            </div>
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-xl mx-auto w-full">
            <div className="bg-[#181B1F] border border-[#3E4651] rounded-md px-3 py-1 flex items-center justify-between text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-emerald-400 text-[11px]">🔒</span>
                <span className="text-neutral-400">http://</span>
                <span className="text-white font-bold">localhost:5173</span>
                <span className="text-neutral-400">/users</span>
              </div>
              <button 
                type="button"
                onClick={handleRefreshClick}
                title="Reload Page (จำลองการ Mount ใหม่)"
                className="text-neutral-400 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#2457FF]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Environment Status Pills */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[#2D333B] text-emerald-400 border border-emerald-500/30">
              ● Vite HMR
            </span>
            <span className="px-2 py-0.5 rounded bg-[#2D333B] text-[#2457FF] border border-[#2457FF]/30">
              API :666
            </span>
          </div>
        </div>

        {/* Viewport Content */}
        <div className="p-4 sm:p-6 bg-[#FBFBFA] min-h-[420px]">
          {/* SIMULATION 1: Success Loaded State */}
          {simulatedState === 'success' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* App Internal Banner */}
              <div className="bg-white p-4 rounded-lg border border-[#D9D8D3] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#2457FF] text-white rounded">
                      FRONTEND COMPONENT
                    </span>
                    <h5 className="font-bold text-base text-[#20242A]">
                      UserDashboard.jsx (Mounted via useEffect)
                    </h5>
                  </div>
                  <p className="text-xs text-[#62666B] mt-1 font-sans">
                    ดึงข้อมูลผ่าน <code className="font-mono text-[#2457FF]">userService.getAllUsers()</code> ข้ามพอร์ตไปยัง <code className="font-mono text-[#20242A]">http://localhost:666/api/v2/users</code>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    200 OK Live Connected
                  </span>
                  <button
                    type="button"
                    onClick={handleRefreshClick}
                    className="px-2.5 py-1 border border-[#D9D8D3] bg-white hover:bg-[#F6F5F1] rounded text-[#20242A] flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Re-fetch</span>
                  </button>
                </div>
              </div>

              {/* Stat Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
                <div className="p-3 bg-white border border-[#D9D8D3] rounded">
                  <div className="text-[11px] font-mono text-[#62666B]">จำนวนสมาชิกใน DB</div>
                  <div className="text-xl font-bold text-[#20242A] mt-0.5">{mockUsers.length} คน</div>
                  <div className="text-[10px] text-emerald-600 font-mono mt-0.5">MongoDB Collection</div>
                </div>

                <div className="p-3 bg-white border border-[#D9D8D3] rounded">
                  <div className="text-[11px] font-mono text-[#62666B]">สิทธิ์ Admin / User</div>
                  <div className="text-xl font-bold text-[#2457FF] mt-0.5">1 / 3 คน</div>
                  <div className="text-[10px] text-[#62666B] font-mono mt-0.5">Enum Validation (Step 05)</div>
                </div>

                <div className="p-3 bg-white border border-[#D9D8D3] rounded">
                  <div className="text-[11px] font-mono text-[#62666B]">ความปลอดภัยรหัสผ่าน</div>
                  <div className="text-xl font-bold text-emerald-600 mt-0.5">ปลอดภัย 100%</div>
                  <div className="text-[10px] text-[#62666B] font-mono mt-0.5">select: false (Step 05, 07)</div>
                </div>

                <div className="p-3 bg-white border border-[#D9D8D3] rounded">
                  <div className="text-[11px] font-mono text-[#62666B]">Latency เครือข่าย</div>
                  <div className="text-xl font-bold text-[#20242A] mt-0.5">~18 ms</div>
                  <div className="text-[10px] text-emerald-600 font-mono mt-0.5">CORS Preflight ผ่านฉลุย</div>
                </div>
              </div>

              {/* The User Cards Grid (Exact Component from Step 10!) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h6 className="font-bold text-sm text-[#20242A] flex items-center gap-2">
                    <span>รายชื่อสมาชิกจากฐานข้อมูล MongoDB ({mockUsers.length} คน)</span>
                    <span className="text-xs font-mono font-normal text-[#62666B]">
                      (Rendered via users.map)
                    </span>
                  </h6>
                  <span className="text-xs font-mono text-[#62666B]">
                    JSON Array ➔ UI Cards
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {mockUsers.map((user) => (
                    <div
                      key={user._id}
                      className="p-4 bg-white border border-[#D9D8D3] rounded-lg hover:border-[#2457FF] transition-all shadow-2xs hover:shadow-sm group relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-base text-[#20242A] group-hover:text-[#2457FF] transition-colors flex items-center gap-1.5">
                            {user.username}
                            {user.role === 'admin' && (
                              <span className="text-[10px] font-mono bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-300 font-semibold">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-xs text-[#62666B] mt-0.5">
                            {user.email}
                          </div>
                        </div>

                        <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          user.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                            : 'bg-blue-50 text-[#2457FF] border border-blue-200'
                        }`}>
                          {user.role}
                        </span>
                      </div>

                      {/* Technical Footnote on each card */}
                      <div className="mt-3 pt-3 border-t border-[#F0EFEA] flex items-center justify-between text-[11px] font-mono text-[#8C9094]">
                        <span className="truncate max-w-[170px]" title={user._id}>
                          ID: {user._id}
                        </span>
                        <span className="text-emerald-600 font-medium">
                          🔒 No Password Leaked
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SIMULATION 2: Loading State (Step 10 lines 747-754) */}
          {simulatedState === 'loading' && (
            <div className="py-16 text-center font-mono text-sm space-y-4 animate-in fade-in duration-200">
              <div className="inline-block p-4 bg-white rounded-full border border-[#D9D8D3] shadow-xs">
                <div className="animate-spin w-8 h-8 border-3 border-[#2457FF] border-t-transparent rounded-full mx-auto" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#20242A]">
                  กำลังเชื่อมต่อ API พอร์ต 666 เพื่อดึงข้อมูลจาก MongoDB...
                </p>
                <p className="text-xs text-[#62666B]">
                  [React State]: loading = true | setUsers([]) ยังคงเป็นค่าว่าง
                </p>
              </div>
              <div className="inline-block bg-[#EAE8E3] text-[#62666B] text-xs px-3 py-1.5 rounded font-mono">
                Code: if (loading) return &lt;LoadingSpinner /&gt;;
              </div>
            </div>
          )}

          {/* SIMULATION 3: Error State (Step 10 lines 757-772) */}
          {simulatedState === 'error' && (
            <div className="py-8 max-w-lg mx-auto space-y-4 animate-in fade-in duration-200">
              <div className="p-5 bg-[#FFF0EA] border border-[#FF6B35] rounded-lg font-sans text-sm space-y-3 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-[#FF6B35]">
                  <AlertCircle className="w-5 h-5" />
                  <span>เกิดข้อผิดพลาดในการโหลดข้อมูล:</span>
                </div>
                <p className="font-mono text-xs text-[#20242A] bg-white p-3 rounded border border-[#FF6B35]/30 leading-relaxed">
                  Failed to fetch: TypeError: NetworkError when attempting to fetch resource. (ตรวจสอบว่าเซิร์ฟเวอร์พอร์ต 666 เปิดอยู่หรือไม่ หรือติดปัญหา CORS)
                </p>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setSimulatedState('success')}
                    className="px-4 py-2 bg-[#FF6B35] text-white text-xs font-mono font-bold rounded hover:bg-[#E0531F] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>ลองใหม่อีกครั้ง (Retry)</span>
                  </button>
                  <span className="text-[11px] font-mono text-[#8C9094]">
                    Code: if (error) return &lt;ErrorAlert /&gt;;
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATION 4: DevTools Network Inspector */}
          {simulatedState === 'network' && (
            <div className="space-y-4 font-mono text-xs animate-in fade-in duration-200">
              <div className="bg-[#181B1F] text-neutral-200 p-4 rounded-lg border border-[#2D333B] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2D333B] text-neutral-400">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#2457FF]" />
                    Chrome DevTools / Network Tab
                  </span>
                  <span className="text-emerald-400 font-bold">Status: 200 OK</span>
                </div>

                <div className="space-y-1 text-[11px] text-neutral-300">
                  <div><strong className="text-neutral-400">Request URL:</strong> http://localhost:666/api/v2/users</div>
                  <div><strong className="text-neutral-400">Request Method:</strong> GET</div>
                  <div><strong className="text-neutral-400">Credentials:</strong> include (HttpOnly Cookie accessToken sent automatically)</div>
                  <div><strong className="text-neutral-400">Access-Control-Allow-Origin:</strong> http://localhost:5173</div>
                  <div><strong className="text-neutral-400">Access-Control-Allow-Credentials:</strong> true</div>
                </div>

                <div className="pt-2 border-t border-[#2D333B]">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5">
                    Response Payload (MongoDB JSON):
                  </div>
                  <pre className="bg-[#0D1117] p-3 rounded text-[11px] text-emerald-400 overflow-x-auto leading-relaxed border border-[#252A32]">
{JSON.stringify(mockUsers, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Browser Status Footer */}
        <div className="bg-[#F0EFEA] px-4 py-2.5 border-t border-[#D9D8D3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#62666B]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Connection: Full Duplex HTTP/1.1</span>
            <span className="text-[#D9D8D3]">|</span>
            <span>Origin: http://localhost:5173 ➔ Target: http://localhost:666</span>
          </div>

          <div className="text-[#20242A] font-semibold">
            ✨ ครบวงจร: Node.js + Express + MongoDB Atlas + React Hooks
          </div>
        </div>
      </div>

      {/* 5-Point Blueprint Traceability Grid (เชื่อมโยงทุกจุดเข้ากับ Step 01-10) */}
      <div className="bg-white p-4 sm:p-5 border border-[#D9D8D3] rounded-lg space-y-3">
        <h5 className="font-bold text-sm text-[#20242A] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#2457FF]" />
          <span>แผนผังตรวจสอบรายละเอียด: ภาพหน้านี้สะท้อนโค้ดจาก Step ไหนบ้าง? (ห้ามมั่ว)</span>
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-[#2457FF]">1. พอร์ต 5173 & พอร์ต 666</div>
            <p className="text-[#62666B]">
              เกิดจากการรัน Frontend Vite (พอร์ต 5173) ยิงข้ามไปยัง <strong className="text-[#20242A]">PORT=666</strong> ใน <code className="font-mono">.env</code> (Step 03) และเปิดรับใน <code className="font-mono">server.js</code> (Step 08)
            </p>
          </div>

          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-emerald-600">2. โครงสร้างข้อมูล User Cards</div>
            <p className="text-[#62666B]">
              มีฟิลด์ <code className="font-mono">username</code>, <code className="font-mono">email</code>, <code className="font-mono">role</code> ตามที่กำหนดไว้ใน Mongoose Schema ของ <code className="font-mono">user.model.js</code> (Step 05)
            </p>
          </div>

          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-purple-600">3. รหัสผ่านถูกซ่อน ไม่หลุดมาหน้าเว็บ</div>
            <p className="text-[#62666B]">
              การ์ดสมาชิกไม่มี password หรือ hash โผล่ออกมา เพราะถูกล็อกด้วยคำสั่ง <code className="font-mono">select: false</code> (Step 05) และคัดกรองใน Controller (Step 07)
            </p>
          </div>

          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-amber-600">4. HttpOnly Cookie & CORS</div>
            <p className="text-[#62666B]">
              คำขอส่งผ่านได้โดยไม่ติดบล็อก เพราะเซิร์ฟเวอร์เปิด <code className="font-mono">cors({'{'} credentials: true {'}'})</code> ใน Step 08 และฝั่ง Client แนบ <code className="font-mono">credentials: 'include'</code> ใน Step 10
            </p>
          </div>

          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-indigo-600">5. การสลับ 3 หน้าจอ (State Flow)</div>
            <p className="text-[#62666B]">
              การหมุนโหลด, การแสดง Error และการวาดการ์ด ถูกควบคุมโดย <code className="font-mono">useState</code> และ <code className="font-mono">useEffect([], ...)</code> ตาม Component ใน Step 10 ทุกประการ
            </p>
          </div>

          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-rose-600">6. MongoDB _id ประจำตัว</div>
            <p className="text-[#62666B]">
              ค่า ID แต่ละตัว (เช่น <code className="font-mono">65f2a1b9...</code>) เป็น 24-character hex ObjectId ที่สร้างโดย Mongoose อัตโนมัติเมื่อสั่ง <code className="font-mono">User.create()</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
