import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logoImg from './assets/logo.jpg';
import Gallery from './Gallery';
import './App.css';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollAnimations } from './hooks/useScrollAnimations';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useSmoothScroll();
  useScrollAnimations();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">

      {/* ── Header ── */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <img src={logoImg} alt="Bungalow Twelve" className="logo-img" />
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero" id="home" ref={heroRef}>
        <div
          className="hero-img"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920)' }}
        />
        <div className="hero-overlay" />

        {/* Cinematic hero entrance — Framer Motion */}
        <div className="hero-content">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SERVING CENTRAL FLORIDA SINCE 1996 · BUNGALOW TWELVE
          </motion.p>

          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            FLAVORS<br />THAT STAY
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <a href="#menu" className="hero-cta">Explore Our Menu</a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      <section className="section-container signature-section" id="menu">
        <div className="signature-grid">

          {/* Left menu box */}
          <div className="signature-menu-box reveal">
            <h2 className="menu-box-title">SIGNATURE<br />PLATES</h2>
            <div className="menu-item-list">
              {[
                { name: 'Butter Chicken', price: '$24', desc: 'Tandoori cooked chicken in a rich, creamy tomato sauce' },
                { name: 'Lamb Curry',     price: '$28', desc: 'Slow-cooked lamb in aromatic Kashmiri spices' },
                { name: 'Palak Paneer',   price: '$21', desc: 'Fresh spinach and house-made cheese with mild spices' },
              ].map((item) => (
                <div className="menu-item" key={item.name}>
                  <div className="menu-header">
                    <span>{item.name}</span>
                    <span className="price">{item.price}</span>
                  </div>
                  <div className="menu-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content */}
          <div className="signature-content">
            <h2 className="reveal-clip">SIGNATURE DISHES.<br />CLASSIC ROOTS.</h2>
            <p className="reveal">
              Experience the authentic taste of fine dining. Our recipes have been perfected over
              generations, bringing you a blend of rich spices, warm atmosphere, and unforgettable moments.
            </p>
            <button className="dark-btn mb-xl reveal">View Menu</button>

            <div className="image-grid-2 reveal-stagger">
              <div className="img-wrap zoom-wrap">
                <img src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600" alt="Curry" />
              </div>
              <div className="img-wrap zoom-wrap">
                <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600" alt="Serving" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Drinks ── */}
      <section className="section-container drinks-section">
        <div className="drinks-grid">
          <div className="drinks-content">
            <h2 className="reveal-clip">DRINKS THAT<br />COMPLETE<br />THE EXPERIENCE</h2>
            <p className="mb-xl reveal">
              A curated selection of signature cocktails perfectly paired to complement our rich culinary heritage.
            </p>
            <button className="dark-btn mb-xl reveal">View Drinks Menu</button>
            <div className="menu-item-list border-top-list reveal-stagger">
              {[
                { name: 'Amrit Old Fashioned', price: '$16' },
                { name: 'Mango Lassi Martini',  price: '$14' },
                { name: 'The Maharaja',          price: '$18' },
              ].map((d) => (
                <div className="menu-item" key={d.name}>
                  <div className="menu-header">
                    <span>{d.name}</span>
                    <span className="price">{d.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="drinks-images reveal-stagger">
            <video
              className="drink-img-1 zoom-wrap"
              src="/gallery/video-drinks-1.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <img className="drink-img-2 zoom-wrap" src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=600" alt="Cocktail smoke" />
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <Gallery />

      {/* ── Interior Banner ── */}
      <section className="interior-banner">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920" alt="Restaurant Interior" />
        <div className="banner-text reveal">
          <p className="banner-quote">"Where every meal tells a story."</p>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="section-container reviews-section">
        <div className="reviews-header reveal">
          <h2>WHAT OUR<br />GUESTS SAY</h2>
          <div className="rating-box">
            <span className="stars">★★★★★</span>
            <span className="score">4.9<span style={{ fontSize: '1rem' }}>/5</span></span>
            <span className="score-sub">Based on 500+ reviews</span>
          </div>
        </div>

        <div className="reviews-grid">
          {[
            { quote: '"Absolutely phenomenal dining experience. The flavors are exceptionally balanced and the service is impeccable."', name: '— Sarah J.' },
            { quote: '"The best Indian restaurant in the city. The ambiance, the signature plates — everything was perfect."', name: '— Michael T.' },
            { quote: '"A culinary journey. The cocktails perfectly complement the rich flavors. Highly recommend!"', name: '— Emma L.' },
          ].map((r) => (
            <div className="review-card" key={r.name}>
              <div className="stars">★★★★★</div>
              <p>{r.quote}</p>
              <span className="reviewer">{r.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-xl reveal">
          <button className="dark-btn inline">Leave a Review</button>
          <button className="text-btn inline ml-md">Read All Reviews</button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-links reveal-stagger">

          {/* Hours */}
          <div className="footer-col">
            <h4>Hours</h4>
            <ul className="f-list">
              <li><span className="f-day">Mon – Wed</span> 10 am – 12 am</li>
              <li><span className="f-day">Thu</span> 10 am – 12 am</li>
              <li><span className="f-day">Fri</span> 10 am – 12 am</li>
              <li><span className="f-day">Sat – Sun</span> 10 am – 12:30 am</li>
            </ul>
          </div>

          {/* Location */}
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

          {/* Brand centre */}
          <div className="footer-col text-center">
            <div className="footer-brand-icon">✧</div>
          </div>

          {/* Reservations */}
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

          {/* Social */}
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

export default App;
