import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

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

export function CodeViewer({ title, file, code, takeaway }) {
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
    <div className="my-6 rounded border border-[#D9D8D3] bg-[#1C2025] text-neutral-100 shadow-2xs overflow-hidden font-mono text-xs md:text-sm">
      {/* Editorial Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#14171B] border-b border-[#2D333B] text-neutral-400">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#2457FF]"></span>
          <span className="font-mono text-xs text-neutral-300 font-medium tracking-tight">
            {file || title || 'code-snippet.js'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            type="button"
            className="px-2.5 py-1 text-xs rounded border border-[#383E48] hover:border-[#2457FF] hover:text-white transition-all bg-[#20242A] cursor-pointer flex items-center gap-1.5"
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

      {/* Code Body with Line Numbers */}
      <div className="p-3.5 overflow-x-auto selection:bg-[#2457FF] selection:text-white font-mono">
        {renderHighlightedCodeWithLines(code)}
      </div>

      {takeaway && (
        <div className="px-4 py-2.5 bg-[#14171B] border-t border-[#2D333B] font-sans text-xs text-neutral-300 flex items-start gap-2">
          <span className="text-[#2457FF] font-mono font-bold uppercase tracking-wider text-[10px] mt-0.5">
            TAKEAWAY:
          </span>
          <span className="text-neutral-300">{takeaway}</span>
        </div>
      )}
    </div>
  );
}
