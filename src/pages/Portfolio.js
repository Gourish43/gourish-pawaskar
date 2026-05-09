import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../store/projectStore';
import './Portfolio.css';

const FILTERS = ['All', 'UX Design', 'SaaS', 'Research', 'Front-end'];


export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [allProjects] = useState(() => getAllProjects());

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  const filtered = allProjects.filter(p => {
    if (active === 'All') return true;
    if (active === 'UX Design') return !p.hardcoded || ['trusting-news','esg-platform','defence-ux'].includes(p.slug);
    if (active === 'SaaS') return (p.tags||[]).some(t => /saas|enterprise|esg/i.test(t));
    if (active === 'Research') return (p.tags||[]).some(t => /research/i.test(t));
    if (active === 'Front-end') return (p.tags||[]).some(t => /react|front.end|html/i.test(t));
    return true;
  });

  return (
    <main>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-header-inner container">
          <div className="page-eyebrow">Selected work</div>
          <h1 className="page-title">Portfolio</h1>
          <p className="page-desc">Case studies and projects across SaaS, AI, enterprise, and government platforms. Click any card to open the full case study.</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="filter-inner container">
          {FILTERS.map(f => (
            <button key={f} className={`filter-btn ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="portfolio-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="no-results">No projects match this filter.</div>
          ) : (
            <div className="portfolio-grid">
              {filtered.map((p, i) => (
                <div key={p.slug} className={`reveal d${i % 3}`} style={i === 0 ? {gridColumn: filtered.length > 1 ? 'span 2' : 'span 1'} : {}}>
                  <ProjectCard {...p} featured={i === 0 && filtered.length > 1} />
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="portfolio-cta reveal">
            <div className="cta-box">
              <h2 className="cta-title">Like what you see?</h2>
              <p className="cta-sub">I'm open to full-time roles, contract projects, and design collaborations.</p>
              <Link to="/contact" className="btn-primary">Let's Talk →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
