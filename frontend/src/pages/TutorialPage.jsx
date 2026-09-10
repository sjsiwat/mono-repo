import { BeginnerGuide } from '../components/BeginnerGuide';
import { BackButton } from '../components/BackButton';

export default function TutorialPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-20">
      <BackButton />
      <BeginnerGuide />
      <div className="pt-8 mt-12 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">คู่มือการพัฒนา: <span className="font-mono">Step-by-Step Backend Guide</span></span>
      </div>
    </div>
  );
}
