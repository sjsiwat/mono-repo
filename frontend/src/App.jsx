import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageSkeleton } from './components/PageSkeleton';

// ⭐ Code-Splitting via React.lazy() for each page
const HomePage = lazy(() => import('./pages/HomePage'));
const StructurePage = lazy(() => import('./pages/StructurePage'));
const TutorialPage = lazy(() => import('./pages/TutorialPage'));
const DatabaseCheatSheetPage = lazy(() => import('./pages/DatabaseCheatSheetPage'));
const EnvCorsPage = lazy(() => import('./pages/EnvCorsPage'));
const ApiVsRestPage = lazy(() => import('./pages/ApiVsRestPage'));
const LifecyclePage = lazy(() => import('./pages/LifecyclePage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const WarStoriesPage = lazy(() => import('./pages/WarStoriesPage'));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      }
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
      <div id="reading-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Swiss Editorial Top Navbar */}
      <Navbar activeSection={currentPage} onNavigate={navigateTo} />

      {/* Main Page Content with React.lazy Suspense */}
      <main className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          {renderCurrentPage()}
        </Suspense>
      </main>

      {/* Swiss Minimalist Footer */}
      <Footer />
    </div>
  );
}

export default App;
