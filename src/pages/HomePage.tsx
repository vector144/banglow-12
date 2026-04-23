import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Gallery from '../Gallery';

const HomePage: React.FC = () => {
  const heroRef = React.useRef<HTMLElement>(null);
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" id="home" ref={heroRef}>
        <div
          className="hero-img"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920)' }}
        />
        <div className="hero-overlay" />

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
            <Link to="/menu" className="hero-cta">Explore Our Menu</Link>
          </motion.div>
        </div>

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

      <Gallery />

      <section className="interior-banner">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920" alt="Restaurant Interior" />
        <div className="banner-text reveal">
          <p className="banner-quote">"Where every meal tells a story."</p>
        </div>
      </section>

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
            { 
              quote: '"I highly recommend this restaurant! Excellent! We\'ve been back several times. all the food and drinks were very good. The servers are very welcoming and friendly, and the terrace is quiet and green."', 
              name: '— Hélène M' 
            },
            { 
              quote: '"Amazing food. I think they have the best service in Jodhpur. Minimum time to serve hot and fresh food. Great place to chill with friends and family. Well ventilated and hygienic place. 4 cheese pizza & Crystal dim sums must try!"', 
              name: '— Satish Dev' 
            },
            { 
              quote: '"A culinary journey. The cocktails perfectly complement the rich flavors. Highly recommend!"', 
              name: '— Local Guide' 
            },
          ].map((r) => (
            <div className="review-card" key={r.name}>
              <div className="stars">★★★★★</div>
              <p>{r.quote}</p>
              <span className="reviewer">{r.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-xl reveal">
          <a 
            href="https://google.com/maps?sca_esv=33295543d8b8cd1e&daddr=12A,+old,+Residency+Rd,+Civil+Lines,+Ratanada,+Jodhpur,+Rajasthan+342001" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="dark-btn inline"
          >
            Leave a Review
          </a>
          <a 
            href="https://google.com/maps?sca_esv=33295543d8b8cd1e&daddr=12A,+old,+Residency+Rd,+Civil+Lines,+Ratanada,+Jodhpur,+Rajasthan+342001" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-btn inline ml-md"
          >
            Read All Reviews
          </a>
        </div>
      </section>
    </>
  );
};

export default HomePage;
