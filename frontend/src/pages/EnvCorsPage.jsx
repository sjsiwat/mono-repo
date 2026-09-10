import { EnvAndCorsGuide } from '../components/EnvAndCorsGuide';
import { BackButton } from '../components/BackButton';

export default function EnvCorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-20">
      <BackButton />
      <EnvAndCorsGuide />
    </div>
  );
}
