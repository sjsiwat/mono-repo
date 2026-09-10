export function BackButton({ 
  label, 
  to = "home", 
  className = "",
  scrollToTop = false 
}) {
  const handleClick = () => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = `#${to}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const displayLabel = label || (scrollToTop ? "กลับขึ้นด้านบน (Back to Top)" : "กลับสู่หน้าหลัก (Home)");

  return (
    <div className={`mb-6 ${className}`}>
      <button
        onClick={handleClick}
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#D9D8D3] text-[#20242A] hover:border-[#2457FF] hover:text-[#2457FF] transition-all font-sans text-xs font-medium tracking-normal cursor-pointer group shadow-2xs"
        style={{ borderRadius: '4px' }}
      >
        <span className={`font-mono transition-transform text-xs leading-none font-bold ${scrollToTop ? "group-hover:-translate-y-0.5" : "group-hover:-translate-x-1"}`}>
          {scrollToTop ? "↑" : "←"}
        </span>
        <span>{displayLabel}</span>
      </button>
    </div>
  );
}

export function ScrollToTopButton({ label = "กลับขึ้นด้านบน (Back to Top)", className = "" }) {
  return <BackButton scrollToTop label={label} className={className} />;
}

