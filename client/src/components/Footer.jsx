import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Globe, Heart, ExternalLink, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(4, 10, 22, 0.95)',
      borderTop: '1px solid rgba(56, 189, 248, 0.15)',
      padding: '4rem 0 2rem 0',
      marginTop: '5rem',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: About Initiative */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1e40af 0%, #00f2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={22} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem' }}>
                Gram<span style={{ color: 'var(--cyan-bright)' }}>Suraksha</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              A dedicated Community Service Project (CSP) aimed at bridging the rural digital divide, empowering villagers with smartphone proficiency, secure digital payments, and safeguarding against cyber fraud.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.25)', fontSize: '0.8rem', color: 'var(--cyan-bright)' }}>
              <span>Student Community Service Project</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.2rem', position: 'relative', paddingBottom: '0.5rem' }}>
              Awareness Portals
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/digital-literacy" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowRight size={14} color="var(--cyan-bright)" /> Smartphone & UPI Literacy
                </Link>
              </li>
              <li>
                <Link to="/cyber-safety" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowRight size={14} color="var(--cyan-bright)" /> Cyber Safety & Scam Prevention
                </Link>
              </li>
              <li>
                <Link to="/resources" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowRight size={14} color="var(--cyan-bright)" /> Awareness Articles & Guides
                </Link>
              </li>
              <li>
                <Link to="/survey" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowRight size={14} color="var(--cyan-bright)" /> Participate in Rural Survey
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowRight size={14} color="var(--cyan-bright)" /> Project Scope & Objectives
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Emergency Helplines */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.2rem' }}>
              Emergency Cyber Helplines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.75rem 1rem',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>
                  National Cyber Crime Helpline
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                  <PhoneCall size={18} color="#ef4444" /> Dial 1930
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                  Report financial fraud within 2 hours to freeze stolen money.
                </div>
              </div>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--cyan-bright)',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <span>cybercrime.gov.in Portal</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Col 4: Golden Rules Reminder */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.2rem' }}>
              Golden Safety Rules
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#00f2fe', fontWeight: 700 }}>1.</span>
                <span>NEVER enter your UPI PIN to receive money.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#00f2fe', fontWeight: 700 }}>2.</span>
                <span>Do NOT share OTP with callers claiming to be bank or govt officials.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#00f2fe', fontWeight: 700 }}>3.</span>
                <span>Never install AnyDesk or TeamViewer for stranger instructions.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#00f2fe', fontWeight: 700 }}>4.</span>
                <span>Avoid clicking unknown links promising lottery prizes or grants.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} Digital Literacy & Cyber Safety Awareness in Rural Communities. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Designed with</span>
            <Heart size={14} color="#ef4444" fill="#ef4444" />
            <span>for Rural Empowerment (Community Service Project)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
