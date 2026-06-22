import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './ui/ScrollReveal';

const categories = ['All', 'Websites', 'E-Commerce', 'Web Apps', 'Branding'];

const projects = [
  {
    title: 'Luxe Cosmetics',
    category: 'E-Commerce',
    desc: 'Premium beauty brand e-commerce with immersive product experiences.',
    bg: 'linear-gradient(135deg, #f5e6d3 0%, #e8d1b8 100%)',
    accent: '#C9A96E',
    tags: ['React', 'Tailwind', 'Vite'],
    url: 'luxecosmetics.studio',
    link: 'https://luxecosmetics.studio',
  },
  {
    title: 'Vertex Finance',
    category: 'Web Apps',
    desc: 'Real-time fintech dashboard for portfolio management and analytics.',
    bg: 'linear-gradient(135deg, #e0e5ec 0%, #c8d0dc 100%)',
    accent: '#5B6B8A',
    tags: ['React', 'Chart.js', 'Tailwind'],
    url: 'vertexfinance.io',
    link: 'https://vertexfinance.io',
  },
  {
    title: 'Nova Wellness',
    category: 'Websites',
    desc: 'Minimalist health platform with booking system and content hub.',
    bg: 'linear-gradient(135deg, #e8f0e4 0%, #d0ddc8 100%)',
    accent: '#7A9B6D',
    tags: ['React', 'Node.js', 'MongoDB'],
    url: 'novawellness.co',
    link: 'https://novawellness.co',
  },
  {
    title: 'Atlas Ventures',
    category: 'Branding',
    desc: 'Complete brand identity and digital presence for a venture capital firm.',
    bg: 'linear-gradient(135deg, #e8e4f0 0%, #d0c8dc 100%)',
    accent: '#8B7AAE',
    tags: ['Branding', 'Figma', 'Assets'],
    url: 'atlasventures.vc',
    link: 'https://atlasventures.vc',
  },
  {
    title: 'Meridian Hotels',
    category: 'Websites',
    desc: 'Luxury hospitality website with virtual tours and instant booking.',
    bg: 'linear-gradient(135deg, #f0e8e4 0%, #dcd0c8 100%)',
    accent: '#B8866E',
    tags: ['React', 'Three.js', 'GSAP'],
    url: 'meridianhotels.com',
    link: 'https://meridianhotels.com',
  },
  {
    title: 'Pulse Fitness',
    category: 'Web Apps',
    desc: 'Interactive fitness platform with workout tracking and social features.',
    bg: 'linear-gradient(135deg, #e4ecf0 0%, #c8d8dc 100%)',
    accent: '#5A8A9B',
    tags: ['React', 'Redux', 'Node.js'],
    url: 'pulsefitness.app',
    link: 'https://pulsefitness.app',
  },
];

// Abstract "browser preview" thumbnail — replace MockupThumbnail's content
// with a real <img> tag once you have actual screenshots.
function MockupThumbnail({ project }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Browser chrome bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.05)',
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFBD2E' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28C840' }} />
        <span
          style={{
            marginLeft: 8,
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 5,
            padding: '2px 10px',
            fontSize: 10,
            color: 'rgba(0,0,0,0.45)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {project.url}
        </span>
      </div>

      {/* Abstract UI body */}
      <div style={{ flex: 1, position: 'relative', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: project.accent }} />
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: project.accent }} />
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: project.accent }} />
          </div>
          <span style={{ width: 30, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.65)' }} />
        </div>

        <div style={{ width: '58%', height: 9, borderRadius: 4, background: 'rgba(255,255,255,0.75)', marginBottom: 6 }} />
        <div style={{ width: '38%', height: 9, borderRadius: 4, background: 'rgba(255,255,255,0.75)', marginBottom: 12 }} />
        <div style={{ width: '26%', height: 12, borderRadius: 6, background: project.accent, marginBottom: 14 }} />

        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, height: 30, borderRadius: 5, background: 'rgba(255,255,255,0.75)' }} />
          <div style={{ flex: 1, height: 30, borderRadius: 5, background: 'rgba(255,255,255,0.75)' }} />
          <div style={{ flex: 1, height: 30, borderRadius: 5, background: 'rgba(255,255,255,0.75)' }} />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="work"
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
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="section-pill">03 — Projects</span>
          <h2
            className="font-heading font-bold text-charcoal mt-4 mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15 }}
          >
            Featured <span className="text-gradient">Works</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'var(--color-muted)',
              maxWidth: '440px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            A selection of our recent projects and experiments
          </p>
          <div className="accent-line" />
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div
            className="scrollbar-hide"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: 'clamp(32px, 5vw, 56px)',
              overflowX: 'auto',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '99px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  border: activeFilter === cat ? 'none' : '1.5px solid var(--color-stone)',
                  background: activeFilter === cat ? 'var(--color-charcoal)' : 'transparent',
                  color: activeFilter === cat ? '#fff' : 'var(--color-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(14px, 2.5vw, 24px)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="card group"
                  style={{ overflow: 'hidden' }}
                >
                  {/* Thumbnail — clickable, opens the live project */}
                  
                   <a href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      background: p.bg,
                      height: 'clamp(160px, 25vw, 220px)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.5s',
                      cursor: 'pointer',
                    }}
                    className="group-hover:scale-105"
                  >
                    <MockupThumbnail project={p} />

                    {/* Hover overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(23,23,31,0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.4s',
                      }}
                      className="group-hover:!bg-charcoal/40"
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: 0,
                          transform: 'translateY(8px)',
                          transition: 'opacity 0.35s, transform 0.35s',
                        }}
                        className="group-hover:!opacity-100 group-hover:!translate-y-0"
                      >
                        View Project
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </a>

                  {/* Info */}
                  <div style={{ padding: 'clamp(18px, 3.5vw, 28px)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '99px',
                            background: 'rgba(201,169,110,0.1)',
                            color: 'var(--color-accent-dark)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3
                      className="font-heading font-bold text-charcoal group-hover:text-accent"
                      style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '6px', transition: 'color 0.3s', lineHeight: 1.3 }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}