import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

import loaderLogo from '../assets/removed-bg-loog.png';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: onComplete
        });
      }
    });

    // Reveal logo
    tl.fromTo(logoRef.current, 
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );

    // Progress bar animation
    tl.to(progressRef.current, {
      xPercent: 100,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=0.8');

    // Fade out elements inside
    tl.to([logoRef.current, progressRef.current], {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: 'power2.in'
    }, '+=0.2');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={containerRef}>
      <div className="preloader-content">
        <div className="loader-logo-img-wrap" ref={logoRef}>
          <img src={loaderLogo} alt="Bungalow Twelve" className="loader-logo-img" />
        </div>
        <div className="loader-progress-container">
          <div className="loader-progress-bar" ref={progressRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
