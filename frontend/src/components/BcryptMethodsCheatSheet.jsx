import { useState } from 'react';
import { Microscope, AlertTriangle, Target, Clock, ShieldCheck } from 'lucide-react';
import { tokenizeCodeToLines, getTokenColorClass } from '../utils/codeHighlighter';

export function BcryptMethodsCheatSheet() {
  const [filter, setFilter] = useState('all'); // 'all' | 'async' | 'sync' | 'util'

  const methods = [
    {
      id: 'hash',
      name: 'bcrypt.hash(password, saltOrRounds)',
      type: 'async',
      badge: 'ASYNC (PROMISE)',
      usageRating: 'การใช้งาน: แนะนำสูงสุด / ใช้บ่อยที่สุด',
      purpose: 'แฮชรหัสผ่านแบบไม่ปิดกั้น Event Loop (Non-blocking) คืนค่าเป็น Promise',
      whenToUse: 'ใช้ในฟังก์ชัน Register, เปลี่ยนรหัสผ่าน, รีเซ็ตรหัสผ่าน',
      parameters: [
        { name: 'password', type: 'String', desc: 'รหัสผ่าน Plaintext ที่ผู้ใช้กรอกเข้ามา (เช่น "Secret123")' },
        { name: 'saltOrRounds', type: 'Number | String', desc: 'จำนวนรอบ Cost factor (แนะนำ 12) หรือสตริง Salt ที่สุ่มไว้แล้ว' }
      ],
      returnVal: 'Promise<String> (สตริงความยาว 60 ตัวอักษร เช่น "$2b$12$...")',
      code: `// วิธีที่ 1: ใส่จำนวนรอบ 12 เข้าไปตรงๆ (สะดวกและนิยมที่สุด)
const hashedPassword = await bcrypt.hash(req.body.password, 12);

// วิธีที่ 2: สร้าง Salt แยกออกมาก่อน (มักใช้ใน Mongoose Pre-save Hook)
const salt = await bcrypt.genSalt(12);
const hashedPassword = await bcrypt.hash(req.body.password, salt);`,
      pitfall: 'ต้องใส่ await เสมอ! หากลืม await ตัวแปรจะได้ค่า Promise Object แทนที่จะเป็นสตริง hash จริง'
    },
    {
      id: 'compare',
      name: 'bcrypt.compare(candidatePassword, hashedPassword)',
      type: 'async',
      badge: 'ASYNC (PROMISE)',
      usageRating: 'การใช้งาน: แนะนำสูงสุด / ใช้บ่อยที่สุด',
      purpose: 'ตรวจสอบว่ารหัสผ่านที่กรอกตอน Login ตรงกับค่าแฮชใน Database หรือไม่',
      whenToUse: 'ใช้ในฟังก์ชัน Login เสมอ (ป้องกัน Timing Attack อัตโนมัติ)',
      parameters: [
        { name: 'candidatePassword', type: 'String', desc: 'รหัสผ่านที่ผู้ใช้พิมพ์ในแบบฟอร์ม Login' },
        { name: 'hashedPassword', type: 'String', desc: 'สตริงแฮชเดิมที่ดึงมาจากฐานข้อมูล MongoDB' }
      ],
      returnVal: 'Promise<Boolean> (true = รหัสถูกต้อง, false = รหัสไม่ถูกต้อง)',
      code: `// ตรวจสอบรหัสผ่านในเส้นทาง /login
const isMatch = await bcrypt.compare(req.body.password, user.password);

if (!isMatch) {
  // รหัสไม่ตรง ห้ามบอกเจาะจงว่ารหัสผิด เพื่อความปลอดภัย
  return res.status(401).json({ error: "Invalid credentials" });
}

// ถ้ารหัสถูกต้อง ดำเนินการออก JWT Token ต่อไป...`,
      pitfall: 'ห้ามนำรหัสผ่านที่แฮชแล้วมาเทียบด้วยเครื่องหมาย === ตรงๆ เด็ดขาด เพราะการแฮชแต่ละครั้งจะได้สตริงไม่ซ้ำกันเสมอเนื่องจาก Salt สุ่ม ต้องใช้ bcrypt.compare() เท่านั้น!'
    },
    {
      id: 'genSalt',
      name: 'bcrypt.genSalt(rounds)',
      type: 'async',
      badge: 'ASYNC (PROMISE)',
      usageRating: 'การใช้งาน: สำคัญมากใน Mongoose Hook',
      purpose: 'สุ่มสร้างชุดตัวอักษรพิเศษ (Salt) ความยาว 16 ไบต์เพื่อนำไปผสมกับรหัสผ่าน ป้องกันไม่ให้คนตั้งรหัสซ้ำกันได้ผลลัพธ์แฮชเหมือนกัน',
      whenToUse: 'ใช้เมื่อต้องการแยกขั้นตอนสร้าง Salt ออกมาควบคุมเอง เช่น ใน Middleware / Pre-save Hook',
      parameters: [
        { name: 'rounds', type: 'Number (Optional)', desc: 'จำนวนรอบ Cost factor ค่าเริ่มต้นคือ 10 แนะนำให้ตั้ง 12' }
      ],
      returnVal: 'Promise<String> (สตริง Salt สุ่ม เช่น "$2b$12$e8uqPqQ4VqN3j4K0xXzY9.")',
      code: `// ตัวอย่างการใช้ใน user.model.js (Mongoose Pre-save Hook)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});`,
      pitfall: 'ถ้าไม่ระบุ rounds ตัว bcrypt จะใช้ค่าเริ่มต้น 10 รอบ แนะนำให้ใส่ 12 รอบเสมอเพื่อมาตรฐานปี 2026'
    },
    {
      id: 'hashSync',
      name: 'bcrypt.hashSync(password, saltOrRounds)',
      type: 'sync',
      badge: 'SYNC (BLOCKING)',
      usageRating: 'การใช้งาน: เฉพาะ Script ภายนอก',
      purpose: 'แฮชรหัสผ่านแบบ Synchronous (ยึด CPU จนกว่าจะเสร็จ)',
      whenToUse: 'ใช้เฉพาะใน Initial Seed Scripts, Database Migration ที่รันก่อนเปิดเซิร์ฟเวอร์',
      parameters: [
        { name: 'password', type: 'String', desc: 'รหัสผ่าน Plaintext' },
        { name: 'saltOrRounds', type: 'Number | String', desc: 'จำนวนรอบ เช่น 10 หรือ 12' }
      ],
      returnVal: 'String (สตริงแฮชทันทีโดยไม่ต้อง await)',
      code: `// เหมาะสำหรับ seedData.js ที่รันครั้งเดียวก่อนเปิดเซิร์ฟเวอร์
const adminPasswordHash = bcrypt.hashSync("adminSuperPassword", 12);
await db.users.insertMany([{ username: "admin", password: adminPasswordHash }]);`,
      pitfall: 'ห้ามใช้ใน Express API Controller เด็ดขาด! เพราะการแฮช 12 รอบกิน CPU 200-300ms การใช้ Sync จะหยุด Node.js Event Loop ทำให้ผู้ใช้คนอื่นเข้าเว็บไม่ได้ชั่วขณะ'
    },
    {
      id: 'compareSync',
      name: 'bcrypt.compareSync(candidate, hashed)',
      type: 'sync',
      badge: 'SYNC (BLOCKING)',
      usageRating: 'การใช้งาน: นานๆ ใช้ที',
      purpose: 'เปรียบเทียบรหัสผ่านแบบ Synchronous',
      whenToUse: 'ใช้ในโปรแกรมประเภท CLI Tool หรือ Batch Job หลังบ้าน',
      parameters: [
        { name: 'candidate', type: 'String', desc: 'รหัสผ่านที่ส่งมา' },
        { name: 'hashed', type: 'String', desc: 'รหัสแฮชจาก Database' }
      ],
      returnVal: 'Boolean (true หรือ false ทันที)',
      code: `const isMatch = bcrypt.compareSync(inputPassword, storedHash);`,
      pitfall: 'เช่นเดียวกับ hashSync ห้ามใช้ใน HTTP Route Handlers ของ Express'
    },
    {
      id: 'getRounds',
      name: 'bcrypt.getRounds(encrypted)',
      type: 'util',
      badge: 'UTILITY / INSPECTION',
      usageRating: 'การใช้งาน: ระบบความปลอดภัยขั้นสูง',
      purpose: 'แกะดูว่ารหัสผ่านที่บันทึกไว้นี้ ถูกแฮชด้วย Cost Factor (Rounds) เท่าไหร่',
      whenToUse: 'ใช้ทำ "Password Rehash Migration" เมื่อเราต้องการอัปเกรดความปลอดภัยจาก 10 รอบเป็น 12 รอบ',
      parameters: [
        { name: 'encrypted', type: 'String', desc: 'สตริงแฮชที่มีอยู่ใน Database' }
      ],
      returnVal: 'Number (เช่น 10 หรือ 12)',
      code: `// เมื่อผู้ใช้ Login ผ่านแล้ว ตรวจสอบว่ารหัสเก่าของเขาแฮชต่ำกว่า 12 รอบหรือไม่
const currentRounds = bcrypt.getRounds(user.password);

if (currentRounds < 12) {
  // รหัสเก่ามีความปลอดภัยต่ำกว่าเกณฑ์ ให้อัปเกรดแฮชใหม่เป็น 12 ทันที
  user.password = await bcrypt.hash(req.body.password, 12);
  await user.save();
  console.log("User password upgraded to 12 rounds!");
}`,
      pitfall: 'สตริงที่ส่งเข้าไปต้องเป็น Bcrypt Hash ที่ถูกต้อง หากส่งข้อความสุ่มๆ เข้าไปจะเกิด Error'
    }
  ];

  const filteredMethods = methods.filter((m) => {
    if (filter === 'all') return true;
    return m.type === filter;
  });

  return (
    <div className="p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-8" style={{ borderRadius: '6px' }}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#2457FF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
            BCRYPT SPECIFICATION & API CHEAT SHEET
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#20242A] tracking-tight">
          รวมทุกฟังก์ชัน & เมธอดของ Bcrypt ที่ใช้ในระบบจริง
        </h3>
        <p className="text-[#62666B] mt-2 text-sm sm:text-base leading-relaxed max-w-3xl font-sans">
          คู่มือสรุปคำสั่งของ Bcrypt ทุกตัวอย่างละเอียด เทียบเท่ากับ Cheat Sheet ของฐานข้อมูล 
          อธิบายหน้าที่ พารามิเตอร์ และเหตุผลทางวิศวกรรมว่าทำไมจึงต้องเลือกใช้ Asynchronous ใน Express
        </p>
      </div>

      {/* Anatomy of Bcrypt Hash String Card */}
      <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] space-y-4 font-sans" style={{ borderRadius: '6px' }}>
        <h4 className="font-bold text-base text-[#20242A] flex items-center gap-2">
          <Microscope className="w-4 h-4 text-[#20242A]" />
          <span>ผ่าโครงสร้างของสตริง Bcrypt Hash (ความยาว 60 ตัวอักษร):</span>
        </h4>
        <div className="p-4 bg-[#20242A] text-[#F6F5F1] font-mono text-xs overflow-x-auto border border-[#20242A]" style={{ borderRadius: '4px' }}>
          <div className="text-[#62666B] mb-1">// รหัสผ่านที่แฮชแล้วจะมีฟอร์แมต 4 ส่วนประกอบเสมอ:</div>
          <div className="text-sm">
            <span className="text-amber-400 font-bold">$2b$</span>
            <span className="text-[#4C7DFF] font-bold">12$</span>
            <span className="text-emerald-400 font-bold">e8uqPqQ4VqN3j4K0xXzY9.</span>
            <span className="text-purple-300 font-bold">uG7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-[#FFFFFF] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
            <span className="text-amber-600 font-bold block">$2b$ (Algorithm)</span>
            <span className="text-[#62666B] font-sans text-[11px]">Bcrypt Revision เวอร์ชั่นล่าสุด</span>
          </div>
          <div className="p-3 bg-[#FFFFFF] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
            <span className="text-[#2457FF] font-bold block">12$ (Cost Factor)</span>
            <span className="text-[#62666B] font-sans text-[11px]">วนลูป 2¹² = 4,096 รอบ</span>
          </div>
          <div className="p-3 bg-[#FFFFFF] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
            <span className="text-emerald-600 font-bold block">22 Chars (Salt)</span>
            <span className="text-[#62666B] font-sans text-[11px]">ชุดตัวอักษรสุ่ม 16 bytes ผสมรหัส</span>
          </div>
          <div className="p-3 bg-[#FFFFFF] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
            <span className="text-purple-600 font-bold block">31 Chars (Hash)</span>
            <span className="text-[#62666B] font-sans text-[11px]">ผลลัพธ์แฮชรหัสผ่านจริง</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#D9D8D3] pb-4">
        {[
          { key: 'all', label: 'ทั้งหมด (All Methods)' },
          { key: 'async', label: 'Asynchronous (แนะนำสำหรับ Express)' },
          { key: 'sync', label: 'Synchronous (เฉพาะ Seed/CLI)' },
          { key: 'util', label: 'Utility & Inspection' }
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={`px-3 py-1.5 font-mono text-xs font-medium transition-all cursor-pointer border ${
              filter === t.key
                ? 'bg-[#20242A] text-white border-[#20242A]'
                : 'bg-[#F6F5F1] text-[#62666B] border-[#D9D8D3] hover:text-[#20242A]'
            }`}
            style={{ borderRadius: '4px' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Methods Cards */}
      <div className="space-y-6">
        {filteredMethods.map((m) => (
          <div
            key={m.id}
            className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] space-y-4"
            style={{ borderRadius: '6px' }}
          >
            {/* Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D9D8D3]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#2457FF]"></span>
                <span className="font-mono font-bold text-base sm:text-lg text-[#20242A]">
                  {m.name}
                </span>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="font-mono text-xs px-2.5 py-0.5 bg-[#FFF0EA] text-[#FF6B35] font-bold border border-[#FF6B35]/30" style={{ borderRadius: '3px' }}>
                  {m.usageRating}
                </span>
                <span
                  className={`font-mono text-xs px-2.5 py-0.5 font-bold border ${
                    m.type === 'async'
                      ? 'bg-[#EAF0FF] text-[#2457FF] border-[#2457FF]/30'
                      : m.type === 'sync'
                      ? 'bg-[#FFF0EA] text-[#FF6B35] border-[#FF6B35]/30'
                      : 'bg-[#F6F5F1] text-[#20242A] border-[#D9D8D3]'
                  }`}
                  style={{ borderRadius: '3px' }}
                >
                  {m.badge}
                </span>
              </div>
            </div>

            {/* Purpose & When to use */}
            <div className="space-y-1.5 text-xs sm:text-sm text-[#20242A]">
              <p className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#2457FF] inline shrink-0" />
                <span><strong>หน้าที่:</strong> {m.purpose}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#62666B] inline shrink-0" />
                <span><strong>ใช้ตอนไหน:</strong> {m.whenToUse}</span>
              </p>
            </div>

            {/* Parameters Table */}
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#62666B] block mb-1.5">
                Parameters:
              </span>
              <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                {m.parameters.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-2.5 bg-[#FFFFFF] border border-[#D9D8D3] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
                    style={{ borderRadius: '4px' }}
                  >
                    <span className="text-[#2457FF] font-bold whitespace-nowrap">{p.name}</span>
                    <span className="text-[#62666B] text-[11px]">({p.type}):</span>
                    <span className="text-[#20242A] font-sans text-xs">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Value */}
            <div className="p-2.5 bg-[#FFFFFF] border border-[#D9D8D3] text-xs font-mono" style={{ borderRadius: '4px' }}>
              <span className="text-[#62666B]">Return: </span>
              <span className="text-emerald-700 font-bold">{m.returnVal}</span>
            </div>

            {/* Real Code */}
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#62666B] block mb-1.5">
                ตัวอย่างโค้ดใช้งานจริง:
              </span>
              <div className="p-3.5 bg-[#14171B] border border-[#2D333B] font-mono text-xs overflow-x-auto rounded">
                <div className="space-y-0.5 leading-relaxed">
                  {tokenizeCodeToLines(m.code, 'javascript').map((tokens, idx) => (
                    <div key={idx} className="whitespace-pre">
                      {tokens.map((tok, tIdx) => (
                        <span key={tIdx} className={getTokenColorClass(tok.type)}>
                          {tok.content}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pitfall Alert */}
            {m.pitfall && (
              <div className="p-3 bg-[#FFF0EA] border border-[#FF6B35]/40 text-xs text-[#20242A] font-sans flex items-start gap-2" style={{ borderRadius: '4px' }}>
                <AlertTriangle className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <span>{m.pitfall}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
