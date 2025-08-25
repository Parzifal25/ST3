import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer fade in
      if (footerRef.current) {
        gsap.fromTo(footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Social icons hover animations
      if (socialsRef.current) {
        const socialIcons = socialsRef.current.querySelectorAll('.social-icon');
        
        socialIcons.forEach((icon) => {
          icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              rotation: 360,
              scale: 1.2,
              duration: 0.6,
              ease: "back.out(1.7)"
            });
          });

          icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-brand-pink to-brand-pink-glow text-white relative overflow-hidden"
    >
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black">ST3</h3>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Empowering women through intelligent health technology and compassionate care. 
              Your journey to better health starts here.
            </p>
          </div>

          {/* Social Icons */}
          <div ref={socialsRef} className="flex justify-center gap-6 mb-16">
            <a 
              href="#" 
              className="social-icon w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors group"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 group-hover:text-pink-200" />
            </a>
            <a 
              href="#" 
              className="social-icon w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors group"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6 group-hover:text-blue-200" />
            </a>
            <a 
              href="#" 
              className="social-icon w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors group"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6 group-hover:text-blue-300" />
            </a>
            <a 
              href="#" 
              className="social-icon w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 group-hover:text-blue-200" />
            </a>
          </div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Updates</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Legal</h4>
              <ul className="space-y-3 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-center">
            <p className="text-white/80 mb-4 sm:mb-0">
              © {new Date().getFullYear()} ST3. All rights reserved. Made with ❤️ for women's health.
            </p>
            <p className="text-white/70 text-sm flex items-center gap-2">
              <span>Privacy-first</span>
              <span>•</span>
              <span>Secure</span>
              <span>•</span>
              <span>Empowering</span>
            </p>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
    </footer>
  );
};

export default Footer;
