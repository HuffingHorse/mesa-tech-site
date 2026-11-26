import React, { useEffect, useState } from 'react'

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
)

const ReactLogo = () => (
  <svg className="react-logo" viewBox="-11.5 -10.23174 23 20.46348" aria-hidden="true">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const Icon = ({ type }) => {
  const paths = {
    people: <><circle cx="12" cy="8" r="3"/><path d="M5.5 19a6.5 6.5 0 0 1 13 0M5 11a3 3 0 1 0-1-5.8M2 19a5 5 0 0 1 4.2-5"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.8 2.9 8.1 7 10 4.1-1.9 7-5.2 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3"/></>,
    ai: <><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 3v9h9M17 3v4h4M5 15l3-3 3 3 4-6"/></>,
    process: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h3a3 3 0 0 1 3 3v3M15 18h-3a3 3 0 0 1-3-3v-3"/></>,
    system: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  }
  return <svg className="service-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>
}

const CountUp = ({ end, prefix = '', suffix = '', format = true, duration = 1800 }) => {
  const [value, setValue] = useState(0)
  const elementRef = React.useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setValue(end)
      return
    }

    let animationFrame
    let observer

    const animate = () => {
      const startTime = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(end * eased))
        if (progress < 1) animationFrame = requestAnimationFrame(tick)
      }
      animationFrame = requestAnimationFrame(tick)
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate()
        observer.disconnect()
      }
    }, { threshold: 0.35 })

    observer.observe(element)

    return () => {
      observer?.disconnect()
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [end, duration])

  const displayed = format ? value.toLocaleString('en-AU') : String(value)

  return <span className="count-up" ref={elementRef}>{prefix && <span className="metric-currency">{prefix}</span>}<span className="metric-value">{displayed}</span>{suffix}</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Mesa Technology home" onClick={closeMenu}>
            <span className="brand-name">MESA <span>TECHNOLOGY</span></span>
          </a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#digital" onClick={closeMenu}>Digital Services</a>
            <a href="#defence" onClick={closeMenu}>Defence Services</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact <Arrow /></a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow"><span /> Advancing your organisation towards innovation</div>
              <h1 className="hero-title">Advance and innovate<br /><em>with trusted capability.</em></h1>
              <p className="hero-lead">Mesa Technology provides Australian businesses and organisations with innovative, bleeding-edge solutions to drive growth and efficiency. Our mission is to empower your organisation with the systems and expertise it needs to succeed, today and into the future. We specialise in the modernisation of business services, design and implementation of technological system capabilities and AI-driven solutions. </p>
            </div>

            <div className="hero-visual metric-visual" aria-label="Mesa Technology business impact metrics">
              <article className="metric-item">
                <span className="eyebrow">Total value delivered</span>
                <strong className="metric-number"><CountUp end={1234200} prefix="$" /></strong>
              </article>
              <article className="metric-item">
                <span className="eyebrow">Total labour hours automated</span>
                <strong className="metric-number"><CountUp end={4241} /></strong>
              </article>
            </div>
          </div>
          <div className="trust-strip">
            <div className="container trust-inner">
              <span>Supporting</span>
              <strong>Australian Businesses</strong>
              <i />
              <strong>Defence Organisations</strong>
              <i />
              <strong>Australian Defence Force</strong>
            </div>
          </div>
        </section>

        <section className="section digital" id="digital">
          <div className="container">
            <div className="section-heading light-heading">
              <div>
                <span className="section-index">01 / DIGITAL</span>
                <h2>Modern technology.<br />Measurable progress.</h2>
              </div>
              <p>We help Australian organisations modernise operations, integrate systems and adopt practical AI — with a clear focus on outcomes and implementation.</p>
            </div>

            <div className="digital-grid">
              <article className="digital-card">
                <Icon type="ai" />
                <div><span>01</span><h3>AI Modernisation</h3><p>Responsible AI strategy and implementation that improves decisions, efficiency and competitive advantage.</p></div>
              </article>
              <article className="digital-card">
                <Icon type="process" />
                <div><span>02</span><h3>Business Process Uplift</h3><p>Streamlined workflows, stronger governance and practical improvements across your organisation.</p></div>
              </article>
              <article className="digital-card">
                <Icon type="system" />
                <div><span>03</span><h3>Systems & Digital Services</h3><p>Systems integration, digital delivery and technology capability that work together at scale.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section defence" id="defence">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-index">02 / DEFENCE</span>
                <h2>Specialist people for<br />critical capabilities.</h2>
              </div>
              <p>We provide Defence consulting and contracting capability across Australian Government environments — from strategic advisory to specialist technical delivery.</p>
            </div>

            <div className="defence-grid">
              <article className="service-card featured">
                <div className="card-number">01</div>
                <Icon type="people" />
                <h3>Defence Workforce Solutions</h3>
                <p>High-quality, Defence-experienced candidates matched to mission requirements.</p>
              </article>
              <article className="service-card">
                <div className="card-number">02</div>
                <Icon type="shield" />
                <h3>Vetted Security Clearances</h3>
                <p>Candidate capability from Baseline through to Positive Vetting, aligned to program needs.</p>
              </article>
              <article className="service-card">
                <div className="card-number">03</div>
                <Icon type="target" />
                <h3>Consulting & Contracting</h3>
                <p>Flexible professional and technical services for ADF, Defence and intelligence organisations.</p>
              </article>
            </div>

            <div className="clearance-bar">
              <span>Clearance capability</span>
              <div className="clearance-levels" aria-label="Available security clearance levels"><strong>Baseline</strong><i/><strong>NV1</strong><i/><strong>NV2</strong><i/><strong>PV</strong></div>
            </div>
          </div>
        </section>

        <section className="service-actions" aria-label="Explore Mesa Technology services">
          <div className="container service-actions-inner">
            <a className="service-action" href="#digital">
              <span>Explore</span>
              <strong>Digital Services</strong>
              <Arrow />
            </a>
            <a className="service-action" href="#defence">
              <span>Explore</span>
              <strong>Defence Services</strong>
              <Arrow />
            </a>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container about-inner">
            <span className="section-index">WHY MESA</span>
            <h2>Built on trust.<br /><em>Driven by capability.</em></h2>
            <p>Mesa Technology brings disciplined delivery, domain understanding and an outcome-first mindset to every engagement.</p>
            <a className="text-link" href="#contact">Start a conversation <Arrow /></a>
          </div>
        </section>

        <footer id="contact">
          <div className="container footer-main">
            <div className="footer-brand">
              <a className="brand" href="#top" aria-label="Mesa Technology home">
                <span className="brand-name">MESA <span>TECHNOLOGY</span></span>
              </a>
              <p>Defence capability and digital transformation.</p>
            </div>
            <div className="footer-contact">
              <span>CONTACT</span>
              <a href="mailto:admin@mesa-tech.com.au">admin@mesa-tech.com.au</a>
              <a href="#top">Australia-wide</a>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© {new Date().getFullYear()} Mesa Technology</span>
            <span className="powered-by"><ReactLogo /> Powered by React</span>
            <span>Canberra · Australia</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
