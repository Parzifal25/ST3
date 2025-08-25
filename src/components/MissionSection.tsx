import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from 'scrollreveal';

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartlineRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollReveal for paragraphs
      ScrollReveal().reveal('.mission-paragraph', {
        origin: 'bottom',
        distance: '40px',
        duration: 800,
        delay: 200,
        interval: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        reset: false
      });

      // Heartbeat line animation
      if (heartlineRef.current) {
        const path = heartlineRef.current.querySelector('path');
        if (path) {
          const pathLength = path.getTotalLength();
          
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
          });

          ScrollTrigger.create({
            trigger: heartlineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            animation: gsap.to(path, {
              strokeDashoffset: 0,
              duration: 2,
              ease: "power2.inOut"
            }),
            toggleActions: "play none none reverse"
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-gray-50 to-white relative"
    >
      <div className="container-custom text-center">
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-gradient">
          Science + Empathy = <br />
          Women's Health Reimagined
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          <p className="mission-paragraph text-xl md:text-2xl text-gray-700 leading-relaxed">
            We believe every woman deserves healthcare that truly understands her. 
            ST3 combines advanced medical research with compassionate care, creating 
            a platform that evolves with you through every stage of your journey.
          </p>
          
          <p className="mission-paragraph text-xl md:text-2xl text-gray-700 leading-relaxed">
            From the complexities of menstrual health to the transformative experience 
            of pregnancy and beyond, we're here to provide insights, support, and 
            personalized guidance when you need it most.
          </p>
          
          <p className="mission-paragraph text-2xl md:text-3xl font-bold text-brand-pink mt-12">
            Because your health story is unique, and it deserves to be honored.
          </p>
        </div>

        {/* Animated Heartbeat Line */}
        <div className="mt-16">
          <svg
            ref={heartlineRef}
            className="w-full max-w-2xl mx-auto h-20"
            viewBox="0 0 400 80"
            fill="none"
          >
            <path
              d="M0 40 L50 40 L60 20 L70 60 L80 10 L90 70 L100 40
                L120 40 L130 20 L140 60 L150 10 L160 70 L170 40
                L190 40 L200 20 L210 60 L220 10 L230 70 L240 40
                L260 40 L270 20 L280 60 L290 10 L300 70 L310 40
                L400 40"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#C70276' }} />
                <stop offset="100%" style={{ stopColor: '#FF77B5' }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
