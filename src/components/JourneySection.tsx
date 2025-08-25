import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from 'scrollreveal';

gsap.registerPlugin(ScrollTrigger);

const JourneySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const journeySteps = [
    {
      step: "01",
      title: "Cycle Tracking",
      description: "Begin your health journey with intelligent cycle tracking that learns from your unique patterns and provides personalized insights.",
      illustration: "🌸",
      color: "from-pink-400 to-rose-500"
    },
    {
      step: "02", 
      title: "Pregnancy Insights",
      description: "Navigate your pregnancy with confidence through week-by-week guidance, health monitoring, and expert recommendations.",
      illustration: "🤰",
      color: "from-purple-400 to-pink-500"
    },
    {
      step: "03",
      title: "Postpartum Support",
      description: "Embrace motherhood with comprehensive postpartum care, recovery tracking, and mental health support for you and your baby.",
      illustration: "🍼",
      color: "from-blue-400 to-purple-500"
    },
    {
      step: "04",
      title: "PCOD & Fertility Tracker",
      description: "Specialized tracking for women with PCOD and fertility needs, offering precise cycle predictions and personalized lifestyle guidance.",
      illustration: "🩺",
      color: "from-emerald-400 to-teal-500"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        const steps = timelineRef.current.querySelectorAll('.journey-step');
        const timeline = timelineRef.current.querySelector('.timeline-line');

        // Timeline line animation
        if (timeline) {
          gsap.fromTo(timeline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1
              }
            }
          );
        }

        // Steps animation with ScrollReveal
        ScrollReveal().reveal('.journey-step', {
          origin: 'left',
          distance: '50px',
          duration: 800,
          delay: 200,
          interval: 300,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          reset: false
        });

        // Individual step animations
        steps.forEach((step, index) => {
          const illustration = step.querySelector('.step-illustration');
          const content = step.querySelector('.step-content');

          // Illustration bounce animation
          if (illustration) {
            gsap.fromTo(illustration,
              { scale: 0, rotation: -180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(2)",
                delay: 0.3,
                scrollTrigger: {
                  trigger: step,
                  start: "top 70%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }

          // Content slide in
          if (content) {
            gsap.fromTo(content.children,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.5,
                scrollTrigger: {
                  trigger: step,
                  start: "top 75%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });

        // Horizontal scroll effect (subtle)
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          animation: gsap.to(steps, {
            x: (i) => -50 + (i * 25),
            ease: "none"
          })
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
            Your Health Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every woman's health story is unique. ST3 adapts and grows with you through each chapter.
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-brand-pink to-brand-pink-glow rounded-full transform -translate-y-1/2 origin-left" />

          {/* Journey steps */}
          <div className="relative z-10 space-y-16">
            {journeySteps.map((step, index) => (
              <div 
                key={index}
                className={`journey-step flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="step-illustration flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-white to-brand-pink-light flex items-center justify-center text-4xl shadow-xl border-4 border-white">
                  {step.illustration}
                </div>

                <div className="step-content flex-1 max-w-md bg-white rounded-3xl p-8 shadow-xl card-hover">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-brand-pink font-bold text-2xl">
                      {step.step}
                    </span>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-brand-pink to-brand-pink-glow" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-32 right-20 w-20 h-20 bg-brand-pink/10 rounded-full blur-2xl" />
      <div className="absolute bottom-40 left-16 w-32 h-32 bg-brand-pink-glow/15 rounded-full blur-3xl" />
    </section>
  );
};

export default JourneySection;
