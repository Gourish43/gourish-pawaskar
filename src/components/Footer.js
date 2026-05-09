import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">Gourish.</div>
          <p className="footer-brand-desc">UI/UX Designer crafting accessible, human-centred digital experiences for SaaS, AI, and enterprise platforms.</p>
        </div>
        <div>
          <div className="footer-col-title">Pages</div>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/contact">Let's Talk</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Work</div>
          <ul className="footer-links-list">
            <li><Link to="/portfolio/trusting-news">TrustIn News</Link></li>
            <li><Link to="/portfolio/esg-platform">ESG Platform</Link></li>
            <li><Link to="/portfolio/defence-ux">Defence UX</Link></li>
            <li><Link to="/portfolio/warehouse-dashboard">Warehouse Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <div className="footer-contact-item"><a href="mailto:gourish63pawaskar@gmail.com">gourish63pawaskar@gmail.com</a></div>
          <div className="footer-contact-item"><a href="tel:+919343346829">+91 93433 46829</a></div>
          <div className="footer-contact-item" style={{marginTop:'12px'}}><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
          <div className="footer-contact-item"><a href="https://behance.net" target="_blank" rel="noreferrer">Behance ↗</a></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Gourish L Pawaskar · Bengaluru, Karnataka, India</span>
        <div className="footer-bottom-links">
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
