import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Users, Zap, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form entrance animation
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Input focus animations
      if (inputRef.current) {
        const input = inputRef.current;
        
        const handleFocus = () => {
          gsap.to(input.parentElement, {
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(199, 2, 118, 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleBlur = () => {
          gsap.to(input.parentElement, {
            scale: 1,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        };

        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);

        return () => {
          input.removeEventListener('focus', handleFocus);
          input.removeEventListener('blur', handleBlur);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Success animation
        if (formRef.current) {
          gsap.to(formRef.current, {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        }

        // Reset after delay
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
        }, 3000);
      }
    } catch (error) {
      console.error('Newsletter signup failed:', error);
    }

    setIsSubmitting(false);
  };

  const handleBetaClick = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 0.5,
      onComplete: () => navigate('/beta')
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom text-center">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
            Stay Connected
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get the latest health insights, feature updates, and wellness tips delivered to your inbox. 
            Join our community of empowered women.
          </p>
        </div>

        {/* Newsletter form */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mb-16"
        >
          <div className="glass-effect rounded-3xl p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 bg-white rounded-2xl focus:border-brand-pink focus:outline-none transition-all duration-300"
                  disabled={isSubmitted || isSubmitting}
                  required
                />
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-brand-pink transform scale-x-0 origin-left transition-transform duration-300 input-animated" />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitted || isSubmitting}
                className={`px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 flex items-center gap-2 ${
                  isSubmitted 
                    ? 'bg-green-500 text-white' 
                    : 'btn-primary'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <span>✓ Subscribed!</span>
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </form>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-brand-pink-glow/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-brand-pink" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Health Tips</h3>
            <p className="text-gray-600">Evidence-based insights for your wellness journey</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-brand-pink-glow/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-brand-pink" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Early Access</h3>
            <p className="text-gray-600">Be the first to try new features and updates</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-brand-pink-glow/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-brand-pink" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
            <p className="text-gray-600">Connect with other women on similar journeys</p>
          </div>
        </div>

        {/* Beta Tester Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-brand-pink-light to-pink-100 rounded-3xl p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Shape the Future?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Join our exclusive beta testing program and help us build the perfect health companion for women.
            </p>
            <button
              onClick={handleBetaClick}
              className="btn-primary text-lg px-10 py-4 group"
            >
              Join as Beta Tester
              <span className="ml-2 group-hover:translate-x-1 transition-transform">🚀</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-32 left-10 w-24 h-24 bg-brand-pink/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-16 w-32 h-32 bg-brand-pink-glow/10 rounded-full blur-3xl" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-brand-pink/40 rounded-full animate-float" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-brand-pink-glow/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default NewsletterSection;
