import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Lock,
  Smartphone,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export const CyberSafety = () => {
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredList, setAnsweredList] = useState([]);

  const quizQuestions = [
    {
      question: 'You receive an urgent SMS: "Your electricity connection will be cut at 9:30 PM due to unpaid bill. Call officer at 9876543210 immediately." What should you do?',
      options: [
        'Immediately call the number and pay through the link they send.',
        'Ignore the SMS or visit the official local electricity sub-station/CSC to verify.',
        'Forward the SMS to all your village WhatsApp groups to alert them.',
        'Share your bank card number to cancel the disconnection.'
      ],
      correctIndex: 1,
      explanation: 'Official power distribution boards never send disconnection notices from personal 10-digit mobile numbers. This is a common panic-inducing scam.'
    },
    {
      question: 'Someone calls claiming you won ₹25,000 cash subsidy from the government, and asks you to enter your UPI PIN to claim it. What should you do?',
      options: [
        'Enter your UPI PIN quickly before the offer expires.',
        'Ask your neighbor to enter their UPI PIN instead.',
        'Hang up immediately! You NEVER enter a UPI PIN to receive money.',
        'Share your OTP over the phone to verify your identity.'
      ],
      correctIndex: 2,
      explanation: 'UPI PIN is strictly used to AUTHORIZE MONEY OUT of your account. Entering a PIN to "receive money" is always a scam.'
    },
    {
      question: 'A stranger calls claiming to be from your bank and asks you to install "AnyDesk" or "TeamViewer QuickSupport" on your phone to resolve an issue. Should you install it?',
      options: [
        'Yes, because they said they are from the bank headquarters.',
        'No! These apps allow strangers to see your screen and steal your passwords and OTPs.',
        'Yes, but only if they speak in your local language.',
        'Yes, install it and leave your phone unattended.'
      ],
      correctIndex: 1,
      explanation: 'Screen-sharing apps like AnyDesk grant complete remote visibility of your screen. Scammers use it to watch your bank OTPs arrive in real time.'
    },
    {
      question: 'What is the official 24x7 National Cyber Crime Helpline number in India to report online financial fraud and freeze stolen funds?',
      options: [
        '100',
        '108',
        '1930',
        '1091'
      ],
      correctIndex: 2,
      explanation: '1930 is the toll-free Citizen Financial Cyber Fraud Reporting helpline operated 24x7 across India.'
    },
    {
      question: 'An instant loan app on the internet promises a loan of ₹5,000 in 2 minutes, but requires access to your Contacts, Camera, and Gallery. What is the risk?',
      options: [
        'It is completely safe and standard practice.',
        'Illegal loan apps steal your personal contacts and photos to harass and blackmail your relatives for exorbitant interest.',
        'It improves your credit score faster.',
        'The government recommends downloading these apps.'
      ],
      correctIndex: 1,
      explanation: 'Illegal predatory loan apps misuse full contact permissions to send morphed photos and abusive messages to your friends and family.'
    }
  ];

  const handleSelectAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    const isCorrect = index === quizQuestions[currentQuestion].correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnsweredList([
      ...answeredList,
      {
        questionIndex: currentQuestion,
        userAnswer: index,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredList([]);
  };

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">National Cyber Defense</span>
          <h2>Cyber Safety & Fraud Prevention</h2>
          <p>
            Recognize the anatomy of digital scams, protect your family from financial traps, and know your emergency rights.
          </p>
        </div>

        {/* THREAT BREAKDOWN CARDS */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '1.75rem', textAlign: 'center' }}>
            Top 4 Rural Cyber Threats in 2026
          </h3>

          <div className="grid-2">
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <span className="badge badge-danger">High Threat</span>
                <h4 style={{ fontSize: '1.25rem', color: '#ffffff' }}>1. Fake Loan Apps & Contact Blackmail</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Fraudsters advertise instant loans with no paperwork. Upon installation, the app secretly uploads your entire contact list and gallery to offshore servers. Even if you pay back, they demand 300% interest and send abusive messages to your relatives.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>
                🛡️ Defense: Only borrow from RBI-registered banks or cooperative societies. Never permit access to Contacts or Photos for loan apps.
              </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <span className="badge badge-warning">High Threat</span>
                <h4 style={{ fontSize: '1.25rem', color: '#ffffff' }}>2. Electricity & KYC Disconnection Scams</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Villagers receive panic SMS claiming power will be cut in 2 hours or bank KYC is expired. Scammers instruct them to install remote-screen apps or pay ₹10 through a link to "verify", stealing all bank credentials in the process.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>
                🛡️ Defense: Utility boards never send notices via personal phone numbers. Verify through CSC or local electricity office.
              </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #00f2fe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <span className="badge badge-cyan">Prevalent Scam</span>
                <h4 style={{ fontSize: '1.25rem', color: '#ffffff' }}>3. QR Code "Payment Receive" Fraud</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Scammers posing as buyers on classified sites or government subsidy distributors send a QR code saying: <em>"Scan this and type your PIN to receive the advance payment."</em> As soon as the victim enters their PIN, money is debited.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>
                🛡️ Defense: Remember the Golden Law: You NEVER need a PIN to receive money.
              </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <span className="badge badge-cyan">Identity Theft</span>
                <h4 style={{ fontSize: '1.25rem', color: '#ffffff' }}>4. Aadhaar Biometric & SIM Cloning</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Unscrupulous operators at unauthorized roadside kiosks ask villagers to authenticate multiple times on fingerprint scanners, using extra prints to perform unauthorized AePS cash withdrawals.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>
                🛡️ Defense: Use the official mAadhaar app to lock your Aadhaar biometrics when not in use. Only use authorized bank BC points.
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE CYBER AWARENESS QUIZ */}
        <div className="glass-card" style={{ padding: '3rem 2rem', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>COMMUNITY QUIZ</span>
            <h3 style={{ fontSize: '1.85rem' }}>Test Your Cyber Safety Readiness</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Answer 5 realistic scenario questions to earn your Community Cyber Awareness Badge.
            </p>
          </div>

          {!showResult ? (
            <div style={{ maxWidth: '750px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span>Current Score: {score}</span>
              </div>

              {/* Progress bar */}
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', marginBottom: '2rem' }}>
                <div style={{
                  height: '100%',
                  width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                  background: 'linear-gradient(90deg, #1e40af, #00f2fe)',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              <h4 style={{ fontSize: '1.25rem', lineHeight: 1.5, marginBottom: '1.75rem', color: '#ffffff' }}>
                {quizQuestions[currentQuestion].question}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {quizQuestions[currentQuestion].options.map((opt, idx) => {
                  let optStyle = {
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    background: 'rgba(6, 14, 29, 0.7)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    cursor: selectedAnswer === null ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'var(--transition)'
                  };

                  if (selectedAnswer !== null) {
                    if (idx === quizQuestions[currentQuestion].correctIndex) {
                      optStyle.background = 'rgba(16, 185, 129, 0.2)';
                      optStyle.borderColor = '#10b981';
                    } else if (selectedAnswer === idx) {
                      optStyle.background = 'rgba(239, 68, 68, 0.2)';
                      optStyle.borderColor = '#ef4444';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      style={optStyle}
                      onClick={() => handleSelectAnswer(idx)}
                    >
                      <span>{opt}</span>
                      {selectedAnswer !== null && idx === quizQuestions[currentQuestion].correctIndex && (
                        <CheckCircle2 size={18} color="#10b981" />
                      )}
                      {selectedAnswer === idx && idx !== quizQuestions[currentQuestion].correctIndex && (
                        <XCircle size={18} color="#ef4444" />
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  color: '#cbd5e1',
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: 'var(--cyan-bright)' }}>Explanation:</strong> {quizQuestions[currentQuestion].explanation}
                </div>
              )}

              {selectedAnswer !== null && (
                <div style={{ textAlign: 'right' }}>
                  <button onClick={handleNextQuestion} className="btn btn-cyan">
                    {currentQuestion + 1 === quizQuestions.length ? 'View Final Results' : 'Next Question →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: score >= 4 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                border: score >= 4 ? '2px solid #10b981' : '2px solid #eab308',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <Award size={36} color={score >= 4 ? '#10b981' : '#eab308'} />
              </div>

              <h4 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Quiz Completed!
              </h4>
              <p style={{ fontSize: '1.2rem', color: 'var(--cyan-bright)', fontWeight: 700, marginBottom: '1.5rem' }}>
                You scored {score} out of {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
              </p>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                {score >= 4
                  ? 'Outstanding! You have strong cyber awareness and can help guide and protect other families in your village.'
                  : 'Good effort! Review the safety guides on this page to strengthen your protection against tricky online frauds.'}
              </p>

              <button onClick={resetQuiz} className="btn btn-primary">
                Retake Quiz
              </button>
            </div>
          )}
        </div>

        {/* 1930 EMERGENCY RESPONSE PROTOCOL */}
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.8))',
          padding: '3rem 2.5rem',
          border: '1px solid rgba(239, 68, 68, 0.4)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontWeight: 700, marginBottom: '0.75rem' }}>
                <PhoneCall size={20} /> EMERGENCY ACTION PROTOCOL
              </div>
              <h3 style={{ fontSize: '1.85rem', marginBottom: '1rem', color: '#ffffff' }}>
                If Money Was Stolen, Act Within The 2-Hour Golden Window
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                When money is fraudulently transferred via UPI or net banking, banks can trigger an inter-bank stop-payment request if you alert the police cyber cell quickly.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="tel:1930" className="btn btn-danger" style={{ fontWeight: 800 }}>
                  <PhoneCall size={18} /> Dial 1930 (24x7 Helpline)
                </a>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="btn btn-outline">
                  cybercrime.gov.in <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1.75rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h5 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.05rem' }}>Keep These Ready Before Calling 1930:</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--cyan-bright)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Your Bank Account Number & Bank Name</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--cyan-bright)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Exact Transaction ID (12-digit UTR from your bank SMS)</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--cyan-bright)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Fraudster's phone number or UPI ID</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--cyan-bright)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Screenshots of payment confirmation and SMS</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
