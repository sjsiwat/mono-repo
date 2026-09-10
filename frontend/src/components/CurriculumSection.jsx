import { useState } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { CodeViewer } from './CodeViewer';
import { BeginnerGuide } from './BeginnerGuide';
import { CodeWalkthrough } from './CodeWalkthrough';
import { EnvAndCorsGuide } from './EnvAndCorsGuide';
import { Lightbulb, Sparkles, Check, X, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export function CurriculumSection({ activeTab, onTabChange }) {
  const [openWarBug, setOpenWarBug] = useState(0);

  const m1 = CURRICULUM.modules[0];
  const m2 = CURRICULUM.modules[1];
  const m3 = CURRICULUM.modules[2];
  const m4 = CURRICULUM.modules[3];
  const m5 = CURRICULUM.modules[4];

  const tabs = [
    { id: 'tutorial', num: '00', label: 'Step-by-Step' },
    { id: 'env-cors', num: '01', label: '.env & CORS' },
    { id: 'foundations', num: '02', label: 'API vs REST' },
    { id: 'lifecycle', num: '03', label: 'Lifecycle (v1 vs v2)' },
    { id: 'security', num: '04', label: 'Bcrypt & Identity' },
    { id: 'war-stories', num: '05', label: 'War Stories (Bugs)' },
    { id: 'integration', num: '06', label: 'Frontend Integration' },
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-neutral-200">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            CURRICULUM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-900 tracking-tight mt-1">
            บทเรียนและคู่มือวิศวกรรม API
          </h2>
          <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-2xl font-sans">
            เรียนรู้ผ่านโค้ดจริงของโปรเจกต์ JSD-MONO พร้อมคำอธิบายเชิงลึกและเทคนิคแก้ปัญหาที่นำไปใช้ได้จริง
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
                  : 'bg-white border-neutral-200/90 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900'
              }`}
            >
              <span className="italic font-serif opacity-70">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* STEP-BY-STEP BEGINNER GUIDE (ZERO TO HERO) */}
      {/* ========================================================= */}
      {activeTab === 'tutorial' && <BeginnerGuide />}

      {/* ========================================================= */}
      {/* .ENV AND CORS DEEP DIVE */}
      {/* ========================================================= */}
      {activeTab === 'env-cors' && <EnvAndCorsGuide />}

      {/* ========================================================= */}
      {/* MODULE 01: FOUNDATIONS & ACTORS */}
      {/* ========================================================= */}
      {activeTab === 'foundations' && (
        <div className="pt-12 space-y-12">
          <div>
            <span className="font-serif italic text-2xl text-neutral-400">01</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
              {m1.title}
            </h3>
            <p className="text-neutral-600 mt-2 text-base leading-relaxed">{m1.summary}</p>
          </div>

          {/* Analogy Box */}
          <div className="p-6 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
            <h4 className="font-bold text-lg text-neutral-900 mb-3">
              {m1.content.whatIsApi.title}
            </h4>
            <div className="whitespace-pre-line text-neutral-700 leading-relaxed font-sans text-sm sm:text-base">
              {m1.content.whatIsApi.explanation}
            </div>
          </div>

          {/* ⭐ SPECIAL: API vs REST API ต่างกันอย่างไร? */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-neutral-200/90 shadow-2xs space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-neutral-900 text-white font-mono text-xs font-bold uppercase tracking-wider">
                DEEP DIVE
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-neutral-900">
                API กับ REST API ต่างกันอย่างไร?
              </h4>
            </div>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              คนส่วนใหญ่มักเรียกสลับกัน แต่ในทางวิศวกรรมซอฟต์แวร์ ทั้งสองอย่างมีขอบเขต (Scope) ที่ต่างกันอย่างชัดเจน:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* API Box */}
              <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
                  1. API (Application Programming Interface)
                </div>
                <h5 className="font-bold text-lg text-neutral-900">
                  แนวคิดกว้างๆ: "ล่ามหรือสะพานเชื่อมระหว่างโปรแกรม"
                </h5>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  เป็นคำนิยามระดับกว้าง ไม่จำกัดว่าจะต้องทำงานบนเว็บหรือผ่านอินเทอร์เน็ตเสมอไป ขอเพียงแค่เป็นฟังก์ชันหรือช่องทางที่เปิดให้ซอฟต์แวร์อื่นเรียกใช้ได้ ก็นับเป็น API ทั้งหมด
                </p>
                <div className="p-3 rounded bg-neutral-50 text-xs font-mono text-neutral-700 space-y-1 border border-neutral-200/60">
                  <span className="font-bold text-neutral-900 block">ตัวอย่าง API ที่ไม่ใช่ REST:</span>
                  <div>• DOM API: document.getElementById()</div>
                  <div>• LocalStorage API: localStorage.setItem()</div>
                  <div>• Operating System API: การสั่งให้ Windows/Mac เซฟไฟล์ลง Harddisk</div>
                </div>
              </div>

              {/* REST API Box */}
              <div className="p-5 rounded-xl bg-white border border-neutral-900 shadow-xs space-y-3">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                  2. REST API (Representational State Transfer)
                </div>
                <h5 className="font-bold text-lg text-neutral-900">
                  สถาปัตยกรรมเฉพาะทาง: "API ที่คุยผ่าน HTTP ตามกฎเกณฑ์ REST"
                </h5>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  เป็นประเภทย่อยของ Web API ที่ต้องปฏิบัติตามมาตรฐานสถาปัตยกรรม REST อย่างเคร่งครัด โดยใช้โปรโตคอล HTTP เป็นทางผ่าน และมีกฎเหล็ก 4 ข้อสำคัญ:
                </p>
                <div className="p-3 rounded bg-neutral-900 text-xs font-mono text-neutral-200 space-y-1.5">
                  <div>1. Resource-based: URL ต้องเป็นคำนาม เช่น <span className="text-emerald-400">/api/v1/users</span></div>
                  <div>2. HTTP Verbs: ใช้ Method บ่งบอกการกระทำ (GET, POST, PUT, DELETE)</div>
                  <div>3. Stateless: แต่ละคำขอเป็นอิสระต่อกัน เซิร์ฟเวอร์ไม่เก็บ Session</div>
                  <div>4. JSON Payload: แลกเปลี่ยนข้อมูลด้วยฟอร์แมต JSON มาตรฐาน</div>
                </div>
              </div>
            </div>

            {/* Quick Summary Banner */}
            <div className="p-4 rounded-xl bg-neutral-900 text-neutral-200 text-xs sm:text-sm font-sans flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white">สรุปให้จำง่ายที่สุด:</strong> "REST API ทุกตัวคือ API ... แต่ API ไม่จำเป็นต้องเป็น REST API เสมอไป" 
                (โปรเจกต์ Express พอร์ต 666 จัดเป็น <strong>REST API</strong> ที่สมบูรณ์แบบ เพราะใช้ HTTP Methods และสื่อสารด้วย JSON)
              </div>
            </div>
          </div>

          {/* The 3 Actors */}
          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-4">
              {m1.content.whoDoesItWorkWith.title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {m1.content.whoDoesItWorkWith.actors.map((actor, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-neutral-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      ACTOR 0{idx + 1}
                    </div>
                    <h5 className="font-bold text-base text-neutral-900">{actor.role}</h5>
                    <div className="mt-1 inline-block px-2 py-0.5 rounded bg-neutral-100 text-[11px] font-mono text-neutral-700">
                      {actor.tech}
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {actor.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-4">
              {m1.content.prerequisites.title}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {m1.content.prerequisites.skills.map((skill, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-neutral-100/60 border border-neutral-200/60">
                  <span className="font-mono text-xs font-bold text-neutral-800 uppercase flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
                    <span>{skill.topic}</span>
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {skill.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real Code Walkthrough: Clean Code + Separate Detailed Box */}
          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-2">
              ผ่าโครงสร้างเซิร์ฟเวอร์จริง (backend/src/server.js)
            </h4>
            <CodeWalkthrough
              file="backend/src/server.js"
              code={`import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as apiRoutes } from "./routes/index.js";

const app = express();
const port = 666;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  return res.status(500).json({ error: "Something crash bro", message: err.message });
});

