import React from 'react';
import {
  ShieldCheck,
  Target,
  Compass,
  Users,
  CheckCircle,
  Lightbulb,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Community Service Project (CSP)</span>
          <h2>Digital Literacy & Cyber Safety Awareness</h2>
          <p>
            Bridging the gap between technological expansion and safe digital citizenship across rural communities.
          </p>
        </div>

        {/* Executive Overview Card */}
        <div className="glass-card" style={{ padding: '3rem 2.5rem', marginBottom: '3.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: 'var(--cyan-bright)',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '1rem'
              }}>
                <Target size={16} /> PROJECT OBJECTIVE
              </div>
              <h3 style={{ fontSize: '1.85rem', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                Empowering Rural Citizens to Navigate the Digital Age with Confidence & Security
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: '1.25rem' }}>
                With inexpensive smartphones and subsidized data connections expanding across rural India, millions of citizens have gained access to the internet for the first time. However, digital expansion without digital literacy has left rural communities acutely vulnerable to financial predators, online fraudsters, and fake news.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.02rem' }}>
                This <strong>Community Service Project (CSP)</strong> was conceptualized and developed to deliver high-impact, easy-to-understand awareness modules on smartphone operation, UPI payment safety, direct benefit government portals, and instant cyber fraud prevention.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2), rgba(6, 182, 212, 0.15))',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              <h4 style={{ color: '#ffffff', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="var(--cyan-bright)" /> Core Impact Indicators
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <CheckCircle size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ffffff' }}>Zero UPI PIN Loss:</strong> Teaching villagers the golden rule that receiving money never requires entering a PIN.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <CheckCircle size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ffffff' }}>Direct Benefit Independence:</strong> Enabling farmers to access PM-Kisan & DBT portals directly without paying middlemen.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <CheckCircle size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ffffff' }}>1930 Helpline Adoption:</strong> Disseminating the 24x7 National Cyber Crime helpline for rapid fund-freezing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Rural Challenges Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-header">
            <span className="section-subtitle">Problem Statement</span>
            <h2>Challenges Faced by Rural Communities</h2>
            <p>
              Identified through primary fieldwork, community interaction, and survey diagnostics.
            </p>
          </div>

          <div className="grid-3">
            <div className="glass-card card-3d" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>First-Generation Smartphone Users</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Many rural users transition directly from basic keypad phones to smartphones without fundamental training on app permissions, software updates, or lock screen security.
              </p>
            </div>

            <div className="glass-card card-3d" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Linguistic & Terminology Barrier</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Technical terms like "Authentication", "Phishing", "Two-Factor Auth", and "APK" create confusion. Scammers exploit this by using deceptive English voice calls.
              </p>
            </div>

            <div className="glass-card card-3d" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💸</div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Exploitative Loan & Lottery Scams</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Predatory instant loan apps siphon contact books and blackmail villagers with exorbitant interest rates, while fake lottery SMS dupe vulnerable families.
              </p>
            </div>
          </div>
        </div>

        {/* Target Beneficiaries */}
        <div className="glass-card" style={{ padding: '3rem 2.5rem', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2.5rem' }}>
            Target Beneficiaries of Our Project
          </h3>
          <div className="grid-4">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Users size={28} color="var(--cyan-bright)" />
              </div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Farmers & Agriculturalists</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                PM-Kisan status verification, weather forecasting apps, Mandi e-NAM portals, and Kisan Credit Card safety.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <ShieldCheck size={28} color="#60a5fa" />
              </div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Women Self-Help Groups (SHGs)</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Micro-finance record keeping, secure digital banking transactions, and protection from identity theft.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <BookOpen size={28} color="#34d399" />
              </div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Rural Youth & Students</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Educational scholarship forms, DigiLocker certificates, safe social media habits, and cyber law awareness.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(234, 179, 8, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Lightbulb size={28} color="#facc15" />
              </div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Elderly & Senior Citizens</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Pension DBT verification, avoiding urgent disconnection threats, and securing family smartphones.
              </p>
            </div>
          </div>
        </div>

        {/* Methodology & Roadmap */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Ready to Explore the Platform?</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Check out our hands-on digital literacy guides or take our community assessment survey to measure your cyber awareness.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/digital-literacy" className="btn btn-primary">
              Explore Digital Literacy <ArrowRight size={16} />
            </Link>
            <Link to="/survey" className="btn btn-outline">
              Take the Survey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
