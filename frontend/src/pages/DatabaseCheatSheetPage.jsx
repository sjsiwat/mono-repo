import { useState } from 'react';
import { CodeWalkthrough } from '../components/CodeWalkthrough';
import { BackButton } from '../components/BackButton';
import { Database, Zap, BookOpen, Layers } from 'lucide-react';

export default function DatabaseCheatSheetPage() {
  const [activeDb, setActiveDb] = useState('mongodb'); // 'mongodb' | 'supabase'
  const [activeChapter, setActiveChapter] = useState('read'); // 'read' | 'create' | 'update' | 'delete'

  const chapters = [
    { id: 'read', num: '01', title: 'READ', sub: 'ค้นหา & ดึงข้อมูล' },
    { id: 'create', num: '02', title: 'CREATE', sub: 'สร้าง & เพิ่มข้อมูลใหม่' },
    { id: 'update', num: '03', title: 'UPDATE', sub: 'แก้ไขข้อมูล & คืนค่าใหม่' },
    { id: 'delete', num: '04', title: 'DELETE', sub: 'ลบข้อมูล & ป้องกัน CastError' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16 pb-24">
      {/* Editorial Header */}
      <div>
        <BackButton />
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#2457FF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
            ENGINEERING NOTEBOOK / CHAPTER 02
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#20242A]">
          รวมคำสั่ง MongoDB (Mongoose) และ Supabase ที่ใช้บ่อยที่สุด
        </h2>
        <p className="text-[#62666B] mt-2 text-base leading-relaxed max-w-3xl font-sans">
          บันทึกคู่มือวิศวกรรมข้อมูล: รวบรวมคำสั่ง CRUD, Query Filters, Projections, และวิธีป้องกันบั๊กยอดฮิตในระบบโปรดักชัน
          จัดเรียงตามลำดับบทเรียนมาตรฐานสำหรับวิศวกรซอฟต์แวร์
        </p>
      </div>

      {/* Database Switcher & Chapter Progress Instrument */}
      <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-6" style={{ borderRadius: '6px' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D9D8D3]">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#62666B] block">
              ENGINE / DATABASE CLIENT
            </span>
            <h3 className="font-bold text-lg text-[#20242A] mt-0.5">
              เลือกเทคโนโลยีฐานข้อมูลที่ต้องการศึกษา
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveDb('mongodb')}
              className={`px-4 py-2 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                activeDb === 'mongodb'
                  ? 'bg-[#20242A] text-white border-[#20242A]'
                  : 'bg-[#F6F5F1] text-[#62666B] border-[#D9D8D3] hover:text-[#20242A]'
              }`}
              style={{ borderRadius: '4px' }}
            >
              <Database className="w-3.5 h-3.5 text-[#2457FF]" />
              <span>MongoDB (Mongoose ODM)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDb('supabase')}
              className={`px-4 py-2 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                activeDb === 'supabase'
                  ? 'bg-[#20242A] text-white border-[#20242A]'
                  : 'bg-[#F6F5F1] text-[#62666B] border-[#D9D8D3] hover:text-[#20242A]'
              }`}
              style={{ borderRadius: '4px' }}
            >
              <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Supabase (PostgreSQL Client)</span>
            </button>
          </div>
        </div>

        {/* 4 CRUD Chapters Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#62666B]">
            <span>CHAPTER JUMP & PROGRESS:</span>
            <span className="text-[#20242A] font-bold uppercase">Active: {activeChapter}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {chapters.map((chap) => (
              <button
                key={chap.id}
                type="button"
                onClick={() => {
                  setActiveChapter(chap.id);
                  const el = document.getElementById(`chapter-${chap.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`p-3 text-left border transition-all cursor-pointer font-mono ${
                  activeChapter === chap.id
                    ? 'bg-[#2457FF] text-white border-[#2457FF]'
                    : 'bg-[#F6F5F1] text-[#20242A] border-[#D9D8D3] hover:border-[#2457FF]'
                }`}
                style={{ borderRadius: '4px' }}
              >
                <div className="flex items-center justify-between text-[10px] opacity-70">
                  <span>CHAPTER {chap.num}</span>
                  <span>↓</span>
                </div>
                <div className="font-extrabold text-sm tracking-wider mt-0.5">{chap.title}</div>
                <div className="text-[11px] opacity-80 truncate font-sans">{chap.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MONGODB (MONGOOSE) NOTEBOOK */}
      {/* ========================================================= */}
      {activeDb === 'mongodb' && (
        <div className="space-y-16">
          <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-2" style={{ borderRadius: '6px' }}>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#2457FF]" />
              <h3 className="font-bold text-base text-[#20242A]">
                ทำความเข้าใจ Mongoose ODM ในวิศวกรรม Backend
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#62666B] leading-relaxed font-sans">
              Mongoose เป็นไลบรารีประเภท ODM (Object Data Modeling) ที่ครอบทับ MongoDB Driver ดิบ
              ช่วยให้เราเขียนคำสั่ง JavaScript สื่อสารกับฐานข้อมูลแบบ NoSQL Document ได้อย่างมีระบบ มี Schema กำหนดไทป์ของข้อมูลอย่างแม่นยำ และมี Hooks ช่วยแฮชรหัสผ่าน
            </p>
          </div>

          {/* Chapter 01: READ */}
          <section id="chapter-read" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#2457FF] tracking-widest block">
                  CHAPTER 01
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  READ
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งค้นหาและดึงข้อมูลจาก Collection
              </span>
            </div>

            <CodeWalkthrough
              file="MongoDB Read Commands"
              code={`// 1. ค้นหาทั้งหมด (ดึงทุกเอกสารใน Collection)
const allUsers = await User.find();

// 2. ค้นหาแบบมีเงื่อนไข (เช่น หาคนที่มี role เป็น admin)
const admins = await User.find({ role: "admin" });

// 3. ค้นหาคนแรกที่ตรงเงื่อนไข (คืนค่าเป็น Object ชิ้นเดียว)
const user = await User.findOne({ email: "alice@example.com" });

// 4. ค้นหาด้วย _id ของ MongoDB โดยตรง
const userById = await User.findById("65f1234567890abcdef12345");

// 5. ⭐ ดึงฟิลด์ลับที่ถูกซ่อนไว้ (เช่น password ที่ตั้ง select: false)
const userWithPw = await User.findOne({ email }).select("+password");

// 6. จำกัดจำนวนและเรียงลำดับ (Pagination & Sorting)
const recentUsers = await User.find()
  .sort({ createdAt: -1 }) // เรียงจากใหม่ไปเก่า (-1 = DESC, 1 = ASC)
  .skip(10)               // ข้าม 10 แถวแรก
  .limit(5);              // ดึงมาแค่ 5 แถว`}
              purpose="ดึงข้อมูลจาก MongoDB Collection ตามเงื่อนไขและฟิลเตอร์ที่กำหนด"
              whySyntax="Mongoose Query Methods เป็น asynchronous เสมอ การใส่ await จะทำให้ Node.js รอการตอบกลับจาก MongoDB Server ก่อนประมวลผลบรรทัดถัดไป"
              connection="ส่งผลลัพธ์ข้อมูลไปยัง Controller เพื่อแพ็กใส่ res.status(200).json({ data }) ตอบกลับ Client"
              breakdown={[
                {
                  instruction: "User.find()",
                  why: "คืนค่าเป็น JavaScript Array เสมอ ถ้าไม่พบข้อมูลจะได้ Array ว่าง [] โดยไม่ throw Error"
                },
                {
                  instruction: "User.findOne() และ User.findById()",
                  why: "คืนค่าเป็น Object เอกสารเดี่ยวๆ ถ้าหาไม่เจอจะได้ค่าเป็น null จึงต้องตรวจ if (!user) เสมอ"
                },
                {
                  instruction: ".select('+password')",
                  why: "ใน user.model.js เราตั้ง password ให้ select: false ไว้เพื่อความปลอดภัย คำสั่งนี้คือการขอเปิดดูฟิลด์ลับเป็นกรณีพิเศษสำหรับขั้นตอนตรวจเช็ก Login"
                }
              ]}
              productionTip="ห้ามดึงข้อมูลทั้งหมดด้วย User.find() บนตารางขนาดใหญ่ใน Production ให้ใส่ .limit() และ .skip() หรือ Cursor-based pagination เสมอ"
            />
          </section>

          {/* Chapter 02: CREATE */}
          <section id="chapter-create" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#2457FF] tracking-widest block">
                  CHAPTER 02
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  CREATE
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งสร้างและบันทึกข้อมูลเอกสารใหม่
              </span>
            </div>

            <CodeWalkthrough
              file="MongoDB Create Commands"
              code={`// วิธีที่ 1: ใช้ User.create() (กระชับและเป็นที่นิยมที่สุด)
const newUser = await User.create({
  username: "somchai",
  email: "somchai@example.com",
  password: hashedPassword, // ต้องเป็นรหัสที่แฮชผ่าน bcrypt แล้ว
  role: "user"
});

// วิธีที่ 2: ใช้ new User() แล้วสั่ง .save()
const userInstance = new User({
  username: "somsri",
  email: "somsri@example.com",
  password: hashedPassword
});
await userInstance.save();`}
              purpose="บันทึกเอกสารใหม่ลงในคอลเลกชัน users พร้อมตรวจเช็ก Schema Validation อัตโนมัติ"
              whySyntax="User.create() รับ JavaScript Object ที่มี Key ตรงตามพิมพ์เขียว Schema จากนั้นจะทำการตรวจสอบ Validation Rules ก่อนบันทึกจริง"
              connection="รับ req.body มาจาก Client ผ่าน express.json() แล้วส่งต่อไปยัง MongoDB Atlas"
              breakdown={[
                {
                  instruction: "await User.create(data)",
                  why: "คำสั่งนี้จะทำการ Validate ข้อมูลตาม Schema ใน user.model.js (เช่น เช็ก email ซ้ำ, เช็ก regex) แล้วบันทึกลง MongoDB ทันทีในคำสั่งเดียว"
                }
              ]}
              pitfall="ถ้าอีเมลซ้ำกับคนที่มีอยู่แล้วในระบบ MongoDB จะ throw Duplicate Key Error (code 11000) ต้องครอบด้วย try...catch เสมอ"
              productionTip="อย่าส่ง req.body เข้าไปใน User.create(req.body) ตรงๆ โดยไม่คัดกรองฟิลด์ เพราะผู้ไม่หวังดีอาจยัด role: 'admin' เข้ามาได้"
            />
          </section>

          {/* Chapter 03: UPDATE */}
          <section id="chapter-update" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#2457FF] tracking-widest block">
                  CHAPTER 03
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  UPDATE
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งค้นหา แก้ไข และคืนค่าข้อมูลใหม่
              </span>
            </div>

            <CodeWalkthrough
              file="MongoDB Update Commands"
              code={`// 1. ค้นหาตาม ID แล้วอัปเดต พร้อมคืนค่าข้อมูลตัวใหม่ที่อัปเดตแล้ว
const updatedUser = await User.findByIdAndUpdate(
  id,
  { username: "new_name", email: "new_email@test.com" },
  {
    returnDocument: "after", // หรือ new: true เพื่อขอรับเอกสารใหม่หลังแก้
    runValidators: true     // บังคับให้ตรวจกฎ Schema ด้วย
  }
);

// 2. อัปเดตหลายรายการพร้อมกันที่ตรงเงื่อนไข
await User.updateMany(
  { role: "user" },
  { $set: { status: "active" } }
);`}
              purpose="ค้นหาและแก้ไขข้อมูลในฐานข้อมูลอย่างถูกต้องตามเงื่อนไข"
              whySyntax="findByIdAndUpdate รวม 2 ขั้นตอน (หา + แก้) เข้าด้วยกันเป็น Atomic Operation ทำให้ปลอดภัยต่อการแก้ข้อมูลพร้อมกัน (Race Conditions)"
              breakdown={[
                {
                  instruction: "returnDocument: 'after' (หรือ new: true)",
                  why: "ค่าเริ่มต้นของ Mongoose จะคืนค่าเอกสาร 'ก่อนแก้ไข' แต่การใส่ตัวเลือกนี้จะทำให้ได้เอกสาร 'หลังแก้ไขล่าสุด' ส่งกลับไปหา Client"
                },
                {
                  instruction: "runValidators: true",
                  why: "บังคับให้ Mongoose ตรวจกฎ Schema อีกครั้งตอนอัปเดต (เช่น ตรวจรูปแบบ email หรือข้อจำกัด enum)"
                }
              ]}
              pitfall="ค่าเริ่มต้นของ Mongoose การ update จะ 'ไม่' รัน Custom Validators เว้นแต่คุณจะส่ง runValidators: true เข้าไปอย่างชัดเจน"
            />
          </section>

          {/* Chapter 04: DELETE */}
          <section id="chapter-delete" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#FF6B35] tracking-widest block">
                  CHAPTER 04
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  DELETE
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งลบข้อมูล & เทคนิคตรวจ ObjectId ป้องกัน CastError
              </span>
            </div>

            <CodeWalkthrough
              file="MongoDB Delete & Validation"
              code={`import mongoose from "mongoose";

// ⭐ เทคนิคป้องกัน CastError ในระบบระดับ Production:
// ตรวจก่อนว่า String id ที่ส่งมาใน URL เป็น ObjectId ของ MongoDB หรือไม่
let deleted = null;
if (mongoose.Types.ObjectId.isValid(id)) {
  deleted = await User.findByIdAndDelete(id);
}

// ถ้าไม่ใช่ ObjectId หรือยังไม่พบลบ ให้ลองลบด้วย username แทน
if (!deleted) {
  deleted = await User.findOneAndDelete({ username: id });
}

// ลบหลายเอกสารพร้อมกัน
await User.deleteMany({ role: "inactive" });`}
              purpose="ลบข้อมูลอย่างปลอดภัยโดยไม่ทำให้เซิร์ฟเวอร์พังด้วย CastError"
              whySyntax="ObjectId ของ MongoDB มีฟอร์แมตเฉพาะ (เลขฐาน 16 ความยาว 24 ตัว) การตรวจเช็กด้วย isValid() ล่วงหน้าเป็นมาตรฐานสากลในการเขียน Robust Code"
              breakdown={[
                {
                  instruction: "mongoose.Types.ObjectId.isValid(id)",
                  why: "หากผู้ใช้ส่ง id ผิดฟอร์แมต เช่นส่ง 'somchai' มา แล้วเราเอาไปยิง findById() ตรงๆ Mongoose จะ Crash ทันทีด้วย CastError ฟังก์ชันนี้จึงเป็นตัวตรวจเช็กความปลอดภัยชั้นแรก"
                }
              ]}
              pitfall="การสั่ง delete โดยไม่ตรวจสอบ id อาจทำให้โปรแกรม crash หรือลบข้อมูลผิดพลาดหากผู้ใช้ส่งค่า null เข้ามา"
              productionTip="ในระบบจริง มักนิยมทำ Soft Delete (เซ็ต deletedAt: new Date()) มากกว่า Hard Delete เพื่อเก็บประวัติการทำงานไว้ตรวจสอบย้อนหลัง"
            />
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUPABASE (POSTGRESQL) NOTEBOOK */}
      {/* ========================================================= */}
      {activeDb === 'supabase' && (
        <div className="space-y-16">
          <div className="p-6 bg-[#FFFFFF] border border-[#D9D8D3] space-y-2" style={{ borderRadius: '6px' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF6B35]" />
              <h3 className="font-bold text-base text-[#20242A]">
                ทำความเข้าใจ Supabase PostgreSQL ในวิศวกรรม Backend
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#62666B] leading-relaxed font-sans">
              Supabase เป็นฐานข้อมูลเชิงสัมพันธ์ระดับองค์กร (Relational Database) ที่ทำงานบน <strong>PostgreSQL</strong> 
              โดยการเรียกใช้งานผ่าน JavaScript Client จะใช้โครงสร้างแบบ Method Chaining ที่เข้าใจง่าย คล้ายภาษา SQL มีโครงสร้าง Type-safe และรองรับ Row Level Security (RLS)
            </p>
          </div>

          {/* Chapter 01: READ */}
          <section id="chapter-read" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#2457FF] tracking-widest block">
                  CHAPTER 01
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  READ
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งดึงข้อมูล (SELECT) จากตาราง PostgreSQL
              </span>
            </div>

            <CodeWalkthrough
              file="Supabase Select Commands"
              code={`// 1. ดึงทุกคอลัมน์จากตาราง users
const { data, error } = await supabase
  .from("users")
  .select("*");

// 2. ดึงเฉพาะคอลัมน์ที่ต้องการ (Projection)
const { data, error } = await supabase
  .from("users")
  .select("id, username, email, role, created_at");

// 3. กรองข้อมูลด้วยเงื่อนไข (.eq = Equals)
const { data, error } = await supabase
  .from("users")
  .select("id, username")
  .eq("role", "admin");

// 4. ดึงแถวเดียวแบบชัดเจน (.single())
const { data: user, error } = await supabase
  .from("users")
  .select("*")
  .eq("id", id)
  .single();

// 5. การจัดเรียงและแบ่งหน้า (Ordering & Pagination)
const { data, error } = await supabase
  .from("users")
  .select("*")
  .order("created_at", { ascending: false }) // เรียงจากใหม่ไปเก่า
  .range(0, 9); // ดึงแถวที่ 0 ถึง 9 (รวม 10 แถว)`}
              purpose="สั่ง Query ดึงข้อมูลจากตาราง PostgreSQL ใน Supabase Cloud"
              whySyntax="Supabase Client ใช้ Fluent API Chaining คล้ายกับการต่อคำสั่ง SELECT ... FROM ... WHERE ... ORDER BY ใน SQL แบบดั้งเดิม"
              breakdown={[
                {
                  instruction: "const { data, error } = await supabase...",
                  why: "Supabase จะคืนค่ากลับมาเป็น Object ที่มี 2 คีย์เสมอ คือ data (ผลลัพธ์) และ error (ข้อผิดพลาด ถ้าไม่มีจะเป็น null)"
                },
                {
                  instruction: ".single()",
                  why: "แปลงผลลัพธ์จาก Array [ { ... } ] ให้กลายเป็น Object ตัวเดียว { ... } สะดวกมากเวลาค้นหาด้วย Primary Key"
                }
              ]}
              pitfall="หากใช้ .single() แล้วฐานข้อมูลไม่พบแถวที่ตรงกัน หรือพบมากกว่า 1 แถว ตัว Supabase จะส่ง error กลับมาทันที ต้องตรวจ if (error) เสมอ"
            />
          </section>

          {/* Chapter 02: CREATE */}
          <section id="chapter-create" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#2457FF] tracking-widest block">
                  CHAPTER 02
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  CREATE
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งเพิ่มข้อมูลแถวใหม่ (INSERT)
              </span>
            </div>

            <CodeWalkthrough
              file="Supabase Insert Commands"
              code={`// 1. เพิ่มข้อมูล 1 แถว พร้อมขอรับข้อมูลที่สร้างใหม่กลับมา
const { data, error } = await supabase
  .from("users")
  .insert([
    {
      username: "somchai",
      email: "somchai@supabase.io",
      password: hashedPassword,
      role: "user"
    }
  ])
  .select("id, username, email, created_at")
  .single();

if (error) throw error;
return res.status(201).json({ success: true, data });`}
              purpose="เพิ่มแถวใหม่ลงในตาราง PostgreSQL อย่างถูกต้อง"
              whySyntax="คำสั่ง insert() รับ Array ของ Object เพื่อรองรับการทำ Bulk Insert (เพิ่มทีละหลายแถวในคำสั่งเดียว) ได้อย่างราบรื่น"
              breakdown={[
                {
                  instruction: ".insert([ { ... } ])",
                  why: "ต้องส่งข้อมูลเข้าไปเป็น Array ของ Object แม้ว่าจะเพิ่มแค่แถวเดียวก็ตาม"
                },
                {
                  instruction: ".select('...').single()",
                  why: "ใน PostgreSQL การเพิ่มข้อมูลค่าเริ่มต้นจะไม่ส่งแถวข้อมูลที่เพิ่งสร้างกลับมา คำสั่ง .select() ทำหน้าที่เหมือน RETURNING ใน SQL เพื่อขอแถวข้อมูลกลับมาแสดง"
                }
              ]}
            />
          </section>

          {/* Chapter 03: UPDATE */}
          <section id="chapter-update" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#2457FF] tracking-widest block">
                  CHAPTER 03
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  UPDATE
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งแก้ไขข้อมูลตามเงื่อนไข (UPDATE)
              </span>
            </div>

            <CodeWalkthrough
              file="Supabase Update Commands"
              code={`// แก้ไขข้อมูลเฉพาะแถวที่ id ตรงกัน (.eq("id", id))
const { data, error } = await supabase
  .from("users")
  .update({
    username: "new_username",
    email: "new_email@example.com",
    updated_at: new Date().toISOString()
  })
  .eq("id", targetId)
  .select("id, username, email, updated_at")
  .single();

if (error) throw error;`}
              purpose="อัปเดตฟิลด์ในแถวที่ระบุอย่างแม่นยำ"
              whySyntax="คำสั่ง update() รับ Object เฉพาะฟิลด์ที่ต้องการเปลี่ยน แล้วเชื่อมด้วย .eq() เพื่อกำหนดขอบเขตแถวข้อมูล"
              breakdown={[
                {
                  instruction: ".eq('id', targetId)",
                  why: "คำสั่ง Where Clause ระบุเจาะจง [ข้อควรระวัง: ถ้าไม่มี .eq() จะเป็นการอัปเดตทุกแถวในตาราง!]"
                }
              ]}
              pitfall="ห้ามลืมใส่ .eq() เด็ดขาด เพราะใน SQL หากไม่มี WHERE clause จะส่งผลกระทบต่อทุก Record ในฐานข้อมูล"
            />
          </section>

          {/* Chapter 04: DELETE */}
          <section id="chapter-delete" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-[#20242A] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#FF6B35] tracking-widest block">
                  CHAPTER 04
                </span>
                <h3 className="text-3xl font-black text-[#20242A] tracking-tight">
                  DELETE
                </h3>
              </div>
              <span className="font-mono text-xs text-[#62666B]">
                คำสั่งลบแถวข้อมูลออกจากตาราง
              </span>
            </div>

            <CodeWalkthrough
              file="Supabase Delete Commands"
              code={`// ลบแถวข้อมูลตาม ID
const { data, error } = await supabase
  .from("users")
  .delete()
  .eq("id", targetId);

if (error) throw error;
return res.status(200).json({ success: true, message: "User deleted successfully" });`}
              purpose="ลบแถวข้อมูลออกจากตารางใน Supabase อย่างปลอดภัย"
              whySyntax="คำสั่ง delete() จะทำงานควบคู่กับตัวกรอง .eq() เพื่อลบเฉพาะแถวเป้าหมาย"
              breakdown={[
                {
                  instruction: ".delete().eq('id', targetId)",
                  why: "สั่งลบเฉพาะแถวที่มี id ตรงกับที่ระบุเท่านั้น"
                }
              ]}
              pitfall="ห้ามสั่ง supabase.from('users').delete() โดยไม่มีเงื่อนไข .eq() หรือ .filter() เด็ดขาด เพราะจะทำให้ข้อมูลถูกลบเกลี้ยงทั้งตาราง!"
            />
          </section>

          {/* 5. FILTER OPERATORS CHEAT SHEET */}
          <div className="p-8 bg-[#FFFFFF] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
              <h4 className="font-bold text-lg text-[#20242A]">
                ตารางรวม Operator ตัวกรองข้อมูลของ Supabase ที่ใช้บ่อย:
              </h4>
              <span className="font-mono text-xs text-[#62666B]">QUERY FILTERS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#F6F5F1] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
                <span className="font-bold text-[#2457FF] block">.eq("col", val)</span>
                <span className="text-[#62666B] font-sans text-xs">เท่ากับ (Equal: =)</span>
              </div>
              <div className="p-3 bg-[#F6F5F1] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
                <span className="font-bold text-[#2457FF] block">.neq("col", val)</span>
                <span className="text-[#62666B] font-sans text-xs">ไม่เท่ากับ (Not Equal: !=)</span>
              </div>
              <div className="p-3 bg-[#F6F5F1] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
                <span className="font-bold text-[#2457FF] block">.gt("col", val)</span>
                <span className="text-[#62666B] font-sans text-xs">มากกว่า (Greater Than: &gt;)</span>
              </div>
              <div className="p-3 bg-[#F6F5F1] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
                <span className="font-bold text-[#2457FF] block">.lt("col", val)</span>
                <span className="text-[#62666B] font-sans text-xs">น้อยกว่า (Less Than: &lt;)</span>
              </div>
              <div className="p-3 bg-[#F6F5F1] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
                <span className="font-bold text-[#2457FF] block">.like("col", "%val%")</span>
                <span className="text-[#62666B] font-sans text-xs">ค้นหาข้อความ (Case-sensitive)</span>
              </div>
              <div className="p-3 bg-[#F6F5F1] border border-[#D9D8D3]" style={{ borderRadius: '4px' }}>
                <span className="font-bold text-[#2457FF] block">.ilike("col", "%val%")</span>
                <span className="text-[#62666B] font-sans text-xs">ค้นหาข้อความไม่สนตัวพิมพ์เล็ก-ใหญ่</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">บทเรียนที่ 02: <span className="font-mono">Database Essentials (CRUD)</span></span>
      </div>
    </div>
  );
}
