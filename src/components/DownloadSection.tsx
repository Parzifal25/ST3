import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from 'scrollreveal';
import { Download, Smartphone, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DownloadSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phone enlargement on scroll
      if (phoneRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          animation: gsap.fromTo(phoneRef.current, 
            { scale: 0.8, y: 50, rotation: -5 },
            { scale: 1, y: 0, rotation: 0, ease: "power2.out" }
          )
        });
      }

      // Text slide in from left and right
      ScrollReveal().reveal('.slide-left', {
        origin: 'left',
        distance: '50px',
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      ScrollReveal().reveal('.slide-right', {
        origin: 'right',
        distance: '50px',
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number');
        
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.textContent || '0');
          const isDecimal = stat.textContent?.includes('.');
          
          ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(stat, 
                { textContent: 0 },
                {
                  textContent: target,
                  duration: 2,
                  ease: "power2.out",
                  snap: { textContent: isDecimal ? 0.1 : 1 },
                  onUpdate: function() {
                    const current = parseFloat(this.targets().textContent);
                    stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
                  }
                }
              );
            },
            once: true
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -2,
      boxShadow: "0 15px 35px rgba(199, 2, 118, 0.4)",
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 15px rgba(199, 2, 118, 0.2)",
      duration: 0.3
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-pink-50 to-white relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="slide-left">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-gradient leading-tight">
              Ready to Transform Your Health Journey?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of women who have already discovered the power of personalized health tracking with ST3.
            </p>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <button
                className="btn-primary flex items-center gap-3 group"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download for iOS
              </button>
              
              <button
                className="btn-secondary flex items-center gap-3 group"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                <Smartphone className="w-5 h-5 group-hover:animate-bounce" />
                Download for Android
              </button>
            </div>

            {/* Trust indicators */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="stat-number text-4xl font-black text-brand-pink mb-2">50000</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="stat-number text-4xl font-black text-brand-pink mb-2">95</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">% Accuracy Rate</div>
              </div>
              <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 mb-2">
                  <span className="stat-number text-4xl font-black text-brand-pink">4.9</span>
                  <Star className="w-6 h-6 text-yellow-400 fill-current ml-1" />
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">App Store Rating</div>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="slide-right flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                ref={phoneRef}
                src="/phone-iphone.png"
                alt="ST3 App Download"
                className="w-80 md:w-96 transform-gpu"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(199, 2, 118, 0.25))'
                }}
              />
              
              {/* Floating download indicators */}
              <div className="absolute -top-8 -left-8 bg-gradient-to-r from-brand-pink to-brand-pink-glow text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce">
                Download Now!
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl shadow-xl animate-pulse">
                ✓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-brand-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-16 w-40 h-40 bg-brand-pink-glow/10 rounded-full blur-3xl" />
    </section>
  );
};

export default DownloadSection;
