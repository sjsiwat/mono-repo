import { ProjectStructureDiagram } from '../components/ProjectStructureDiagram';
import { BackButton } from '../components/BackButton';

export default function StructurePage() {
  return (
    <div className="pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <BackButton />
      </div>
      <ProjectStructureDiagram />
      <div className="max-w-6xl mx-auto px-6 pt-8 mt-12 border-t border-[#D9D8D3] flex items-center justify-between">
        <BackButton scrollToTop className="mb-0" />
        <span className="text-xs font-sans text-[#62666B]">สถาปัตยกรรมระบบ: <span className="font-mono">Project Structure & Cloud Topology</span></span>
      </div>
    </div>
  );
}
