import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Award,
  Send,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';

export const CommunitySurvey = () => {
  const [formData, setFormData] = useState({
    respondentName: '',
    village: '',
    district: '',
    ageGroup: '',
    gender: '',
    occupation: '',
    educationLevel: '',
    smartphoneOwnership: '',
    internetUsageFrequency: '',
    digitalPaymentUsage: '',
    onlineGovtServices: '',
    encounteredFraud: '',
    cyberHelplineAwareness: '',
    primaryBarrier: '',
    desiredTopics: [],
    feedback: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedResult, setSubmittedResult] = useState(null);

  const topicsList = [
    'UPI Safety (PhonePe/GPay)',
    'DigiLocker Document Storage',
    'PM-Kisan & DBT Status Check',
    'Electricity & Bank KYC Scam Alerts',
    'Fake Instant Loan App Dangers',
    'Emergency 1930 Helpline Training'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleTopicToggle = (topic) => {
    setFormData((prev) => {
      const exists = prev.desiredTopics.includes(topic);
      if (exists) {
        return {
          ...prev,
          desiredTopics: prev.desiredTopics.filter((t) => t !== topic)
        };
      } else {
        return {
          ...prev,
          desiredTopics: [...prev.desiredTopics, topic]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form field validation
    const requiredFields = [
      'respondentName',
      'village',
      'ageGroup',
      'gender',
      'occupation',
      'educationLevel',
      'smartphoneOwnership',
      'internetUsageFrequency',
      'digitalPaymentUsage',
      'onlineGovtServices',
      'encounteredFraud',
      'cyberHelplineAwareness',
      'primaryBarrier'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError('Please answer all required survey questions before submitting.');
        window.scrollTo({ top: 300, behavior: 'smooth' });
        return;
      }
    }

    setLoading(true);
    try {
      const res = await api.surveys.submit(formData);
      if (res.data) {
        setSubmittedResult(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedResult(null);
    setFormData({
      respondentName: '',
      village: '',
      district: '',
      ageGroup: '',
      gender: '',
      occupation: '',
      educationLevel: '',
      smartphoneOwnership: '',
      internetUsageFrequency: '',
      digitalPaymentUsage: '',
      onlineGovtServices: '',
      encounteredFraud: '',
      cyberHelplineAwareness: '',
      primaryBarrier: '',
      desiredTopics: [],
      feedback: ''
    });
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Grassroots Research Assessment</span>
          <h2>Rural Community Awareness Survey</h2>
          <p>
            Your responses help our Community Service Project assess digital exposure, detect emerging fraud patterns in rural areas, and design localized workshops.
          </p>
        </div>

        {submittedResult ? (
          /* RESULT MODAL / SCORECARD */
          <div className="glass-card animate-fade-in" style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
            border: '2px solid rgba(0, 242, 254, 0.4)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(6, 182, 212, 0.15)',
              border: '2px solid var(--cyan-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Award size={44} color="var(--cyan-bright)" />
            </div>

            <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
              SUBMISSION SAVED TO DATABASE
            </span>

            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#ffffff' }}>
              Thank You, {submittedResult.respondentName}!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
              Survey recorded for village <strong>{submittedResult.village}</strong>.
            </p>

            {/* Score Display */}
            <div style={{
              background: 'rgba(6, 14, 29, 0.85)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Your Computed Digital Awareness Rating
              </div>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                color: submittedResult.awarenessScore >= 70 ? '#34d399' : '#facc15',
                fontFamily: 'var(--font-heading)',
                margin: '0.5rem 0'
              }}>
                {submittedResult.awarenessScore} <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>/ 100</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
                {submittedResult.awarenessScore >= 70
                  ? 'Strong Safety Foundation! You practice responsible digital habits and know how to avoid online traps.'
                  : 'Needs Improvement: We recommend reading our Cyber Safety and UPI guides to protect against modern financial scams.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={handleResetForm} className="btn btn-primary">
                <RotateCcw size={16} /> Submit Another Survey
              </button>
            </div>
          </div>
        ) : (
          /* SURVEY FORM */
          <div className="glass-card" style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 2.5rem' }}>
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.95rem'
              }}>
                <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* SECTION 1: RESPONDENT DEMOGRAPHICS */}
              <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--cyan-bright)', marginBottom: '1.25rem' }}>
                  Section 1: General Information
                </h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="respondentName"
                      required
                      placeholder="e.g. Rameshwar Patel"
                      value={formData.respondentName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Village / Panchayat Name *</label>
                    <input
                      type="text"
                      name="village"
                      required
                      placeholder="e.g. Rampur Kalan"
                      value={formData.village}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label">District Name</label>
                    <input
                      type="text"
                      name="district"
                      placeholder="e.g. Varanasi"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age Group *</label>
                    <select
                      name="ageGroup"
                      required
                      value={formData.ageGroup}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Age Group</option>
                      <option value="18-25">18 - 25 years (Youth)</option>
                      <option value="26-40">26 - 40 years (Adult)</option>
                      <option value="41-60">41 - 60 years (Middle Age)</option>
                      <option value="60+">60+ years (Senior Citizen)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender *</label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Primary Occupation *</label>
                    <select
                      name="occupation"
                      required
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Occupation</option>
                      <option value="Farmer/Agriculture">Farmer / Agriculture</option>
                      <option value="Small Business/Shopkeeper">Small Business / Shopkeeper</option>
                      <option value="Student">Student</option>
                      <option value="Daily Wage Worker">Daily Wage Worker</option>
                      <option value="Homemaker">Homemaker</option>
                      <option value="Healthcare/Teacher">Healthcare / Teacher / CSC Operator</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Highest Education Level *</label>
                    <select
                      name="educationLevel"
                      required
                      value={formData.educationLevel}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Education</option>
                      <option value="No Formal Education">No Formal Education</option>
                      <option value="Primary School">Primary School (Up to 5th)</option>
                      <option value="High School">High School (10th)</option>
                      <option value="Intermediate/Diploma">Intermediate (12th) / Diploma</option>
                      <option value="Graduate/Post-Graduate">Graduate / Post-Graduate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: DIGITAL ACCESS & DEVICE USAGE */}
              <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--cyan-bright)', marginBottom: '1.25rem' }}>
                  Section 2: Smartphone & Internet Exposure
                </h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Smartphone Ownership *</label>
                    <select
                      name="smartphoneOwnership"
                      required
                      value={formData.smartphoneOwnership}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Option</option>
                      <option value="Personal Smartphone">I own my personal smartphone</option>
                      <option value="Shared Family Phone">I use a shared family smartphone</option>
                      <option value="Basic Keypad Phone">I only use a basic keypad phone</option>
                      <option value="No Phone">I do not own or use any phone</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Internet Usage Frequency *</label>
                    <select
                      name="internetUsageFrequency"
                      required
                      value={formData.internetUsageFrequency}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Frequency</option>
                      <option value="Daily">Daily (Several hours)</option>
                      <option value="Few times a week">A few times every week</option>
                      <option value="Rarely">Rarely (Once or twice a month)</option>
                      <option value="Never">Never use the internet</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Digital Payment (UPI) Usage *</label>
                    <select
                      name="digitalPaymentUsage"
                      required
                      value={formData.digitalPaymentUsage}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select UPI Experience</option>
                      <option value="Regular (UPI/PhonePe/GPay)">Regularly use UPI (PhonePe, GPay, Paytm)</option>
                      <option value="Occasional with family help">Occasionally with help from children/relatives</option>
                      <option value="Heard of it but afraid">Heard of it, but afraid of losing money</option>
                      <option value="Never used">Never used digital payment apps</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Online Government Portals (DigiLocker, PM-Kisan) *</label>
                    <select
                      name="onlineGovtServices"
                      required
                      value={formData.onlineGovtServices}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Awareness Level</option>
                      <option value="Yes, regularly">Yes, check status regularly by myself</option>
                      <option value="Used once or twice">Used once or twice via CSC / Cyber Cafe</option>
                      <option value="Know about them but cannot use">Know about them, but cannot operate myself</option>
                      <option value="Not aware">Not aware of these online services</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: CYBER THREATS & SAFETY */}
              <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--cyan-bright)', marginBottom: '1.25rem' }}>
                  Section 3: Cyber Fraud Experience & Awareness
                </h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Have You Encountered Cyber Fraud Attempts? *</label>
                    <select
                      name="encounteredFraud"
                      required
                      value={formData.encounteredFraud}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Experience</option>
                      <option value="Yes, lost money">Yes, unfortunately lost money</option>
                      <option value="Yes, attempted but escaped">Yes, received fraud calls/links but escaped</option>
                      <option value="Received suspicious calls/links">Received suspicious lottery/disconnection SMS</option>
                      <option value="Never">Never experienced any suspicious calls/SMS</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Do You Know About Helpline 1930? *</label>
                    <select
                      name="cyberHelplineAwareness"
                      required
                      value={formData.cyberHelplineAwareness}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Helpline Knowledge</option>
                      <option value="Yes (Know 1930 & Portal)">Yes, know 1930 & cybercrime.gov.in</option>
                      <option value="Heard about it vaguely">Heard about it vaguely on TV/radio</option>
                      <option value="No idea">No idea about this helpline</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">What is Your Primary Challenge / Barrier to Safe Internet Use? *</label>
                  <select
                    name="primaryBarrier"
                    required
                    value={formData.primaryBarrier}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Primary Challenge</option>
                    <option value="Fear of financial loss/fraud">Fear of financial loss / cyber fraud</option>
                    <option value="Language barrier (English only)">Language barrier (Apps mostly in English)</option>
                    <option value="Poor network/connectivity">Poor mobile network / slow internet</option>
                    <option value="Lack of training/guidance">Lack of hands-on training or guidance</option>
                    <option value="None">None / Comfortable with technology</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Topics You Want Future Village Workshops To Cover:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem', marginTop: '0.5rem' }}>
                    {topicsList.map((topic) => (
                      <label
                        key={topic}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.88rem',
                          color: '#e2e8f0',
                          cursor: 'pointer',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          background: formData.desiredTopics.includes(topic) ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                          border: formData.desiredTopics.includes(topic) ? '1px solid var(--cyan-bright)' : '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.desiredTopics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                        />
                        <span>{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Community Suggestions or Feedback (Optional)</label>
                  <textarea
                    name="feedback"
                    rows={3}
                    placeholder="Share any specific incident or feedback regarding digital awareness in your village..."
                    value={formData.feedback}
                    onChange={handleInputChange}
                    className="form-textarea"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-cyan"
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: 800 }}
              >
                {loading ? 'Recording Survey in Database...' : 'Submit Community Survey & View Score'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
