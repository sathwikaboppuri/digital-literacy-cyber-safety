import React, { useState } from 'react';
import {
  Smartphone,
  CreditCard,
  Building2,
  CheckCircle,
  AlertOctagon,
  ArrowRight,
  Shield,
  Key,
  Lock,
  Download,
  Eye,
  FileCheck
} from 'lucide-react';

export const DigitalLiteracy = () => {
  const [activeTab, setActiveTab] = useState('upi');

  // Interactive UPI Demo State
  const [upiAction, setUpiAction] = useState('receive'); // 'pay' or 'receive'
  const [upiAmount, setUpiAmount] = useState('500');
  const [showSimResult, setShowSimResult] = useState(false);

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Practical Step-by-Step Guidance</span>
          <h2>Rural Digital Literacy Program</h2>
          <p>
            Master everyday digital tools: smartphone security, seamless UPI transactions, and online government services without relying on middle agents.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <button
            onClick={() => setActiveTab('smartphone')}
            className={`btn ${activeTab === 'smartphone' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.8rem 1.6rem' }}
          >
            <Smartphone size={18} /> Module 1: Smartphone Essentials
          </button>
          <button
            onClick={() => setActiveTab('upi')}
            className={`btn ${activeTab === 'upi' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.8rem 1.6rem' }}
          >
            <CreditCard size={18} /> Module 2: UPI & Digital Payments
          </button>
          <button
            onClick={() => setActiveTab('govt')}
            className={`btn ${activeTab === 'govt' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.8rem 1.6rem' }}
          >
            <Building2 size={18} /> Module 3: Online Government Services
          </button>
        </div>

        {/* TAB 1: SMARTPHONE ESSENTIALS */}
        {activeTab === 'smartphone' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--cyan-bright)' }}>
                Smartphone Security & Safe Operation Handbook
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Your smartphone holds your bank messages, personal photos, and identity documents. Follow these fundamental safety rules to secure your device.
              </p>

              <div className="grid-3">
                <div className="glass-card" style={{ padding: '1.75rem', background: 'rgba(6, 14, 29, 0.7)' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Lock size={22} color="var(--cyan-bright)" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>1. Set Screen PIN / Biometric</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Never leave your phone unlocked. Use a 6-digit PIN or fingerprint lock. Avoid obvious PINs like <code>123456</code>, <code>000000</code>, or your birth year.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.75rem', background: 'rgba(6, 14, 29, 0.7)' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Download size={22} color="#ef4444" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>2. Stop Unknown APK Files</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Only download apps from <strong>Google Play Store</strong>. Never click or install files ending in <code>.apk</code> received on WhatsApp or Telegram from strangers.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.75rem', background: 'rgba(6, 14, 29, 0.7)' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Eye size={22} color="#10b981" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>3. Inspect App Permissions</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Why would a calculator app need access to your SMS or Contacts? If an app asks for unrelated permissions, choose <strong>Deny</strong> immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UPI & DIGITAL PAYMENTS */}
        {activeTab === 'upi' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* The Golden Rule Banner */}
            <div className="glass-card" style={{
              padding: '2.5rem',
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.6), rgba(11, 25, 44, 0.9))',
              border: '2px solid rgba(0, 242, 254, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: 'rgba(0, 242, 254, 0.15)',
                  border: '1px solid rgba(0, 242, 254, 0.3)'
                }}>
                  <Key size={30} color="var(--cyan-bright)" />
                </div>
                <div>
                  <span className="badge badge-warning" style={{ marginBottom: '0.3rem' }}>THE MOST IMPORTANT RULE</span>
                  <h3 style={{ fontSize: '1.65rem', color: '#ffffff' }}>
                    UPI PIN is ONLY For SENDING Money
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '1.5rem' }}>
                Every month, thousands of villagers lose money because callers tell them: <em>"Scan this QR code and type your UPI PIN to receive ₹10,000 lottery or bonus."</em>
                <br /><br />
                <strong>REMEMBER FOREVER:</strong> When someone sends you money, it lands directly into your bank account. You do NOT have to enter your PIN, approve any request, or scan any QR code to receive money!
              </p>
            </div>

            {/* INTERACTIVE UPI SIMULATOR */}
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <CreditCard size={26} color="var(--cyan-bright)" />
                <h3 style={{ fontSize: '1.45rem' }}>Interactive UPI Simulator: Test the Difference</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                Try this simulation to see when UPI PIN is really required versus when it is a scam trick.
              </p>

              <div style={{
                background: 'rgba(6, 14, 29, 0.8)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                maxWidth: '650px',
                margin: '0 auto'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Select What You Want To Do:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => { setUpiAction('pay'); setShowSimResult(false); }}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        border: upiAction === 'pay' ? '2px solid var(--cyan-bright)' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: upiAction === 'pay' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      💸 I Want to Pay a Shopkeeper / Friend
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUpiAction('receive'); setShowSimResult(false); }}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        border: upiAction === 'receive' ? '2px solid var(--cyan-bright)' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: upiAction === 'receive' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      💰 Someone Wants to Send Me Money
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Transaction Amount (₹)</label>
                  <input
                    type="number"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowSimResult(true)}
                  className="btn btn-cyan"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  Simulate UPI Transaction
                </button>

                {showSimResult && (
                  <div style={{
                    marginTop: '1.75rem',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: upiAction === 'pay' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: upiAction === 'pay' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)'
                  }}>
                    {upiAction === 'pay' ? (
                      <div>
                        <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                          ✓ YES: You MUST Enter Your Secret UPI PIN
                        </div>
                        <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                          Because money is <strong>leaving your bank account</strong> (₹{upiAmount}), UPI requires you to authenticate with your 4 or 6-digit PIN. Never let anyone watch you type it.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                          🚨 NO! NEVER ENTER YOUR PIN TO RECEIVE MONEY!
                        </div>
                        <p style={{ fontSize: '0.92rem', color: '#fca5a5', lineHeight: 1.6 }}>
                          To receive ₹{upiAmount}, you only need to provide your mobile number, UPI ID, or let the sender scan YOUR merchant QR code. If anyone asks you to enter your PIN or scan a QR code to "receive", they are <strong>stealing your money!</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ONLINE GOVERNMENT SERVICES */}
        {activeTab === 'govt' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--cyan-bright)' }}>
                Official Government Portals & Citizen Services
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Avoid paying middleman commissions or service charges. Learn how to verify and manage these verified citizen portals directly from your smartphone.
              </p>

              <div className="grid-3">
                <div className="glass-card" style={{ padding: '2rem', background: 'rgba(6, 14, 29, 0.7)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="badge badge-cyan">Document Vault</span>
                    <FileCheck size={20} color="var(--cyan-bright)" />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>DigiLocker</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Official digital locker to store your Aadhaar, PAN card, Ration card, Land records, and Vehicle RC. Legally treated on par with original physical certificates.
                  </p>
                  <a
                    href="https://www.digilocker.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--cyan-bright)', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    Visit digilocker.gov.in →
                  </a>
                </div>

                <div className="glass-card" style={{ padding: '2rem', background: 'rgba(6, 14, 29, 0.7)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="badge badge-cyan">Farmer Subsidy</span>
                    <Building2 size={20} color="var(--cyan-bright)" />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>PM-Kisan Portal</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Check your ₹2,000 quarterly installment DBT status, update Aadhaar eKYC, and verify bank account seeding directly on the official portal for free.
                  </p>
                  <a
                    href="https://pmkisan.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--cyan-bright)', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    Visit pmkisan.gov.in →
                  </a>
                </div>

                <div className="glass-card" style={{ padding: '2rem', background: 'rgba(6, 14, 29, 0.7)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="badge badge-cyan">All-in-One App</span>
                    <Smartphone size={20} color="var(--cyan-bright)" />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>UMANG App</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Unified Mobile Application for New-age Governance. Access EPFO passbook, gas cylinder booking, soil health cards, and pension certificates in one verified app.
                  </p>
                  <a
                    href="https://web.umang.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--cyan-bright)', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    Visit web.umang.gov.in →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
