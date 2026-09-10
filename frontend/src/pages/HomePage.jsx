import { HeroSection } from '../components/HeroSection';
import { ArrowUpRight, Terminal, Shield, Database, Compass, Flame, Radio } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const modules = [
    {
      id: 'tutorial',
      code: 'MOD_01',
      badge: 'COMPLETE LIFECYCLE (10 STEPS)',
      title: 'Step-by-Step: สร้าง Backend ตั้งแต่ 0 จนรันได้',
      desc: 'รวบรวมทุกไฟล์จริง: .env, CORS, Database, Schema, Middleware, Routes v1/v2, และ Server.js เรียงตามขั้นตอนสากล',
      icon: Terminal,
      colSpan: 'lg:col-span-7',
      isPrimary: true
    },
    {
      id: 'databases',
      code: 'MOD_02',
      badge: 'DATABASE ESSENTIALS',
      title: 'รวมคำสั่ง MongoDB & Supabase ที่ใช้บ่อย',
      desc: 'คู่มือคำสั่ง CRUD, Query Filters, Projections, และเทคนิคป้องกัน CastError ใน MongoDB Mongoose และ Supabase Client',
      icon: Database,
      colSpan: 'lg:col-span-5'
    },
    {
      id: 'foundations',
      code: 'MOD_03',
      badge: 'PARADIGMS & ARCHITECTURE',
      title: 'API กับ REST API ต่างกันอย่างไร?',
      desc: 'วิเคราะห์ความแตกต่างระหว่าง API ทั่วไปกับ REST API, เปรียบเทียบ WebSocket, SSE, GraphQL และ gRPC หมัดต่อหมัด',
      icon: Compass,
      colSpan: 'lg:col-span-4'
    },
    {
      id: 'structure',
      code: 'MOD_04',
      badge: 'MONOREPO BLUEPRINT',
      title: 'แผนผังโครงสร้างโปรเจกต์ (Structure)',
      desc: 'ผังการไหลของข้อมูล 4 ระดับ (Pipeline Tiers) และต้นไม้โครงสร้างไฟล์จริงในโปรเจกต์ JSD-MONO',
      icon: Radio,
      colSpan: 'lg:col-span-4'
    },
    {
      id: 'security',
      code: 'MOD_05',
      badge: 'CRYPTOGRAPHY & AUTH',
      title: 'Bcrypt Hashing & HttpOnly Cookie',
      desc: 'มาตรฐานความปลอดภัยระดับ Production: แฮช 12 รอบ, เทคนิค Destructuring ตัดรหัสทิ้ง, และด่านตรวจ authUser.js',
      icon: Shield,
      colSpan: 'lg:col-span-4'
    },
    {
      id: 'war-stories',
      code: 'MOD_06',
      badge: 'ENGINEERING POST-MORTEMS',
      title: 'War Stories: ถอดบทเรียนบั๊กจริง',
      desc: 'เจาะลึกปัญหา API ค้างเติ่ง, CORS credentials หาย และวิธีดีบักสาเหตุที่แท้จริงอย่างเด็ดขาด',
      icon: Flame,
      colSpan: 'lg:col-span-6',
      isWarning: true
    },
    {
      id: 'playground',
      code: 'MOD_07',
      badge: 'INTERACTIVE RUNTIME',
      title: 'Live API Console & Workbench',
      desc: 'ห้องทดลองยิง HTTP Request เชื่อมต่อกับ Backend พอร์ต 666 จริง พร้อมระบบทดสอบ Payload เรียลไทม์',
      icon: Terminal,
      colSpan: 'lg:col-span-6'
    }
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Editorial Hero */}
      <HeroSection onSelectModule={onNavigate} />

      {/* Asymmetric Swiss Knowledge Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="pb-6 border-b border-[#D9D8D3] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#2457FF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
                CURRICULUM INDEX / 07 CHAPTERS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#20242A] tracking-tight mt-1">
              สารบัญโมดูลการเรียนรู้วิศวกรรม API
            </h2>
          </div>
        </div>

        {/* 12-Column Swiss Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-8">
          {modules.map((m) => {
            const IconComponent = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigate(m.id)}
                className={`${m.colSpan} group cursor-pointer p-7 bg-[#FFFFFF] border border-[#D9D8D3] hover:border-[#2457FF] transition-all duration-200 flex flex-col justify-between relative`}
                style={{ borderRadius: '6px' }}
              >
                {/* Top bar with module code and badge */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#F6F5F1]">
                    <span className="font-mono text-xs font-bold text-[#20242A] tracking-wider">
                      {m.code}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-sm uppercase ${
                        m.isWarning
                          ? 'bg-[#FFF0EA] text-[#FF6B35] border border-[#FF6B35]/30'
                          : m.isPrimary
                          ? 'bg-[#EAF0FF] text-[#2457FF] border border-[#2457FF]/30'
                          : 'bg-[#F6F5F1] text-[#62666B]'
                      }`}
                    >
                      {m.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="pt-5">
                    <h3 className="font-bold text-lg sm:text-xl text-[#20242A] tracking-tight group-hover:text-[#2457FF] transition-colors leading-snug">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#62666B] mt-2.5 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-8 pt-4 border-t border-[#F6F5F1] flex items-center justify-between text-xs font-mono text-[#62666B] group-hover:text-[#20242A]">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <IconComponent className="w-3.5 h-3.5 text-[#62666B] group-hover:text-[#2457FF] transition-colors" />
                    <span>เข้าสู่บทเรียน</span>
                  </span>
                  <div className="flex items-center gap-1 text-[#2457FF] opacity-80 group-hover:translate-x-1 transition-transform">
                    <span className="text-[11px] font-semibold">READ CHAPTER</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
