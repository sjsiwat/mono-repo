import { useState } from 'react';
import { Copy, Check, Target, HelpCircle, Link2, Search, AlertTriangle, Lightbulb } from 'lucide-react';

function renderHighlightedCodeWithLines(codeText) {
  if (!codeText) return null;
  const lines = codeText.split('\n');

  return (
    <div className="font-mono text-xs leading-relaxed">
      {lines.map((line, lineIdx) => {
        const lineNum = String(lineIdx + 1).padStart(2, '0');
        const trimmed = line.trim();
        const isComment = trimmed.startsWith('//') || trimmed.startsWith('#');

        return (
          <div
            key={lineIdx}
            className="flex items-start hover:bg-[#252A32]/60 px-3 py-0.5 rounded transition-colors group"
          >
            {/* 2-digit Line Number */}
            <span className="font-mono text-[11px] text-neutral-500 select-none w-7 shrink-0 text-right pr-3 pt-0.5 group-hover:text-neutral-400">
              {lineNum}
            </span>

            {/* Code Content */}
            <div className="flex-1 overflow-x-auto">
              {isComment ? (
                <span className="text-[#E5B567] italic font-medium">
                  {line}
                </span>
              ) : line.includes('//') ? (
                (() => {
                  const parts = line.split('//');
                  return (
                    <>
                      <span className="text-neutral-200">{parts[0]}</span>
                      <span className="text-[#E5B567] italic font-medium">
                        // {parts.slice(1).join('//')}
                      </span>
                    </>
                  );
                })()
              ) : (
                <span className="text-neutral-100">{line || '\u00A0'}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CodeWalkthrough({
  file,
  code,
  purpose,
  whySyntax,
  connection,
  breakdown = [],
  pitfall,
  productionTip
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-8 space-y-4">
      {/* 1. Engineer's Notebook Code Frame */}
      <div className="rounded border border-[#D9D8D3] bg-[#1C2025] text-neutral-100 shadow-2xs overflow-hidden font-mono text-xs md:text-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-[#14171B] border-b border-[#2D333B] text-neutral-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#2457FF]"></span>
            <span className="font-mono text-xs text-neutral-200 font-semibold tracking-tight">
              {file || 'SourceCode.js'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              type="button"
              className="px-3 py-1 text-xs rounded border border-[#383E48] hover:border-[#2457FF] hover:text-white transition-all bg-[#20242A] cursor-pointer flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-mono text-[11px]">Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-3.5 overflow-x-auto selection:bg-[#2457FF] selection:text-white font-mono">
          {renderHighlightedCodeWithLines(code)}
        </div>
      </div>

      {/* 2. Structured Swiss Learning Hierarchy Card */}
      <div className="rounded border border-[#D9D8D3] bg-white p-6 sm:p-7 shadow-2xs space-y-6 font-sans">
        {/* Purpose & Why Syntax Header */}
        <div className="pb-4 border-b border-[#D9D8D3]/80 space-y-3">
          {purpose && (
            <div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2457FF] flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-[#EAF0FF] text-[#2457FF]">01 WHAT</span>
                <span>หน้าที่หลัก (Core Purpose)</span>
              </div>
              <p className="text-[#20242A] font-bold text-base sm:text-lg leading-snug">
                {purpose}
              </p>
            </div>
          )}

          {whySyntax && (
            <div className="pt-2">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#62666B] flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded border border-[#D9D8D3] bg-[#F6F5F1] text-[#20242A]">02 WHY</span>
                <span>ทำไมต้องเขียนไวยากรณ์ (Syntax) แบบนี้?</span>
              </div>
              <p className="text-[#62666B] text-xs sm:text-sm leading-relaxed">
                {whySyntax}
              </p>
            </div>
          )}
        </div>

        {/* System Connection Card (03 HOW) */}
        {connection && (
          <div className="p-4 rounded border border-[#D9D8D3] bg-[#F6F5F1] text-xs sm:text-sm">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#20242A] flex items-center gap-2 mb-1">
              <span className="px-1.5 py-0.5 rounded bg-[#EAF0FF] text-[#2457FF]">03 HOW</span>
              <span>เชื่อมต่อกับส่วนไหนของระบบ? (Pipeline Connection)</span>
            </span>
            <p className="text-[#62666B] font-sans leading-relaxed mt-1">{connection}</p>
          </div>
        )}

        {/* Breakdown of Key Instructions */}
        {breakdown.length > 0 && (
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#62666B] flex items-center gap-1.5 mb-3">
              <Search className="w-3.5 h-3.5 text-[#62666B]" />
              <span>แจกแจงคำสั่งแต่ละส่วน (Line-by-Line Breakdown)</span>
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded border border-[#D9D8D3] bg-[#F6F5F1] text-xs sm:text-sm"
                >
                  <div className="font-mono font-bold text-[#20242A] mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2457FF]"></span>
                    <span className="text-[#2457FF]">{item.instruction}</span>
                  </div>
                  <p className="text-[#62666B] leading-relaxed pl-3.5">
                    {item.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What happens if omitted / Pitfall (04 FAILURE MODE) */}
        {pitfall && (
          <div className="p-4 rounded border border-[#FF6B35]/40 bg-[#FFF0EA] text-xs sm:text-sm">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#FF6B35] mb-1 flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#FF6B35] text-white">04 FAILURE MODE</span>
              <span>ถ้าไม่เขียน หรือเขียนผิด จะเกิดอะไรขึ้น?</span>
            </div>
            <p className="text-[#20242A] leading-relaxed font-sans mt-1">{pitfall}</p>
          </div>
        )}

        {/* Production Tip (05 PRODUCTION INSIGHT) */}
        {productionTip && (
          <div className="p-4 rounded border border-[#2457FF]/30 bg-[#EAF0FF] text-xs sm:text-sm">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2457FF] mb-1 flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#2457FF] text-white">05 PRODUCTION INSIGHT</span>
              <span>เกร็ดความรู้ระดับมืออาชีพ</span>
            </div>
            <p className="text-[#20242A] leading-relaxed font-sans mt-1">{productionTip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
