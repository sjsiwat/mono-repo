import { useState, useEffect } from 'react';

export function HeroSection({ onSelectModule }) {
  const [activeStep, setActiveStep] = useState(0);

  const flowNodes = [
    { label: 'CLIENT', sub: 'React :5173', desc: 'ยิง HTTP Request พร้อม Credentials' },
    { label: 'REQUEST', sub: 'POST /api/v2/...', desc: 'JSON Body + Cookie Headers' },
    { label: 'MIDDLEWARE', sub: 'cors() & authUser', desc: 'ตรวจ Origin & ถอดรหัส JWT' },
    { label: 'CONTROLLER', sub: 'Route Handler', desc: 'Business Logic & Validation' },
    { label: 'DATABASE', sub: 'Mongoose / Supabase', desc: 'Bcrypt Hashing & Read/Write' },
    { label: 'RESPONSE', sub: '200 OK (JSON)', desc: 'ส่ง Payload คืน Client ทันที' }
  ];

  // Subtle automated pulse through the pipeline stages
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowNodes.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [flowNodes.length]);

  const principles = [
    {
      num: "01",
      title: "Start from the contract, not the UI",
      desc: "ทุกอย่างเริ่มต้นที่ API Spec: URL, Method, Data Body และ Status Code ต้องชัดเจน ก่อนที่หน้าจอจะถูกวาดขึ้นมา Interface ของเรามีอยู่เพื่อสะท้อนความจริงของ Data",
      target: "foundations",
      meta: "API_DESIGN_SPEC"
    },
    {
      num: "02",
      title: "Stateless first, pipeline second",
      desc: "เซิร์ฟเวอร์ตอบรับทุก Request ด้วยความเป็นอิสระ ผ่าน Middleware Pipeline ที่ตรวจสอบ CORS, Parse JSON และยืนยันตัวตนตามลำดับอย่างเคร่งครัด",
      target: "lifecycle",
      meta: "EXPRESS_PIPELINE"
    },
    {
      num: "03",
      title: "Never trust incoming input, never leak secrets",
      desc: "รหัสผ่านต้องผ่าน Bcrypt 12 Rounds เสมอ และในการส่ง Response กลับ ต้องตัดรหัสผ่านทิ้งด้วย JavaScript Destructuring ให้หมดจด",
      target: "security",
      meta: "BCRYPT_12_SALT"
    },
    {
      num: "04",
      title: "Fail fast, never leave request pending",
      desc: "กฎเหล็กของ Express: ทุกกิ่งเงื่อนไขต้องจบด้วย res.json() หรือ next(err) เสมอ เพื่อป้องกันปัญหา API ค้างเติ่งที่ทำให้หน้าเว็บหมุนค้างตลอดกาล",
      target: "war-stories",
      meta: "ERROR_RECOVERY"
    }
  ];

  return (
    <section className="pt-14 pb-20 border-b border-[#D9D8D3]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Technical Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#2457FF] animate-signal-pulse" />
          <span className="font-mono text-xs tracking-widest text-[#62666B] uppercase">
            ENGINEERING ARCHITECTURE MANIFESTO // PORT 666 → 5173
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold text-[#20242A] tracking-tight leading-[1.08] max-w-4xl">
          Not just how it connects —<br />
          <span className="text-[#20242A]">how it thinks.</span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#62666B] max-w-2xl font-sans leading-relaxed">
          Four foundational rules behind every API response.<br className="hidden sm:inline" />
          เรียนรู้จริงจากโปรเจกต์จริง สู่หลักการออกแบบและเชื่อมต่อระบบ Front-End + Back-End
        </p>

        {/* Typographic Swiss API Pipeline Flow Diagram */}
        <div className="mt-12 p-4 sm:p-5 rounded border border-[#D9D8D3] bg-white">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D9D8D3] text-[11px] font-mono">
            <span className="text-[#62666B] font-semibold uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2457FF]" />
              RUNTIME REQUEST-RESPONSE PIPELINE
            </span>
            <span className="text-[#62666B] hidden sm:inline">
              LIVE SIGNAL PULSE: STAGE 0{activeStep + 1}
            </span>
          </div>

          {/* Flow Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {flowNodes.map((node, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#2457FF] bg-[#EAF0FF] shadow-2xs'
                      : 'border-[#D9D8D3] bg-[#F6F5F1] hover:border-neutral-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#62666B] mb-1">
                      <span>0{idx + 1}</span>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#2457FF] animate-ping" />}
                    </div>
                    <div className={`font-mono text-xs font-bold tracking-tight ${isCurrent ? 'text-[#2457FF]' : 'text-[#20242A]'}`}>
                      {node.label}
                    </div>
                    <div className="font-mono text-[10px] text-[#62666B] mt-0.5 truncate">
                      {node.sub}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-[#62666B] leading-tight font-sans border-t border-[#D9D8D3]/70 pt-1.5">
                    {node.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="my-14 border-t border-[#D9D8D3]" />

        {/* 4 Swiss Grid Columns (01, 02, 03, 04) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {principles.map((p) => (
            <div
              key={p.num}
              onClick={() => onSelectModule(p.target)}
              className="group cursor-pointer flex flex-col justify-between border-t border-transparent hover:border-[#2457FF] pt-2 transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between">
                  {/* Italic Serif / Grotesk Numbers */}
                  <div className="font-mono text-3xl sm:text-4xl text-[#62666B] group-hover:text-[#2457FF] transition-colors font-light">
                    {p.num}
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#62666B] tracking-wider px-2 py-0.5 rounded border border-[#D9D8D3] bg-white">
                    {p.meta}
                  </span>
                </div>

                {/* Grotesk Bold Title */}
                <h3 className="mt-3 text-lg sm:text-xl font-sans font-bold text-[#20242A] tracking-tight group-hover:text-[#2457FF] transition-colors">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-[#62666B] leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-mono font-medium text-[#62666B] group-hover:text-[#2457FF] transition-colors">
                <span>อ่านบทเรียนที่ {p.num}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
