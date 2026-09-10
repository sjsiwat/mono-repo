import { useState } from 'react';
import { Lightbulb, Coffee, CreditCard, Car, Sparkles, Target, ChevronDown, ChevronsUpDown } from 'lucide-react';

export function FunctionAnatomySection() {
  const [openFunctions, setOpenFunctions] = useState(new Set([0]));

  const toggleFunction = (idx) => {
    setOpenFunctions(prev => {
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
    setOpenFunctions(new Set(functionExamples.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenFunctions(new Set());
  };
  const functionExamples = [
    {
      name: "app.listen(port, callback)",
      category: "Express Core",
      purpose: "สั่งให้เซิร์ฟเวอร์เปิดประตูดักฟังการเชื่อมต่อบนหมายเลขพอร์ตที่กำหนด",
      parameters: [
        { name: "port", type: "Number", desc: "หมายเลขพอร์ต เช่น 666 หรือ 5000" },
        { name: "callback", type: "Function", desc: "ฟังก์ชันที่จะถูกเรียกทำงานเมื่อเซิร์ฟเวอร์สตาร์ทสำเร็จ เช่น () => console.log(...)" }
      ],
      defDiagram: `// 1. Definition: ประกาศชื่อพารามิเตอร์รอรับค่า
app.listen(port, callback)
           ▲     ▲
           │     └─ Parameter 2: callback (ฟังก์ชันทำงานเมื่อเปิดพอร์ตสำเร็จ)
           └─────── Parameter 1: port (ตัวแปรรับเลขพอร์ต)`,
      callDiagram: `// 2. Invocation: ส่งอาร์กิวเมนต์ค่าจริงเข้าไปสั่งรัน
app.listen(666, () => { console.log('Ready'); });
           ▲    ▲
           │    └─ Argument 2: ฟังก์ชัน Callback จริง
           └────── Argument 1: ตัวเลขจริง 666`,
      argumentExplanation: "Argument 1 คือเลข 666 และ Argument 2 คือ Arrow Function ที่ส่งไปให้ทำงานเมื่อบูตสำเร็จ"
    },
    {
      name: "mongoose.connect(uri)",
      category: "Database (Mongoose)",
      purpose: "เปิดท่อเชื่อมต่อ Network Socket ไปยังคลัสเตอร์ MongoDB Atlas",
      parameters: [
        { name: "uri", type: "String", desc: "สตริง URL ที่มี username/password สำหรับยืนยันตัวตนกับ MongoDB" }
      ],
      defDiagram: `// 1. Definition: ประกาศพารามิเตอร์รอรับ URI
mongoose.connect(uri)
                 ▲
                 └─ Parameter 1: uri (ตัวแปรรับสตริง Connection String)`,
      callDiagram: `// 2. Invocation: ส่งอาร์กิวเมนต์ค่าจริงจาก .env
await mongoose.connect(process.env.MONGODB_URI);
                       ▲
                       └─ Argument 1: ค่าสตริงจริง เช่น "mongodb+srv://..."`,
      argumentExplanation: "Argument คือค่าที่อ่านได้จาก process.env.MONGODB_URI (สตริง Connection String จริง)"
    },
    {
      name: "bcrypt.hash(password, saltRounds)",
      category: "Security (Bcrypt)",
      purpose: "นำรหัสผ่านตัวหนังสือธรรมดาไปเข้ารหัสทางเดียว พร้อมสุ่มชุดตัวอักษรพิเศษ (Salt) มาผสม เพื่อการันตีว่าแม้ผู้ใช้จะตั้งรหัสซ้ำกัน ผลลัพธ์แฮชก็จะต่างกันเสมอ ป้องกันแฮกเกอร์แกะรหัสผ่าน",
      parameters: [
        { name: "password", type: "String", desc: "รหัสผ่านที่ผู้ใช้กรอกเข้ามา (เช่น 'Admin1234')" },
        { name: "saltRounds", type: "Number", desc: "ระดับความซับซ้อนในการสุ่มชุดอักษรผสม (Salt) และจำนวนรอบแฮช แนะนำที่ 12 รอบ (วนคำนวณ 4,096 ครั้ง)" }
      ],
      defDiagram: `// 1. Definition: ประกาศพารามิเตอร์รับรหัสผ่านและระดับการสุ่ม Salt
bcrypt.hash(password, saltRounds)
            ▲         ▲
            │         └─ Parameter 2: saltRounds (ระดับความซับซ้อนในการสุ่ม Salt)
            └─────────── Parameter 1: password (ตัวแปรรอรับรหัสผ่านดิบ)`,
      callDiagram: `// 2. Invocation: ป้อนรหัสผ่านจริง และสั่งให้สุ่ม Salt ด้วยระดับ 12
await bcrypt.hash(password, 12);
                  ▲         ▲
                  │         └─ Argument 2: เลข 12 (Bcrypt จะสุ่ม Salt แล้วคำนวณ 4,096 รอบ)
                  └─────────── Argument 1: ตัวแปรรหัสผ่านจริงที่ผู้ใช้พิมพ์ส่งมา`,
      argumentExplanation: "Argument 1 คือรหัสผ่านจริงที่ผู้ใช้กรอก ส่วน Argument 2 คือเลข 12 ซึ่งสั่งให้ Bcrypt สุ่มชุดตัวอักษรพิเศษ (Salt) ขึ้นมาผสมกับรหัส แล้ววนคำนวณ 2¹² = 4,096 รอบ เพื่อให้แฮกเกอร์ไม่สามารถถอดรหัสผ่านได้"
    },
    {
      name: "bcrypt.compare(candidatePassword, hashedPassword)",
      category: "Security (Bcrypt)",
      purpose: "ตรวจสอบว่ารหัสผ่านที่ผู้ใช้พิมพ์ตอน Login ตรงกับค่าแฮชที่บันทึกในฐานข้อมูลหรือไม่",
      parameters: [
        { name: "candidatePassword", type: "String", desc: "รหัสผ่านที่ผู้ใช้พิมพ์เข้ามาในหน้า Login" },
        { name: "hashedPassword", type: "String", desc: "รหัสที่แฮชแล้วซึ่งดึงออกมาจากฐานข้อมูล MongoDB" }
      ],
      defDiagram: `// 1. Definition: ประกาศพารามิเตอร์รับรหัส 2 แบบมาเทียบกัน
bcrypt.compare(candidatePassword, hashedPassword)
               ▲                  ▲
               │                  └─ Parameter 2: รหัสแฮชเดิมในฐานข้อมูล
               └──────────────────── Parameter 1: รหัสที่ผู้ใช้เพิ่งกรอก`,
      callDiagram: `// 2. Invocation: ส่งอาร์กิวเมนต์ 2 ตัวเข้าไปตรวจสอบ
await bcrypt.compare(req.body.password, user.password);
                     ▲                  ▲
                     │                  └─ Argument 2: ค่าแฮชจริง "$2b$12$..."
                     └──────────────────── Argument 1: รหัสผ่านจริงที่ส่งมาใน Body`,
      argumentExplanation: "Argument 1 คือ 'MySecret123' ที่เพิ่งส่งมา และ Argument 2 คือ '$2b$12$...' จากฐานข้อมูล ผลลัพธ์ที่ได้คือ true หรือ false"
    },
    {
      name: "jwt.sign(payload, secretOrPrivateKey, options)",
      category: "Auth (JSON Web Token)",
      purpose: "สร้างตั๋วบัตรผ่านดิจิทัล (JWT) ฝังข้อมูลผู้ใช้และเซ็นกำกับด้วยกุญแจลับ",
      parameters: [
        { name: "payload", type: "Object", desc: "ข้อมูลประจำตัวที่จะฝังลงใน Token เช่น { userId: user._id, role: 'admin' }" },
        { name: "secretOrPrivateKey", type: "String", desc: "กุญแจลับจาก .env สำหรับเซ็นลายเซ็นกำกับป้องกันการปลอมแปลง" },
        { name: "options", type: "Object (Optional)", desc: "อ็อพชันเพิ่มเติม เช่น { expiresIn: '1h' }" }
      ],
      defDiagram: `// 1. Definition: ประกาศพารามิเตอร์สร้าง Token
jwt.sign(payload, secretOrPrivateKey, options)
         ▲        ▲                   ▲
         │        │                   └─ Parameter 3: options (อ็อพชันเสริม)
         │        └───────────────────── Parameter 2: secretOrPrivateKey (กุญแจลับ)
         └────────────────────────────── Parameter 1: payload (ข้อมูลที่จะฝัง)`,
      callDiagram: `// 2. Invocation: ส่งข้อมูลจริง, กุญแจลับจริง, และเวลาหมดอายุจริง
jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
         ▲                     ▲                       ▲
         │                     │                       └─ Argument 3: Object { expiresIn: '1h' }
         │                     └─ Argument 2: ค่าลับจาก .env
         └─ Argument 1: Object จริงระบุ ID ผู้ใช้`,
      argumentExplanation: "Argument 1 คือ Object ผู้ใช้, Argument 2 คือ JWT_SECRET, และ Argument 3 คือตัวเลือกระยะเวลาหมดอายุ 1 ชั่วโมง"
    },
    {
      name: "jwt.verify(token, secretOrPublicKey)",
      category: "Auth (JSON Web Token)",
      purpose: "ตรวจสอบตั๋ว JWT ว่าถูกดัดแปลงหรือหมดอายุแล้วหรือยัง และถอดข้อมูล (Payload) ออกมา",
      parameters: [
        { name: "token", type: "String", desc: "สตริง Token ที่อ่านได้จาก Cookie หรือ Authorization Header" },
        { name: "secretOrPublicKey", type: "String", desc: "กุญแจลับเดียวกับที่ใช้ sign ตอนแรก" }
      ],
      defDiagram: `// 1. Definition: ประกาศพารามิเตอร์รับตั๋วและกุญแจตรวจ
jwt.verify(token, secretOrPublicKey)
           ▲      ▲
           │      └─ Parameter 2: secretOrPublicKey (กุญแจลับเทียบตรวจ)
           └──────── Parameter 1: token (สตริง Token ที่รอตรวจ)`,
      callDiagram: `// 2. Invocation: ส่ง Token จริงและกุญแจลับจริงไปตรวจสอบ
jwt.verify(token, process.env.JWT_SECRET);
           ▲      ▲
           │      └─ Argument 2: กุญแจลับจริงจาก .env
           └──────── Argument 1: สตริง Token จริงที่แกะได้จาก Cookie`,
      argumentExplanation: "Argument 1 คือตัวแปร token จาก cookie และ Argument 2 คือ process.env.JWT_SECRET หาก Token ปลอมหรือหมดอายุคำสั่งนี้จะโยน Error ทันที"
    },
    {
      name: "Express Route Handler / Middleware (req, res, next)",
      category: "Controller Pipeline",
      purpose: "ฟังก์ชันปลายทางที่ Express ส่งคำขอ (HTTP Request) มาให้โค้ดของเราประมวลผล",
      parameters: [
        { name: "req (Request)", type: "Object", desc: "กล่องรับข้อมูลที่ผู้ใช้ส่งมา (req.body, req.params, req.cookies)" },
        { name: "res (Response)", type: "Object", desc: "เครื่องมือส่งคำตอบกลับไปหาเบราว์เซอร์ (res.status(), res.json())" },
        { name: "next", type: "Function", desc: "ฟังก์ชันสั่งให้ Express ส่งงานต่อไปยังมิดเดิลแวร์ตัวถัดไปในคิว" }
      ],
      defDiagram: `// 1. Definition: เราเขียนชื่อพารามิเตอร์ 3 ตัวนี้ไว้รอรับ
const authUser = (req, res, next) => { ... }
                  ▲    ▲    ▲
                  │    │    └─ Parameter 3: next (ฟังก์ชันส่งต่อคิวถัดไป)
                  │    └────── Parameter 2: res (เครื่องมือส่งคำตอบ)
                  └─────────── Parameter 1: req (กล่องรับคำขอจากผู้ใช้)`,
      callDiagram: `// 2. Invocation: Express เป็นคนส่ง Arguments จริงทั้ง 3 ตัวนี้มาให้เองอัตโนมัติ!
authUser(reqObject, resObject, nextFunction);
         ▲          ▲          ▲
         │          │          └─ Argument 3: ฟังก์ชัน next() ในระบบ Express
         │          └───────── Argument 2: Object เครื่องมือ res.json() ในระบบ
         └──────────────────── Argument 1: Object ข้อมูลคำขอจริง (req.cookies, req.body)`,
      argumentExplanation: "เราเป็นคนกำหนดชื่อ parameter ตอนเขียน แต่ Express จะเป็นคนป้อน argument จริง (req, res, next) เข้ามาให้ฟังก์ชันของเราอัตโนมัติเมื่อมีคนยิง Request เข้ามา"
    },
    {
      name: "res.cookie(name, val, options)",
      category: "Cookie Management",
      purpose: "ส่งคำสั่ง Set-Cookie ทาง HTTP Header เพื่อสั่งให้เบราว์เซอร์บันทึก Cookie ลงในเครื่องอย่างปลอดภัย",
      parameters: [
        { name: "name", type: "String", desc: "ชื่อของ Cookie เช่น 'accessToken'" },
        { name: "val", type: "String", desc: "ค่าข้อมูลที่จะเก็บ เช่น สตริง Token" },
        { name: "options", type: "Object", desc: "การตั้งค่าความปลอดภัย เช่น { httpOnly: true, sameSite: 'lax', maxAge: 3600000 }" }
      ],
      defDiagram: `// 1. Definition: ประกาศพารามิเตอร์สำหรับตั้งค่า Cookie
res.cookie(name, val, options)
           ▲     ▲    ▲
           │     │    └─ Parameter 3: options (ตัวเลือกความปลอดภัย เช่น httpOnly)
           │     └────── Parameter 2: val (ค่าข้อมูลที่จะบันทึกลงในคุกกี้)
           └──────────── Parameter 1: name (ชื่อของคุกกี้)`,
      callDiagram: `// 2. Invocation: ป้อนชื่อ, ข้อมูล Token จริง, และอ็อพชันความปลอดภัยจริง
res.cookie('accessToken', token, { httpOnly: true, sameSite: 'lax' });
           ▲              ▲      ▲
           │              │      └─ Argument 3: Object ตั้งค่าความปลอดภัย
           │              └─ Argument 2: สตริง Token จริง
           └─ Argument 1: สตริงชื่อ 'accessToken'`,
      argumentExplanation: "Argument 1 คือชื่อ 'accessToken', Argument 2 คือสตริง Token, และ Argument 3 คือตัวเลือกความปลอดภัย (ห้าม JavaScript ฝั่งเบราว์เซอร์อ่านเพื่อกัน XSS)"
    }
  ];

  return (
    <div className="p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-8" style={{ borderRadius: '6px' }}>
      {/* Header */}
      <div>
        {/* Good to know Label (ตัวใหญ่ชัดเจน) */}
        <div className="mb-2.5">
          <span className="inline-flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight text-[#2457FF]">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Good to know</span>
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#2457FF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#62666B] font-bold">
            CORE PROGRAMMING FOUNDATIONS
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#20242A] tracking-tight">
          Function, Parameter และ Argument คืออะไร ต่างกันอย่างไร?
        </h3>
        <p className="text-[#62666B] text-sm sm:text-base mt-2 leading-relaxed font-sans max-w-3xl">
          หัวใจสำคัญที่สุดของการเขียนโปรแกรมที่มือใหม่หลายคนสับสน: ฟังก์ชันคือโรงงาน, พารามิเตอร์คือช่องรับวัตถุดิบ, และอาร์กิวเมนต์คือวัตถุดิบจริงที่ป้อนเข้าไป
        </p>
      </div>

      {/* Visual Mental Model Card with Pinpointed Arrows */}
      <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] space-y-6" style={{ borderRadius: '6px' }}>
        <h4 className="font-bold text-base text-[#20242A] flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>ภาพจำที่ทำให้เข้าใจได้ตลอดชีวิต (The Mental Model)</span>
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parameter Box */}
          <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 font-mono text-xs font-bold uppercase bg-[#EAF0FF] text-[#2457FF] border border-[#2457FF]/30" style={{ borderRadius: '3px' }}>
                1. Parameter (พารามิเตอร์)
              </span>
              <span className="text-xs font-sans font-medium text-[#62666B]">จังหวะสร้างฟังก์ชัน</span>
            </div>
            
            <div>
              <h5 className="font-bold text-base text-[#20242A]">
                "ตัวแปรที่ตั้งชื่อรอไว้ ตอนเขียนสร้างฟังก์ชัน"
              </h5>
              <p className="text-xs text-[#62666B] leading-relaxed mt-1 font-sans">
                เปรียบเสมือน <strong>"ช่องว่างในแบบฟอร์ม"</strong> หรือ <strong>"ช่องใส่ขนมปังของเครื่องปิ้ง"</strong> ตอนที่เราเขียนโค้ด เรายังไม่รู้ว่าผู้ใช้จะส่งค่าอะไรมา เราจึงตั้งชื่อตัวแปรไว้รอรับ
              </p>
            </div>

            {/* Visual Token Badges with Center-Aligned Arrows */}
            <div className="p-4 bg-[#20242A] text-[#F6F5F1] border border-[#20242A] overflow-x-auto" style={{ borderRadius: '4px' }}>
              <div className="text-[10px] font-sans uppercase tracking-wider text-[#FF6B35] font-bold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FF6B35]" />
                <span>รหัสประกาศฟังก์ชัน (Function Definition):</span>
              </div>
              <div className="inline-flex items-start gap-1 font-mono text-xs pb-1">
                <span className="text-purple-300 pt-1">function</span>
                <span className="text-[#4C7DFF] font-bold pt-1">hash</span>
                <span className="text-neutral-400 pt-1">(</span>

                {/* Token 1: password */}
                <div className="flex flex-col items-center">
                  <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                    password
                  </span>
                  <span className="text-amber-400 font-bold text-xs mt-1 leading-none">▲</span>
                  <span className="text-[10px] font-sans font-bold text-amber-300 bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-500/30 mt-1 whitespace-nowrap">
                    Parameter 1
                  </span>
                  <span className="text-[9px] font-sans text-neutral-400 mt-0.5 whitespace-nowrap">
                    (ตัวแปรรอรับรหัส)
                  </span>
                </div>

                <span className="text-neutral-400 pt-1">,</span>

                {/* Token 2: saltRounds */}
                <div className="flex flex-col items-center">
                  <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                    saltRounds
                  </span>
                  <span className="text-amber-400 font-bold text-xs mt-1 leading-none">▲</span>
                  <span className="text-[10px] font-sans font-bold text-amber-300 bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-500/30 mt-1 whitespace-nowrap">
                    Parameter 2
                  </span>
                  <span className="text-[9px] font-sans text-neutral-400 mt-0.5 whitespace-nowrap">
                    (จำนวนรอบคำนวณ)
                  </span>
                </div>

                <span className="text-neutral-400 pt-1">) &#123; ... &#125;</span>
              </div>
            </div>

            {/* Character-Precise Monospace Diagram */}
            <div className="p-3.5 bg-[#F6F5F1] text-[#20242A] font-mono text-[11px] overflow-x-auto border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
              <pre className="text-[#20242A] leading-snug">{`function hash(password, saltRounds) { ... }
              ▲         ▲
              │         └─ Parameter 2: ตัวแปร saltRounds
              └─────────── Parameter 1: ตัวแปร password`}</pre>
            </div>
          </div>

          {/* Argument Box */}
          <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 font-sans text-xs font-bold uppercase bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
                2. Argument (อาร์กิวเมนต์)
              </span>
              <span className="text-xs font-sans font-medium text-[#62666B]">จังหวะเรียกใช้งาน</span>
            </div>

            <div>
              <h5 className="font-bold text-base text-[#20242A]">
                "ค่าข้อมูลจริง ที่โยนเข้าไป ตอนสั่งรันฟังก์ชัน"
              </h5>
              <p className="text-xs text-[#62666B] leading-relaxed mt-1 font-sans">
                เปรียบเสมือน <strong>"ขนมปังแผ่นจริง"</strong> หรือ <strong>"ข้อความจริง"</strong> ที่เราหยิบยื่นส่งเข้าไปในฟังก์ชันตอนที่เราสั่งให้มันทำงาน (Call / Invoke)
              </p>
            </div>

            {/* Visual Token Badges with Center-Aligned Arrows */}
            <div className="p-4 bg-[#20242A] text-[#F6F5F1] border border-[#20242A] overflow-x-auto" style={{ borderRadius: '4px' }}>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>รหัสตอนสั่งรัน (Function Invocation):</span>
              </div>
              <div className="inline-flex items-start gap-1 font-mono text-xs pb-1">
                <span className="text-[#4C7DFF] font-bold pt-1">hash</span>
                <span className="text-neutral-400 pt-1">(</span>

                {/* Token 1: "Secret123" */}
                <div className="flex flex-col items-center">
                  <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/40">
                    "Secret123"
                  </span>
                  <span className="text-emerald-400 font-bold text-xs mt-1 leading-none">▲</span>
                  <span className="text-[10px] font-sans font-bold text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/30 mt-1 whitespace-nowrap">
                    Argument 1
                  </span>
                  <span className="text-[9px] font-sans text-neutral-400 mt-0.5 whitespace-nowrap">
                    (สตริงรหัสผ่านจริง)
                  </span>
                </div>

                <span className="text-neutral-400 pt-1">,</span>

                {/* Token 2: 12 */}
                <div className="flex flex-col items-center">
                  <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/40">
                    12
                  </span>
                  <span className="text-emerald-400 font-bold text-xs mt-1 leading-none">▲</span>
                  <span className="text-[10px] font-sans font-bold text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/30 mt-1 whitespace-nowrap">
                    Argument 2
                  </span>
                  <span className="text-[9px] font-sans text-neutral-400 mt-0.5 whitespace-nowrap">
                    (ตัวเลขรอบจริง 12)
                  </span>
                </div>

                <span className="text-neutral-400 pt-1">);</span>
              </div>
            </div>

            {/* Character-Precise Monospace Diagram */}
            <div className="p-3.5 bg-[#F6F5F1] text-[#20242A] font-mono text-[11px] overflow-x-auto border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
              <pre className="text-[#20242A] leading-snug">{`hash("Secret123", 12);
     ▲            ▲
     │            └─ Argument 2: ค่าตัวเลขจริง 12
     └────────────── Argument 1: ค่าสตริงจริง "Secret123"`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Everyday Real-World Analogies for Beginners */}
      <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
        <div className="flex items-center gap-2">
          <Coffee className="w-5 h-5 text-amber-600" />
          <div>
            <h4 className="font-bold text-base sm:text-lg text-[#20242A]">
              ตัวอย่างในชีวิตประจำวัน (สำหรับคนที่ไม่มีพื้นฐานการเขียนโปรแกรมมาก่อนเลย)
            </h4>
            <p className="text-xs text-[#62666B] font-sans">
              เมื่อมองผ่าน 3 เหตุการณ์ในชีวิตประจำวันนี้ จะแยกความแตกต่างระหว่าง Parameter กับ Argument ได้อย่างชัดเจนทันที:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Case 1: Bubble Tea */}
          <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] space-y-3" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium font-sans px-2 py-0.5 bg-[#FFF0EA] text-[#FF6B35]" style={{ borderRadius: '3px' }}>
                1. เคสร้านชานมไข่มุก
              </span>
              <Coffee className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xs font-sans font-medium text-[#20242A] bg-[#FFFFFF] p-2.5 border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
              ชงชานม(รสชาติ, ความหวาน, ท็อปปิ้ง)
            </div>
            <div className="space-y-1.5 text-xs text-[#62666B] leading-relaxed font-sans">
              <p>
                <strong className="text-[#2457FF] font-mono">Parameter:</strong> ป้ายเมนูหน้าเคาน์เตอร์ที่มีช่องว่างว่า <code className="text-[#20242A]">รสชาติ</code>, <code className="text-[#20242A]">ความหวาน</code>, <code className="text-[#20242A]">ท็อปปิ้ง</code> (พนักงานยังไม่รู้ว่าลูกค้าต้องการสั่งอะไร จึงตั้งช่องรับข้อมูลรอไว้)
              </p>
              <p>
                <strong className="text-emerald-700 font-mono">Argument:</strong> ข้อมูลจริงที่ลูกค้าสั่งพนักงานหน้าร้าน เช่น <code className="text-[#20242A]">"ชาไทย"</code>, <code className="text-[#20242A]">"หวาน 25%"</code>, <code className="text-[#20242A]">"ไข่มุก"</code>
              </p>
            </div>
          </div>

          {/* Case 2: ATM Machine */}
          <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] space-y-3" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium font-sans px-2 py-0.5 bg-[#EAF0FF] text-[#2457FF]" style={{ borderRadius: '3px' }}>
                2. เคสตู้ ATM ถอนเงิน
              </span>
              <CreditCard className="w-4 h-4 text-[#2457FF]" />
            </div>
            <div className="text-xs font-sans font-medium text-[#20242A] bg-[#FFFFFF] p-2.5 border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
              ถอนเงินสด(รหัสPIN, จำนวนเงิน)
            </div>
            <div className="space-y-1.5 text-xs text-[#62666B] leading-relaxed font-sans">
              <p>
                <strong className="text-[#2457FF] font-mono">Parameter:</strong> ช่องว่างบนหน้าจอตู้ ATM ที่รอรับค่า <code className="text-[#20242A]">รหัสPIN</code> และ <code className="text-[#20242A]">จำนวนเงิน</code>
              </p>
              <p>
                <strong className="text-emerald-700 font-mono">Argument:</strong> ตัวเลขจริงที่ผู้ใช้กดบนแป้นพิมพ์ เช่น <code className="text-[#20242A]">"4921"</code> และ <code className="text-[#20242A]">1000</code> บาท
              </p>
            </div>
          </div>

          {/* Case 3: Grab / Delivery App */}
          <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] space-y-3" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium font-sans px-2 py-0.5 bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
                3. เคสแอปเรียกรถ Grab
              </span>
              <Car className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xs font-sans font-medium text-[#20242A] bg-[#FFFFFF] p-2.5 border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
              เรียกรถ(จุดรับ, จุดส่ง, วิธีชำระ)
            </div>
            <div className="space-y-1.5 text-xs text-[#62666B] leading-relaxed font-sans">
              <p>
                <strong className="text-[#2457FF] font-mono">Parameter:</strong> ช่องในแอปที่โปรแกรมเมอร์สร้างไว้ว่า <code className="text-[#20242A]">จุดรับ</code>, <code className="text-[#20242A]">จุดส่ง</code>, <code className="text-[#20242A]">วิธีชำระเงิน</code>
              </p>
              <p>
                <strong className="text-emerald-700 font-mono">Argument:</strong> สถานที่จริงที่ผู้ใช้ระบุ เช่น <code className="text-[#20242A]">"สยามพารากอน"</code>, <code className="text-[#20242A]">"สนามบิน"</code>, <code className="text-[#20242A]">"บัตรเครดิต"</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Project Function Breakdown */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#D9D8D3]">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#62666B] font-bold">
              PROJECT DEEP-DIVE / 8 ESSENTIAL FUNCTIONS
            </span>
            <h4 className="font-bold text-xl sm:text-2xl text-[#20242A] mt-0.5 tracking-tight">
              8 ฟังก์ชันจริงในโปรเจกต์
            </h4>
            <p className="text-xs sm:text-sm text-[#62666B] mt-1 font-sans">
              ดูเทียบกันชัดๆ ระหว่างการประกาศนิยาม (Definition) กับการเรียกใช้ส่งค่าจริง (Invocation)
            </p>
          </div>

          {/* Expand / Collapse Controls */}
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

        <div className="space-y-4">
          {functionExamples.map((fn, idx) => {
            const isOpen = openFunctions.has(idx);
            return (
              <div
                key={idx}
                className={`bg-[#F6F5F1] border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#20242A]' : 'border-[#D9D8D3] hover:border-[#62666B]'
                }`}
                style={{ borderRadius: '6px' }}
              >
                {/* Clickable Header for Collapsing/Expanding */}
                <button
                  type="button"
                  onClick={() => toggleFunction(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 cursor-pointer focus:outline-none transition-colors hover:bg-[#EAE8E3]/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2457FF]" />
                      <span className="font-mono font-bold text-base sm:text-lg text-[#20242A]">
                        {fn.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-0.5 bg-[#FFFFFF] border border-[#D9D8D3] text-[#20242A] font-bold self-start sm:self-auto" style={{ borderRadius: '3px' }}>
                      {fn.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-sans text-[#62666B] shrink-0 mt-0.5 sm:mt-0">
                    <span className="hidden md:inline text-xs font-medium">
                      {isOpen ? 'คลิกเพื่อพับเก็บ' : 'คลิกเพื่อดูโครงสร้าง'}
                    </span>
                    <div className={`p-1 border border-[#D9D8D3] transition-transform ${
                      isOpen ? 'border-[#20242A] bg-[#20242A] text-white rotate-180' : 'bg-[#FFFFFF] text-[#20242A]'
                    }`} style={{ borderRadius: '4px' }}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Body */}
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 space-y-4 border-t border-[#D9D8D3] bg-[#F6F5F1]">
                    <p className="text-xs sm:text-sm text-[#20242A] leading-relaxed flex items-center gap-1.5 font-sans pt-1">
                      <Target className="w-3.5 h-3.5 text-[#2457FF] inline shrink-0" />
                      <span><strong>หน้าที่ของฟังก์ชัน:</strong> {fn.purpose}</span>
                    </p>

                    {/* Grid 2 Columns: Definition (Parameters) vs Invocation (Arguments) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                      {/* 1. Definition (Parameters) */}
                      <div className="p-4 bg-[#FFFFFF] border border-[#D9D8D3] space-y-2.5" style={{ borderRadius: '4px' }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold uppercase text-[#2457FF]">
                            1. Parameters (ตัวแปรรอรับ)
                          </span>
                          <span className="text-[10px] font-mono text-[#62666B]">Definition</span>
                        </div>
                        <div className="p-3 bg-[#20242A] text-[#F6F5F1] font-mono text-xs overflow-x-auto border border-[#20242A]" style={{ borderRadius: '4px' }}>
                          <pre className="text-amber-300 leading-snug whitespace-pre">{fn.defDiagram}</pre>
                        </div>
                        <div className="space-y-1 pt-1 font-mono text-[11px]">
                          {fn.parameters.map((p, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-1.5 text-[#62666B]">
                              <span className="text-[#2457FF] font-bold whitespace-nowrap">• {p.name}</span>
                              <span className="text-[#62666B] whitespace-nowrap">({p.type}):</span>
                              <span className="font-sans text-[11px] leading-tight text-[#20242A]">{p.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. Invocation (Arguments) */}
                      <div className="p-4 bg-[#FFFFFF] border border-[#D9D8D3] space-y-2.5" style={{ borderRadius: '4px' }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold uppercase text-emerald-700">
                            2. Arguments (ค่าข้อมูลจริงที่ส่งไป)
                          </span>
                          <span className="text-[10px] font-mono text-[#62666B]">Invocation</span>
                        </div>
                        <div className="p-3 bg-[#20242A] text-[#F6F5F1] font-mono text-xs overflow-x-auto border border-[#20242A]" style={{ borderRadius: '4px' }}>
                          <pre className="text-emerald-300 leading-snug whitespace-pre">{fn.callDiagram}</pre>
                        </div>
                        <p className="text-[11px] text-[#62666B] font-sans leading-relaxed pt-1 flex items-start gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span><strong>คำอธิบาย:</strong> {fn.argumentExplanation}</span>
                        </p>
                      </div>
                    </div>
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
