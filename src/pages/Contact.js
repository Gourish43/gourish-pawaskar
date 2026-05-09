import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const OPPORTUNITY_TYPES = [
  'Full-time Role',
  'Contract / Freelance',
  'Collaboration',
  'Design Consultation',
  'Just saying hi',
];

const INITIAL = { name: '', email: '', company: '', opportunityType: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.opportunityType) e.opportunityType = 'Please select an opportunity type';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('sending');

    try {
      // ── EMAILJS CONFIGURATION ──────────────────────────────────────────────
      // Replace these three values with your own from https://www.emailjs.com
      // 1. Sign up at emailjs.com (free plan allows 200 emails/month)
      // 2. Create a new Email Service (Gmail recommended) → copy Service ID
      // 3. Create a new Email Template → copy Template ID
      //    Template variables used: {{from_name}}, {{from_email}}, {{company}},
      //    {{opportunity_type}}, {{message}}, {{to_name}}
      // 4. Copy your Public Key from Account → API Keys
      // ────────────────────────────────────────────────────────────────────────
      const SERVICE_ID  = 'service_ygdkyib';   // e.g. 'service_abc123'
      const TEMPLATE_ID = 'template_plpf7rj';  // e.g. 'template_xyz456'
      const PUBLIC_KEY  = 'ed6OBjHy4tQLdn-u2';   // e.g. 'user_AbCdEfGhIjKlMnOp'

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:        form.name,
          from_email:       form.email,
          company:          form.company || 'Not specified',
          opportunity_type: form.opportunityType,
          message:          form.message,
          to_name:          'Gourish',
          reply_to:         form.email,
        },
        PUBLIC_KEY
      );

      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const handleReset = () => { setStatus('idle'); setErrors({}); };

  return (
    <main className="contact-page">
      {/* PAGE HEADER */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-eyebrow">Get in touch</div>
          <h1 className="contact-title">Let's work<br /><em>together</em></h1>
          <p className="contact-subtitle">Open to full-time UI/UX roles, contract projects, and collaboration. Based in Bengaluru — available remotely too.</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="contact-body">

        {/* LEFT: INFO */}
        <div className="contact-info-col">
          <div className="contact-info-title">Contact details</div>
          <div className="contact-items">
            {[
              { icon: '📧', label: 'Email', value: 'gourish63pawaskar@gmail.com', href: 'mailto:gourish63pawaskar@gmail.com' },
              { icon: '📱', label: 'Phone', value: '+91 93433 46829', href: 'tel:+919343346829' },
              { icon: '📍', label: 'Location', value: 'Bengaluru, Karnataka, India', href: null },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <div className="contact-item-icon">{item.icon}</div>
                <div>
                  <div className="contact-item-label">{item.label}</div>
                  {item.href
                    ? <a href={item.href} className="contact-item-value">{item.value}</a>
                    : <div className="contact-item-value">{item.value}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="contact-socials">
            <div className="contact-info-title" style={{marginBottom:'16px'}}>Connect</div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/gourish-pawaskar-0b042b245/" target="_blank" rel="noreferrer" className="social-link">
                <span className="social-icon">in</span>
                <span>LinkedIn</span>
                <span className="social-arrow">↗</span>
              </a>
              <a href="https://www.behance.net/gourishpawaskar" target="_blank" rel="noreferrer" className="social-link">
                <span className="social-icon">Be</span>
                <span>Behance</span>
                <span className="social-arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="contact-languages">
            <div className="contact-info-title" style={{marginBottom:'10px'}}>Languages</div>
            <div className="lang-tags">
              {['English', 'Kannada', 'Hindi', 'Konkani'].map(l => (
                <span key={l} className="lang-tag">{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="contact-form-col">
          {status === 'success' ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Message sent!</h2>
              <p className="success-desc">Thanks for reaching out. I'll get back to you within 24–48 hours.</p>
              <button className="btn-primary" onClick={handleReset}>Send another message</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="contact-form">
              <div className="form-heading">Send a message</div>

              {status === 'error' && (
                <div className="form-error-banner">
                  Something went wrong. Please check your EmailJS configuration or try again.
                </div>
              )}

              {/* Setup notice - shown when using placeholder keys */}
              {/* <div className="setup-notice">
                <strong>⚙ Setup required:</strong> Replace <code>YOUR_SERVICE_ID</code>, <code>YOUR_TEMPLATE_ID</code>, and <code>YOUR_PUBLIC_KEY</code> in <code>Contact.js</code> with your EmailJS credentials to activate email sending.{' '}
                <a href="https://www.emailjs.com" target="_blank" rel="noreferrer">Get them free at emailjs.com →</a>
              </div> */}
             

              <div className="form-row">
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Full Name *</label>
                  <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company / Studio</label>
                  <input id="company" name="company" type="text" placeholder="Where you work (optional)" value={form.company} onChange={handleChange} />
                </div>
                <div className={`form-group ${errors.opportunityType ? 'has-error' : ''}`}>
                  <label htmlFor="opportunityType">Opportunity Type *</label>
                  <select id="opportunityType" name="opportunityType" value={form.opportunityType} onChange={handleChange}>
                    <option value="">Select one…</option>
                    {OPPORTUNITY_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.opportunityType && <span className="field-error">{errors.opportunityType}</span>}
                </div>
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows={6} placeholder="Tell me about the opportunity, project, or just say hello…" value={form.message} onChange={handleChange} />
                <div className="char-count" style={{color: form.message.length > 20 ? 'var(--text-3)' : '#c0392b'}}>
                  {form.message.length} characters
                </div>
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <div className="form-footer">
                <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <><span className="spinner" /> Sending…</>
                  ) : 'Send message →'}
                </button>
                <span className="form-note">I typically respond within 24–48 hours.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}