app.listen(port, () => {
  console.log(\`Server is running on PORT \${port}\`);
});`}
              purpose="ทำหน้าที่เป็น Application Gateway เปิดพอร์ต 666 และติดตั้ง Middleware กรองคำขอก่อนส่งต่อไปยัง Routing ย่อย"
              breakdown={[
                {
                  instruction: "app.use(cors({ origin: 'http://localhost:5173', credentials: true }))",
                  why: "เปิดประตูเฉพาะให้หน้าบ้าน React พอร์ต 5173 คุยได้ และอนุญาตให้เบราว์เซอร์ส่ง Cookie ยืนยันตัวตนข้ามพอร์ต"
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
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 02: LIFECYCLE & ARCHITECTURE */}
      {/* ========================================================= */}
      {activeTab === 'lifecycle' && (
        <div className="pt-12 space-y-12">
          <div>
            <span className="font-serif italic text-2xl text-neutral-400">02</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
              {m2.title}
            </h3>
            <p className="text-neutral-600 mt-2 text-base leading-relaxed">{m2.summary}</p>
          </div>

          {/* Step by Step Journey */}
          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-4">
              5 ขั้นตอนการเดินทางของ Request-Response Cycle
            </h4>
            <div className="space-y-3">
              {m2.content.lifecycleSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-200/80"
                >
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-neutral-900 text-white">
                    0{idx + 1}
                  </span>
                  <div>
                    <h5 className="font-bold text-sm sm:text-base text-neutral-900">{step.step}</h5>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison v1 vs v2 */}
          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-2">
              {m2.content.comparison.title}
            </h4>
            <p className="text-neutral-600 text-sm mb-6">
              ในโปรเจกต์ JSD-MONO มีการแบ่ง Version ชัดเจน เพื่อให้เห็นความแตกต่างของการออกแบบระบบ
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* v1 */}
              <div className="p-6 rounded-xl bg-white border border-neutral-200/80 flex flex-col justify-between">
                <div>
                  <div className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold mb-2">
                    STAGE 1 / IN-MEMORY
                  </div>
                  <h5 className="font-bold text-lg text-neutral-900 mb-2">
                    {m2.content.comparison.v1.title}
                  </h5>
                  <CodeViewer
                    file={m2.content.comparison.v1.file}
                    code={m2.content.comparison.v1.code}
                  />
                </div>
                <div className="space-y-1.5 text-xs pt-4 border-t border-neutral-100">
                  <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>ข้อดี: {m2.content.comparison.v1.pros}</span>
                  </p>
                  <p className="text-rose-700 font-medium flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>ข้อจำกัด: {m2.content.comparison.v1.cons}</span>
                  </p>
                </div>
              </div>

              {/* v2 */}
              <div className="p-6 rounded-xl bg-white border border-neutral-200/80 flex flex-col justify-between">
                <div>
                  <div className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold mb-2">
                    STAGE 2 / PRODUCTION READY
                  </div>
                  <h5 className="font-bold text-lg text-neutral-900 mb-2">
                    {m2.content.comparison.v2.title}
                  </h5>
                  <CodeViewer
                    file={m2.content.comparison.v2.file}
                    code={m2.content.comparison.v2.code}
                  />
                </div>
                <div className="space-y-1.5 text-xs pt-4 border-t border-neutral-100">
                  <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>ข้อดี: {m2.content.comparison.v2.pros}</span>
                  </p>
                  <p className="text-amber-700 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>สิ่งที่ต้องระวัง: {m2.content.comparison.v2.cons}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 03: SECURITY & AUTH */}
      {/* ========================================================= */}
      {activeTab === 'security' && (
        <div className="pt-12 space-y-12">
          <div>
            <span className="font-serif italic text-2xl text-neutral-400">03</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
              {m3.title}
            </h3>
            <p className="text-neutral-600 mt-2 text-base leading-relaxed">{m3.summary}</p>
          </div>

          {/* Bcrypt details */}
          <div className="p-6 rounded-xl bg-white border border-neutral-200/80">
            <h4 className="font-bold text-lg text-neutral-900 mb-2">
              {m3.content.bcryptDeepDive.title}
            </h4>
            <div className="whitespace-pre-line text-neutral-700 text-sm sm:text-base leading-relaxed">
              {m3.content.bcryptDeepDive.explanation}
            </div>
          </div>

          {/* Sanitization Code */}
          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-2">
              {m3.content.sanitizationSecret.title}
            </h4>
            <p className="text-neutral-600 text-sm mb-4">
              เทคนิคเด็ดขาดที่ใช้ใน Express controller เพื่อตัด key ลับทิ้งก่อนส่งออกเป็น JSON
            </p>
            <CodeViewer
              file={m3.content.sanitizationSecret.file}
              code={m3.content.sanitizationSecret.code}
              takeaway={m3.content.sanitizationSecret.insight}
            />
          </div>

          {/* HttpOnly Cookie and authUser */}
          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-2">
              {m3.content.cookieAuthFlow.title}
            </h4>
            <p className="text-neutral-600 text-sm mb-4">
              {m3.content.cookieAuthFlow.whyHttpOnly}
            </p>
            <CodeViewer
              file={m3.content.cookieAuthFlow.file}
              code={m3.content.cookieAuthFlow.code}
              takeaway="เมื่อผู้ใช้ล็อกอินสำเร็จ เซิร์ฟเวอร์จะเซ็ต cookie: accessToken ให้เบราว์เซอร์ และทุกครั้งที่เรียก /auth ตัว Middleware authUser จะแกะตรวจอัตโนมัติ"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 04: WAR STORIES & BUGS */}
      {/* ========================================================= */}
      {activeTab === 'war-stories' && (
        <div className="pt-12 space-y-12">
          <div>
            <span className="font-serif italic text-2xl text-neutral-400">04</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
              {m4.title}
            </h3>
            <p className="text-neutral-600 mt-2 text-base leading-relaxed">{m4.summary}</p>
          </div>

          {/* War Bugs Accordion / Cards */}
          <div className="space-y-8">
            {m4.content.bugs.map((bug, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs"
              >
                {/* Bug Header */}
                <div
                  onClick={() => setOpenWarBug(openWarBug === idx ? -1 : idx)}
                  className="p-6 cursor-pointer hover:bg-neutral-50/50 transition-colors flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2">
                      {bug.badge}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-900">
                      {bug.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-mono">
                      อาการ: {bug.symptom}
                    </p>
                  </div>
                  <button className="text-neutral-400 font-mono text-sm px-2 py-1 rounded border border-neutral-200">
                    {openWarBug === idx ? 'ย่อ' : 'ขยายดูวิธีแก้'}
                  </button>
                </div>

                {/* Bug Details */}
                {openWarBug === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-100 space-y-6">
                    <div>
                      <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        ต้นตอของปัญหา (Root Cause)
                      </h5>
                      <p className="text-sm text-neutral-700 leading-relaxed">{bug.rootCause}</p>
                    </div>

                    {bug.badCode && (
                      <div>
                        <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>โค้ดที่ทำให้เกิดปัญหา</span>
                        </h5>
                        <CodeViewer file="anti-pattern.js" code={bug.badCode} />
                      </div>
                    )}

                    <div>
                      <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>วิธีแก้ไขที่ถูกต้องและเด็ดขาด</span>
                      </h5>
                      <CodeViewer file="solution.js" code={bug.goodCode} />
                    </div>

                    {bug.serverLevelFix && (
                      <div>
                        <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                          การดักจับในระดับ Server (Centralized Error Handler)
                        </h5>
                        <CodeViewer file="backend/src/server.js" code={bug.serverLevelFix} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE 05: FRONTEND INTEGRATION */}
      {/* ========================================================= */}
      {activeTab === 'integration' && (
        <div className="pt-12 space-y-12">
          <div>
            <span className="font-serif italic text-2xl text-neutral-400">05</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
              {m5.title}
            </h3>
            <p className="text-neutral-600 mt-2 text-base leading-relaxed">{m5.summary}</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-neutral-200/80">
            <h4 className="font-bold text-lg text-neutral-900 mb-2">
              หลักการ Clean Architecture ฝั่ง Client
            </h4>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              {m5.content.patternIntro}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-2">
              1. โครงสร้าง Service Module (เรียกใช้ข้ามระบบ)
            </h4>
            <CodeViewer
              file="src/services/userService.js"
              code={m5.content.reactCode}
              takeaway="ตั้งค่า credentials: 'include' เสมอเพื่อให้เบราว์เซอร์ส่ง HttpOnly Cookie ไปพร้อมกับ Request"
            />
          </div>

          <div>
            <h4 className="font-bold text-xl text-neutral-900 mb-2">
              2. การนำไปใช้ใน React Component (จัดการ 3 สเตจ: Loading, Data, Error)
            </h4>
            <CodeViewer
              file="src/components/UserList.jsx"
              code={m5.content.reactHookCode}
              takeaway="การแยกสเตจ Loading / Error อย่างชัดเจน ช่วยป้องกันหน้าจอขาว (White screen) และทำให้ผู้ใช้เข้าใจสถานะการเชื่อมต่อ"
            />
          </div>
        </div>
      )}
    </section>
  );
}
