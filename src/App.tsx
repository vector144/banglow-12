import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Sticky Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">AMRIT PALACE</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#story">Our Story</a>
          <a href="#menu">Menu</a>
          <a href="#ordering">Ordering</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="order-btn">
          <span>Order Now</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="side-text left">SERVING CENTRAL FLORIDA</div>
          <h1 className="main-title">FLAVORS THAT STAY</h1>
          <div className="side-text right">ESTABLISHED 1996</div>
        </div>
      </section>

      {/* Introduction Split */}
      <section className="split-section" id="story">
        <div className="split-text bg-dark text-cream">
          <h2>Our Legacy</h2>
          <p>
            Experience the authentic taste of fine dining. Our recipes have been perfected over generations, bringing you a blend of rich spices, warm atmosphere, and unforgettable moments.
          </p>
        </div>
        <div className="split-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200)' }}>
        </div>
      </section>

      {/* Staggered Highlights */}
      <section className="staggered-section" id="menu">
        <div className="stagger-row">
          <div className="stagger-box bg-accent text-dark">
             <h3>Signature Plate</h3>
             <p>Discover our chef's daily recommendation, crafted with seasonal ingredients and traditional techniques.</p>
          </div>
          <div className="stagger-box image-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800)' }}></div>
        </div>
        <div className="stagger-row reverse">
          <div className="stagger-box bg-cream text-dark">
             <h3>Curated Drinks</h3>
             <p>A selection of fine wines and signature cocktails perfectly paired to complement our rich culinary heritage.</p>
          </div>
          <div className="stagger-box image-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800)' }}></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-col">
          <h4>Locations</h4>
          <p>123 Culinary Blvd<br/>Ocala, FL 34471</p>
        </div>
        <div className="footer-col">
          <h4>Hours</h4>
          <p>Mon-Thu: 11am - 9pm<br/>Fri-Sun: 11am - 10pm</p>
        </div>
        <div className="footer-col center-logo">
          <h2>AMRIT PALACE</h2>
        </div>
        <div className="footer-col">
          <h4>Stay Connected</h4>
          <div className="subscribe">
            <input type="email" placeholder="Email Address" />
            <button>&rarr;</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
