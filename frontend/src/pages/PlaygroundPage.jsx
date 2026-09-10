import { ApiPlayground } from '../components/ApiPlayground';
import { BackButton } from '../components/BackButton';

export default function PlaygroundPage() {
  return (
    <div className="pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <BackButton />
      </div>
      <ApiPlayground />
      <div className="max-w-6xl mx-auto px-6 pt-8 mt-12 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">เครื่องมือทดสอบ: <span className="font-mono">Interactive API Playground</span></span>
      </div>
    </div>
  );
}
