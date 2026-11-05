import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    village: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'I accidentally gave my OTP to a caller and money was deducted. Can I get it back?',
      a: 'Yes, if you act immediately! Dial 1930 within the first 2 hours. The police cyber cell will immediately issue a lien/freeze order across the recipient bank or wallet before the scammer can withdraw cash at an ATM. Also call your bank to block your debit card and internet banking.'
    },
    {
      q: 'How can I check whether a loan app is authorized or an illegal extortion scam?',
      a: 'Legitimate loan apps are directly partnered with RBI-regulated NBFCs or banks. You can verify the lender name on the official RBI website. Legitimate lenders will NEVER demand full access to your phone contacts, gallery, or camera.'
    },
    {
      q: 'My SIM card suddenly lost all network signal, but my family members have signal. What happened?',
      a: 'This could be a "SIM Swap" scam. Scammers obtain duplicate SIM cards with fake identity documents to intercept your bank OTPs. Contact your mobile network operator immediately from another phone and check if a SIM replacement request was submitted.'
    },
    {
      q: 'Can our Panchayat invite your project team to conduct an awareness workshop?',
      a: 'Absolutely! Please submit this contact form specifying your village name, expected audience size (farmers, SHG women, youth), and preferred dates. Our team coordinates with local village leaders to organize interactive live demos.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.contacts.submit(formData);
      setSuccessMsg(res.message || 'Your inquiry was recorded successfully! Our team will reach out to you.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        village: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Community Outreach & Support</span>
          <h2>Connect with Our Awareness Cell</h2>
          <p>
            Have a question about a suspicious message, need help reporting cyber fraud, or want an awareness workshop in your village? Reach out to us.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginBottom: '4.5rem'
        }}>
          {/* Contact Details & Helplines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: '#ffffff' }}>
                Emergency Cybercrime Help
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 700, textTransform: 'uppercase' }}>
                    Citizen Financial Cyber Fraud
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PhoneCall size={22} color="#ef4444" /> Dial 1930
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                    Available 24 hours / 7 days across all Indian states and union territories.
                  </div>
                </div>

                <div style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.25)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--cyan-bright)', fontWeight: 700, textTransform: 'uppercase' }}>
                    National Police & Emergency
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={22} color="var(--cyan-bright)" /> Dial 112
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                    Integrated national emergency response support system (ERSS).
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: '#ffffff' }}>
                Project Coordination Cell
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} color="var(--cyan-bright)" />
                  <span>support@community-awareness.org</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin size={18} color="var(--cyan-bright)" />
                  <span>Rural Community Service Project Cell, District Field Office</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={18} color="var(--cyan-bright)" />
                  <span>Public Assistance Hours: Monday – Saturday (9:00 AM – 6:00 PM)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.45rem', marginBottom: '1.5rem', color: '#ffffff' }}>
              Send an Inquiry or Workshop Request
            </h3>

            {successMsg && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#6ee7b7',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={18} color="#ef4444" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Village / Town</label>
                  <input
                    type="text"
                    name="village"
                    placeholder="e.g. Rampur"
                    value={formData.village}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Topic *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g. Request for Cyber Workshop in Village Primary School"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Message or Detailed Query *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Write your query or describe the assistance you need..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                {loading ? 'Submitting...' : 'Send Message to Awareness Cell'}
              </button>
            </form>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <div className="glass-card" style={{ padding: '3rem 2.5rem' }}>
          <h3 style={{ fontSize: '1.65rem', textAlign: 'center', marginBottom: '2rem' }}>
            Frequently Asked Community Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '850px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(6, 14, 29, 0.7)',
                  borderRadius: '10px',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={18} color="var(--cyan-bright)" /> : <ChevronDown size={18} color="var(--cyan-bright)" />}
                </button>

                {openFaq === idx && (
                  <div style={{
                    padding: '0 1.25rem 1.25rem 1.25rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
