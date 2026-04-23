import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import logoImg from './assets/logo.jpg';
import './App.css';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollAnimations } from './hooks/useScrollAnimations';

// Components & Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useSmoothScroll();
  useScrollAnimations();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* ── Header ── */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="logo">
          <img src={logoImg} alt="Bungalow Twelve" className="logo-img" />
        </Link>
        <nav className="nav-links desktop-only">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <a href="/#gallery">Gallery</a>
        </nav>

        {/* Mobile Toggle */}
        <button className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile Nav Overlay */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav-links">
            <Link to="/" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/menu" onClick={toggleMobileMenu}>Menu</Link>
            <a href="/#gallery" onClick={toggleMobileMenu}>Gallery</a>
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } />
          <Route path="/menu" element={
            <PageTransition>
              <MenuPage />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-links reveal-stagger">
          <div className="footer-col">
            <h4>Hours</h4>
            <ul className="f-list">
              <li><span className="f-day">Mon – Wed</span> 10 am – 12 am</li>
              <li><span className="f-day">Thu</span> 10 am – 12 am</li>
              <li><span className="f-day">Fri</span> 10 am – 12 am</li>
              <li><span className="f-day">Sat – Sun</span> 10 am – 12:30 am</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Location</h4>
            <ul className="f-list">
              <li>12A, Old Residency Rd</li>
              <li>Civil Lines, Ratanada</li>
              <li>Jodhpur, Rajasthan 342001</li>
              <li className="mt-sm">
                <a
                  href="https://google.com/maps?sca_esv=33295543d8b8cd1e&daddr=12A,+old,+Residency+Rd,+Civil+Lines,+Ratanada,+Jodhpur,+Rajasthan+342001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f-link-accent"
                >
                  ↗ Get Directions
                </a>
              </li>
              <li><a href="tel:+919828561212" className="f-link-accent">📞 098285 61212</a></li>
            </ul>
          </div>

          <div className="footer-col text-center">
            <div className="footer-brand-icon">✧</div>
          </div>

          <div className="footer-col">
            <h4>Reservations</h4>
            <ul className="f-list">
              <li><a href="https://www.eazydiner.com" target="_blank" rel="noopener noreferrer">EazyDiner</a></li>
              <li><a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer">Swiggy</a></li>
              <li><a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer">Zomato</a></li>
            </ul>
            <h4 className="mt-md">Services</h4>
            <ul className="f-list">
              <li>All You Can Eat</li>
              <li>Outdoor Seating</li>
              <li>Private Dining Room</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul className="f-list">
              <li>
                <a
                  href="https://www.instagram.com/bungalow.twelve/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f-link-accent"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-huge-logo">BUNGALOW TWELVE</div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
