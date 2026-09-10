import { useState, useMemo } from 'react';
import { executeApiRequest, API_BASE_URL } from '../services/api';
import { Copy, Check, X, Zap, Loader2, Clock, Radio, Lightbulb } from 'lucide-react';

const PRESETS = [
  {
    name: 'GET v1 Users (FakeDB)',
    version: 'v1',
    endpoint: '/users',
    method: 'GET',
    body: '',
    desc: 'ดึงรายชื่อผู้ใช้จาก In-Memory Array (Fake Database)'
  },
  {
    name: 'POST v1 User (FakeDB)',
    version: 'v1',
    endpoint: '/users',
    method: 'POST',
    body: JSON.stringify({
      username: 'somchai_code',
      email: 'somchai@example.com',
      password: 'password1234'
    }, null, 2),
    desc: 'สร้างผู้ใช้ใหม่ลงใน In-Memory Array (v1)'
  },
  {
    name: 'GET v2 Users (MongoDB)',
    version: 'v2',
    endpoint: '/users',
    method: 'GET',
    body: '',
    desc: 'ดึงรายชื่อผู้ใช้ทั้งหมดจาก MongoDB ผ่าน Mongoose'
  },
  {
    name: 'POST v2 Register (Bcrypt 12)',
    version: 'v2',
    endpoint: '/users/register',
    method: 'POST',
    body: JSON.stringify({
      username: 'dev_swiss',
      email: 'swiss@arch.dev',
      role: 'user',
      password: 'SuperSecret123!'
    }, null, 2),
    desc: 'สมัครสมาชิก แฮชรหัสผ่านด้วย Bcrypt 12 rounds และตัด password ออก'
  },
  {
    name: 'POST v2 Login (JWT Cookie)',
    version: 'v2',
    endpoint: '/users/login',
    method: 'POST',
    body: JSON.stringify({
      email: 'swiss@arch.dev',
      password: 'SuperSecret123!'
    }, null, 2),
    desc: 'เข้าสู่ระบบ ตรวจสอบ Bcrypt และสร้าง accessToken Cookie'
  },
  {
    name: 'PUT v2 Update User',
    version: 'v2',
    endpoint: '/users/67c1234567890abcdef12345',
    method: 'PUT',
    body: JSON.stringify({
      username: 'alex_dev_updated',
      role: 'lead_developer'
    }, null, 2),
    desc: 'อัปเดตข้อมูลผู้ใช้เฉพาะฟิลด์ที่ส่งเข้ามา'
  },
  {
    name: 'DELETE v1 User (:id)',
    version: 'v1',
    endpoint: '/users/2',
    method: 'DELETE',
    body: '',
    desc: 'ส่งคำขอลบผู้ใช้ตาม ID ที่ระบุใน URL Param'
  },
  {
    name: 'GET v2 /auth (Cookie Check)',
    version: 'v2',
    endpoint: '/users/auth',
    method: 'GET',
    body: '',
    desc: 'ตรวจสอบสิทธิ์ผ่าน authUser Middleware ด้วย Cookie'
  }
];

