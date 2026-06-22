const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(226,226,220,0.6)',
        paddingTop: 'clamp(40px, 8vw, 72px)',
        paddingBottom: 'clamp(28px, 5vw, 48px)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 64px)',
          paddingRight: 'clamp(20px, 5vw, 64px)',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, '#home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            textDecoration: 'none',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '20px',
              color: 'var(--color-accent)',
              transition: 'transform 0.3s',
            }}
          >
            
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '20px',
              color: 'var(--color-charcoal)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
          >
            Syntonic
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '20px',
              color: 'var(--color-accent)',
              transition: 'transform 0.3s',
            }}
          >
          
          </span>
        </a>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-muted)',
            maxWidth: '320px',
            margin: '0 auto 32px',
            lineHeight: 1.75,
          }}
        >
          Crafting digital experiences that move people.
        </p>

        {/* Nav */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vw, 32px)',
            marginBottom: '32px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-charcoal)'}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '1px',
            background: 'var(--color-stone)',
            margin: '0 auto 24px',
          }}
        />

        {/* Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-stone-dark)',
            }}
          >
            © {new Date().getFullYear()} Syntonic. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-stone-dark)',
            }}
          >
             Designed & Developed by Ankit Suthar
          </p>
        </div>
      </div>
    </footer>
  );
}
