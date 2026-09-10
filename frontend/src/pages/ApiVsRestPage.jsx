import { CURRICULUM } from '../data/curriculum';
import { CodeWalkthrough } from '../components/CodeWalkthrough';
import { BackButton } from '../components/BackButton';
import { Zap, Target, Check, X, ArrowRight, ArrowLeftRight, Radio } from 'lucide-react';

export default function ApiVsRestPage() {
  const m1 = CURRICULUM.modules[0];

  const paradigms = [
    {
      name: 'REST',
      property: 'PULL-BASED / REQUEST-DRIVEN',
      protocol: 'HTTP / 1.1 or 2',
      diagram: 'Client ──(Request)──> Server ──(Response)──> Client',
      what: 'สถาปัตยกรรมแบบตั้งรับ (Passive Server) ที่เซิร์ฟเวอร์จะตื่นขึ้นมาตอบสนองต่อเมื่อฝั่ง Client ยิง HTTP Request เข้ามาเท่านั้น หลังตอบ JSON เสร็จการเชื่อมต่อจะปิดตัวลงทันที (Stateless & Short-lived)',
      why: 'เป็นสากลสูงสุด ทุกภาษาและทุกอุปกรณ์สามารถยิง HTTP ได้อย่างเป็นระเบียบผ่าน Resource URL และ HTTP Verbs (GET, POST, PUT, DELETE) ควบคุมแคชได้ง่าย',
      when: 'เว็บไซต์มาตรฐาน, ระบบ CRUD ข้อมูล, ระบบ Auth/Login, และ API สาธารณะที่ต้องการความเข้ากันได้สูงที่สุด',
      badgeClass: 'bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]'
    },
    {
      name: 'WebSocket',
      property: 'FULL-DUPLEX',
      protocol: 'WS / WSS (TCP)',
      diagram: 'Client <═════(Persistent Bidirectional Pipe)═════> Server',
      what: 'เปิดท่อ TCP ค้างไว้ถาวร ทั้งสองฝั่งสามารถส่งข้อมูลหากันได้ทันทีตลอดเวลาโดยไม่ต้องมี Request นำทาง เซิร์ฟเวอร์สามารถ Push ข้อมูลหาผู้ใช้ได้ในระดับเศษส่วนมิลลิวินาที',
      why: 'ตัด Overhead ของ HTTP Header ที่ต้องส่งซ้ำๆ ทิ้งไป ทำให้ Real-time Latency ต่ำที่สุดเท่าที่จะเป็นไปได้บนเบราว์เซอร์',
      when: 'แอปแชตสด (Discord, Slack, LINE), กระดานเทรดหุ้นและคริปโต, กระดานแข่งขันเกมออนไลน์ Multiplayer',
      badgeClass: 'bg-[#EAF0FF] text-[#2457FF] border border-[#2457FF]/30'
    },
    {
      name: 'Server-Sent Events (SSE)',
      property: 'ONE-WAY STREAM',
      protocol: 'HTTP (text/event-stream)',
      diagram: 'Server ══════(Continuous Event Stream)══════> Client',
      what: 'ใช้โปรโตคอล HTTP ปกติแต่เปิดการเชื่อมต่อค้างไว้ ให้เซิร์ฟเวอร์ยิงข้อความหรือ Event ไหลเป็นสายน้ำ (Stream) มายังหน้าจอเบราว์เซอร์ได้เรื่อยๆ โดยที่ Client ไม่ต้องคอย Refresh',
      why: 'ง่ายกว่า WebSocket มากเพราะทำงานบน HTTP มาตรฐาน มีระบบ Reconnect อัตโนมัติในตัวผ่าน EventSource API ของเบราว์เซอร์',
      when: 'คำตอบของ AI / ChatGPT ที่ตัวอักษรค่อยๆ พิมพ์ออกมา, กระดิ่งแจ้งเตือน Live Notification, ตัววัดผล Server Metric Dashboard',
      badgeClass: 'bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]'
    },
    {
      name: 'GraphQL',
      property: 'CLIENT-DRIVEN',
      protocol: 'HTTP (POST /graphql)',
      diagram: 'Client ──(Query AST)──> GraphQL Engine ──(Exact JSON)──> Client',
      what: 'ภาษาคิวรีสำหรับ API ที่ให้ Client เป็นผู้กำหนดรูปแบบโครงสร้างข้อมูลที่ต้องการส่งกลับมาเอง ผ่าน Endpoint เดี่ยว แก้ปัญหา Over-fetching และ Under-fetching อย่างสมบูรณ์',
      why: 'หน้าบ้านสามารถดึงข้อมูลของหลาย Relation (เช่น ผู้ใช้ + บทความ + ความคิดเห็น) จบได้ใน Request เดียว ไม่ต้องยิง REST 3 รอบ',
      when: 'แอปพลิเคชันมือถือที่ต้องการประหยัด Data Bandwidth, เว็บไซต์ที่มีหน้า Dashboard ซับซ้อนและข้อมูลสัมพันธ์กันหลายระดับ',
      badgeClass: 'bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]'
    },
    {
      name: 'gRPC',
      property: 'BINARY RPC',
      protocol: 'HTTP/2 + Protobuf',
      diagram: 'Client ⇄ [Binary Encoded Protobuf Frames] ⇄ Server',
      what: 'เฟรมเวิร์ก Remote Procedure Call พัฒนาโดย Google เข้ารหัสข้อมูลเป็น Binary ด้วย Protocol Buffers และส่งผ่าน multiplexing ของ HTTP/2 ให้ประสิทธิภาพสูงกว่า JSON มหาศาล',
      why: 'ขนาด Payload เล็กมาก และความเร็วในการ Serialize/Deserialize สูงกว่า JSON ถึง 5-10 เท่า พร้อมมี Strong Typing จากไฟล์ .proto',
      when: 'การสื่อสารภายในสถาปัตยกรรม Microservices ระหว่าง Backend ด้วยกันที่ต้องการความเร็วระดับ Ultra-Low Latency',
      badgeClass: 'bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16 pb-24">
      {/* Editorial Header */}
      <div>
        <BackButton />
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#2457FF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
            FIELD GUIDE 01 / ARCHITECTURAL FOUNDATIONS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#20242A]">
          The Essence of API & REST API Architecture
        </h2>
        <p className="text-[#62666B] mt-2 text-base leading-relaxed max-w-3xl font-sans">
          {m1.summary}
        </p>
      </div>

      {/* Editorial Analogy Box */}
      <div className="p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F6F5F1] text-[#20242A] border border-[#D9D8D3]">
            PHILOSOPHICAL PREMISE
          </span>
          <h3 className="font-bold text-lg text-[#20242A]">
            {m1.content.whatIsApi.title}
          </h3>
        </div>
        <div className="whitespace-pre-line text-[#62666B] leading-relaxed text-sm sm:text-base font-sans">
          {m1.content.whatIsApi.explanation}
        </div>
      </div>

      {/* Core Paradigm Deep Dive: API vs REST API */}
      <div className="p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-6" style={{ borderRadius: '6px' }}>
        <div className="flex items-center justify-between pb-4 border-b border-[#D9D8D3]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-[#20242A] text-white">
              CORE DISTINCTION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#20242A] tracking-tight">
              API กับ REST API ต่างกันอย่างไร?
            </h3>
          </div>
          <span className="font-mono text-xs text-[#62666B] hidden sm:inline">01 CONCEPT vs SPECIFICATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* 1. Generic API */}
          <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#62666B]">
              01. API (APPLICATION PROGRAMMING INTERFACE)
            </div>
            <h4 className="font-bold text-lg text-[#20242A]">
              แนวคิดกว้างๆ: "ล่ามหรือสะพานเชื่อมระหว่างโปรแกรม"
            </h4>
            <p className="text-xs sm:text-sm text-[#62666B] leading-relaxed">
              เป็นคำนิยามระดับกว้าง ไม่จำกัดว่าจะต้องทำงานบนเว็บหรือผ่านอินเทอร์เน็ตเสมอไป ขอเพียงแค่เป็นฟังก์ชันหรือช่องทางที่เปิดให้ซอฟต์แวร์อื่นเรียกใช้ได้ ก็นับเป็น API ทั้งหมด
            </p>
            <div className="p-4 bg-[#FFFFFF] border border-[#D9D8D3] font-mono text-xs text-[#20242A] space-y-1.5" style={{ borderRadius: '4px' }}>
              <span className="font-bold block text-[#62666B] text-[11px] uppercase tracking-wider">ตัวอย่าง API ที่ไม่ใช่ REST:</span>
              <div>• DOM API: <code className="text-[#2457FF]">document.getElementById()</code></div>
              <div>• LocalStorage API: <code className="text-[#2457FF]">localStorage.setItem()</code></div>
              <div>• OS File API: คำสั่งบันทึกข้อมูลลง SSD ระดับระบบปฏิบัติการ</div>
            </div>
          </div>

          {/* 2. REST API */}
          <div className="p-6 bg-[#F6F5F1] border border-[#20242A] space-y-4" style={{ borderRadius: '6px' }}>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#2457FF]">
              02. REST API (REPRESENTATIONAL STATE TRANSFER)
            </div>
            <h4 className="font-bold text-lg text-[#20242A]">
              สถาปัตยกรรมเฉพาะทาง: "API ที่คุยผ่าน HTTP ตามกฎเกณฑ์ REST"
            </h4>
            <p className="text-xs sm:text-sm text-[#62666B] leading-relaxed">
              เป็นประเภทย่อยของ Web API ที่ต้องปฏิบัติตามมาตรฐานสถาปัตยกรรม REST อย่างเคร่งครัด โดยใช้โปรโตคอล HTTP เป็นทางผ่าน และมีกฎเหล็กสำคัญ:
            </p>
            <div className="p-4 bg-[#20242A] text-[#F6F5F1] font-mono text-xs space-y-1.5" style={{ borderRadius: '4px' }}>
              <div>01. Resource-based: URL ต้องเป็นคำนาม เช่น /api/v1/users</div>
              <div>02. HTTP Verbs: ใช้ Method สื่อความหมาย (GET, POST, PUT, DELETE)</div>
              <div>03. Stateless: แต่ละคำขอเป็นอิสระ เซิร์ฟเวอร์ไม่เก็บ Session ในแรม</div>
              <div>04. JSON Payload: แลกเปลี่ยนข้อมูลด้วยฟอร์แมต JSON มาตรฐาน</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Field Guide: 5 Paradigms */}
      <div className="p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-8" style={{ borderRadius: '6px' }}>
        <div className="pb-4 border-b border-[#D9D8D3]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#62666B] font-bold">
            COMMUNICATION PARADIGMS & FIELD COMPARISONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#20242A] mt-1 tracking-tight">
            ธรรมชาติการทำงานของ REST เปรียบเทียบกับอีก 4 สถาปัตยกรรม
          </h3>
          <p className="text-[#62666B] text-sm sm:text-base mt-2 leading-relaxed font-sans max-w-3xl">
            REST ไม่ใช่คำตอบของทุกโจทย์ในงานวิศวกรรม ต่อไปนี้คือคู่มือสรุปธรรมชาติของแต่ละโปรโตคอล พร้อมผังการไหล (Flow Lines) สไตล์ Technical Editorial
          </p>
        </div>

        {/* The 5 Paradigms as Technical Editorial Cards */}
        <div className="grid grid-cols-1 gap-6">
          {paradigms.map((p, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] hover:border-[#2457FF] transition-all space-y-5"
              style={{ borderRadius: '6px' }}
            >
              {/* Top Row: Name + Typographic Property Label */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D9D8D3]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#62666B]">0{idx + 1}</span>
                  <h4 className="text-xl font-bold text-[#20242A] tracking-tight">{p.name}</h4>
                  <span className="text-xs font-mono text-[#62666B]">({p.protocol})</span>
                </div>
                <div className="self-start sm:self-auto">
                  <span className={`font-mono text-xs font-bold tracking-widest px-2.5 py-1 ${p.badgeClass}`} style={{ borderRadius: '4px' }}>
                    {p.property}
                  </span>
                </div>
              </div>

              {/* Minimal ASCII / Flow Diagram */}
              <div className="p-3 bg-[#FFFFFF] border border-[#D9D8D3] font-mono text-xs text-[#20242A] flex items-center justify-center overflow-x-auto text-center" style={{ borderRadius: '4px' }}>
                <span className="font-semibold text-[#2457FF] mr-2">FLOW:</span>
                <span className="text-[#20242A] tracking-wider">{p.diagram}</span>
              </div>

              {/* 3 Editorial Pillars: What it is / Why it matters / When to use */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs sm:text-sm font-sans pt-1">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#20242A] block">
                    ↓ What it is (นิยามหลัก)
                  </span>
                  <p className="text-[#62666B] leading-relaxed">
                    {p.what}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2457FF] block">
                    ↓ Why it matters (ทำไมถึงสำคัญ)
                  </span>
                  <p className="text-[#62666B] leading-relaxed">
                    {p.why}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#20242A] block">
                    ↓ When to use it (งานที่เหมาะสม)
                  </span>
                  <p className="text-[#62666B] leading-relaxed">
                    {p.when}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Matrix Comparison Table */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-[#20242A] tracking-tight">
              ตารางเปรียบเทียบสถาปัตยกรรมการสื่อสารหมัดต่อหมัด (Comparison Matrix)
            </h4>
            <span className="font-mono text-xs text-[#62666B]">ARCHITECTURAL SUMMARY</span>
          </div>

          <div className="overflow-x-auto border border-[#D9D8D3]" style={{ borderRadius: '6px' }}>
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#20242A] text-white font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">เทคโนโลยี</th>
                  <th className="p-3.5">โปรโตคอล</th>
                  <th className="p-3.5">ทิศทาง</th>
                  <th className="p-3.5">สถานะการเชื่อมต่อ</th>
                  <th className="p-3.5">เซิร์ฟเวอร์ Push เองได้?</th>
                  <th className="p-3.5">กรณีใช้งานที่ดีที่สุด</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D8D3] bg-white">
                <tr className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#20242A]">REST API</td>
                  <td className="p-3.5 font-mono text-[#62666B]">HTTP / 1.1 or 2</td>
                  <td className="p-3.5">Client → Server (Pull)</td>
                  <td className="p-3.5">Stateless / ปิดงานทันที</td>
                  <td className="p-3.5 text-[#FF6B35] font-bold">ไม่ได้ (ต้องรอ Request)</td>
                  <td className="p-3.5 text-[#62666B]">เว็บแอปทั่วไป, CRUD, Auth, Public APIs</td>
                </tr>
                <tr className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#2457FF]">WebSocket</td>
                  <td className="p-3.5 font-mono text-[#62666B]">WS / WSS (TCP)</td>
                  <td className="p-3.5 font-medium text-[#2457FF]">Full-Duplex (สองทางตลอดเวลา)</td>
                  <td className="p-3.5">Persistent / ท่อค้างไว้</td>
                  <td className="p-3.5 text-[#2457FF] font-bold">ได้ทันที (เสี้ยววินาที)</td>
                  <td className="p-3.5 text-[#62666B]">แชตสด, กราฟราคาหุ้น/เหรียญ, เกม Multiplayer</td>
                </tr>
                <tr className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#20242A]">SSE (EventSource)</td>
                  <td className="p-3.5 font-mono text-[#62666B]">HTTP Streaming</td>
                  <td className="p-3.5">Server → Client (ทางเดียว)</td>
                  <td className="p-3.5">เปิดท่อค้างเพื่อ Stream</td>
                  <td className="p-3.5 text-[#2457FF] font-bold">ได้ (ทางเดียว)</td>
                  <td className="p-3.5 text-[#62666B]">Streaming คำตอบ AI, Notification แจ้งเตือน</td>
                </tr>
                <tr className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#20242A]">GraphQL</td>
                  <td className="p-3.5 font-mono text-[#62666B]">HTTP (POST)</td>
                  <td className="p-3.5">Client → Server (Query AST)</td>
                  <td className="p-3.5">เปิด-ปิดสั้นๆ ตาม Query</td>
                  <td className="p-3.5 text-[#FF6B35] font-bold">ไม่ได้ (เว้นแต่ใช้ Subscriptions)</td>
                  <td className="p-3.5 text-[#62666B]">แอปมือถือที่ต้องการคุม Bandwidth, หน้าจอซับซ้อน</td>
                </tr>
                <tr className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#20242A]">gRPC</td>
                  <td className="p-3.5 font-mono text-[#62666B]">HTTP/2 Binary</td>
                  <td className="p-3.5">รองรับ 1 ทาง และ 2 ทาง</td>
                  <td className="p-3.5">Multiplexing บน HTTP/2</td>
                  <td className="p-3.5 text-[#2457FF] font-bold">ได้ (Stream RPC)</td>
                  <td className="p-3.5 text-[#62666B]">Microservices ระดับ Ultra-Low Latency</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Actors in System */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#D9D8D3]">
          <h3 className="font-bold text-xl text-[#20242A]">
            {m1.content.whoDoesItWorkWith.title}
          </h3>
          <span className="font-mono text-xs text-[#62666B]">03 SYSTEM ACTORS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {m1.content.whoDoesItWorkWith.actors.map((actor, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] flex flex-col justify-between"
              style={{ borderRadius: '6px' }}
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#62666B] font-semibold mb-1">
                  ACTOR 0{idx + 1}
                </div>
                <h4 className="font-bold text-base text-[#20242A]">{actor.role}</h4>
                <div className="mt-2 inline-block px-2 py-0.5 bg-[#F6F5F1] text-[11px] font-mono text-[#20242A] border border-[#D9D8D3]" style={{ borderRadius: '3px' }}>
                  {actor.tech}
                </div>
                <p className="mt-3 text-xs sm:text-sm text-[#62666B] leading-relaxed">
                  {actor.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Walkthrough: server.js */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#D9D8D3]">
          <h3 className="font-bold text-xl text-[#20242A]">
            ผ่าโครงสร้างเซิร์ฟเวอร์จริง (backend/src/server.js)
          </h3>
          <span className="font-mono text-xs text-[#62666B]">PRODUCTION ENTRYPOINT</span>
        </div>
        <CodeWalkthrough
          file="backend/src/server.js"
          code={`import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as apiRoutes } from "./routes/index.js";

const app = express();
const port = 666;

// ติดตั้ง Middleware ท่อกรองข้อมูล
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// เชื่อมโยงเข้ากับ Routing ย่อย
app.use("/api", apiRoutes);

// Centralized Error Handling
app.use((err, req, res, next) => {
  return res.status(500).json({ error: "Something crash bro", message: err.message });
});

app.listen(port, () => {
  console.log(\`Server is running on PORT \${port}\`);
});`}
          purpose="ทำหน้าที่เป็น Gateway เปิดพอร์ต 666 และติดตั้ง Middlewares กรองคำขอก่อนส่งต่อไปยัง Routing ย่อย"
          whySyntax="Express ทำงานเป็น Middleware Pipeline ทุกคำสั่ง app.use() จะถูกรันเรียงตามลำดับจากบนลงล่าง การวาง cors และ json ไว้บนสุดจึงทำให้คำขอพร้อมถูกประมวลผลก่อนถึง Handler"
          connection="เชื่อมต่อหน้าบ้าน React ผ่าน CORS, ถอดรหัส Cookie ที่ส่งมาจากเบราว์เซอร์, และส่งต่อคำขอไปยัง routes/index.js"
          breakdown={[
            {
              instruction: "app.use(cors({ origin: 'http://localhost:5173', credentials: true }))",
              why: "เปิดประตูเฉพาะให้หน้าบ้าน React พอร์ต 5173 คุยได้ และอนุญาตให้ส่ง Cookie ยืนยันตัวตนข้ามพอร์ต"
            },
            {
              instruction: "app.use(express.json())",
              why: "อ่านข้อมูล JSON Body ที่ส่งมาจากคำขอ POST/PUT แล้วแปลงเป็น Object ใน req.body"
            },
            {
              instruction: "app.use('/api', apiRoutes)",
              why: "กระจายการทำงานไปยังไฟล์ routes/index.js เพื่อแยกย่อยเป็น v1 และ v2 ต่อไป"
            }
          ]}
          pitfall="หากไม่มี app.use((err, req, res, next) => ...) เมื่อ Controller ตัวใดตัวหนึ่ง throw Error ขึ้นมา Express จะหยุดชะงักและทำให้ Request ค้างทันที"
          productionTip="การแยก Port 666 และ 5173 จำลองสถาปัตยกรรม Microservices และ Decoupled Frontend ที่ใช้จริงในองค์กร"
        />
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton label="กลับสู่หน้าหลัก (Home)" className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">บทเรียนที่ 01: <span className="font-mono">The Essence of API & REST API</span></span>
      </div>
    </div>
  );
}
