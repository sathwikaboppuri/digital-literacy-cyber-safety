import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Mail,
  ShieldAlert,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Eye,
  RefreshCw,
  X,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  // Articles state
  const [articlesList, setArticlesList] = useState([]);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Digital Payments',
    summary: '',
    content: '',
    readTime: '4 min read',
    author: 'CSP Admin Cell',
    dangerLevel: 'Medium',
    keyTakeaways: ''
  });
  const [editingArticleId, setEditingArticleId] = useState(null);

  // Surveys state
  const [surveysList, setSurveysList] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveySearch, setSurveySearch] = useState('');

  // Contacts state
  const [contactsList, setContactsList] = useState([]);

  const loadDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const statsRes = await api.dashboard.getStats();
      if (statsRes.data) {
        setDashboardData(statsRes.data);
      }

      // Load collections
      const [artRes, survRes, cntRes] = await Promise.all([
        api.articles.getAll(),
        api.surveys.getAll(),
        api.contacts.getAll()
      ]);

      if (artRes.data) setArticlesList(artRes.data);
      if (survRes.data) setSurveysList(survRes.data);
      if (cntRes.data) setContactsList(cntRes.data);
    } catch (err) {
      setError(err.message || 'Failed to load administrative data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Handle Article Create / Edit
  const handleOpenArticleModal = (article = null) => {
    if (article) {
      setEditingArticleId(article._id);
      setArticleForm({
        title: article.title,
        category: article.category,
        summary: article.summary,
        content: article.content,
        readTime: article.readTime || '4 min read',
        author: article.author || 'CSP Admin Cell',
        dangerLevel: article.dangerLevel || 'Medium',
        keyTakeaways: (article.keyTakeaways || []).join('\n')
      });
    } else {
      setEditingArticleId(null);
      setArticleForm({
        title: '',
        category: 'Digital Payments',
        summary: '',
        content: '',
        readTime: '4 min read',
        author: 'CSP Admin Cell',
        dangerLevel: 'Medium',
        keyTakeaways: ''
      });
    }
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...articleForm,
        keyTakeaways: articleForm.keyTakeaways
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
      };

      if (editingArticleId) {
        await api.articles.update(editingArticleId, payload);
      } else {
        await api.articles.create(payload);
      }

      setIsArticleModalOpen(false);
      loadDashboard();
    } catch (err) {
      alert('Error saving article: ' + err.message);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this educational article?')) return;
    try {
      await api.articles.delete(id);
      loadDashboard();
    } catch (err) {
      alert('Error deleting article: ' + err.message);
    }
  };

  // Handle Contact status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.contacts.updateStatus(id, newStatus);
      loadDashboard();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await api.contacts.delete(id);
      loadDashboard();
    } catch (err) {
      alert('Error deleting inquiry: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan-bright)' }}>
        Loading Real-Time Administrator Dashboard...
      </div>
    );
  }

  const summary = dashboardData?.summary || {};
  const filteredSurveys = surveysList.filter((s) => {
    const q = surveySearch.toLowerCase();
    return (
      s.respondentName.toLowerCase().includes(q) ||
      s.village.toLowerCase().includes(q) ||
      s.occupation.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#fef08a', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
              <LayoutDashboard size={16} /> ADMINISTRATOR CONTROL PANEL
            </div>
            <h1 style={{ fontSize: '2.2rem', marginTop: '0.2rem' }}>
              Project Management & Community Analytics
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Logged in as <strong>{user?.name}</strong> ({user?.email})
            </p>
          </div>

          <button onClick={loadDashboard} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <RefreshCw size={15} /> Refresh DB Data
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem',
          marginBottom: '2.5rem',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'overview' ? 'linear-gradient(135deg, #1e40af, #0284c7)' : 'transparent',
              color: activeTab === 'overview' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <TrendingUp size={16} /> Overview & Analytics
          </button>

          <button
            onClick={() => setActiveTab('surveys')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'surveys' ? 'linear-gradient(135deg, #1e40af, #0284c7)' : 'transparent',
              color: activeTab === 'surveys' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FileText size={16} /> Surveys ({surveysList.length})
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'articles' ? 'linear-gradient(135deg, #1e40af, #0284c7)' : 'transparent',
              color: activeTab === 'articles' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <ShieldAlert size={16} /> Educational Articles ({articlesList.length})
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'contacts' ? 'linear-gradient(135deg, #1e40af, #0284c7)' : 'transparent',
              color: activeTab === 'contacts' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Mail size={16} /> Inquiries ({contactsList.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Top 4 DB Metric Cards */}
            <div className="grid-4">
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Total Survey Responses
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0' }}>
                  {summary.totalSurveys || 0}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>
                  Recorded in MongoDB
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Registered Users
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#60a5fa', margin: '0.4rem 0' }}>
                  {summary.totalUsers || 0}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Community & Admin Accounts
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Community Inquiries
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#34d399', margin: '0.4rem 0' }}>
                  {summary.totalContacts || 0}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#34d399' }}>
                  {dashboardData?.contactsSummary?.new || 0} New Pending Review
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Published Articles
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#facc15', margin: '0.4rem 0' }}>
                  {summary.totalArticles || 0}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fef08a' }}>
                  Awareness Materials
                </div>
              </div>
            </div>

            {/* Field Analytics Visualizers */}
            <div className="grid-2">
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--cyan-bright)' }}>
                  Core Digital Awareness Indicators (%)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <span>Smartphone Ownership Rate</span>
                      <strong>{summary.smartphoneRate || 0}%</strong>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>
                      <div style={{ height: '100%', width: `${summary.smartphoneRate || 0}%`, background: '#3b82f6', borderRadius: '4px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <span>UPI & Digital Payment Adoption</span>
                      <strong>{summary.upiAdoptionRate || 0}%</strong>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>
                      <div style={{ height: '100%', width: `${summary.upiAdoptionRate || 0}%`, background: '#10b981', borderRadius: '4px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <span>Encountered Fraud / Scams</span>
                      <strong style={{ color: '#ef4444' }}>{summary.fraudExposureRate || 0}%</strong>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>
                      <div style={{ height: '100%', width: `${summary.fraudExposureRate || 0}%`, background: '#ef4444', borderRadius: '4px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <span>National 1930 Helpline Awareness</span>
                      <strong>{summary.helplineAwarenessRate || 0}%</strong>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>
                      <div style={{ height: '100%', width: `${summary.helplineAwarenessRate || 0}%`, background: '#00f2fe', borderRadius: '4px' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--cyan-bright)' }}>
                  Primary Barriers to Rural Digital Adoption
                </h3>
                {dashboardData?.analytics?.primaryBarriers && Object.keys(dashboardData.analytics.primaryBarriers).length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {Object.entries(dashboardData.analytics.primaryBarriers).map(([barrier, count]) => (
                      <div key={barrier} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.85rem', background: 'rgba(6, 14, 29, 0.6)', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.88rem', color: '#e2e8f0' }}>{barrier}</span>
                        <span className="badge badge-cyan">{count} respondents</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No barrier data recorded yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SURVEYS MANAGEMENT */}
        {activeTab === 'surveys' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Survey Submissions ({filteredSurveys.length})</h3>
              <div style={{ position: 'relative', width: '280px' }}>
                <input
                  type="text"
                  placeholder="Filter by name, village..."
                  value={surveySearch}
                  onChange={(e) => setSurveySearch(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.2rem', padding: '0.5rem 0.8rem 0.5rem 2.2rem', fontSize: '0.85rem' }}
                />
                <Search size={16} color="var(--cyan-bright)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="glass-card" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(6, 14, 29, 0.9)', borderBottom: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <th style={{ padding: '1rem' }}>Respondent</th>
                    <th style={{ padding: '1rem' }}>Village</th>
                    <th style={{ padding: '1rem' }}>Age Group</th>
                    <th style={{ padding: '1rem' }}>Occupation</th>
                    <th style={{ padding: '1rem' }}>UPI Usage</th>
                    <th style={{ padding: '1rem' }}>Score</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSurveys.map((s) => (
                    <tr key={s._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, color: '#ffffff' }}>{s.respondentName}</td>
                      <td style={{ padding: '1rem' }}>{s.village}</td>
                      <td style={{ padding: '1rem' }}>{s.ageGroup}</td>
                      <td style={{ padding: '1rem' }}>{s.occupation}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', color: s.digitalPaymentUsage.includes('Regular') ? '#34d399' : '#cbd5e1' }}>
                          {s.digitalPaymentUsage}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${s.awarenessScore >= 70 ? 'badge-success' : 'badge-warning'}`}>
                          {s.awarenessScore}/100
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => setSelectedSurvey(s)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Survey Detail Modal */}
            {selectedSurvey && (
              <div
                style={{
                  position: 'fixed',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(3, 8, 18, 0.88)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 3000,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1.5rem'
                }}
                onClick={() => setSelectedSurvey(null)}
              >
                <div
                  className="glass-card animate-fade-in"
                  style={{
                    width: '100%', maxWidth: '640px',
                    maxHeight: '85vh', overflowY: 'auto',
                    padding: '2rem',
                    background: 'rgba(11, 25, 44, 0.98)',
                    position: 'relative'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedSurvey(null)}
                    style={{
                      position: 'absolute', top: '1rem', right: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none', color: '#fff', borderRadius: '50%',
                      width: '32px', height: '32px', cursor: 'pointer'
                    }}
                  >
                    <X size={18} />
                  </button>

                  <h3 style={{ fontSize: '1.45rem', marginBottom: '1rem' }}>
                    Survey: {selectedSurvey.respondentName}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    <div><strong>Village:</strong> {selectedSurvey.village}</div>
                    <div><strong>Age Group:</strong> {selectedSurvey.ageGroup}</div>
                    <div><strong>Gender:</strong> {selectedSurvey.gender}</div>
                    <div><strong>Occupation:</strong> {selectedSurvey.occupation}</div>
                    <div><strong>Education:</strong> {selectedSurvey.educationLevel}</div>
                    <div><strong>Smartphone:</strong> {selectedSurvey.smartphoneOwnership}</div>
                    <div><strong>Internet:</strong> {selectedSurvey.internetUsageFrequency}</div>
                    <div><strong>1930 Awareness:</strong> {selectedSurvey.cyberHelplineAwareness}</div>
                    <div><strong>Fraud Experience:</strong> {selectedSurvey.encounteredFraud}</div>
                    <div><strong>Primary Barrier:</strong> {selectedSurvey.primaryBarrier}</div>
                  </div>

                  {selectedSurvey.feedback && (
                    <div style={{ padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                      <strong>Feedback:</strong> {selectedSurvey.feedback}
                    </div>
                  )}

                  <div style={{ textAlign: 'center' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                      Calculated Awareness Score: {selectedSurvey.awarenessScore}/100
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Awareness Articles ({articlesList.length})</h3>
              <button onClick={() => handleOpenArticleModal()} className="btn btn-cyan btn-sm">
                <Plus size={16} /> Publish New Article
              </button>
            </div>

            <div className="grid-2">
              {articlesList.map((art) => (
                <div key={art._id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{art.category}</span>
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{art.dangerLevel}</span>
                    </div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#ffffff' }}>{art.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {art.summary}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{art.readTime}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenArticleModal(art)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.65rem' }}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art._id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: '0.35rem 0.65rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create/Edit Article Modal */}
            {isArticleModalOpen && (
              <div
                style={{
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(3, 8, 18, 0.88)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 3000,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1.5rem'
                }}
                onClick={() => setIsArticleModalOpen(false)}
              >
                <div
                  className="glass-card animate-fade-in"
                  style={{
                    width: '100%', maxWidth: '680px',
                    maxHeight: '90vh', overflowY: 'auto',
                    padding: '2.5rem',
                    background: 'rgba(11, 25, 44, 0.98)',
                    position: 'relative'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsArticleModalOpen(false)}
                    style={{
                      position: 'absolute', top: '1.25rem', right: '1.25rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none', color: '#fff', borderRadius: '50%',
                      width: '32px', height: '32px', cursor: 'pointer'
                    }}
                  >
                    <X size={18} />
                  </button>

                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                    {editingArticleId ? 'Edit Article' : 'Publish New Awareness Article'}
                  </h3>

                  <form onSubmit={handleSaveArticle}>
                    <div className="form-group">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Category *</label>
                        <select
                          value={articleForm.category}
                          onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                          className="form-select"
                        >
                          <option value="Digital Payments">Digital Payments</option>
                          <option value="Smartphone Basics">Smartphone Basics</option>
                          <option value="Government Schemes">Government Schemes</option>
                          <option value="Cyber Fraud Prevention">Cyber Fraud Prevention</option>
                          <option value="Safety Tips">Safety Tips</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Threat / Danger Level</label>
                        <select
                          value={articleForm.dangerLevel}
                          onChange={(e) => setArticleForm({ ...articleForm, dangerLevel: e.target.value })}
                          className="form-select"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Short Summary *</label>
                      <textarea
                        rows={2}
                        required
                        value={articleForm.summary}
                        onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                        className="form-textarea"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Full Article Content *</label>
                      <textarea
                        rows={6}
                        required
                        value={articleForm.content}
                        onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                        className="form-textarea"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Key Takeaways (one per line)</label>
                      <textarea
                        rows={3}
                        placeholder="Never enter PIN to receive money&#10;Dial 1930 within 2 hours"
                        value={articleForm.keyTakeaways}
                        onChange={(e) => setArticleForm({ ...articleForm, keyTakeaways: e.target.value })}
                        className="form-textarea"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                      {editingArticleId ? 'Save Changes' : 'Publish Article'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONTACT INQUIRIES */}
        {activeTab === 'contacts' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
              Community Inquiries & Assistance Requests ({contactsList.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactsList.map((cnt) => (
                <div key={cnt._id} className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>{cnt.name}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
                        {cnt.village} | {cnt.email} {cnt.phone ? `| ${cnt.phone}` : ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select
                        value={cnt.status}
                        onChange={(e) => handleStatusChange(cnt._id, e.target.value)}
                        className="form-select"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem', width: 'auto' }}
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => handleDeleteContact(cnt._id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: '0.4rem 0.65rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ fontWeight: 600, color: 'var(--cyan-bright)', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                    {cnt.subject}
                  </div>

                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {cnt.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
