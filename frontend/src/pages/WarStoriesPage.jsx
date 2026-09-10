import { useState } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { CodeWalkthrough } from '../components/CodeWalkthrough';
import { BackButton } from '../components/BackButton';
import { AlertOctagon, CheckCircle2, ChevronDown, ChevronRight, Flame, ShieldAlert, Terminal } from 'lucide-react';

export default function WarStoriesPage() {
  const m4 = CURRICULUM.modules[3];
  const [openIdx, setOpenIdx] = useState(0);

  const incidents = [
    {
      quote: '"Request ส่งไปแล้ว แต่เบราว์เซอร์หมุนค้างไม่จบสิ้น"',
      takeaway: 'ในระบบ Asynchronous ทุกแขนงของ If-Else ต้องจบด้วยการส่งคำตอบกลับ หรือเรียก next(err)',
      pitfall: 'นี่คือจุดอันตรายที่มองเห็นได้ยาก เพราะโปรแกรมไม่ได้ฟ้อง Error สีแดงออกมา แต่ส่งผลให้การทำงานค้างเติ่งในระดับ Event Loop จน Request เกิด Timeout',
      purpose: 'การันตีว่าทุก execution path ต้องจบด้วยการส่ง response (res.json) หรือส่งต่อ error ด้วย next(err) ตามหลัก Fail-Fast'
    },
    {
      quote: '"ทำไมบน Local รันผ่านฉลุย แต่พอแยก Port 5173 แล้ว Cookie หายเกลี้ยง?"',
      takeaway: 'CORS คือการตกลงร่วมกันระหว่าง Origin: ต้องเปิด credentials: true ทั้งบน Express และ React',
      pitfall: 'CORS เป็นมาตรการความปลอดภัยฝั่งเบราว์เซอร์ หากไม่ระบุ origin และ credentials: true ให้ตรงกัน เบราว์เซอร์จะสั่งบล็อก Response และไม่ยอมส่ง Cookie ข้ามพอร์ต',
      purpose: 'เปิดทางให้ Frontend ข้าม Origin เข้าถึง API ได้อย่างปลอดภัย พร้อมอนุญาตให้แลกเปลี่ยน HttpOnly Cookie ระหว่างโดเมนได้อย่างราบรื่น'
    },
    {
      quote: '"ผู้ใช้ใส่ชื่อ somchai ใน URL /users/:id แล้วเซิร์ฟเวอร์ Crash ทันที"',
      takeaway: 'อย่าเชื่อใจ Input จากภายนอก: ใช้ mongoose.Types.ObjectId.isValid() ดักก่อนแตะ Database เสมอ',
      pitfall: 'การส่ง String ที่ไม่ตรงสเปก 24-character Hex เข้า findById() จะทำให้ Mongoose throw CastError และหยุดการทำงานทันทีหากไม่มีการดักจับ',
      purpose: 'ตรวจเช็กความถูกต้องของ Data Type ก่อนแตะฐานข้อมูล และสลับไปค้นหาด้วย username แทนเพื่อความยืดหยุ่น (Defensive Programming)'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16 pb-24">
      {/* Editorial Header */}
      <div>
        <BackButton />
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#FF6B35]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B35] font-bold">
            INCIDENT POST-MORTEMS / CHAPTER 04
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#20242A]">
          War Stories: ถอดบทเรียนจากปัญหาจริงระหว่างพัฒนา
        </h2>
        <p className="text-[#62666B] mt-2 text-base leading-relaxed max-w-3xl font-sans">
          บทความทางวิศวกรรมนี้ไม่ได้สอนแค่ทฤษฎี แต่บันทึกจากความล้มเหลวและบั๊กจริงที่เกิดขึ้นในระบบ
          เรียนรู้วิธีการทำงานภายในของ Express, เบราว์เซอร์, และ Database เพื่อไม่ให้คุณต้องเสียเวลาแก้ปัญหาเดิมซ้ำสอง
        </p>
      </div>

      {/* Manifesto Callout Box: Signal Orange Accent */}
      <div className="p-8 bg-[#FFF0EA] border border-[#FF6B35]/40 space-y-4" style={{ borderRadius: '6px' }}>
        <div className="flex items-center gap-2 text-[#FF6B35]">
          <Flame className="w-5 h-5 text-[#FF6B35]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            ⚠ REAL-WORLD FAILURE ANALYSIS
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#20242A] tracking-tight">
          "Everything worked locally... จนกระทั่งระบบเริ่มคุยข้ามพอร์ตและเจอ Edge Case"
        </h3>
        <p className="text-sm text-[#62666B] leading-relaxed font-sans max-w-3xl">
          ในการสร้างเว็บจริง โค้ดที่รันผ่านไม่ได้แปลว่าไม่มีบั๊ก การเข้าใจกลไก Failure Mode จะช่วยให้คุณเปลี่ยนจากมือสมัครเล่นที่ต้องรอให้เกิดปัญหา มาเป็นวิศวกรที่ออกแบบระบบเพื่อรองรับความผิดพลาดล่วงหน้า (Defensive Programming)
        </p>
      </div>

      {/* 3 Incident Post-Mortem Cards */}
      <div className="space-y-8">
        {m4.content.bugs.map((bug, idx) => {
          const isOpen = openIdx === idx;
          const incidentMeta = incidents[idx] || incidents[0];

          return (
            <div
              key={idx}
              className={`bg-[#FFFFFF] border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-[#20242A] shadow-sm' : 'border-[#D9D8D3] hover:border-[#62666B]'
              }`}
              style={{ borderRadius: '6px' }}
            >
              {/* Card Header & Trigger */}
              <div
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="p-6 sm:p-8 cursor-pointer bg-[#FFFFFF] hover:bg-[#F6F5F1] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#FFF0EA] text-[#FF6B35] border border-[#FF6B35]/30" style={{ borderRadius: '3px' }}>
                      ⚠ FAILURE MODE 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs text-[#62666B]">
                      {bug.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#20242A] tracking-tight">
                    {bug.title}
                  </h3>

                  <div className="font-mono text-xs text-[#62666B] italic pt-1">
                    {incidentMeta.quote}
                  </div>

                  <div className="text-xs font-sans text-[#20242A] pt-1">
                    <span className="text-[#FF6B35] font-semibold">อาการ (Symptom): </span>
                    <span className="text-[#20242A]">{bug.symptom}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start shrink-0 font-sans text-xs pt-1">
                  <span className="text-[#62666B] hidden sm:inline font-medium">
                    {isOpen ? 'ย่อรายละเอียด' : 'ผ่าการแก้ไข'}
                  </span>
                  <div className={`p-1.5 border border-[#D9D8D3] transition-transform ${isOpen ? 'rotate-180 bg-[#20242A] text-white border-[#20242A]' : 'bg-[#F6F5F1] text-[#20242A]'}`} style={{ borderRadius: '4px' }}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Expanded Post-Mortem Analysis */}
              {isOpen && (
                <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-4 border-t border-[#D9D8D3] space-y-8 bg-[#FFFFFF]">
                  {/* Root Cause Section */}
                  <div className="p-5 bg-[#F6F5F1] border border-[#D9D8D3] space-y-2" style={{ borderRadius: '4px' }}>
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-[#FF6B35]" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#20242A]">
                        WHAT HAPPENED & ROOT CAUSE (ต้นตอของปัญหา)
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#62666B] leading-relaxed font-sans">
                      {bug.rootCause}
                    </p>
                  </div>

                  {/* Anti-Pattern Code */}
                  {bug.badCode && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#FF6B35]" />
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                          ANTI-PATTERN: โค้ดที่ทำให้เกิดความล้มเหลว
                        </h4>
                      </div>
                      <CodeWalkthrough
                        file="anti-pattern.js"
                        code={bug.badCode}
                        pitfall={incidentMeta.pitfall}
                      />
                    </div>
                  )}

                  {/* Solution & Best Practice */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#2457FF]" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2457FF]">
                        HOW TO FIX IT: วิธีการแก้ไขแบบเด็ดขาด (PRODUCTION STANDARD)
                      </h4>
                    </div>
                    <CodeWalkthrough
                      file="solution.js"
                      code={bug.goodCode}
                      purpose={incidentMeta.purpose}
                      productionTip={incidentMeta.takeaway}
                    />
                  </div>

                  {/* Server Level Fix if present */}
                  {bug.serverLevelFix && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500" />
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600">
                          GLOBAL ERROR HANDLER: การติดตั้งในระดับรากฐาน (src/server.js)
                        </h4>
                      </div>
                      <CodeWalkthrough
                        file="src/server.js (Centralized Error Handler)"
                        code={bug.serverLevelFix}
                        purpose="ดักจับ Error ที่หลุดรอดจาก Controller ทุกตัวในระบบ เพื่อการันตีว่าจะไม่ทำให้เซิร์ฟเวอร์ค้างเติ่ง"
                      />
                    </div>
                  )}

                  {/* Takeaway Anchor */}
                  <div className="p-4 bg-[#F6F5F1] border border-[#D9D8D3] flex items-center justify-between font-mono text-xs text-[#20242A]" style={{ borderRadius: '4px' }}>
                    <span className="font-bold">ENGINEERING TAKEAWAY:</span>
                    <span className="text-[#62666B] font-sans text-xs">{incidentMeta.takeaway}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">บทเรียนที่ 04: <span className="font-mono">War Stories & Failure Modes</span></span>
      </div>
    </div>
  );
}
