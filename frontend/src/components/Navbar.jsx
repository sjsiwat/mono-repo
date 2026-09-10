import { useState, useEffect, memo } from 'react';
import { checkServerHealth } from '../services/api';
import { Code2, Menu, X } from 'lucide-react';

export const Navbar = memo(function Navbar({ activeSection, onNavigate }) {
  const [serverStatus, setServerStatus] = useState({ online: false, latency: 0, checked: false });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    checkServerHealth().then((res) => {
      if (mounted) {
        setServerStatus({ online: res.online, latency: res.latency, checked: true });
      }
    });

    const interval = setInterval(() => {
      checkServerHealth().then((res) => {
        if (mounted) {
          setServerStatus({ online: res.online, latency: res.latency, checked: true });
        }
      });
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'foundations', label: 'What is API' },
    { id: 'structure', label: 'Structure' },
    { id: 'tutorial', label: 'Step by Step' },
    { id: 'databases', label: 'DB command' },
    { id: 'security', label: 'Security & Auth' },
    { id: 'war-stories', label: 'Problem Solving' }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-[#F6F5F1] border-b border-[#D9D8D3]"
      style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)', willChange: 'transform' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo: Clickable to go Home */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group select-none"
        >
          <div className="w-7 h-7 rounded bg-[#20242A] flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:scale-105">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-bold text-base tracking-tight text-[#20242A]">
              API Guide
            </span>
            {/* System Status Easter Egg Instrument */}
            <span
              title={serverStatus.online ? `Backend online (${serverStatus.latency}ms)` : 'Connecting to port 666...'}
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider px-2 py-0.5 rounded border border-[#D9D8D3] bg-white/80 text-[#62666B]"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${serverStatus.online ? 'bg-emerald-500 animate-signal-pulse' : 'bg-[#FF6B35]'}`} />
              <span>:666 → :5173</span>
            </span>
          </div>
        </div>

        {/* Swiss Technical Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium shrink-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 rounded transition-all whitespace-nowrap text-xs flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#2457FF] font-semibold bg-[#EAF0FF]'
                    : 'text-[#62666B] hover:text-[#20242A] hover:bg-neutral-200/50'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2457FF] inline-block" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Workbench CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('playground')}
            className="px-3.5 py-1.5 rounded bg-[#20242A] hover:bg-[#2457FF] text-white text-xs font-mono font-medium transition-all shadow-2xs whitespace-nowrap cursor-pointer border border-[#20242A] hover:border-[#2457FF]"
          >
            Try API Workbench
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 rounded border border-[#D9D8D3] bg-white text-[#20242A] hover:bg-neutral-100"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#D9D8D3] bg-[#F6F5F1] px-6 py-4 space-y-1 font-sans text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                  isActive
                    ? 'bg-[#EAF0FF] text-[#2457FF] font-semibold'
                    : 'text-[#62666B] hover:bg-neutral-200/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2457FF]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
});
