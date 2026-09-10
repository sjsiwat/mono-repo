import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { tokenizeCodeToLines, getTokenColorClass } from '../utils/codeHighlighter';

export function TerminalCodeBlock({ code, title = 'Terminal / Bash' }) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const lines = tokenizeCodeToLines(code, 'bash');

  return (
    <div className="rounded border border-[#2D3139] bg-[#14171B] overflow-hidden shadow-sm font-mono text-xs my-3">
      {/* Terminal Title Bar with macOS dots */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#1A1E24] border-b border-[#2D3139] select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-90 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-mono ml-1">
            <Terminal className="w-3 h-3 text-[#FF6B35]" />
            <span className="text-neutral-300 font-medium">{title}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="px-2 py-0.5 rounded border border-[#383E48] hover:border-[#2457FF] hover:text-white transition-all bg-[#20242A] text-neutral-300 text-[11px] cursor-pointer flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-mono">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-neutral-400" />
              <span className="font-mono">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Content */}
      <div className="p-3.5 overflow-x-auto space-y-1">
        {lines.map((tokens, idx) => (
          <div key={idx} className="flex items-start gap-2 whitespace-pre leading-relaxed">
            <span className="text-[#4ADE80] font-bold select-none shrink-0">$</span>
            <div className="flex-1">
              {tokens.map((tok, tIdx) => (
                <span key={tIdx} className={getTokenColorClass(tok.type)}>
                  {tok.content}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
