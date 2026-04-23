import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './MenuPage.css';

gsap.registerPlugin(ScrollTrigger);

const MENU_DATA = [
  {
    category: "Pizzas",
    group: "Mains",
    items: [
      { name: "Mushroom Pizza", price: "490" },
      { name: "Pesto Pizza", price: "480" },
      { name: "Margherita", price: "460" },
      { name: "Bruschetta", price: "400" },
      { name: "Mexican", price: "470" },
      { name: "Mix Veg Calzone", price: "460" },
    ]
  },
  {
    category: "Sandwiches",
    group: "Quick Bites",
    items: [
      { name: "Veg Club Sandwich", price: "340" },
      { name: "Veg Cheese Grilled Sandwich", price: "310" },
      { name: "House Special Sandwich", price: "310" },
    ]
  },
  {
    category: "Legumes",
    group: "Mains",
    items: [
      { name: "Dal Makhani", price: "490" },
      { name: "Dal Palak Lahsuni", price: "430" },
      { name: "Yellow Dal Tadka", price: "380" },
      { name: "Pindi Chole", price: "410" },
      { name: "Rajma", price: "400" },
    ]
  },
  {
    category: "Indian Starters",
    group: "Starters",
    items: [
      { name: "B12 Special Platter", price: "620" },
      { name: "Stuffed Tandoori Aloo", price: "440" },
      { name: "Mushroom Ki Nazakat", price: "420" },
      { name: "Kasoori Broccoli", price: "410" },
      { name: "Mozzarella Bhara Khumb", price: "410" },
      { name: "Dahi Kebab", price: "410" },
      { name: "Angara Paneer Tikka", price: "410" },
      { name: "Burani Paneer Tikka", price: "410" },
      { name: "Nawabi Paneer Tikka", price: "410" },
    ]
  },
  {
    category: "Indian Mains",
    group: "Mains",
    items: [
      { name: "Asha Kofta", price: "520" },
      { name: "Paneer Makhani", price: "490" },
      { name: "Bhatti Ka Paneer", price: "490" },
      { name: "Teer Mirchi Ka Paneer", price: "490" },
      { name: "Palak Paneer", price: "490" },
      { name: "Rara Soya Chaap", price: "480" },
      { name: "Kathal Rogan Josh", price: "480" },
      { name: "Mushroom Hara Pyaz", price: "470" },
      { name: "Rogani Chaap", price: "470" },
      { name: "Tandoori Soya Makhani", price: "460" },
      { name: "Subz Miloni", price: "390" },
      { name: "Bhindi Mirch Masala", price: "380" },
      { name: "Charcoal Smoked Aloo Chatpata", price: "370" },
      { name: "Corn Capsicum Masala", price: "370" },
    ]
  },
  {
    category: "Rice",
    group: "Mains",
    items: [
      { name: "Soya Biryani", price: "380" },
      { name: "Subz Biryani", price: "370" },
      { name: "Kathal Biryani", price: "370" },
      { name: "Channa Biryani", price: "290" },
      { name: "Pulao (Peas / Veg)", price: "210" },
      { name: "Steamed Rice", price: "210" },
    ]
  },
  {
    category: "Breads",
    group: "Mains",
    items: [
      { name: "Cheese Garlic Naan", price: "150" },
      { name: "Kulcha", price: "140" },
      { name: "Paratha", price: "120" },
      { name: "Naan", price: "120" },
      { name: "Missi Roti", price: "90" },
      { name: "Tandoori Roti", price: "75" },
    ]
  },
  {
    category: "Curd",
    group: "Extras",
    items: [
      { name: "Pineapple Raita", price: "180" },
      { name: "Masala Buttermilk", price: "140" },
      { name: "Plain Curd", price: "120" },
    ]
  },
  {
    category: "Desserts",
    group: "Desserts",
    items: [
      { name: "Mud Cake with Ice Cream", price: "320" },
      { name: "Choco Truffle", price: "320" },
      { name: "Blueberry Cheesecake", price: "310" },
      { name: "Chocolate Brownie with Ice Cream", price: "280" },
      { name: "Nutty Banoffee Pie", price: "280" },
      { name: "Ice Cream Scoops", price: "160" },
    ]
  },
  {
    category: "Jain Special Menu",
    group: "Jain",
    items: [
      { name: "Pizza", price: "510" },
      { name: "Paneer Makhani", price: "490" },
      { name: "Paneer Bhurji", price: "450" },
      { name: "White Sauce Pasta", price: "420" },
      { name: "Dahi Kebab", price: "410" },
      { name: "Matar Methi Malai", price: "410" },
      { name: "Yellow Dal Tadka", price: "390" },
      { name: "Angara Paneer Tikka", price: "380" },
      { name: "Mexican Quinoa Salad", price: "370" },
      { name: "Tortilla Cheese Rolls", price: "350" },
      { name: "Watermelon Feta Salad", price: "320" },
      { name: "Veg Cheese Grilled Sandwich", price: "310" },
    ]
  }
];

const GROUPS = ["All", "Starters", "Mains", "Quick Bites", "Extras", "Desserts", "Jain"];

const MenuPage: React.FC = () => {
  const [activeGroup, setActiveGroup] = React.useState("All");
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax logic
    const parallaxBanners = document.querySelectorAll('.menu-parallax-banner');
    parallaxBanners.forEach((banner) => {
      const img = banner.querySelector('.menu-parallax-img');
      gsap.to(img, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: banner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [activeGroup]); // Re-run parallax on filter change as height shifts

  const filteredData = activeGroup === "All" 
    ? MENU_DATA 
    : MENU_DATA.filter(d => d.group === activeGroup);

  return (
    <div className="menu-page" ref={pageRef}>
      <div className="menu-hero">
        <motion.h1
          className="menu-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          THE MENU
        </motion.h1>
      </div>

      {/* Category Filter */}
      <div className="menu-filter-container">
        <div className="menu-filters">
          {GROUPS.map(group => (
            <button 
              key={group} 
              className={`filter-btn ${activeGroup === group ? 'active' : ''}`}
              onClick={() => setActiveGroup(group)}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-parallax-banner mini">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920"
          className="menu-parallax-img"
          alt="Banner 1"
        />
      </div>

      <div className="menu-grid-container">
        {filteredData.map((section, sIdx) => (
          <div key={section.category} className="menu-section">
            <div className="menu-section-header">
              <h2 className="menu-section-title">{section.category}</h2>
            </div>
            <div className="menu-items-grid">
              {section.items.map((item) => (
                <div key={item.name} className="menu-item-card">
                  <span className="menu-item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
