import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    // Track interactive element hovers
    const onOverInteractive = () => setIsHovering(true);
    const onOutInteractive = () => setIsHovering(false);

    const observe = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onOverInteractive);
        el.addEventListener('mouseleave', onOutInteractive);
      });
    };
    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    let raf;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, [isHovering]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot — follows cursor instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#C9A96E',
          transition: 'width 0.3s, height 0.3s',
          mixBlendMode: 'normal',
        }}
      />
      {/* Outer ring — follows with smooth lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(201, 169, 110, 0.4)',
          backgroundColor: isHovering ? 'rgba(201, 169, 110, 0.08)' : 'transparent',
          transition: 'background-color 0.3s, border-color 0.3s, transform 0.15s ease-out',
        }}
      />
      {/* Hide system cursor */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
