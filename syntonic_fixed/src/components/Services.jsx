import ScrollReveal from './ui/ScrollReveal';

const services = [
  {
    number: '01',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Custom Web Development',
    desc: 'Fast, responsive, and scalable websites built with modern frameworks tailored precisely to your business goals.',
  },
  {
    number: '02',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    title: 'E-Commerce Solutions',
    desc: 'End-to-end online store development with seamless checkout flows, payment integration, and inventory management.',
  },
  {
    number: '03',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Pixel-perfect interfaces that delight users and drive engagement, backed by research-driven design thinking.',
  },
  {
    number: '04',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'SEO & Performance',
    desc: 'Data-driven optimization for maximum search visibility, lightning-fast load times, and higher conversion rates.',
  },
  {
    number: '05',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Web Applications',
    desc: 'Complex, feature-rich applications with real-time capabilities, built on cutting-edge architectures for scale.',
  },
  {
    number: '06',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: 'Brand Strategy',
    desc: "Defining your brand's voice, visual identity, and digital positioning to stand out in a crowded market.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
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
        {/* Header - ScrollReveal hatake seedha div wrap kiya */}
        <div
          className="mb-14"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <span className="section-pill">01 — Services</span>
          <h2
            className="font-heading font-bold text-charcoal mt-4 mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.15,
              textAlign: 'center',
            }}
          >
            Services We Offer
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.0rem, 3vw, 1.15rem)',
              color: 'var(--color-muted)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.75,
              textAlign: 'center',
            }}
          >
            From concept to launch — end-to-end digital solutions that elevate
            your brand and accelerate growth.
          </p>
          <div className="accent-line" />
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(14px, 2.5vw, 24px)',
          }}
        >
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.07} direction="fade-up">
              <div
                className="card group"
                style={{
                  padding: 'clamp(24px, 4vw, 36px)',
                  height: '100%',
                  border: '1.5px solid transparent',
                  borderRadius: '16px',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#C9A96E';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 3px rgba(201,169,110,0.15), 0 8px 32px rgba(201,169,110,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top row — number + icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: 'var(--color-stone-dark)',
                    }}
                  >
                    {s.number}
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(201,169,110,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                      transition: 'background 0.3s, color 0.3s',
                      flexShrink: 0,
                    }}
                    className="group-hover:!bg-accent group-hover:!text-white"
                  >
                    {s.icon}
                  </div>
                </div>

                <h3
                  className="font-heading font-bold text-charcoal mb-2 group-hover:text-accent"
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    transition: 'color 0.3s',
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: 'var(--color-muted)',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {s.desc}
                </p>

                {/* Arrow link */}
                <div
                  className="flex items-center gap-1.5 text-accent"
                  style={{
                    opacity: 0,
                    transform: 'translateX(-8px)',
                    transition: 'opacity 0.3s, transform 0.3s',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                  ref={el => {
                    if (!el) return;
                    const card = el.closest('.group');
                    const show = () => {
                      el.style.opacity = '1';
                      el.style.transform = 'translateX(0)';
                    };
                    const hide = () => {
                      el.style.opacity = '0';
                      el.style.transform = 'translateX(-8px)';
                    };
                    card.addEventListener('mouseenter', show);
                    card.addEventListener('mouseleave', hide);
                  }}
                >
                  Learn More
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}