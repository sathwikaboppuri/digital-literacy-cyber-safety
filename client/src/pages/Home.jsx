import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Smartphone,
  CreditCard,
  Building2,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Users,
  Award,
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { api } from '../services/api';

export const Home = () => {
  const [stats, setStats] = useState({
    totalSurveys: 0,
    avgAwarenessScore: 0,
    smartphoneOwnershipRate: 0,
    digitalPaymentAdoptionRate: 0,
    helpline1930AwarenessRate: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Interactive Scam Checker state
  const [selectedScenario, setSelectedScenario] = useState(0);

  const scamScenarios = [
    {
      title: 'Caller asking to scan QR code to receive ₹15,000 subsidy',
      type: 'SCAM DANGER',
      verdict: 'DEFINITELY A SCAM',
      isScam: true,
      explanation: 'You NEVER scan a QR code or enter your UPI PIN to receive money. Scanning a QR code authorizes money to be deducted FROM your account.'
    },
    {
      title: 'SMS: Power bill unpaid, power will be cut at 9:30 PM. Call this mobile number',
      type: 'URGENCY FRAUD',
      verdict: 'DEFINITELY A SCAM',
      isScam: true,
      explanation: 'State electricity boards never issue disconnection threats via personal 10-digit mobile numbers or demand instant payment over call.'
    },
    {
      title: 'Caller claiming to be bank manager asking for 6-digit Aadhaar OTP to update KYC',
      type: 'BANK IMPERSONATION',
      verdict: 'DEFINITELY A SCAM',
      isScam: true,
      explanation: 'No bank or RBI employee will ever ask for your OTP. OTP gives fraudsters direct access to authorize transactions without your permission.'
    },
    {
      title: 'Official notification on PM-Kisan portal ending in .gov.in checking installment',
      type: 'LEGITIMATE SERVICE',
      verdict: 'SAFE GOVERNMENT SERVICE',
      isScam: false,
      explanation: 'Official portals ending with ".gov.in" are secure and never charge money or ask for your UPI PIN to view installment status.'
    }
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.surveys.getStats();
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch survey stats:', err.message);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 4rem 0',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop circles */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30, 64, 175, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            {/* Top pill badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.2rem',
              borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.35)',
              marginBottom: '1.75rem',
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.15)'
            }}>
              <Award size={16} color="var(--cyan-bright)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', letterSpacing: '0.04em' }}>
                COMMUNITY SERVICE PROJECT (CSP) INITIATIVE
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              fontWeight: 800
            }}>
              Empowering Rural India with <br />
              <span className="gradient-text">Digital Literacy & Cyber Safety</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '780px',
              margin: '0 auto 2.5rem auto'
            }}>
              Bridging the digital divide in rural communities. Master smartphone navigation, secure UPI digital payments, access essential online government schemes, and shield your hard-earned savings from cyber fraud.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/survey" className="btn btn-cyan" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                <CheckCircle2 size={18} /> Take Community Survey
              </Link>
              <Link to="/cyber-safety" className="btn btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                <ShieldCheck size={18} /> Learn Cyber Safety
              </Link>
              <Link to="/resources" className="btn btn-outline" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                <FileText size={18} /> Awareness Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY HELPLINE CALLOUT STRIP */}
      <section style={{ padding: '1rem 0', marginBottom: '3rem' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.8))',
            borderColor: 'rgba(239, 68, 68, 0.4)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PhoneCall size={28} color="#ef4444" />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>
                  Immediate Cyber Fraud Response Window
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  Have You Been Scammed? Call <span style={{ color: '#00f2fe' }}>1930</span> Within 2 Hours
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a
                href="tel:1930"
                className="btn btn-danger"
                style={{ fontWeight: 700, padding: '0.75rem 1.4rem' }}
              >
                <PhoneCall size={16} /> Call 1930
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
                style={{ padding: '0.75rem 1.2rem' }}
              >
                cybercrime.gov.in
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REAL DATABASE STATS COUNTER */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Real-Time Community Impact</span>
            <h2>Field Study & Survey Insights</h2>
            <p>
              Metrics dynamically aggregated from real rural respondent surveys recorded in our MongoDB database.
            </p>
          </div>

          <div className="grid-4">
            <div className="glass-card card-3d" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Users size={24} color="var(--cyan-bright)" />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                {loadingStats ? '...' : stats.totalSurveys || 0}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.25rem' }}>
                Rural Surveys Collected
              </div>
            </div>

            <div className="glass-card card-3d" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Smartphone size={24} color="#60a5fa" />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-heading)' }}>
                {loadingStats ? '...' : (stats.smartphoneOwnershipRate || 0) + '%'}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.25rem' }}>
                Smartphone Penetration
              </div>
            </div>

            <div className="glass-card card-3d" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <CreditCard size={24} color="#34d399" />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-heading)' }}>
                {loadingStats ? '...' : (stats.digitalPaymentAdoptionRate || 0) + '%'}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.25rem' }}>
                UPI Payment Adoption
              </div>
            </div>

            <div className="glass-card card-3d" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(234, 179, 8, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <TrendingUp size={24} color="#facc15" />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#facc15', fontFamily: 'var(--font-heading)' }}>
                {loadingStats ? '...' : (stats.avgAwarenessScore || 0) + '/100'}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.25rem' }}>
                Average Awareness Score
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE AWARENESS PILLARS */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Comprehensive Training Curriculum</span>
            <h2>Four Pillars of Rural Digital Safety</h2>
            <p>
              Designed specially for first-generation smartphone users, rural youth, farmers, and village elders.
            </p>
          </div>

          <div className="grid-2">
            <div className="glass-card glass-card-hover" style={{ padding: '2.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Smartphone size={28} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>1. Smartphone Essentials</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Understand phone security basics: screen PINs and fingerprint locks, identifying necessary vs malicious app permissions, and avoiding risky APK downloads from WhatsApp.
              </p>
              <Link to="/digital-literacy" style={{ color: 'var(--cyan-bright)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Smartphone Guide <ArrowRight size={16} />
              </Link>
            </div>

            <div className="glass-card glass-card-hover" style={{ padding: '2.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #0284c7, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <CreditCard size={28} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>2. UPI & Digital Payments</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Learn how PhonePe, Google Pay, and Paytm work safely. Understand why you NEVER enter your UPI PIN to receive money, and learn how to link bank accounts securely.
              </p>
              <Link to="/digital-literacy" style={{ color: 'var(--cyan-bright)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Master UPI Payment Safety <ArrowRight size={16} />
              </Link>
            </div>

            <div className="glass-card glass-card-hover" style={{ padding: '2.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Building2 size={28} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>3. Online Government Services</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Access Direct Benefit Transfer (DBT), PM-Kisan Samman Nidhi, DigiLocker, Ration Card seeding, and Ayushman Bharat without paying commission to middle agents.
              </p>
              <Link to="/digital-literacy" style={{ color: 'var(--cyan-bright)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Access Government Portals <ArrowRight size={16} />
              </Link>
            </div>

            <div className="glass-card glass-card-hover" style={{ padding: '2.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #b91c1c, #ef4444)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <ShieldCheck size={28} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>4. Cybercrime Prevention</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Spot fake electricity bill disconnection SMS, illegal instant loan apps, lottery frauds, and remote screen sharing scams (AnyDesk). Know the 1930 Helpline.
              </p>
              <Link to="/cyber-safety" style={{ color: 'var(--cyan-bright)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                View Scam Protection Guide <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SCAM DETECTOR WIDGET */}
      <section style={{ padding: '4rem 0', background: 'rgba(12, 26, 48, 0.4)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Interactive Practice Tool</span>
            <h2>Is It A Scam? Test Yourself</h2>
            <p>
              Click any realistic rural scenario below to see the instant verdict and expert cyber safety advice.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}>
            {/* Scenarios List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {scamScenarios.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedScenario(index)}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    border: selectedScenario === index ? '2px solid var(--cyan-bright)' : '1px solid var(--glass-border)',
                    background: selectedScenario === index ? 'rgba(6, 182, 212, 0.15)' : 'var(--glass-bg)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                      Scenario {index + 1}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: item.isScam ? '#f87171' : '#34d399', fontWeight: 700 }}>
                      {item.type}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff' }}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            {/* Verdict Card */}
            <div className="glass-card" style={{
              padding: '2.5rem',
              border: scamScenarios[selectedScenario].isScam ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
              background: scamScenarios[selectedScenario].isScam ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {scamScenarios[selectedScenario].isScam ? (
                  <AlertTriangle size={32} color="#ef4444" />
                ) : (
                  <CheckCircle2 size={32} color="#10b981" />
                )}
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Awareness Verdict
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: scamScenarios[selectedScenario].isScam ? '#ef4444' : '#10b981' }}>
                    {scamScenarios[selectedScenario].verdict}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '2rem' }}>
                {scamScenarios[selectedScenario].explanation}
              </div>

              <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.3)', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--cyan-bright)' }}>Key Rural Takeaway:</strong> Never act under fear or hurry. Genuine authorities never demand immediate money transfers over phone calls.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION: COMMUNITY SURVEY */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(30, 62, 98, 0.7), rgba(11, 25, 44, 0.9))',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
              Are You From a Rural Community?
            </h2>
            <p style={{ maxWidth: '680px', margin: '0 auto 2rem auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              Your feedback is crucial for our Community Service Project research. Take our 3-minute digital awareness survey to check your personal cyber safety score and help us organize awareness workshops in your village.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/survey" className="btn btn-cyan" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
                Start Community Survey <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                Request Village Awareness Camp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
