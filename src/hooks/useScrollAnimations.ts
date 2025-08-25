import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (ref: RefObject<HTMLElement>, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            ...options
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
};

export const useParallax = (ref: RefObject<HTMLElement>, distance = 50) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        animation: gsap.fromTo(ref.current, 
          { y: -distance },
          { y: distance, ease: "none" }
        )
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, distance]);
};
