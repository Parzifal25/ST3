import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, BarChart3, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (phoneRef.current) {
        // 360 rotation on scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          animation: gsap.fromTo(phoneRef.current,
            { rotateY: -30 },
            { 
              rotateY: 30,
              ease: "none"
            }
          )
        });

        // Phone entrance animation
        gsap.fromTo(phoneRef.current,
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: phoneRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Floating icons parallax
      const floatingIcons = sectionRef.current?.querySelectorAll('.floating-icon');
      floatingIcons?.forEach((icon, index) => {
        gsap.to(icon, {
          y: -20,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.3
        });
      });

      // Feature cards entrance
      const featureCards = sectionRef.current?.querySelectorAll('.feature-card');
      gsap.fromTo(featureCards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.feature-cards',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-white to-pink-50 relative overflow-hidden"
    >
      <div className="container-custom text-center">
        <h2 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
          Experience ST3 in Action
        </h2>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          See how our intuitive interface makes managing your health simple, beautiful, and empowering.
        </p>

        {/* Floating background icons */}
        <div className="floating-icon absolute top-20 left-20 w-16 h-16 bg-brand-pink-light rounded-2xl flex items-center justify-center text-2xl opacity-60">
          💗
        </div>
        <div className="floating-icon absolute top-40 right-32 w-12 h-12 bg-brand-pink-light rounded-xl flex items-center justify-center text-xl opacity-50">
          📅
        </div>
        <div className="floating-icon absolute bottom-32 left-40 w-14 h-14 bg-brand-pink-light rounded-2xl flex items-center justify-center text-xl opacity-40">
          🍼
        </div>

        <div className="relative flex items-center justify-center min-h-[500px] mb-16">
          {/* Demo phone mockup */}
          <div ref={phoneRef} className="phone-container relative">
            <div className="w-80 h-[600px] bg-gradient-to-b from-white to-gray-100 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center border-8 border-gray-800 relative overflow-hidden">
              {/* Phone screen content */}
              <div className="w-full h-full bg-gradient-to-b from-brand-pink-light to-white rounded-[2rem] p-8 flex flex-col items-center justify-center">
                <div className="w-full h-16 bg-white/80 rounded-2xl mb-6 flex items-center justify-center">
                  <span className="text-brand-pink font-bold text-lg">ST3 Dashboard</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl mb-2">🌸</div>
                    <div className="text-sm text-gray-600">Cycle Day 14</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm text-gray-600">95% Accuracy</div>
                  </div>
                </div>

                <div className="w-full h-32 bg-white/60 rounded-2xl flex items-center justify-center">
                  <span className="text-brand-pink text-sm">Interactive Health Calendar</span>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-full" />
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="feature-cards grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="feature-card bg-white rounded-3xl p-8 shadow-xl card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-pink to-brand-pink-glow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Precise Tracking</h3>
            <p className="text-gray-600">AI-powered predictions with 95% accuracy for your health patterns</p>
          </div>
          
          <div className="feature-card bg-white rounded-3xl p-8 shadow-xl card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-pink to-brand-pink-glow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Insights</h3>
            <p className="text-gray-600">Personalized health recommendations based on your unique data</p>
          </div>
          
          <div className="feature-card bg-white rounded-3xl p-8 shadow-xl card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-pink to-brand-pink-glow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy First</h3>
            <p className="text-gray-600">Your data is encrypted and secure with bank-level protection</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
