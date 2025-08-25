import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showAndroid, setShowAndroid] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal animation
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(words, 
          { 
            opacity: 0, 
            y: 30, 
            rotateX: -90 
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.5
          }
        );
      }

      // Phone mockup 3D tilt and device switch on scroll
      if (phoneRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              
              // 3D rotation effect
              gsap.set(phoneRef.current, {
                rotateY: progress * 15 - 7.5,
                rotateX: progress * 10 - 5,
              });

              // Switch from iPhone to Android at 60% scroll
              if (progress > 0.6 && !showAndroid) {
                setShowAndroid(true);
              } else if (progress <= 0.6 && showAndroid) {
                setShowAndroid(false);
              }
            }
          }
        });
      }

      // CTA buttons entrance animation
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        gsap.fromTo(buttons,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 2
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [showAndroid]);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(199, 2, 118, 0.4)",
      duration: 0.3
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 4px 15px rgba(199, 2, 118, 0.2)",
      duration: 0.3
    });
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-pink-100 flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-brand-pink/20 rounded-full animate-float" />
      <div className="absolute top-40 right-32 w-6 h-6 bg-brand-pink-glow/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-brand-pink/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="container-custom text-center">
        <div className="max-w-5xl mx-auto">
          {/* Hero Title */}
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
          >
            {["Women's", 'Complete', 'Health', 'Companion'].map((word, index) => (
              <span key={index} className="word inline-block mr-4 text-gradient">
                {word}
              </span>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionary platform combining cutting-edge science with heartfelt empathy 
            for your complete wellness journey.
          </p>

          {/* Phone Mockup */}
          <div className="phone-container mb-16">
            <div 
              ref={phoneRef}
              className="phone-transition mx-auto relative w-64 h-auto"
            >
              <img 
                src={showAndroid ? "/phone-android.png" : "/phone-iphone.png"}
                alt={showAndroid ? "ST3 on Android" : "ST3 on iPhone"}
                className="w-full h-auto drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(199, 2, 118, 0.3))'
                }}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              className="btn-primary ripple group flex items-center gap-3"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download for iOS
            </button>
            <button
              className="btn-primary ripple group flex items-center gap-3"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              <Smartphone className="w-5 h-5 group-hover:animate-bounce" />
              Download for Android
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="w-6 h-10 border-2 border-brand-pink rounded-full flex justify-center p-1">
              <div className="w-1 h-3 bg-brand-pink rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
