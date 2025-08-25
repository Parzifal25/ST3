import { gsap } from 'gsap';

export const animateCounter = (element: HTMLElement, target: number, duration = 2) => {
  const isDecimal = target.toString().includes('.');
  
  gsap.fromTo(element, 
    { textContent: 0 },
    {
      textContent: target,
      duration,
      ease: "power2.out",
      snap: { textContent: isDecimal ? 0.1 : 1 },
      onUpdate: function() {
        const current = parseFloat(this.targets().textContent);
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
      }
    }
  );
};

export const createRipple = (button: HTMLElement, event: MouseEvent) => {
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    pointer-events: none;
  `;
  
  button.appendChild(ripple);
  
  gsap.to(ripple, {
    scale: 1,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => ripple.remove()
  });
};

export const staggerReveal = (elements: NodeListOf<Element> | Element[], delay = 0.1) => {
  gsap.fromTo(elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: delay,
      ease: "back.out(1.7)"
    }
  );
};
