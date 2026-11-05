import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Smartphone,
  BookOpen,
  PhoneCall,
  LayoutDashboard,
  Menu,
  X,
  User,
  LogOut,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout, openAuthModal } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Project', path: '/about' },
    { name: 'Digital Literacy', path: '/digital-literacy' },
    { name: 'Cyber Safety', path: '/cyber-safety' },
    { name: 'Resources', path: '/resources' },
    { name: 'Community Survey', path: '/survey' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(6, 14, 29, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
      padding: '0.85rem 0'
    }}>
      {/* Top Cyber Helpline Alert Pill */}
      <div style={{
        background: 'linear-gradient(90deg, #1e3a8a 0%, #0369a1 50%, #0891b2 100%)',
        color: '#ffffff',
        fontSize: '0.78rem',
        padding: '0.3rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        borderBottom: '1px solid rgba(0, 242, 254, 0.2)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <AlertTriangle size={14} color="#fef08a" />
          COMMUNITY CYBER ALERT:
        </span>
        <span>
          National Cyber Crime Helpline: <strong style={{ color: '#00f2fe', textDecoration: 'underline' }}>Dial 1930</strong> (24x7 Toll-Free)
        </span>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1e40af 0%, #00f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)'
          }}>
            <ShieldCheck size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: '#ffffff', lineHeight: 1.2 }}>
              Gram<span style={{ color: 'var(--cyan-bright)' }}>Suraksha</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Rural Digital & Cyber Awareness (CSP)
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.35rem' }} className="desktop-nav">
          <style>{`
            @media (min-width: 1024px) {
              .desktop-nav { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '0.5rem 0.85rem',
                fontSize: '0.88rem',
                fontWeight: isActive(link.path) ? 700 : 500,
                color: isActive(link.path) ? '#00f2fe' : '#cbd5e1',
                borderRadius: '8px',
                background: isActive(link.path) ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                border: isActive(link.path) ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                transition: 'var(--transition)'
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* Admin Dashboard link if Admin */}
          {isAdmin && (
            <Link
              to="/admin"
              style={{
                padding: '0.5rem 0.85rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#fef08a',
                borderRadius: '8px',
                background: isActive('/admin') ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.1)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <LayoutDashboard size={15} />
              Admin
            </Link>
          )}
        </nav>

        {/* User Auth Buttons */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '0.85rem'
              }}>
                <User size={15} color="var(--cyan-bright)" />
                <span style={{ fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
                <span style={{
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '6px',
                  background: user.role === 'admin' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                  color: user.role === 'admin' ? '#fde047' : '#38bdf8',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}>
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="btn btn-outline btn-sm"
                style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={() => openAuthModal('login')}
                className="btn btn-outline btn-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="btn btn-cyan btn-sm"
              >
                Join Initiative
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#ffffff',
            padding: '0.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(6, 14, 29, 0.98)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.95rem',
                fontWeight: isActive(link.path) ? 700 : 500,
                color: isActive(link.path) ? '#00f2fe' : '#ffffff',
                background: isActive(link.path) ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                borderRadius: '8px',
                borderLeft: isActive(link.path) ? '3px solid #00f2fe' : 'none'
              }}
            >
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#fef08a',
                background: 'rgba(234, 179, 8, 0.15)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <LayoutDashboard size={18} />
              Admin Dashboard
            </Link>
          )}

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem', marginTop: '0.5rem' }}>
            {user ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Logged in as {user.name}</span>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { openAuthModal('register'); setMobileMenuOpen(false); }}
                  className="btn btn-cyan btn-sm"
                  style={{ flex: 1 }}
                >
                  Join
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
