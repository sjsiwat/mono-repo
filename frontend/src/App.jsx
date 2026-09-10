import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Direct static imports for instantaneous zero-latency page switching
import HomePage from './pages/HomePage';
import StructurePage from './pages/StructurePage';
import TutorialPage from './pages/TutorialPage';
import DatabaseCheatSheetPage from './pages/DatabaseCheatSheetPage';
import EnvCorsPage from './pages/EnvCorsPage';
import ApiVsRestPage from './pages/ApiVsRestPage';
import LifecyclePage from './pages/LifecyclePage';
import SecurityPage from './pages/SecurityPage';
import WarStoriesPage from './pages/WarStoriesPage';
import PlaygroundPage from './pages/PlaygroundPage';

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  const validPages = [
    'home',
    'structure',
    'tutorial',
    'databases',
    'env-cors',
    'foundations',
    'lifecycle',
    'security',
    'war-stories',
    'playground'
  ];
  return validPages.includes(hash) ? hash : 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const progressBar = document.getElementById('reading-progress');
        if (!progressBar) return;
        const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
          const scrolled = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
          progressBar.style.width = `${scrolled}%`;
        }
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateTo = (pageId) => {
    window.location.hash = `#${pageId}`;
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'structure':
        return <StructurePage />;
      case 'tutorial':
        return <TutorialPage />;
      case 'databases':
        return <DatabaseCheatSheetPage />;
      case 'env-cors':
        return <EnvCorsPage />;
      case 'foundations':
        return <ApiVsRestPage />;
      case 'lifecycle':
        return <LifecyclePage />;
      case 'security':
        return <SecurityPage />;
      case 'war-stories':
        return <WarStoriesPage />;
      case 'playground':
        return <PlaygroundPage />;
      case 'home':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#20242A] flex flex-col font-sans selection:bg-[#2457FF] selection:text-white">
      {/* 2px Cobalt Reading Progress Indicator */}
      <div id="reading-progress" style={{ width: '0%' }} />

      {/* Swiss Editorial Top Navbar */}
      <Navbar activeSection={currentPage} onNavigate={navigateTo} />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Swiss Minimalist Footer */}
      <Footer />
    </div>
  );
}

export default App;
