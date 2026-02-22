import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Technology from './pages/Technology';
import Whitepaper from './pages/Whitepaper';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
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
