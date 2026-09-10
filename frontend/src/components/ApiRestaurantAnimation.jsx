import { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Utensils, 
  ChefHat, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Database, 
  Sparkles
} from 'lucide-react';

export function ApiRestaurantAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2, 3
  const [scenario, setScenario] = useState('success'); // 'success', 'not_found', 'bad_request'
  const [speed, setSpeed] = useState(1); // 1x, 1.5x, 0.7x
  const timerRef = useRef(null);

  // Scenarios configuration
  const SCENARIOS = {
    success: {
      title: '200 OK: สั่งอาหารสำเร็จ (Happy Path)',
      badge: 'HTTP 200 OK',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      requestData: {
        method: 'POST',
        endpoint: '/api/v1/orders',
        payload: { item: 'กะเพราเนื้อไข่ดาว', spiceLevel: 'จัดจ้าน' }
      },
      responseData: {
        status: 200,
        message: 'Order Completed & Served',
        data: { dish: 'กะเพราเนื้อไข่ดาว', temp: 'ร้อนๆ สดจากเตา', orderId: 'ORD-889' }
      },
      steps: [
        {
          stage: '1. CLIENT (ผู้บริโภค / หน้าบ้าน)',
          title: 'ลูกค้าเปิดดูเมนู (API Contract) แล้วยิง Request',
          desc: 'ลูกค้าเลือกอาหารตามข้อกำหนดในเมนู (URL + Method) แล้วเรียกบริกรเพื่อส่ง Order Ticket',
          packetLabel: 'HTTP Request (POST /orders)',
          highlightActor: 'client'
        },
        {
          stage: '2. API WAITER (บริกร / เซิร์ฟเวอร์ API)',
          title: 'บริกรตรวจสอบออเดอร์แล้วเดินไปสั่งครัว',
          desc: 'Express Server ตรวจสอบ Body และความปลอดภัย (Validation) ก่อนส่งต่อข้อมูลไปยังครัว',
          packetLabel: 'Forward to Kitchen (Query)',
          highlightActor: 'waiter'
        },
        {
          stage: '3. KITCHEN / DB (พ่อครัว & ฐานข้อมูล)',
          title: 'พ่อครัวดึงวัตถุดิบและปรุงอาหาร (Database Query)',
          desc: 'ฐานข้อมูลค้นหาและบันทึกข้อมูล พ่อครัวทำอาหารเสร็จและจัดใส่จานพร้อมเสิร์ฟ',
          packetLabel: 'Cooking / Processing Data',
          highlightActor: 'kitchen'
        },
        {
          stage: '4. RESPONSE DELIVERED (ส่งมอบคำตอบ)',
          title: 'บริกรนำจานอาหาร (JSON Response) มาเสิร์ฟที่โต๊ะ',
          desc: 'API ส่ง Response รหัส 200 OK พร้อมข้อมูลอาหารกลับมาให้ผู้ใช้ที่โต๊ะทานได้ทันที',
          packetLabel: 'HTTP 200 OK Response (JSON)',
          highlightActor: 'client'
        }
      ]
    },
    bad_request: {
      title: '400 Bad Request: ลูกค้าลืมระบุข้อมูลสำคัญ',
      badge: 'HTTP 400 Bad Request',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      requestData: {
        method: 'POST',
        endpoint: '/api/v1/orders',
        payload: { item: '' } // Missing item
      },
      responseData: {
        status: 400,
        error: 'Bad Request',
        message: 'กรุณาระบุชื่ออาหารที่ต้องการสั่ง'
      },
      steps: [
        {
          stage: '1. CLIENT (ผู้บริโภค / หน้าบ้าน)',
          title: 'ลูกค้ายื่นออเดอร์ที่ว่างเปล่า (Invalid Body)',
          desc: 'ผู้ใช้กดสั่งโดยไม่ได้เลือกเมนู หรือลืมกรอกข้อมูลที่จำเป็นตาม API Contract',
          packetLabel: 'Invalid Request { item: "" }',
          highlightActor: 'client'
        },
        {
          stage: '2. API WAITER (บริกร / Validation Guard)',
          title: 'บริกรตรวจพบข้อผิดพลาดทันที ไม่ต้องรบกวนครัว!',
          desc: 'Controller เช็ค if (!item) พบว่าข้อมูลไม่ครบ จึงตัดบทส่ง 400 กลับทันทีเพื่อประหยัดทรัพยากรห้องครัว',
          packetLabel: 'Validation Failed (Stop at Waiter)',
          highlightActor: 'waiter'
        },
        {
          stage: '3. QUICK RESPONSE (ตอบกลับทันที)',
          title: 'บริกรแจ้งลูกค้าว่าข้อมูลไม่ถูกต้อง (400 Bad Request)',
          desc: 'ไม่ต้องเดินไปหาพ่อครัวที่ห้องครัว บริกรเดินกลับมาแจ้งลูกค้าที่โต๊ะให้กรอกข้อมูลใหม่',
          packetLabel: 'HTTP 400: ข้อมูลไม่ครบถ้วน',
          highlightActor: 'client'
        },
        {
          stage: '4. CLIENT RECTIFIES (ลูกค้ารับทราบ)',
          title: 'หน้าบ้านแสดงข้อความแจ้งเตือนสีแดงให้ผู้ใช้กรอกใหม่',
          desc: 'ระบบทำงานปลอดภัย เซิร์ฟเวอร์ไม่แฮงก์ และฐานข้อมูลไม่ถูกกระทบกระเทือน',
          packetLabel: 'UI Display Alert Message',
          highlightActor: 'client'
        }
      ]
    },
    not_found: {
      title: '404 Not Found: เมนูนี้ไม่มีในครัวหรือของหมด',
      badge: 'HTTP 404 Not Found',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      requestData: {
        method: 'GET',
        endpoint: '/api/v1/orders/9999',
        payload: null
      },
      responseData: {
        status: 404,
        error: 'Not Found',
        message: 'ไม่พบรายการออเดอร์หมายเลข 9999 ในฐานข้อมูล'
      },
      steps: [
        {
          stage: '1. CLIENT (ผู้บริโภค / หน้าบ้าน)',
          title: 'ลูกค้าถามหาออเดอร์หมายเลข 9999 (GET /orders/9999)',
          desc: 'ยิงคำขอตามหาข้อมูลที่ไม่เคยมีอยู่ หรือถูกลบไปแล้ว',
          packetLabel: 'GET /orders/9999',
          highlightActor: 'client'
        },
        {
          stage: '2. API WAITER (บริกร / เซิร์ฟเวอร์)',
          title: 'บริกรเดินไปเปิดสมุดออเดอร์ที่ห้องครัว',
          desc: 'API ส่งคำสั่ง Query ไปยัง Database เพื่อค้นหาเอกสารที่มี ID ตรงกัน',
          packetLabel: 'Query DB for ID: 9999',
          highlightActor: 'waiter'
        },
        {
          stage: '3. KITCHEN / DB (ห้องครัว & สต็อก)',
          title: 'พ่อครัวค้นหาในตู้แช่แล้วไม่พบ (null)',
          desc: 'Mongoose คืนค่า null กลับมาให้ Controller เพื่อบอกว่าไม่มีข้อมูล',
          packetLabel: 'Document Not Found (null)',
          highlightActor: 'kitchen'
        },
        {
          stage: '4. RESPONSE 404 (ตอบกลับว่าไม่พบ)',
          title: 'บริกรแจ้งลูกค้าว่า "ไม่พบรายการนี้ (404)"',
          desc: 'ส่ง Response รหัส 404 Not Found กลับไปแจ้งหน้าบ้านอย่างชัดเจน',
          packetLabel: 'HTTP 404 Not Found',
          highlightActor: 'client'
        }
      ]
    }
  };

  const activeScenario = SCENARIOS[scenario];
  const stepCount = activeScenario.steps.length;
  const currentStepData = activeScenario.steps[currentStep];

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 3000 / speed;
    timerRef.current = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % stepCount);
    }, intervalTime);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, stepCount, scenario]);

  const handleScenarioChange = (newScen) => {
    setScenario(newScen);
    setCurrentStep(0);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#1A1D23] border border-[#2D3139] text-[#F6F5F1] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden" style={{ borderRadius: '8px' }}>
      {/* Background Subtle Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2D3139]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2457FF] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#4C7DFF] font-bold">
              INTERACTIVE ARCHITECTURE SIMULATOR
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <span>How API Works — The Restaurant Analogy</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#9A9E9F] font-sans mt-1">
            จำลองกลไกการสื่อสารจริงระหว่าง Client (ลูกค้า), API Contract (เมนู), API Server (บริกร) และ Database (ห้องครัว)
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#121418] border border-[#2D3139] rounded-md shrink-0 self-start md:self-auto font-mono text-xs">
          <button
            type="button"
            onClick={() => handleScenarioChange('success')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-medium ${
              scenario === 'success' 
                ? 'bg-[#2457FF] text-white shadow-sm font-semibold' 
                : 'text-[#9A9E9F] hover:text-white'
            }`}
          >
            200 OK (สำเร็จ)
          </button>
          <button
            type="button"
            onClick={() => handleScenarioChange('bad_request')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-medium ${
              scenario === 'bad_request' 
                ? 'bg-[#FF6B35] text-white shadow-sm font-semibold' 
                : 'text-[#9A9E9F] hover:text-white'
            }`}
          >
            400 Bad Request
          </button>
          <button
            type="button"
            onClick={() => handleScenarioChange('not_found')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-medium ${
              scenario === 'not_found' 
                ? 'bg-rose-600 text-white shadow-sm font-semibold' 
                : 'text-[#9A9E9F] hover:text-white'
            }`}
          >
            404 Not Found
          </button>
        </div>
      </div>

      {/* Main Animated Stage Area */}
      <div className="relative z-10 bg-[#121418] border border-[#2D3139] rounded-lg p-6 sm:p-10 overflow-hidden">
        {/* Scenario Status Banner */}
        <div className="flex items-center justify-between gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-xs font-mono font-bold border rounded ${activeScenario.badgeColor}`}>
              {activeScenario.badge}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#D9D8D3] font-sans">
              {activeScenario.title}
            </span>
          </div>

          <div className="font-mono text-xs text-[#9A9E9F] hidden sm:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#4C7DFF]" />
            <span>PHASE {currentStep + 1} / {stepCount}</span>
          </div>
        </div>

        {/* The 3 Core Pillars Stage (Customer ⇄ Waiter ⇄ Kitchen) + Floating Menu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-center">
          
          {/* ============================================================== */}
          {/* ACTOR 1: CLIENT / CONSUMER */}
          {/* ============================================================== */}
          <div className={`p-5 rounded-lg border transition-all duration-300 relative flex flex-col items-center text-center ${
            currentStepData.highlightActor === 'client'
              ? 'bg-[#1E232E] border-[#2457FF] shadow-[0_0_20px_rgba(36,87,255,0.25)]'
              : 'bg-[#15181E] border-[#2D3139] opacity-80'
          }`}>
            {/* Status Ping */}
            {currentStepData.highlightActor === 'client' && (
              <span className="absolute -top-2 px-2 py-0.5 bg-[#2457FF] text-white font-mono text-[10px] font-bold uppercase rounded-full shadow-sm">
                ACTIVE RECOVERY / REQ
              </span>
            )}

            <div className="w-16 h-16 rounded-full bg-[#20242A] border-2 border-[#2457FF] flex items-center justify-center mb-3 shadow-inner">
              <User className="w-8 h-8 text-[#4C7DFF]" />
            </div>

            <h4 className="font-bold text-base text-white">
              You / Consumer
            </h4>
            <span className="font-mono text-xs text-[#4C7DFF] font-semibold mt-0.5">
              Client / Frontend (React :5173)
            </span>
            <p className="text-xs text-[#9A9E9F] font-sans mt-2 leading-relaxed">
              ลูกค้านั่งที่โต๊ะ ส่งคำขอผ่านเบราว์เซอร์หรือมือถือ
            </p>

            {/* Micro Badge for Order Ticket */}
            <div className="mt-3 w-full p-2 bg-[#121418] border border-[#2D3139] rounded font-mono text-[11px] text-left text-[#D9D8D3]">
              <span className="text-[#62666B] block text-[9px] uppercase">Client Action:</span>
              <span className="text-[#2457FF] font-bold">{activeScenario.requestData.method}</span> {activeScenario.requestData.endpoint}
            </div>
          </div>

          {/* ============================================================== */}
          {/* ACTOR 2: THE WAITER (API INTERMEDIARY) */}
          {/* ============================================================== */}
          <div className={`p-5 rounded-lg border transition-all duration-300 relative flex flex-col items-center text-center ${
            currentStepData.highlightActor === 'waiter'
              ? 'bg-[#25221F] border-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.25)]'
              : 'bg-[#15181E] border-[#2D3139] opacity-80'
          }`}>
            {/* Status Ping */}
            {currentStepData.highlightActor === 'waiter' && (
              <span className="absolute -top-2 px-2 py-0.5 bg-[#FF6B35] text-white font-mono text-[10px] font-bold uppercase rounded-full shadow-sm">
                PROCESSING PIPELINE
              </span>
            )}

            <div className="w-16 h-16 rounded-full bg-[#20242A] border-2 border-[#FF6B35] flex items-center justify-center mb-3 shadow-inner">
              <Utensils className="w-8 h-8 text-[#FF6B35]" />
            </div>

            <h4 className="font-bold text-base text-white">
              The Waiter (บริกร)
            </h4>
            <span className="font-mono text-xs text-[#FF6B35] font-semibold mt-0.5">
              API Server (Express :666)
            </span>
            <p className="text-xs text-[#9A9E9F] font-sans mt-2 leading-relaxed">
              ตัวกลางสื่อสาร รับคำขอ ตรวจบัตร/สิทธิ์ ส่งครัว และนำผลลัพธ์กลับมา
            </p>

            {/* Menu reference badge attached to Waiter */}
            <div className="mt-3 w-full p-2 bg-[#1A1816] border border-[#FF6B35]/40 rounded font-mono text-[11px] text-[#D9D8D3] flex items-center gap-1.5 justify-center">
              <BookOpen className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="text-[10px] font-sans font-medium text-amber-300">
                Menu (API Contract Specification)
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* ACTOR 3: KITCHEN / CHEF (PERSISTENCE & LOGIC) */}
          {/* ============================================================== */}
          <div className={`p-5 rounded-lg border transition-all duration-300 relative flex flex-col items-center text-center ${
            currentStepData.highlightActor === 'kitchen'
              ? 'bg-[#1A2520] border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
              : 'bg-[#15181E] border-[#2D3139] opacity-80'
          }`}>
            {/* Status Ping */}
            {currentStepData.highlightActor === 'kitchen' && (
              <span className="absolute -top-2 px-2 py-0.5 bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase rounded-full shadow-sm">
                DATABASE PERSISTENCE
              </span>
            )}

            <div className="w-16 h-16 rounded-full bg-[#20242A] border-2 border-emerald-500 flex items-center justify-center mb-3 shadow-inner">
              <ChefHat className="w-8 h-8 text-emerald-400" />
            </div>

            <h4 className="font-bold text-base text-white">
              Kitchen & Chef (ห้องครัว)
            </h4>
            <span className="font-mono text-xs text-emerald-400 font-semibold mt-0.5">
              Database (MongoDB / Disk Store)
            </span>
            <p className="text-xs text-[#9A9E9F] font-sans mt-2 leading-relaxed">
              แหล่งจัดเก็บและปรุงข้อมูล ไม่เปิดให้ลูกค้าเดินเข้ามาคุยตรงๆ
            </p>

            {/* Storage Box */}
            <div className="mt-3 w-full p-2 bg-[#121418] border border-[#2D3139] rounded font-mono text-[11px] text-left text-[#D9D8D3] flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[10px] text-emerald-300 truncate">
                mongodb://localhost:27017/users
              </span>
            </div>
          </div>

        </div>

        {/* Step Explanation & Live Traveling Packet Bar */}
        <div className="mt-8 p-4 bg-[#181B22] border border-[#2D3139] rounded-md space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold text-[#4C7DFF] uppercase tracking-wider">
              {currentStepData.stage}
            </span>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#20242A] text-amber-300 border border-[#2D3139] flex items-center gap-1.5 self-start sm:self-auto">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
              <span>Packet: {currentStepData.packetLabel}</span>
            </span>
          </div>

          <h5 className="text-base sm:text-lg font-bold text-white font-sans leading-snug">
            {currentStepData.title}
          </h5>
          <p className="text-xs sm:text-sm text-[#9A9E9F] font-sans leading-relaxed">
            {currentStepData.desc}
          </p>

          {/* Real-time Code Payload Inspector */}
          <div className="mt-3 pt-3 border-t border-[#2D3139] grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-[#121418] p-3 rounded border border-[#2D3139] space-y-1">
              <div className="text-[10px] uppercase text-[#62666B] font-bold">1. Request Payload (Input)</div>
              <div className="text-blue-400 font-bold">{activeScenario.requestData.method} {activeScenario.requestData.endpoint}</div>
              <pre className="text-[#D9D8D3] text-[11px] overflow-x-auto">
                {JSON.stringify(activeScenario.requestData.payload || {}, null, 2)}
              </pre>
            </div>

            <div className="bg-[#121418] p-3 rounded border border-[#2D3139] space-y-1">
              <div className="text-[10px] uppercase text-[#62666B] font-bold">2. Response Payload (Output)</div>
              <div className={activeScenario.responseData.status === 200 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                STATUS: {activeScenario.responseData.status}
              </div>
              <pre className="text-[#D9D8D3] text-[11px] overflow-x-auto">
                {JSON.stringify(activeScenario.responseData, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="mt-6 flex items-center justify-between gap-1 sm:gap-2">
          {activeScenario.steps.map((st, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentStep(i)}
              className={`flex-1 py-2 px-1 text-center font-mono text-xs border rounded transition-all cursor-pointer ${
                i === currentStep
                  ? 'bg-[#2457FF] border-[#2457FF] text-white font-bold shadow-md'
                  : i < currentStep
                  ? 'bg-[#1E232E] border-[#4C7DFF]/50 text-[#D9D8D3]'
                  : 'bg-[#15181E] border-[#2D3139] text-[#62666B] hover:border-[#62666B]'
              }`}
            >
              <div className="hidden sm:inline">STEP 0{i + 1}</div>
              <div className="sm:hidden">0{i + 1}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Playback Controls & Speed Toggle */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-[#FFFFFF] text-[#121418] hover:bg-[#F6F5F1] font-mono text-xs font-bold rounded flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE ANIMATION' : 'PLAY ANIMATION'}</span>
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="p-2 bg-[#20242A] border border-[#2D3139] text-[#D9D8D3] hover:text-white rounded hover:border-[#4C7DFF] transition-all cursor-pointer"
            title="รีสตาร์ทอนิเมชั่น"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#9A9E9F]">
          <span>SPEED:</span>
          {[0.5, 1, 1.5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded border cursor-pointer transition-colors ${
                speed === s
                  ? 'bg-[#2457FF] text-white border-[#2457FF] font-bold'
                  : 'bg-[#15181E] text-[#9A9E9F] border-[#2D3139] hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Summary Pedagogical Card */}
      <div className="relative z-10 p-5 bg-[#14161B] border border-[#2D3139] rounded text-xs leading-relaxed space-y-2 font-sans text-[#9A9E9F]">
        <div className="flex items-center gap-2 text-white font-bold font-mono">
          <Sparkles className="w-4 h-4 text-[#FF6B35]" />
          <span>ทำไมสถาปัตยกรรมนี้ถึงทรงพลังและปลอดภัย?</span>
        </div>
        <p>
          <strong className="text-white">1. ลูกค้าเข้าครัวเองไม่ได้:</strong> หน้าบ้าน (React) ไม่สามารถต่อเชื่อมตรงกับ Database ได้ เพราะหากทำเช่นนั้น รหัสผ่านฐานข้อมูลจะรั่วไหลผ่านเบราว์เซอร์ทันที
        </p>
        <p>
          <strong className="text-white">2. บริกรคัดกรองความปลอดภัย:</strong> API จะตรวจสอบสิทธิ์ (JWT, Auth Middleware, Sanitize Input) ก่อนส่งคำสั่งถึง Database เสมอ
        </p>
        <p>
          <strong className="text-white">3. ความเป็นอิสระ (Decoupling):</strong> ครัวจะเปลี่ยนเตาเป็นแก๊สหรือไฟฟ้า (เปลี่ยนจาก MongoDB ไปเป็น PostgreSQL) หน้าบ้านก็ยังคงสั่งผ่านเมนูเดิมได้โดยไม่ต้องแก้โค้ดหน้าบ้านใหม่
        </p>
      </div>
    </div>
  );
}
