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
  Layers
} from 'lucide-react';

export function Step10FrontendResultPreview() {
  const [simulatedState, setSimulatedState] = useState('success'); // 'success' | 'loading' | 'error' | 'network'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ข้อมูลจริง 100% ที่ตรงกับโค้ด Step 01 ถึง Step 10:
  // - 'siwat', 'johny', 'bobby' มาจาก fakeDB/users.js (Step 01, 02) ที่บันทึกเข้าสู่ MongoDB
  // - 'demo_user' (user@example.com) มาจาก Endpoint สมัครสมาชิกใน Step 09 (users-api-test.rest)
  // - ไม่มี password/passwordHash เพราะติด select: false ใน User Model (Step 05)
  const mockUsers = [
    {
      _id: "67c1234567890abcdef10001",
      username: "siwat",
      email: "siwat@human.com",
      role: "admin"
    },
    {
      _id: "67c1234567890abcdef10002",
      username: "johny",
      email: "johny@cat.com",
      role: "user"
    },
    {
      _id: "67c1234567890abcdef10003",
      username: "bobby",
      email: "bobby@cat.com",
      role: "user"
    },
    {
      _id: "67c1234567890abcdef10004",
      username: "demo_user",
      email: "user@example.com",
      role: "user"
    }
  ];

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setSimulatedState('loading');
    setTimeout(() => {
      setIsRefreshing(false);
      setSimulatedState('success');
    }, 600);
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
            ภาพจำลองผลลัพธ์บนเบราว์เซอร์ที่พอร์ต <strong className="text-[#20242A]">5173</strong> เมื่อเรนเดอร์ Component ตามโค้ดใน Step 10
          </p>
        </div>

        {/* State Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EAE8E3] rounded-md shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSimulatedState('success')}
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all cursor-pointer ${
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
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all cursor-pointer ${
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
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all cursor-pointer ${
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
            className={`px-2.5 py-1 text-xs font-mono rounded font-medium transition-all cursor-pointer ${
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
            <div className="text-[#20242A] font-bold truncate">MongoDB Atlas</div>
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

      {/* Component Context Banner (อยู่นอกหน้าเว็บตัวอย่างอย่างชัดเจน) */}
      <div className="bg-[#FBFBFA] p-4 rounded-lg border border-[#D9D8D3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#2457FF] text-white rounded">
              FRONTEND COMPONENT
            </span>
            <h5 className="font-bold text-sm sm:text-base text-[#20242A]">
              UserDashboard.jsx (Mounted via useEffect)
            </h5>
          </div>
          <p className="text-xs text-[#62666B] mt-1 font-sans">
            ดึงข้อมูลผ่าน <code className="font-mono text-[#2457FF] bg-[#EAE8E3] px-1 py-0.5 rounded">userService.getAllUsers()</code> ข้ามพอร์ตไปยัง <code className="font-mono text-[#20242A] bg-[#EAE8E3] px-1 py-0.5 rounded">http://localhost:666/api/v2/users</code>
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
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#2457FF]' : ''}`} />
            <span>Re-fetch</span>
          </button>
        </div>
      </div>

      {/* Realistic Browser Window Frame */}
      <div 
        role="region" 
        aria-label="Realistic Browser Window Mockup" 
        className="border-2 border-[#20242A] rounded-lg overflow-hidden bg-white shadow-lg"
      >
        {/* macOS Browser Chrome Header */}
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

        {/* Viewport Content: ผลลัพธ์หน้าจอจริงตรงตามโค้ด Step 10 ทุกตัวอักษร */}
        <div className="bg-white min-h-[340px]">
          {/* SIMULATION 1: Success Loaded State (ตรงตามโค้ด return ของ UserDashboard.jsx ใน Step 10 แบบ 100%) */}
          {simulatedState === 'success' && (
            <div className="p-6">
              <div className="space-y-4 font-sans">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
                  <h4 className="font-bold text-lg text-[#20242A]">
                    รายชื่อสมาชิกจากฐานข้อมูล MongoDB ({mockUsers.length} คน)
                  </h4>
                  <span className="font-mono text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    ● 200 OK Live Connected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mockUsers.map((user) => (
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
            </div>
          )}

          {/* SIMULATION 2: Loading State (ตรงตาม if (loading) ในโค้ด Step 10) */}
          {simulatedState === 'loading' && (
            <div className="p-16 text-center font-mono text-sm text-[#62666B]">
              <div className="animate-spin w-6 h-6 border-2 border-[#2457FF] border-t-transparent rounded-full mx-auto mb-2" />
              <p>กำลังเชื่อมต่อ API พอร์ต 666 เพื่อดึงข้อมูลจาก MongoDB...</p>
            </div>
          )}

          {/* SIMULATION 3: Error State (ตรงตาม if (error) ในโค้ด Step 10) */}
          {simulatedState === 'error' && (
            <div className="p-8 max-w-xl mx-auto">
              <div className="p-5 bg-[#FFF0EA] border border-[#FF6B35] rounded font-sans text-sm space-y-3">
                <div className="font-bold text-[#FF6B35]">เกิดข้อผิดพลาดในการโหลดข้อมูล:</div>
                <p className="font-mono text-xs text-[#20242A] bg-white p-2.5 rounded border border-[#FF6B35]/30">
                  Failed to fetch: TypeError: NetworkError when attempting to fetch resource. (ตรวจสอบว่าเซิร์ฟเวอร์พอร์ต 666 เปิดอยู่หรือไม่ หรือติดปัญหา CORS)
                </p>
                <button
                  type="button"
                  onClick={() => setSimulatedState('success')}
                  className="px-3 py-1.5 bg-[#FF6B35] text-white text-xs font-mono rounded hover:bg-[#E0531F] cursor-pointer"
                >
                  ลองใหม่อีกครั้ง (Retry)
                </button>
              </div>
            </div>
          )}

          {/* SIMULATION 4: DevTools Network Tab */}
          {simulatedState === 'network' && (
            <div className="p-6 font-mono text-xs bg-[#181B1F] text-neutral-200 min-h-[340px] space-y-3">
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
                <div><strong className="text-neutral-400">Credentials:</strong> include (HttpOnly Cookie accessToken แนบอัตโนมัติ)</div>
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
          )}
        </div>
      </div>

      {/* Network & Full-Cycle Connection Note (อยู่นอกหน้าจอเว็บ ไม่ปะปนกับผลลัพธ์ของนักเรียน) */}
      <div className="bg-[#F6F5F1] px-4 py-2.5 border border-[#D9D8D3] rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#62666B]">
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

      {/* 5-Point Blueprint Traceability Grid (อ้างอิงข้อมูลจริงจาก Step 01-10) */}
      <div className="bg-white p-4 sm:p-5 border border-[#D9D8D3] rounded-lg space-y-3 font-sans">
        <h5 className="font-bold text-sm text-[#20242A] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#2457FF]" />
          <span>แผนผังความสอดคล้องทางเทคนิค: ความเชื่อมโยงระหว่างหน้าเว็บตัวอย่างกับโค้ด Step 01 – 10</span>
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-[#2457FF]">1. ที่มาของข้อมูลสมาชิก 4 คน</div>
            <p className="text-[#62666B]">
              <strong className="text-[#20242A]">siwat, johny, bobby</strong> มาจากชุดข้อมูลตั้งต้นใน <code className="font-mono">fakeDB/users.js</code> (Step 01, 02) และ <strong className="text-[#20242A]">demo_user</strong> มาจากขั้นตอนการทดสอบสมัครสมาชิกผ่าน <code className="font-mono">POST /api/v2/users/register</code> ใน <code className="font-mono">users-api-test.rest</code> (Step 09)
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
              การ์ดสมาชิกไม่มี password หรือ hash โผล่ออกมา เพราะถูกล็อกด้วยคำสั่ง <code className="font-mono">select: false</code> ใน Mongoose Model (Step 05) และคัดกรองใน Controller (Step 07)
            </p>
          </div>

          <div className="p-3 bg-[#FBFBFA] border border-[#EAE8E3] rounded space-y-1">
            <div className="font-mono font-bold text-amber-600">4. HttpOnly Cookie & CORS ข้ามพอร์ต</div>
            <p className="text-[#62666B]">
              คำขอยิงจากพอร์ต 5173 ไปยังพอร์ต 666 ได้โดยไม่ติดบล็อก เพราะเซิร์ฟเวอร์เปิด <code className="font-mono">cors({'{'} credentials: true {'}'})</code> ใน Step 08 และฝั่ง Client แนบ <code className="font-mono">credentials: 'include'</code> ใน Step 10
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
              ค่า ID แต่ละตัว (เช่น <code className="font-mono">67c12345...</code>) เป็น 24-character hex ObjectId ที่สร้างโดย Mongoose อัตโนมัติเมื่อสั่ง <code className="font-mono">User.create()</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
