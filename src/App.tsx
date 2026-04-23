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
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">AMRIT PALACE</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#catering">Catering</a>
          <a href="#gift">Gift Cards</a>
        </nav>
        <div className="order-btn">
          <span>Order Now</span>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920)' }}></div>
      </section>
      
      {/* Spacer image beneath hero to match screenshot layout */}
      <section className="hero-sub" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=1920)' }}></section>

      {/* Signature Plates */}
      <section className="section-container signature-section">
        <div className="signature-grid">
          {/* Left Orange Box */}
          <div className="signature-menu-box">
             <h2 className="menu-box-title">SIGNATURE PLATES</h2>
             <div className="menu-item-list">
                <div className="menu-item">
                  <div className="menu-header"><span>Chicken Tikka Masala</span><span className="price">$24</span></div>
                  <div className="menu-desc">Tandoori cooked chicken in a rich, creamy tomato sauce</div>
                </div>
                <div className="menu-item">
                  <div className="menu-header"><span>Lamb Rogan Josh</span><span className="price">$28</span></div>
                  <div className="menu-desc">Slow-cooked lamb in aromatic Kashmiri spices</div>
                </div>
                <div className="menu-item">
                  <div className="menu-header"><span>Palak Paneer</span><span className="price">$21</span></div>
                  <div className="menu-desc">Fresh spinach and house-made cheese with mild spices</div>
                </div>
             </div>
             <button className="dark-btn box-btn">View All</button>
          </div>
          
          {/* Right Content */}
          <div className="signature-content">
             <h2>SIGNATURE DISHES.<br/>CLASSIC ROOTS.</h2>
             <p>Experience the authentic taste of fine dining. Our recipes have been perfected over generations, bringing you a blend of rich spices, warm atmosphere, and unforgettable moments.</p>
             <button className="dark-btn mb-xl">View Menu</button>
             
             <div className="image-grid-2">
                <div className="img-wrap"><img src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600" alt="Curry" /></div>
                <div className="img-wrap"><img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" alt="Curry 2" /></div>
             </div>
          </div>
        </div>
      </section>

      {/* Catering */}
      <section className="section-container catering-section">
         <div className="section-header-center">
            <div className="lines-wrapper">
              <span className="line"></span>
              <h2>CATERING<br/>THE AMRIT WAY</h2>
              <span className="line"></span>
            </div>
            <p className="subtitle">Let us bring the authentic taste of India to your next event or celebration.</p>
         </div>
         
         <div className="image-grid-3">
            <div className="img-card">
              <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600" alt="Trays of food" />
              <div className="card-caption">Corporate Events<br/><span className="small">Impress your team with our selections</span></div>
            </div>
            <div className="img-card">
              <img src="https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=600" alt="Cooking" />
              <div className="card-caption">Private Dinners<br/><span className="small">Intimate gatherings made special</span></div>
            </div>
            <div className="img-card">
              <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600" alt="Serving" />
              <div className="card-caption">Weddings & Galas<br/><span className="small">Grand celebrations crafted beautifully</span></div>
            </div>
         </div>
      </section>

      {/* Drinks */}
      <section className="section-container drinks-section">
         <div className="drinks-grid">
            <div className="drinks-content">
               <h2>DRINKS THAT<br/>COMPLETE<br/>THE EXPERIENCE</h2>
               <p className="mb-xl">A curated selection of signature cocktails perfectly paired to complement our rich culinary heritage.</p>
               <button className="dark-btn mb-xl">View Drinks Menu</button>
               
               <div className="menu-item-list border-top-list">
                  <div className="menu-item">
                    <div className="menu-header"><span>Amrit Old Fashioned</span><span className="price">$16</span></div>
                  </div>
                  <div className="menu-item">
                    <div className="menu-header"><span>Mango Lassi Martini</span><span className="price">$14</span></div>
                  </div>
                  <div className="menu-item">
                    <div className="menu-header"><span>The Maharaja</span><span className="price">$18</span></div>
                  </div>
               </div>
            </div>
            
            <div className="drinks-images">
               <img className="drink-img-1" src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" alt="Cocktail pouring"/>
               <img className="drink-img-2" src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=600" alt="Cocktail smoke"/>
            </div>
         </div>
      </section>

      {/* Gift Cards */}
      <section className="section-container gift-section text-center" id="gift">
         <h2>GIFT A TASTE<br/>OF TRADITION</h2>
         <div className="gift-cards-img">
            <div className="gift-card-stack">
              <div className="card bg-dark"></div>
              <div className="card bg-cream bordered"></div>
              <div className="card bg-accent"></div>
            </div>
         </div>
         <p className="subtitle mb-xl">Give the gift of unforgettable culinary moments.</p>
         <button className="dark-btn">Buy Gift Card</button>
      </section>

      {/* Interior Banner */}
      <section className="interior-banner">
         <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920" alt="Restaurant Interior" />
      </section>

      {/* Reviews */}
      <section className="section-container reviews-section">
         <div className="reviews-header">
            <h2>WHAT OUR<br/>GUESTS SAY</h2>
            <div className="rating-box">
              <span className="stars">★★★★★</span>
              <span className="score">4.9<span style={{fontSize: '1rem'}}>/5</span></span>
              <span className="score-sub">Based on 500+ reviews</span>
            </div>
         </div>
         
         <div className="reviews-grid">
            <div className="review-card">
               <div className="stars">★★★★★</div>
               <p>"Absolutely phenomenal dining experience. The flavors are exceptionally balanced and the service is impeccable. Highly recommend the signature plates."</p>
               <span className="reviewer">— Sarah J.</span>
            </div>
            <div className="review-card">
               <div className="stars">★★★★★</div>
               <p>"The best Indian restaurant in the city. The ambiance, the signature plates, everything was perfect from start to finish. A true gem."</p>
               <span className="reviewer">— Michael T.</span>
            </div>
            <div className="review-card">
               <div className="stars">★★★★★</div>
               <p>"A culinary journey. The cocktails perfectly complement the rich flavors of the dishes. The catering team also did an amazing job for my party."</p>
               <span className="reviewer">— Emma L.</span>
            </div>
         </div>
         <div className="text-center mt-xl">
           <button className="dark-btn inline">Leave a Review</button>
           <button className="text-btn inline ml-md">Read All Reviews</button>
         </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
           <div className="footer-col">
             <h4>Hours</h4>
             <ul className="f-list">
                <li>Mon-Thu: 11am - 9pm</li>
                <li>Fri-Sun: 11am - 10pm</li>
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
        
        <div className="footer-huge-logo">
           AMRIT PALACE
        </div>
      </footer>
    </div>
  );
}

export default App;
