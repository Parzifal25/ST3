import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Users, Target, Zap, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BetaForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    healthGoals: '',
    currentChallenges: '',
    techComfort: '',
    features: [] as string[],
    feedback: '',
    newsletter: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
          }
        );
      }

      // Form entrance animation
      if (formRef.current) {
        const formSections = formRef.current.querySelectorAll('.form-section');
        gsap.fromTo(formSections,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.fullName || !formData.email || !formData.age) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/beta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Animate success state
        if (formRef.current) {
          gsap.to(formRef.current, {
            scale: 1.02,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        }
      }
    } catch (error) {
      console.error('Beta signup failed:', error);
    }

    setIsSubmitting(false);
  };

  const features = [
    "Period Prediction & Tracking",
    "Pregnancy Week-by-Week Guide", 
    "Postpartum Recovery Support",
    "PCOD & Fertility Tracking",
    "Symptom & Mood Logging",
    "AI Health Insights",
    "Voice-Based Daily Tips",
    "Community Support"
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-brand-pink to-brand-pink-glow rounded-full flex items-center justify-center mx-auto mb-8 text-4xl animate-bounce">
            🎉
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
            Welcome to ST3 Beta!
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Thank you for joining our exclusive beta program. We're excited to have you on this journey with us. 
            You'll receive early access details and updates via email soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary px-8 py-4 text-lg"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.open('https://discord.gg/st3-beta', '_blank')}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Join Our Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-12 px-6">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-pink mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-gradient">
            Join ST3 Beta Program
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Be among the first to experience the future of women's health tracking. 
            Your feedback will help us create the perfect companion for your wellness journey.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-brand-pink-glow/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-brand-pink" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Early Access</h3>
              <p className="text-sm text-gray-600">Get exclusive access to new features before anyone else</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-brand-pink-glow/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-brand-pink" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">VIP Community</h3>
              <p className="text-sm text-gray-600">Connect with other beta testers and share insights</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-brand-pink-glow/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-brand-pink" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Shape the Product</h3>
              <p className="text-sm text-gray-600">Your feedback directly influences our development</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-brand-pink-glow/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-brand-pink" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Premium</h3>
              <p className="text-sm text-gray-600">Enjoy premium features at no cost during beta</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="form-section glass-effect rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
              Personal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group *
                </label>
                <select
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select your age group</option>
                  <option value="18-24">18-24 years</option>
                  <option value="25-34">25-34 years</option>
                  <option value="35-44">35-44 years</option>
                  <option value="45+">45+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tech Comfort Level
                </label>
                <select
                  value={formData.techComfort}
                  onChange={(e) => handleInputChange('techComfort', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none transition-colors"
                >
                  <option value="">How comfortable are you with tech?</option>
                  <option value="beginner">Beginner - I prefer simple apps</option>
                  <option value="intermediate">Intermediate - I'm comfortable with most apps</option>
                  <option value="advanced">Advanced - I love trying new tech features</option>
                </select>
              </div>
            </div>
          </div>

          {/* Health Goals & Challenges */}
          <div className="form-section glass-effect rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
              Health Goals & Challenges
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are your primary health goals?
                </label>
                <textarea
                  value={formData.healthGoals}
                  onChange={(e) => handleInputChange('healthGoals', e.target.value)}
                  placeholder="e.g., Track my cycle better, manage PCOD symptoms, prepare for pregnancy..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none transition-colors h-24 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What health challenges are you currently facing?
                </label>
                <textarea
                  value={formData.currentChallenges}
                  onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                  placeholder="e.g., Irregular periods, fertility concerns, pregnancy symptoms..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none transition-colors h-24 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Feature Interest */}
          <div className="form-section glass-effect rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
              Features You're Most Excited About
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-brand-pink-light/20 transition-colors">
                  <input
                    type="checkbox"
                    id={feature}
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="w-5 h-5 text-brand-pink border-2 border-gray-300 rounded focus:ring-brand-pink"
                  />
                  <label
                    htmlFor={feature}
                    className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Feedback */}
          <div className="form-section glass-effect rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
              Additional Thoughts
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any specific feedback or suggestions for ST3?
                </label>
                <textarea
                  value={formData.feedback}
                  onChange={(e) => handleInputChange('feedback', e.target.value)}
                  placeholder="Share any ideas, concerns, or features you'd love to see..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none transition-colors h-32 resize-none"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                  className="w-5 h-5 text-brand-pink border-2 border-gray-300 rounded focus:ring-brand-pink"
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Yes, I'd like to receive updates about ST3 and women's health insights
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-12 py-4 text-lg font-bold rounded-2xl group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining Beta Program...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Join Beta Program
                  <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                </span>
              )}
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              By joining, you agree to provide feedback and help us improve ST3
            </p>
          </div>
        </form>
      </div>

      {/* Background decorations */}
      <div className="absolute top-32 left-10 w-24 h-24 bg-brand-pink/5 rounded-full blur-2xl" />
      <div className="absolute bottom-40 right-16 w-32 h-32 bg-brand-pink-glow/10 rounded-full blur-3xl" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-brand-pink/40 rounded-full animate-float" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-brand-pink-glow/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-10 w-1 h-1 bg-brand-pink/60 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default BetaForm;
