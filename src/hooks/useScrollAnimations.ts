import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // --- Fade + Slide Up: all .reveal elements ---
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Stagger children inside .reveal-stagger ---
      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((parent) => {
        const children = parent.children;
        gsap.fromTo(children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Scale in: .reveal-scale ---
      gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Text clip reveal: .reveal-text (character by character) ---
      gsap.utils.toArray<HTMLElement>('.reveal-clip').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0% 0% 0%)', y: 30 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Parallax on hero image ---
      const heroImg = document.querySelector<HTMLElement>('.hero-img');
      if (heroImg) {
        gsap.to(heroImg, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // --- Interior banner parallax ---
      const bannerImg = document.querySelector<HTMLElement>('.interior-banner img');
      if (bannerImg) {
        gsap.fromTo(bannerImg,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: '.interior-banner',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // --- Horizontal slide for reviews ---
      gsap.utils.toArray<HTMLElement>('.review-card').forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Line draw: section separator lines ---
      gsap.utils.toArray<HTMLElement>('.line').forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);
}
