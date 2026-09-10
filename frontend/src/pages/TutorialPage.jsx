import { BeginnerGuide } from '../components/BeginnerGuide';
import { BackButton } from '../components/BackButton';

export default function TutorialPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-20">
      <BackButton />
      <BeginnerGuide />
    </div>
  );
}
