import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const USPSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const uspFeatures = [
    {
      icon: '🌸',
      title: 'Period Prediction',
      description: 'Advanced AI algorithms learn your unique patterns, providing accurate predictions and personalized insights for your menstrual health.',
      features: [
        'Smart cycle tracking',
        'Symptom analysis',
        'Mood patterns',
        'Health insights',
      ],
    },
    {
      icon: '🤰',
      title: 'Pregnancy Tracker',
      description: 'Comprehensive pregnancy support with week-by-week guidance, milestone tracking, and expert-backed health recommendations.',
      features: [
        'Week-by-week updates',
        'Baby development',
        'Health monitoring',
        'Expert advice',
      ],
    },
    {
      icon: '🍼',
      title: 'Postpartum Care',
      description: 'Nurturing support through your postpartum journey with recovery tracking, mental health resources, and breastfeeding guidance.',
      features: [
        'Recovery tracking',
        'Mental health support',
        'Breastfeeding help',
        'Sleep optimization',
      ],
    },
    {
      icon: '🩺',
      title: 'PCOD & Fertility Tracker',
      description: 'AI-powered tracker designed for women with PCOD and fertility needs, offering precise cycle and ovulation predictions along with personalized lifestyle guidance to manage symptoms and improve reproductive health.',
      features: [
        'Period start/end logging',
        'Next cycle and ovulation prediction',
        'Symptom tracking: mood, flow, acne, weight gain, cramps',
        'Voice-based daily tips on yoga, food and lifestyle',
      ],
    },
  ];

  // Force slider to first card on mount
  useEffect(() => {
    if (sliderRef.current) {
      gsap.set(sliderRef.current, { x: 0 });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards hover animation
      const cards = sectionRef.current?.querySelectorAll('.usp-card');
      cards?.forEach((card) => {
        const icon = card.querySelector('.usp-icon');

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            rotateY: 5,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(199, 2, 118, 0.2)',
            duration: 0.3,
            ease: 'power2.out',
          });

          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotateY: 0,
            scale: 1,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
          });

          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
        });
      });

      // Parallax floating icons
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const icons = sectionRef.current?.querySelectorAll('.usp-icon');
          icons?.forEach((icon, index) => {
            gsap.set(icon, {
              y: self.progress * (20 + index * 5),
              rotation: self.progress * (10 + index * 2),
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % uspFeatures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + uspFeatures.length) % uspFeatures.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: -currentSlide * 100 + '%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [currentSlide]);

  return (
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
            Your Complete Health Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From cycles to pregnancy to postpartum care — we're with you every step of the way.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl w-full">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-out w-full"
            >
              {uspFeatures.map((feature, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <div className="usp-card glass-effect rounded-3xl p-8 md:p-12 card-hover mx-auto max-w-4xl">
                    <div className="text-center mb-8">
                      <div className="usp-icon text-8xl mb-6 inline-block">
                        {feature.icon}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                        {feature.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {feature.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-brand-pink-light/20">
                          <div className="w-2 h-2 bg-brand-pink rounded-full flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-brand-pink" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-brand-pink" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {uspFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-brand-pink scale-125'
                    : 'bg-gray-300 hover:bg-brand-pink-glow'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
