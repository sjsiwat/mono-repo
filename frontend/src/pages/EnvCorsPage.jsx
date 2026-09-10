import { EnvAndCorsGuide } from '../components/EnvAndCorsGuide';
import { BackButton } from '../components/BackButton';

export default function EnvCorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-20">
      <BackButton />
      <EnvAndCorsGuide />
      <div className="pt-8 mt-12 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">คู่มือการตั้งค่า: <span className="font-mono">Environment &amp; CORS</span></span>
      </div>
    </div>
  );
}
