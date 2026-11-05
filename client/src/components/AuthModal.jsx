import React, { useState } from 'react';
import { X, Lock, Mail, User, MapPin, Phone, ShieldCheck, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, register } = useAuth();
  const [mode, setMode] = useState(authModalMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    village: '',
    phone: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync mode if changed from context
  React.useEffect(() => {
    setMode(authModalMode);
    setError('');
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
    } catch (err) {
      setError(err.message || 'Operation failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setMode('login');
    setFormData({
      ...formData,
      email: 'admin@community.org',
      password: 'admin123'
    });
    setError('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(3, 8, 18, 0.85)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem'
    }} onClick={closeAuthModal}>
      <div
        className="glass-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.25rem',
          position: 'relative',
          background: 'rgba(11, 25, 44, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#cbd5e1',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #1e40af 0%, #00f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto'
          }}>
            <ShieldCheck size={28} color="#ffffff" />
          </div>
          <h3 style={{ fontSize: '1.45rem', color: '#ffffff' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Awareness Account'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            {mode === 'login'
              ? 'Access digital safety tools and community management'
              : 'Join our rural empowerment community service initiative'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(6, 14, 29, 0.7)',
          padding: '0.3rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(56, 189, 248, 0.2)'
        }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'login' ? 'linear-gradient(135deg, #1e40af, #0284c7)' : 'transparent',
              color: mode === 'login' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'register' ? 'linear-gradient(135deg, #1e40af, #0284c7)' : 'transparent',
              color: mode === 'register' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Register
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#fca5a5',
            padding: '0.65rem 0.9rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <User size={18} color="var(--cyan-bright)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Village / Town</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="village"
                      placeholder="e.g. Rampur"
                      value={formData.village}
                      onChange={handleChange}
                      className="form-input"
                      style={{ paddingLeft: '2.2rem' }}
                    />
                    <MapPin size={16} color="var(--cyan-bright)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="user">Community Member</option>
                    <option value="admin">Project Administrator</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Mail size={18} color="var(--cyan-bright)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Lock size={18} color="var(--cyan-bright)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.85rem' }}
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Demo Admin Quick Credentials Helper */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <button
            type="button"
            onClick={fillAdminCredentials}
            style={{
              background: 'rgba(234, 179, 8, 0.1)',
              border: '1px dashed rgba(234, 179, 8, 0.4)',
              color: '#fef08a',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'var(--transition)'
            }}
          >
            <KeyRound size={15} color="#eab308" />
            Fill Admin Demo Credentials (admin@community.org)
          </button>
        </div>
      </div>
    </div>
  );
};
