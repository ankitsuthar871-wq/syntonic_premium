import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const words = [
  { text: 'We', accent: false },
  { text: 'Create', accent: false },
  { text: 'Digital', accent: true },
  { text: 'Experiences', accent: true },
  { text: 'That', accent: false },
  { text: 'Move', accent: false },
  { text: 'People', accent: false },
];

const nodes = [
  { x: 15, y: 22 }, { x: 38, y: 14 }, { x: 62, y: 20 }, { x: 85, y: 10 },
  { x: 25, y: 42 }, { x: 50, y: 35 }, { x: 72, y: 45 }, { x: 92, y: 32 },
  { x: 10, y: 62 }, { x: 40, y: 68 }, { x: 66, y: 72 }, { x: 88, y: 64 },
  { x: 20, y: 88 }, { x: 55, y: 90 }, { x: 80, y: 85 },
];

const edges = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7],
  [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10], [7, 11],
  [8, 9], [9, 10], [10, 11], [9, 12], [10, 13], [11, 14], [12, 13], [13, 14],
];

const services = [
  'UI/UX Design', 'Brand Identity', 'Web Development',
  'Digital Marketing', 'SEO Optimization', 'Motion Design',
];

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX * 24);
    mouseY.set(relY * 24);
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative z-10 overflow-hidden"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Network background — parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: springX, y: springY }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.55 }}
        >
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="rgba(201,169,110,0.28)" strokeWidth="0.15" />
          ))}
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="0.45" fill="rgba(201,169,110,0.55)" />
          ))}
        </svg>
      </motion.div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Main content */}
      <div
        className="relative w-full mx-auto text-center"
        style={{
          maxWidth: '1100px',
          paddingLeft: 'clamp(20px, 5vw, 64px)',
          paddingRight: 'clamp(20px, 5vw, 64px)',
          paddingTop: 'clamp(70px, 10vw, 120px)',
          paddingBottom: 'clamp(100px, 14vw, 160px)',
        }}
      >
        {/* Headline */}
        <h1
          className="font-heading font-bold leading-tight tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.4rem, 7.5vw, 5.5rem)', lineHeight: 1.1 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.75, delay: 0.3 + i * 0.075, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block ${word.accent ? 'text-gradient' : 'text-charcoal'}`}
              style={{ marginRight: '0.28em' }}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
            color: 'var(--color-muted)',
            lineHeight: 1.75,
            maxWidth: '560px',
            margin: '0 auto 2.8rem',
          }}
        >
          We craft stunning websites, bold brands, and seamless user experiences
          that convert visitors into loyal clients.
        </motion.p>

        {/* ── Premium "Let's Talk" Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          <motion.a
            href="#contact"
            onClick={scrollToContact}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 36px',
              borderRadius: '100px',
              textDecoration: 'none',
              cursor: 'pointer',
              overflow: 'hidden',
              // Gold border
              border: '1px solid rgba(201,169,110,0.6)',
              background: hovered
                ? 'linear-gradient(135deg, #C9A96E 0%, #E8C97A 40%, #C9A96E 100%)'
                : 'transparent',
              transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
              boxShadow: hovered
                ? '0 8px 32px rgba(201,169,110,0.35), 0 2px 8px rgba(201,169,110,0.2)'
                : '0 2px 12px rgba(201,169,110,0.1)',
            }}
          >
            {/* Shimmer effect layer */}
            {hovered && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.2s ease infinite',
                  borderRadius: '100px',
                }}
              />
            )}

            {/* Button Text */}
            <span
              className="font-heading"
              style={{
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: hovered ? '#1a1a1a' : 'var(--color-accent, #C9A96E)',
                transition: 'color 0.4s ease',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Let's Talk
            </span>

            {/* Animated Arrow */}
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <svg
                width="16" height="16" viewBox="0 0 16 16"
                fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke={hovered ? '#1a1a1a' : 'var(--color-accent, #C9A96E)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'stroke 0.4s ease' }}
                />
              </svg>
            </motion.span>
          </motion.a>
        </motion.div>

      </div>

      {/* Ticker — bilkul bottom par */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: '100%',
          overflow: 'hidden',
          padding: '1.1rem 0',
          background: 'rgba(201,169,110,0.04)',
        }}
      >
        <div
          className="flex"
          style={{ animation: 'marquee-scroll 26s linear infinite', width: 'max-content' }}
        >
          {[...services, ...services].map((s, i) => (
            <span
              key={i}
              className="font-heading font-bold uppercase inline-flex items-center"
              style={{
                fontSize: 'clamp(0.9rem, 2.2vw, 1.25rem)',
                letterSpacing: '0.04em',
                color: 'var(--color-charcoal)',
                whiteSpace: 'nowrap',
                padding: '0 1.4rem',
              }}
            >
              {s}
              <span style={{ color: 'var(--color-accent)', marginLeft: '1.4rem' }}>✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}