import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

// ─────────────────────────────────────────────────────────────
//  ADD YOUR MEDIA HERE
//  type: 'image' | 'video'
//  src:  path inside /public/gallery/ or a full URL
//  span: 'tall' | 'wide' | 'normal'  (controls grid sizing)
// ─────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  // Col 1
  {
    id: 5,
    type: 'image' as const,
    src: '/gallery/dessert-1.jpg',
    caption: 'A Taste of Heaven',
    span: 'normal',
  },
  {
    id: 6,
    type: 'image' as const,
    src: '/gallery/dessert-2.jpg',
    caption: 'Sweet Moments',
    span: 'tall',
  },
  {
    id: 7,
    type: 'image' as const,
    src: '/gallery/dessert-3.jpg',
    caption: 'Indulgent Flavors',
    span: 'normal',
  },
  // Col 2
  {
    id: 8,
    type: 'image' as const,
    src: '/gallery/burnt-garlic-rice.jpg',
    caption: 'Burnt Garlic Rice with Paneer Chilli',
    span: 'tall',
  },
  {
    id: 9,
    type: 'image' as const,
    src: '/gallery/pancakes.jpg',
    caption: 'Pancake Mornings',
    span: 'normal',
  },
  {
    id: 10,
    type: 'image' as const,
    src: '/gallery/beetroot-kebab.jpg',
    caption: 'Beetroot Kebab',
    span: 'normal',
  },
  // Col 3
  {
    id: 11,
    type: 'image' as const,
    src: '/gallery/khari-pizza-1.jpg',
    caption: 'Khari Base Pizza',
    span: 'tall',
  },
  {
    id: 12,
    type: 'image' as const,
    src: '/gallery/khari-pizza-2.jpg',
    caption: 'Khari Base Pizza — detail',
    span: 'normal',
  },
  {
    id: 13,
    type: 'image' as const,
    src: '/gallery/dimsum.jpg',
    caption: 'Dimsum at Bungalow Twelve',
    span: 'tall',
  },
  // Col 4
  {
    id: 14,
    type: 'image' as const,
    src: '/gallery/breakfast-sandwich-1.jpg',
    caption: 'Breakfast Sandwiches',
    span: 'normal',
  },
  {
    id: 15,
    type: 'image' as const,
    src: '/gallery/breakfast-sandwich-2.jpg',
    caption: 'Wake Up to Something Special',
    span: 'tall',
  },
  {
    id: 16,
    type: 'image' as const,
    src: '/gallery/breakfast-sandwich-3.jpg',
    caption: 'Crafted with Love',
    span: 'normal',
  },
  // {
  //   id: 17,
  //   type: 'image' as const,
  //   src: '/gallery/breakfast-sandwich-4.jpg',
  //   caption: 'Morning at Bungalow Twelve',
  //   span: 'normal',
  // },
];

type GalleryItem = (typeof GALLERY_ITEMS)[number];

// ─── Video Card — autoplay when visible ──────────────────────
function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`gallery-card gallery-card--${item.span} ${!isInView ? 'is-loading' : ''}`}
      onClick={onClick}
    >
      {isInView && (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="gallery-media fade-in"
        />
      )}
      <div className="gallery-overlay">
        <p className="gallery-caption">{item.caption}</p>
      </div>
    </div>
  );
}

// ─── Image Card — custom lazy load ────────────────────────────
function ImageCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before it enters
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imgRef}
      className={`gallery-card gallery-card--${item.span} ${!loaded ? 'is-loading' : ''}`} 
      onClick={onClick}
    >
      {isInView && (
        <img 
          src={item.src} 
          alt={item.caption} 
          className={`gallery-media ${loaded ? 'fade-in' : ''}`} 
          onLoad={() => setLoaded(true)}
        />
      )}
      <div className="gallery-overlay">
        <p className="gallery-caption">{item.caption}</p>
      </div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Prev */}
      <button className="lightbox-nav lightbox-nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        ‹
      </button>

      {/* Media */}
      <motion.div
        className="lightbox-content"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video src={item.src} controls autoPlay muted loop playsInline className="lightbox-media" />
        ) : (
          <img src={item.src} alt={item.caption} className="lightbox-media" />
        )}
        <p className="lightbox-caption">{item.caption}</p>
      </motion.div>

      {/* Next */}
      <button className="lightbox-nav lightbox-nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
        ›
      </button>

      {/* Close */}
      <button className="lightbox-close" onClick={onClose}>✕</button>
    </motion.div>
  );
}

// ─── Main Gallery Section ─────────────────────────────────────
export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setActiveIndex(i);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(() =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)), []);
  const goNext = useCallback(() =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length)), []);

  return (
    <section className="gallery-section" id="gallery">
      {/* Header */}
      <div className="gallery-header reveal">
        <p className="gallery-eyebrow">Our World</p>
        <h2 className="gallery-title">LIFE AT<br />BUNGALOW TWELVE</h2>
        <p className="gallery-sub">Moments, flavours, and memories — captured.</p>
      </div>

      {/* Grid */}
      <div className="gallery-grid reveal-stagger">
        {GALLERY_ITEMS.map((item, i) =>
          item.type === 'video' ? (
            <VideoCard key={item.id} item={item} onClick={() => openLightbox(i)} />
          ) : (
            <ImageCard key={item.id} item={item} onClick={() => openLightbox(i)} />
          )
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            item={GALLERY_ITEMS[activeIndex]}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
