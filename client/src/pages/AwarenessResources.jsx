import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  User,
  AlertTriangle,
  ArrowRight,
  X,
  Printer,
  Share2,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';

export const AwarenessResources = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = [
    'All',
    'Digital Payments',
    'Smartphone Basics',
    'Government Schemes',
    'Cyber Fraud Prevention',
    'Safety Tips'
  ];

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const res = await api.articles.getAll(params);
      if (res.data) {
        setArticles(res.data);
      }
    } catch (err) {
      console.error('Failed to load articles:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const getDangerBadge = (level) => {
    switch (level) {
      case 'Critical':
        return <span className="badge badge-danger">Critical Threat</span>;
      case 'High':
        return <span className="badge badge-warning">High Alert</span>;
      default:
        return <span className="badge badge-cyan">Essential Guide</span>;
    }
  };

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Community Knowledge Repository</span>
          <h2>Awareness Articles & Safety Guides</h2>
          <p>
            Educational articles, safety cheat sheets, and practical advisories curated for rural citizens, families, and village awareness leaders.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1 1 320px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Search articles, scams, UPI guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Search size={18} color="var(--cyan-bright)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                Search
              </button>
            </form>

            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedCategory === cat ? '1px solid var(--cyan-bright)' : '1px solid rgba(255, 255, 255, 0.12)',
                    background: selectedCategory === cat ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    color: selectedCategory === cat ? '#00f2fe' : '#cbd5e1',
                    transition: 'var(--transition)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--cyan-bright)' }}>
            Loading awareness articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <FileText size={40} color="var(--text-dim)" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Articles Found</h4>
            <p style={{ color: 'var(--text-muted)' }}>Try selecting another category or searching with different keywords.</p>
          </div>
        ) : (
          <div className="grid-3">
            {articles.map((art) => (
              <div
                key={art._id}
                className="glass-card card-3d"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveArticle(art)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                      {art.category}
                    </span>
                    {getDangerBadge(art.dangerLevel)}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', lineHeight: 1.4, marginBottom: '0.85rem', color: '#ffffff' }}>
                    {art.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {art.summary}
                  </p>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.8rem',
                    color: 'var(--text-dim)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} /> {art.readTime || '4 min read'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--cyan-bright)', fontWeight: 600 }}>
                      Read Guide <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FULL ARTICLE MODAL */}
        {activeArticle && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(3, 8, 18, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="glass-card animate-fade-in"
              style={{
                width: '100%',
                maxWidth: '780px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                background: 'rgba(11, 25, 44, 0.98)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              {/* Badges & Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="badge badge-cyan">{activeArticle.category}</span>
                {getDangerBadge(activeArticle.dangerLevel)}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> {activeArticle.readTime}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <User size={14} /> {activeArticle.author}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.85rem', lineHeight: 1.3, marginBottom: '1.25rem', color: '#ffffff' }}>
                {activeArticle.title}
              </h2>

              {/* Summary lead */}
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.1)',
                borderLeft: '4px solid var(--cyan-bright)',
                color: '#e0f2fe',
                fontSize: '0.98rem',
                marginBottom: '1.75rem',
                lineHeight: 1.6
              }}>
                {activeArticle.summary}
              </div>

              {/* Key Takeaways */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{ color: 'var(--cyan-bright)', fontSize: '1.05rem', marginBottom: '0.85rem' }}>
                    Key Safety Takeaways
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {activeArticle.keyTakeaways.map((tip, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: '#cbd5e1' }}>
                        <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content body */}
              <div style={{
                color: '#e2e8f0',
                fontSize: '1rem',
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
                marginBottom: '2rem'
              }}>
                {activeArticle.content}
              </div>

              {/* Footer action buttons */}
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  Published for Rural Community Education
                </span>
                <button
                  onClick={() => window.print()}
                  className="btn btn-outline btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Printer size={15} /> Print / Save Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
