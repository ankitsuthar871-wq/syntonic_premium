import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home',     href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About',    href: '#about' },
  { name: 'Work',     href: '#work' },
  { name: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  // ✅ FIX: observer ready hone ke baad hi active set hoga
  const [observerReady, setObserverReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    // ✅ FIX: 800ms baad observer start — initial home gold nahi hoga
    const timer = setTimeout(() => {
      setObserverReady(true);
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
        },
        { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
      );
      sections.forEach((s) => obs.observe(s));
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: 'background 0.5s, box-shadow 0.5s',
          background: scrolled ? 'rgba(250, 250, 247, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
          borderBottom: 'none',
        }}
      >
        {/* ✅ FIX: margin: '0 auto' hata diya, width: '100%' aur px directly */}
        <div style={{
          width: '100%',
          paddingLeft: 'clamp(20px, 5vw, 64px)',
          paddingRight: 'clamp(20px, 5vw, 64px)',
          boxSizing: 'border-box',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'clamp(64px, 10vw, 80px)',
          }}>

            {/* ── Logo ── */}
            
             <a href="#home"
              onClick={(e) => scrollTo(e, '#home')}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
            >
              <span
                className="font-heading"
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(16px, 2vw, 24px)',
                  color: 'var(--color-charcoal, #1a1a1a)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  transition: 'color 0.3s',
                }}
              >
                Syntonic
              </span>
            </a>

            {/* ── Desktop Nav Links ── */}
            {!isMobile && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(24px, 3vw, 48px)',
              }}>
                {navLinks.map((link) => (
                  
                  <a  key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="font-heading"
                    style={{
                      fontWeight: 700,
                      fontSize: '17px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      textDecoration: 'none',
                      padding: '4px 2px',
                      // ✅ FIX: observerReady false ho tab tak koi gold nahi
                      color: (observerReady && active === link.href.slice(1))
                        ? 'var(--color-charcoal, #1a1a1a)'
                        : 'var(--color-charcoal, #1a1a1a)',
                      transition: 'color 0.3s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}

            {/* ── Hamburger — sirf mobile ── */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(true)}
                style={{
                  width: 44, height: 44,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                aria-label="Open menu"
              >
                <span style={{ width: 24, height: 1.5, background: '#1a1a1a', display: 'block' }} />
                <span style={{ width: 24, height: 1.5, background: '#1a1a1a', display: 'block' }} />
                <span style={{ width: 24, height: 1.5, background: '#1a1a1a', display: 'block' }} />
              </button>
            )}

          </div>
        </div>
      </motion.nav>

      {/* ── Fullscreen Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(250, 250, 247, 0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 400,
              width: '100%',
              padding: '0 24px',
              textAlign: 'center',
            }}>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  marginBottom: 32,
                  width: 48, height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Close menu"
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: 28,
              }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                  >
                    
                     <a href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="font-heading"
                      style={{
                        fontWeight: 800,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.35em',
                        textDecoration: 'none',
                        padding: '8px 24px',
                        display: 'block',
                        width: '100%',
                        textAlign: 'center',
                        color: (observerReady && active === link.href.slice(1))
                          ? 'var(--color-charcoal,#1a1a1a)'
                          : 'var(--color-charcoal, #1a1a1a)',
                        transition: 'color 0.3s',
                      }}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}