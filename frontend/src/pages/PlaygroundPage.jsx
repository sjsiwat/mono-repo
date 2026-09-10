import { ApiPlayground } from '../components/ApiPlayground';
import { BackButton } from '../components/BackButton';

export default function PlaygroundPage() {
  return (
    <div className="pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <BackButton />
      </div>
      <ApiPlayground />
    </div>
  );
}
