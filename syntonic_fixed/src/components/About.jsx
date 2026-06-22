import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ui/ScrollReveal';

const stats = [
  { value: 5, suffix: '+', label: 'Projects Delivered' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction' },
  { value: 2,   suffix: '+', label: 'Years Experience' },
  { value: 5,  suffix: '+', label: 'Happy Clients' },
];

const milestones = [
  {
    year: '2026 — Present',
    title: 'Global Expansion & Interactive Innovation',
    company: 'Syntonic Digital Group',
    desc: 'Expanding operations globally. Launching interactive Web3 experiences, virtual environments, and custom WebXR solutions for enterprise clients.',
  },
  {
    year: '2026',
    title: 'Rapid Team & Creative Growth',
    company: 'Scaling Creativity',
    desc: 'Doubled our engineering and creative design teams. Launched dedicated custom e-commerce and performance engineering subdivisions.',
  },
  {
    year: '2025',
    title: 'Syntonic Founded',
    company: 'The Launch',
    desc: 'Began our journey with a core mission: to merge premium visual storytelling with high-performance web engineering.',
  },
];

const pills = ['Pixel Perfect', 'User-First', 'Performance Driven', 'Agile Process'];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        const start = performance.now();
        const run = (now) => {
          const t = Math.min((now - start) / 2000, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.floor(ease * target));
          if (t < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden"
      style={{
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 64px)',
          paddingRight: 'clamp(20px, 5vw, 64px)',
        }}
      >
        {/* Story + Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Story */}
          <ScrollReveal direction="fade-right">
            <span className="section-pill">02 — About Us</span>
            <h2
              className="font-heading font-bold text-charcoal mt-4 mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15 }}
            >
              Crafting Digital<br />
              <span className="text-gradient">Excellence</span> Since 2025
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
              Syntonic is a premium digital agency that blends aesthetics with
              performance. We believe every pixel matters and every interaction
              should feel intentional.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '28px' }}>
              From ambitious startups to established enterprises, we partner with
              brands who refuse to settle for ordinary. Our team of designers,
              developers, and strategists work in sync to deliver digital products
              that don&apos;t just look beautiful — they drive real results.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {pills.map((v) => (
                <span
                  key={v}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '99px',
                    border: '1.5px solid var(--color-stone)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    transition: 'border-color 0.3s, color 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--color-stone)'; e.target.style.color = 'var(--color-charcoal)'; }}
                >
                  {v}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — Stats */}
          <ScrollReveal direction="fade-left" delay={0.2}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(12px, 2vw, 20px)',
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    padding: 'clamp(24px, 4vw, 36px)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    className="font-heading font-bold text-charcoal"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, marginBottom: '8px' }}
                  >
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: 'clamp(60px, 10vw, 100px)' }}>
          <ScrollReveal className="text-center mb-12">
            <span className="section-pill">Our Journey</span>
            <h3
              className="font-heading font-bold text-charcoal mt-4"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
            >
              Milestones That Shaped Us
            </h3>
            <div className="accent-line" />
          </ScrollReveal>

          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              position: 'relative',
              paddingLeft: 'clamp(32px, 6vw, 48px)',
            }}
          >
            {/* Timeline line */}
            <div
              style={{
                position: 'absolute',
                left: '10px',
                top: '8px',
                bottom: '8px',
                width: '2px',
                background: 'rgba(201,169,110,0.2)',
                borderRadius: '99px',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 32px)' }}>
              {milestones.map((m, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.12} direction="fade-up">
                  <div style={{ position: 'relative' }}>
                    {/* Dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 'calc(-1 * clamp(32px, 6vw, 48px) + 4px)',
                        top: '24px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: 'var(--color-cream)',
                        border: '2.5px solid var(--color-accent)',
                        boxShadow: '0 0 0 4px var(--color-cream)',
                        zIndex: 1,
                      }}
                    />
                    <div
                      className="card"
                      style={{ padding: 'clamp(20px, 4vw, 32px)' }}
                    >
                      <span className="section-pill" style={{ marginBottom: '12px', display: 'inline-flex' }}>
                        {m.year}
                      </span>
                      <h4
                        className="font-heading font-bold text-charcoal"
                        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '4px', marginTop: '4px' }}
                      >
                        {m.title}
                      </h4>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '15px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-accent)',
                          marginBottom: '10px',
                        }}
                      >
                        {m.company}
                      </span>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75 }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
