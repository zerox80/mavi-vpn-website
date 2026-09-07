import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Technology from './pages/Technology';
import Whitepaper from './pages/Whitepaper';

function App() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    const target = document.getElementById(hash.slice(1));
    // Switching overview tabs should keep the reader at the same scroll position.
    if (target?.getAttribute('role') === 'tabpanel') return;
    if (target instanceof HTMLDetailsElement) target.open = true;
    target?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [pathname, hash, key]);

  return (
    <div className="app-container" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
