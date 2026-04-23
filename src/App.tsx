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
          <a href="#catering">Catering</a>
          <a href="#gallery">Gallery</a>
        </nav>
        <div className="order-btn">
          <span>Order Now</span>
        </div>
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

      {/* ── Sub-hero image ── */}
      <section
        className="hero-sub reveal-scale"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=1920)' }}
      />

      {/* ── Signature Plates ── */}
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
            <button className="dark-btn box-btn">View All</button>
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

      {/* ── Catering ── */}
      <section className="section-container catering-section" id="catering">
        <div className="section-header-center">
          <div className="lines-wrapper reveal">
            <span className="line" />
            <h2>CATERING<br />THE AMRIT WAY</h2>
            <span className="line" />
          </div>
          <p className="subtitle reveal">Let us bring the authentic taste of India to your next event or celebration.</p>
        </div>

        <div className="image-grid-3 reveal-stagger">
          {[
            { img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600', title: 'Corporate Events', sub: 'Impress your team with our selections' },
            { img: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=600', title: 'Private Dinners', sub: 'Intimate gatherings made special' },
            { img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600', title: 'Weddings & Galas', sub: 'Grand celebrations crafted beautifully' },
          ].map((c) => (
            <div className="img-card" key={c.title}>
              <div className="img-card-inner zoom-wrap">
                <img src={c.img} alt={c.title} />
              </div>
              <div className="card-caption">
                {c.title}<br />
                <span className="small">{c.sub}</span>
              </div>
            </div>
          ))}
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
            <img className="drink-img-1 zoom-wrap" src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" alt="Cocktail pouring" />
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
          <div className="footer-col">
            <h4>Hours</h4>
            <ul className="f-list">
              <li>Mon–Thu: 11am – 9pm</li>
              <li>Fri–Sun: 11am – 10pm</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Location</h4>
            <ul className="f-list">
              <li>123 Culinary Blvd</li>
              <li>Ocala, FL 34471</li>
              <li>(352) 555-0192</li>
            </ul>
          </div>
          <div className="footer-col text-center">
            <div className="footer-brand-icon">✧</div>
          </div>
          <div className="footer-col">
            <h4>Links</h4>
            <ul className="f-list double-col">
              <li><a href="#">Home</a></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Menu</a></li>
              <li><a href="#">Catering</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Social</h4>
            <ul className="f-list">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-huge-logo">BUNGALOW TWELVE</div>
      </footer>
    </div>
  );
}

export default App;
