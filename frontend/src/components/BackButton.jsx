export function BackButton({ label = "กลับสู่หน้าหลัก (Home)", to = "home", className = "" }) {
  const handleBack = () => {
    window.location.hash = `#${to}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={`mb-6 ${className}`}>
      <button
        onClick={handleBack}
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#D9D8D3] text-[#20242A] hover:border-[#2457FF] hover:text-[#2457FF] transition-all font-mono text-xs font-semibold cursor-pointer group shadow-2xs"
        style={{ borderRadius: '4px' }}
      >
        <span className="group-hover:-translate-x-1 transition-transform text-xs leading-none font-bold">←</span>
        <span>{label}</span>
      </button>
    </div>
  );
}
