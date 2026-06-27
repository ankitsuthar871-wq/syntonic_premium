import { useState } from 'react';
import ScrollReveal from './ui/ScrollReveal';

const socials = [
  
  {
    name: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    url: 'https://www.linkedin.com/in/ankit-suthar-95b805329?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Twitter/X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    url: 'https://x.com/ankit_suthar11',
  },
  {
    name: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    url: 'https://www.instagram.com/ankit_str17?igsh=cGIwOHFxZXNvb2pi',
  },
];

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'techankit038@gmail.com',
    href: 'mailto:techankit038@gmail.com',
  },
  
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Remote — Worldwide',
    href: null,
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Track resize
  useState(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Tell us about your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setStatus("sending");

    const response = await fetch(
      "http://localhost:5000/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (data.success) {
      setStatus("sent");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
    setStatus("idle");
  }
};

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const fieldStyle = (field) => ({
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    border: errors[field] ? '1.5px solid #f87171' : '1.5px solid var(--color-stone)',
    background: 'var(--color-cream)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    outline: 'none',
    transition: 'border-color 0.25s',
    boxSizing: 'border-box',
  });

  return (
    <section
      id="contact"
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
        {/* Header — center */}
        <ScrollReveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-pill">05 — Contact</span>
          <h2
            className="font-heading font-bold text-charcoal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15, marginTop: '16px', marginBottom: '16px' }}
          >
            Let&apos;s Build Something <span className="text-gradient">Great</span>
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
            Ready to transform your digital presence? Tell us about your project
            and we&apos;ll craft a tailored solution.
          </p>
          <div className="accent-line" />
        </ScrollReveal>

        {/* ✅ Two column on desktop, single column on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }}>



          {/* ── LEFT: Contact Info ── */}
          {/* ── LEFT: Contact Info ── */}
<ScrollReveal delay={0.1}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

    <div>
      {/* ✅ Availability Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '99px',
        border: '1.5px solid rgba(34,197,94,0.3)',
        background: 'rgba(34,197,94,0.06)',
        marginBottom: '16px',
      }}>
        <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
          <span className="animate-ping" style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: '#22c55e',
            opacity: 0.4,
          }} />
          <span style={{
            position: 'relative',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            display: 'block',
          }} />
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          color: '#16a34a',
          letterSpacing: '0.02em',
        }}>
          Available for new projects
        </span>
      </div>

      <h3
        className="font-heading font-bold"
        style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'var(--color-charcoal)', marginBottom: '12px' }}
      >
        Get In Touch
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-muted)', lineHeight: 1.75 }}>
        Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.
      </p>
    </div>

    {/* Contact details */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {contactInfo.map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: '1.5px solid rgba(201,169,110,0.3)',
            background: 'rgba(201,169,110,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent)',
            flexShrink: 0,
          }}>
            {item.icon}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '4px' }}>
              {item.label}
            </p>
            {item.href ? (
              <a href={item.href} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-charcoal)', textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-charcoal)'}
              >
                {item.value}
              </a>
            ) : (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-charcoal)', margin: 0, fontWeight: 500 }}>
                {item.value}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Social icons */}
    <div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '16px' }}>
        Follow Us
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        {socials.map((s) => (
          
           <a key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            style={{
              width: '44px', height: '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--color-stone)',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-charcoal)',
              transition: 'all 0.3s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--color-stone)'; e.currentTarget.style.color = 'var(--color-charcoal)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d={s.path} />
            </svg>
          </a>
        ))}
      </div>
    </div>

  </div>
</ScrollReveal>

          {/* ── RIGHT: Form ── */}
          <ScrollReveal delay={0.2}>
            <div className="card" style={{ padding: 'clamp(24px, 6vw, 40px)' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Enter your name"
                      style={fieldStyle('name')}
                      onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={e => e.target.style.borderColor = errors.name ? '#f87171' : 'var(--color-stone)'}
                    />
                    {errors.name && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="Enter your email"
                      style={fieldStyle('email')}
                      onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={e => e.target.style.borderColor = errors.email ? '#f87171' : 'var(--color-stone)'}
                    />
                    {errors.email && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    placeholder="What's this about?"
                    style={fieldStyle('subject')}
                    onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={e => e.target.style.borderColor = errors.subject ? '#f87171' : 'var(--color-stone)'}
                  />
                  {errors.subject && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.subject}</p>}
                </div>

                {/* Message */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell me about your project..."
                    rows={5}
                    style={{ ...fieldStyle('message'), resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={e => e.target.style.borderColor = errors.message ? '#f87171' : 'var(--color-stone)'}
                  />
                  {errors.message && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.message}</p>}
                </div>

                {/* ✅ Golden Submit Button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'sent'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 32px',
                      borderRadius: '99px',
                      border: '1.5px solid var(--color-accent)',
                      background: status === 'sent'
                        ? '#16a34a'
                        : 'linear-gradient(135deg, #C9A96E 0%, #E8C97A 50%, #C9A96E 100%)',
                      color: status === 'sent' ? '#fff' : '#1a1a1a',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px rgba(201,169,110,0.3)',
                    }}
                    onMouseEnter={e => {
                      if (status === 'idle') {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,169,110,0.45)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (status === 'idle') {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,169,110,0.3)';
                      }
                    }}
                  >
                    {status === 'idle' && (
                      <>
                        Send Message
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                    {status === 'sending' && (
                      <>
                        <svg width="16" height="16" className="animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    )}
                    {status === 'sent' && (
                      <>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Sent Successfully!
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}