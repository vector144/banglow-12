import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

// ─────────────────────────────────────────────────────────────
//  ADD YOUR MEDIA HERE
//  type: 'image' | 'video'
//  src:  path inside /public/gallery/ or a full URL
//  span: 'tall' | 'wide' | 'normal'  (controls grid sizing)
// ─────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  {
    id: 1,
    type: 'video' as const,
    src: '/gallery/video-1.mp4',
    caption: 'The magic of Bungalow Twelve',
    span: 'tall',
  },
  {
    id: 2,
    type: 'image' as const,
    src: '/gallery/food-1.jpg',
    caption: 'Burnt Garlic Rice with Paneer Chilli',
    span: 'normal',
  },
  {
    id: 3,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    caption: 'Evening at the Bungalow',
    span: 'normal',
  },
  {
    id: 4,
    type: 'image' as const,
    src: '/gallery/food-2.jpg',
    caption: 'Pancake Mornings',
    span: 'tall',
  },
  {
    id: 5,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800',
    caption: 'Signature Curry',
    span: 'normal',
  },
  {
    id: 6,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=800',
    caption: 'Crafted Cocktails',
    span: 'normal',
  },
  {
    id: 7,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    caption: 'Our Space',
    span: 'wide',
  },
  {
    id: 8,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    caption: 'Fresh from the Kitchen',
    span: 'normal',
  },
  {
    id: 9,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    caption: 'Catering Events',
    span: 'normal',
  },
];

type GalleryItem = (typeof GALLERY_ITEMS)[number];

// ─── Video Card ───────────────────────────────────────────────
function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`gallery-card gallery-card--${item.span}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="gallery-media"
      />
      <div className="gallery-play-icon">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div className="gallery-overlay">
        <p className="gallery-caption">{item.caption}</p>
      </div>
    </div>
  );
}

// ─── Image Card ───────────────────────────────────────────────
function ImageCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div className={`gallery-card gallery-card--${item.span}`} onClick={onClick}>
      <img src={item.src} alt={item.caption} className="gallery-media" loading="lazy" />
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