export function ApiPlayground() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [method, setMethod] = useState(PRESETS[0].method);
  const [version, setVersion] = useState(PRESETS[0].version);
  const [endpoint, setEndpoint] = useState(PRESETS[0].endpoint);
  const [reqBody, setReqBody] = useState(PRESETS[0].body);

  const [isLoading, setIsLoading] = useState(false);
  const [responseResult, setResponseResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedReq, setCopiedReq] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Validate JSON syntax for POST/PUT/PATCH
  const isJsonValid = useMemo(() => {
    if (!['POST', 'PUT', 'PATCH'].includes(method)) return true;
    if (!reqBody || reqBody.trim() === '') return true;
    try {
      JSON.parse(reqBody);
      return true;
    } catch {
      return false;
    }
  }, [method, reqBody]);

  const handleCopyRequestCode = () => {
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(method) && reqBody && reqBody.trim() !== '';
    const codeSnippet = `fetch('${API_BASE_URL}/api/${version}${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json'
  }${hasBody ? `,\n  body: JSON.stringify(${reqBody.trim()})` : ''}
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`;

    navigator.clipboard.writeText(codeSnippet);
    setCopiedReq(true);
    setTimeout(() => setCopiedReq(false), 2000);
  };

  const handleCopyPayload = () => {
    if (!reqBody) return;
    navigator.clipboard.writeText(reqBody);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setMethod(preset.method);
    setVersion(preset.version);
    setEndpoint(preset.endpoint);
    setReqBody(preset.body);
  };

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    if (['POST', 'PUT', 'PATCH'].includes(newMethod) && (!reqBody || reqBody.trim() === '')) {
      setReqBody(JSON.stringify({
        username: 'tester_code',
        email: 'tester@example.com'
      }, null, 2));
    }
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const res = await executeApiRequest({
        version,
        endpoint,
        method,
        body: reqBody ? reqBody : null
      });
      setResponseResult(res);
    } catch (err) {
      setResponseResult({
        success: false,
        status: 500,
        statusText: 'Internal Error',
        latency: 0,
        data: { error: err.message }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (!responseResult) return;
    const text = typeof responseResult.data === 'object'
      ? JSON.stringify(responseResult.data, null, 2)
      : String(responseResult.data);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-16 bg-[#FFFFFF] border-t border-b border-[#D9D8D3] font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="pb-6 border-b border-[#D9D8D3] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#2457FF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#62666B]">
                INTERACTIVE CONSOLE / SIMULATOR
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#20242A] tracking-tight">
              Interactive API Playground
            </h2>
            <p className="mt-2 text-[#62666B] text-sm sm:text-base max-w-2xl leading-relaxed">
              ระบบจำลองการยิง HTTP Request ให้ทดลองเล่นและดูผลลัพธ์
            </p>
          </div>
          <div className="font-mono text-xs text-[#20242A] px-3 py-1.5 bg-[#F6F5F1] border border-[#D9D8D3] flex items-center gap-2 self-start md:self-auto" style={{ borderRadius: '4px' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SIMULATOR PLAYGROUND</span>
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#62666B]">
            <span>SELECT PRESET BENCHMARK:</span>
            <span className="text-[#20242A] font-semibold">{selectedPreset.name}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`p-2.5 text-left border transition-all text-xs font-mono flex flex-col justify-between cursor-pointer ${
                  selectedPreset.name === p.name
                    ? 'border-[#20242A] bg-[#20242A] text-white shadow-xs'
                    : 'border-[#D9D8D3] bg-[#F6F5F1] text-[#20242A] hover:border-[#2457FF]'
                }`}
                style={{ borderRadius: '4px' }}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>{p.method}</span>
                  <span className="opacity-60 text-[10px]">{p.version}</span>
                </div>
                <div className="text-[11px] truncate mt-1 opacity-80">{p.endpoint}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-[#62666B] font-mono">
            ↳ {selectedPreset.desc}
          </p>
        </div>

        {/* Request & Response Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Request Instrument (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-[#F6F5F1] border border-[#D9D8D3] space-y-4" style={{ borderRadius: '6px' }}>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9D8D3]">
                <h3 className="font-bold text-xs uppercase font-mono tracking-wider text-[#20242A]">
                  1. REQUEST PARAMETERS
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyRequestCode}
                    className="px-2.5 py-1 bg-[#20242A] hover:bg-[#20242A]/80 text-white text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                    style={{ borderRadius: '3px' }}
                    title="Copy Fetch Code for this request"
                  >
                    {copiedReq ? (
                      <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> Copied</span>
                    ) : (
                      <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy Code</span>
                    )}
                  </button>
                  <div className="flex items-center gap-0.5 bg-[#FFFFFF] p-0.5 border border-[#D9D8D3] text-xs font-mono" style={{ borderRadius: '3px' }}>
                    <button
                      type="button"
                      onClick={() => setVersion('v1')}
                      className={`px-2 py-0.5 text-[11px] font-bold ${
                        version === 'v1' ? 'bg-[#20242A] text-white' : 'text-[#62666B]'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      v1
                    </button>
                    <button
                      type="button"
                      onClick={() => setVersion('v2')}
                      className={`px-2 py-0.5 text-[11px] font-bold ${
                        version === 'v2' ? 'bg-[#20242A] text-white' : 'text-[#62666B]'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      v2
                    </button>
                  </div>
                </div>
              </div>

              {/* URL & Method Selector */}
              <div>
                <label className="block text-xs font-mono text-[#62666B] mb-1">METHOD & ENDPOINT</label>
                <div className="flex" style={{ borderRadius: '4px' }}>
                  <select
                    value={method}
                    onChange={(e) => handleMethodChange(e.target.value)}
                    className="px-3 border border-r-0 border-[#D9D8D3] bg-[#FFFFFF] text-[#20242A] text-xs font-mono font-bold focus:outline-none cursor-pointer"
                    style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder="/users"
                    className="block w-full min-w-0 border border-[#D9D8D3] bg-[#FFFFFF] px-3 py-2 text-xs font-mono text-[#20242A] focus:outline-none focus:border-[#20242A]"
                    style={{ borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}
                  />
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-[#62666B] truncate">
                  <span>URL:</span>
                  <span className="text-[#20242A] font-semibold">{API_BASE_URL}/api/{version}{endpoint}</span>
                </div>
              </div>

              {/* JSON Body editor (if POST/PUT/PATCH) */}
              {['POST', 'PUT', 'PATCH'].includes(method) && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono text-[#62666B]">PAYLOAD (JSON BODY)</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="text-[10px] font-mono px-2 py-0.5 border border-[#D9D8D3] bg-[#FFFFFF] hover:bg-[#F6F5F1] text-[#20242A] transition-colors cursor-pointer"
                        style={{ borderRadius: '3px' }}
                      >
                        {copiedPayload ? (
                          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> Copied</span>
                        ) : (
                          <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy JSON</span>
                        )}
                      </button>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                          isJsonValid
                            ? 'bg-[#EAF0FF] text-[#2457FF] border-[#2457FF]/30'
                            : 'bg-[#FFF0EA] text-[#FF6B35] border-[#FF6B35]/30'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        {isJsonValid ? 'Valid JSON' : 'Invalid Syntax'}
                      </span>
                    </div>
                  </div>
                  <textarea
                    rows={8}
                    value={reqBody}
                    onChange={(e) => setReqBody(e.target.value)}
                    placeholder='{"username": "user1", "email": "user@example.com"}'
                    className={`w-full border p-3 font-mono text-xs text-[#20242A] focus:outline-none leading-relaxed bg-[#FFFFFF] ${
                      isJsonValid ? 'border-[#D9D8D3] focus:border-[#20242A]' : 'border-[#FF6B35]'
                    }`}
                    style={{ borderRadius: '4px' }}
                  />
                </div>
              )}

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#20242A] hover:bg-[#20242A]/90 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                style={{ borderRadius: '4px' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>TRANSMITTING REQUEST...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#2457FF]" />
                    <span>EXECUTE HTTP REQUEST</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-[#62666B] font-mono text-center">
                Headers: Content-Type: application/json • credentials: include
              </div>
            </div>
          </div>

          {/* Right Column: Response Inspector (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-[#20242A] bg-[#20242A] text-[#F6F5F1] overflow-hidden shadow-xs h-full flex flex-col min-h-[420px]" style={{ borderRadius: '6px' }}>
              {/* Output Header Bar */}
              <div className="px-5 py-3 bg-[#20242A] border-b border-[#D9D8D3]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#D9D8D3]">RESPONSE INSPECTOR</span>
                  {responseResult && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 font-mono text-[10px] font-bold border ${
                          responseResult.status >= 200 && responseResult.status < 300
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : 'bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/40'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        {responseResult.status} {responseResult.statusText || 'Response'}
                      </span>
                      <span
                        className="px-1.5 py-0.5 font-mono text-[9px] font-semibold border bg-amber-500/10 text-amber-300 border-amber-500/30"
                        style={{ borderRadius: '3px' }}
                      >
                        SIMULATOR
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {responseResult && (
                    <span className="text-xs font-mono text-[#D9D8D3] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D9D8D3]" />
                      <span>{responseResult.latency}ms</span>
                    </span>
                  )}
                  {responseResult && (
                    <button
                      type="button"
                      onClick={handleCopyResponse}
                      className="px-2 py-1 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-white text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1 border border-[#D9D8D3]/20"
                      style={{ borderRadius: '3px' }}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#D9D8D3]" />
                          <span>Copy JSON</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Output Body */}
              <div className="p-5 flex-1 overflow-auto max-h-[500px] font-mono text-xs leading-relaxed text-[#D9D8D3]">
                {responseResult ? (
                  <div>
                    <pre className="selection:bg-[#2457FF]/30">
                      {typeof responseResult.data === 'object'
                        ? JSON.stringify(responseResult.data, null, 2)
                        : responseResult.data}
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-center text-[#62666B] space-y-2">
                    <Radio className="w-8 h-8 text-[#62666B]" />
                    <p className="font-sans text-sm text-[#F6F5F1] font-medium">
                      กดปุ่ม <span className="text-[#2457FF] font-semibold">EXECUTE HTTP REQUEST</span> เพื่อทดสอบ
                    </p>
                    <p className="text-xs text-[#62666B] font-mono max-w-sm">
                      ระบบจะส่งคำขอและคำนวณผลลัพธ์ของ Method และ Payload ที่กำหนด แสดงในรูปแบบ JSON ทันที
                    </p>
                  </div>
                )}
              </div>

              {/* Footer status notice */}
              <div className="px-5 py-2.5 bg-[#20242A] border-t border-[#D9D8D3]/20 text-[11px] font-mono text-[#62666B] flex items-center justify-between flex-wrap gap-2">
                <span>CORS origin: http://localhost:5173</span>
                <span>ระบบจำลอง (Simulator Playground)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
