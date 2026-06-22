import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './ui/ScrollReveal';

const testimonials = [
  {
    quote: 'Syntonic transformed our online presence completely. The website they built increased our conversion rate by 340%. Their attention to detail is absolutely unmatched.',
    name: 'Sarah Chen',
    role: 'CEO, Luxe Cosmetics',
    initials: 'SC',
    color: '#C9A96E',
  },
  {
    quote: "Working with Syntonic was the best business decision we made this decade. They didn't just build a website — they created an experience that our clients love and trust.",
    name: 'Marcus Rivera',
    role: 'Founder, Vertex Finance',
    initials: 'MR',
    color: '#5B6B8A',
  },
  {
    quote: 'The team at Syntonic truly understands the balance between aesthetics and functionality. Our new site is both breathtakingly beautiful and blazing fast.',
    name: 'Elena Volkov',
    role: 'Director, Nova Wellness',
    initials: 'EV',
    color: '#7A9B6D',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setActive((p) => (p + 1) % testimonials.length);
  }, []);

  const goTo = (idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  const t = testimonials[active];

  return (
    <section
      className="relative z-10 overflow-hidden"
      style={{
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 64px)',
          paddingRight: 'clamp(20px, 5vw, 64px)',
        }}
      >
        <ScrollReveal className="text-center mb-12">
          <span className="section-pill">04 — Testimonials</span>
          <h2
            className="font-heading font-bold text-charcoal mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15 }}
          >
            What Clients Say
          </h2>
          <div className="accent-line" />
        </ScrollReveal>

        <div
          className="card"
          style={{
            padding: 'clamp(28px, 6vw, 56px)',
            minHeight: 'clamp(260px, 35vw, 320px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center' }}
            >
              {/* Quote mark */}
              <svg
                width="40"
                height="40"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'rgba(201,169,110,0.15)', margin: '0 auto 20px' }}
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>

              <blockquote
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                  color: 'var(--color-charcoal)',
                  lineHeight: 1.75,
                  marginBottom: '28px',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: t.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: 'var(--color-charcoal)' }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                height: '8px',
                width: i === active ? '28px' : '8px',
                borderRadius: '99px',
                background: i === active ? 'var(--color-accent)' : 'var(--color-stone-dark)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
