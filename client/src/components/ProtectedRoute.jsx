import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, LogIn } from 'lucide-react';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin, openAuthModal } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--cyan-bright)',
        fontSize: '1.1rem'
      }}>
        Verifying Security Session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShieldAlert size={34} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '0.75rem' }}>Authentication Required</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            This portal module contains sensitive community data and management options. Please sign in to proceed.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => openAuthModal('login')} className="btn btn-primary">
              <LogIn size={18} /> Sign In
            </button>
            <button onClick={() => openAuthModal('register')} className="btn btn-outline">
              Register Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShieldAlert size={34} color="#f59e0b" />
          </div>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '0.75rem' }}>Administrator Access Only</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            You are logged in as <strong>{user.name}</strong> with role <code>{user.role}</code>. Administrator privileges are required to view the full community dashboard and survey analytics.
          </p>
          <button onClick={() => openAuthModal('login')} className="btn btn-primary">
            Switch to Admin Account
          </button>
        </div>
      </div>
    );
  }

  return children;
};
