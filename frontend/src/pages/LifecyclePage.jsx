import { CURRICULUM } from '../data/curriculum';
import { CodeWalkthrough } from '../components/CodeWalkthrough';
import { BackButton } from '../components/BackButton';

export default function LifecyclePage() {
  const m2 = CURRICULUM.modules[1];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div>
        <BackButton />
        <div className="inline-block px-2.5 py-1 rounded bg-neutral-900 text-white font-mono text-xs uppercase tracking-wider mb-2">
          REQUEST LIFECYCLE
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Request-Response Lifecycle & Evolution (v1 vs v2)
        </h2>
        <p className="text-neutral-600 mt-2 text-base leading-relaxed max-w-3xl">
          {m2.summary}
        </p>
      </div>

      {/* 5 Steps */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl text-neutral-900">
          5 ขั้นตอนการเดินทางของ Request-Response Cycle
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {m2.content.lifecycleSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-200/80"
            >
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-neutral-900 text-white">
                0{idx + 1}
              </span>
              <div>
                <h4 className="font-bold text-base text-neutral-900">{step.step}</h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* v1 vs v2 Code Walkthrough */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-xl text-neutral-900 mb-2">
            Stage 1: v1 In-Memory Sandbox
          </h3>
          <CodeWalkthrough
            file="backend/src/routes/v1/users.routes.js"
            code={`import { Router } from "express";
import { users } from "../../fakeDB/users.js";

export const router = Router();

// อ่านข้อมูลผู้ใช้จาก JavaScript Array ในแรม
router.get("/", (req, res) => {
  return res.json(users);
});

// สร้างผู้ใช้ใหม่โดยคำนวณ ID ถัดไป
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  const highestId = users.reduce((max, u) => Math.max(max, Number(u.id)), 0);
  const newUser = { id: String(highestId + 1), username, email, password };
  users.push(newUser);
  return res.status(201).json(newUser);
});`}
            purpose="เรียนรู้พื้นฐาน CRUD โดยเก็บข้อมูลใน JavaScript Array ชั่วคราว"
            breakdown={[
              {
                instruction: "users.push(newUser)",
                why: "บันทึกลงใน RAM โดยตรง ทำให้อ่าน-เขียนรวดเร็วมาก ไม่ต้องต่อ Network ไปหาฐานข้อมูล"
              }
            ]}
            pitfall="เมื่อเซิร์ฟเวอร์ถูกรีสตาร์ท ข้อมูลทั้งหมดจะหายไปและกลับสู่ค่าเริ่มต้น"
          />
        </div>

        <div>
          <h3 className="font-bold text-xl text-neutral-900 mb-2">
            Stage 2: v2 Production Database
          </h3>
          <CodeWalkthrough
            file="backend/src/routes/v2/users.routes.js"
            code={`import { Router } from "express";
import { User } from "../../models/user.model.js";

export const router = Router();

// อ่านข้อมูลผู้ใช้จาก MongoDB ผ่าน Mongoose Model
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});`}
            purpose="เชื่อมต่อฐานข้อมูล MongoDB จริง ข้อมูลถูกจัดเก็บบน Disk อย่างถาวร"
            breakdown={[
              {
                instruction: "await User.find()",
                why: "คำสั่ง Mongoose Query ดึง Document ทั้งหมดจากคอลเลกชัน users ใน MongoDB"
              }
            ]}
            productionTip="ต้องใช้ async/await และครอบด้วย try/catch เสมอ เพื่อรับมือกับกรณีที่ Network หรือ Database มีปัญหา"
          />
        </div>
      </div>

      <div className="pt-8 border-t border-neutral-200/80 flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-neutral-400">บทเรียนที่ 02: <span className="font-mono">Request-Response Lifecycle (v1 vs v2)</span></span>
      </div>
    </div>
  );
}
