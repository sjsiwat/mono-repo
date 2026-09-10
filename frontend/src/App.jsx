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

const ROUTE_META = {
  home: {
    title: "API Architecture & Engineering Guide — Swiss Editorial Style",
    desc: "Four foundational rules behind every API response. ถอดรหัสจากโปรเจกต์จริง สู่หลักการออกแบบและเชื่อมต่อระบบ Front-End + Back-End"
  },
  foundations: {
    title: "What is API & REST Architecture (MOD_01) | api.siwat.me",
    desc: "ทำความเข้าใจ API และสถาปัตยกรรม REST พร้อมอนิเมชั่นร้านอาหาร (The Restaurant Analogy) และเปรียบเทียบ WebSocket, SSE, GraphQL"
  },
  structure: {
    title: "Project Structure & Cloud Topology (MOD_02) | api.siwat.me",
    desc: "แผนผังโครงสร้างโปรเจกต์ JSD-MONO สถาปัตยกรรม 4 Tiers และการ Deploy บน Cloudflare Workers, Render, และ MongoDB Atlas"
  },
  tutorial: {
    title: "Step-by-Step Backend Guide (MOD_03) | api.siwat.me",
    desc: "คู่มือสร้าง REST API ครบวงจร 10 ขั้นตอน: .env, MongoDB, Mongoose Model, authUser Middleware, CRUD & Login Controllers, server.js"
  },
  databases: {
    title: "Database Essentials & Commands (MOD_04) | api.siwat.me",
    desc: "คู่มือคำสั่ง CRUD, Query Filters, Projections และเทคนิคป้องกัน CastError สำหรับ MongoDB และ Supabase Client"
  },
  security: {
    title: "Security, Hashing & Identity (MOD_05) | api.siwat.me",
    desc: "มาตรฐานความปลอดภัยระดับ Production: Bcrypt แฮช 12 รอบ, การตัดรหัสผ่านทิ้งด้วย Destructuring, และ HttpOnly Cookie"
  },
  'war-stories': {
    title: "Problem Solving & War Stories (MOD_06) | api.siwat.me",
    desc: "ถอดบทเรียนจากปัญหาจริง: API ค้างจาก unhandled promise, CORS credentials หาย และเทคนิค Defensive Programming"
  },
  playground: {
    title: "Interactive API Playground (MOD_07) | api.siwat.me",
    desc: "ห้องทดลองยิง HTTP Request เชื่อมต่อกับ Render Backend พอร์ต 666 จริง พร้อมระบบทดสอบ Payload เรียลไทม์"
  },
  'env-cors': {
    title: "Environment & CORS Guide | api.siwat.me",
    desc: "คู่มือการตั้งค่า .env และ CORS ข้ามพอร์ตอย่างปลอดภัยสำหรับ Express และ React"
  },
  lifecycle: {
    title: "Request-Response Lifecycle (v1 vs v2) | api.siwat.me",
    desc: "การเดินทางของ HTTP Request ตั้งแต่เบราว์เซอร์ผ่าน Middleware จนถึง Controller และ Database"
  }
};

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

  // Dynamic SEO & Document Title per route
  useEffect(() => {
    const meta = ROUTE_META[currentPage] || ROUTE_META.home;
    document.title = meta.title;

    const setMetaTag = (selector, attribute, value) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attribute, value);
      }
    };

    setMetaTag('meta[name="description"]', 'content', meta.desc);
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag('meta[property="og:description"]', 'content', meta.desc);
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'content', meta.desc);
  }, [currentPage]);

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
