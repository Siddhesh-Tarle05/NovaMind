import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useUser } from '../../../context/UserContext';
import { Icons } from '../../dashboard/components/Icons';
import Logo from '../../../components/Logo';
import { EXPRESS_BASE } from '../../../services/api';
import '../styles/auth.css';

export default function AuthPage({ initialTab = 'signin', onBackToHome }) {
  const [tab, setTab] = useState(initialTab || 'signin'); // 'signin' | 'signup'
  const { theme, toggleTheme } = useTheme();
  const { login } = useUser();

  // ── Sign In state ─────────────────────────────────────────
  const [signInEmail, setSignInEmail]       = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError]       = useState('');
  const [signInLoading, setSignInLoading]   = useState(false);
  const [showSignInPw, setShowSignInPw]     = useState(false);

  // ── Sign Up state ─────────────────────────────────────────
  const [signUpName, setSignUpName]           = useState('');
  const [signUpEmail, setSignUpEmail]         = useState('');
  const [signUpPassword, setSignUpPassword]   = useState('');
  const [signUpConfirm, setSignUpConfirm]     = useState('');
  const [signUpError, setSignUpError]         = useState('');
  const [signUpLoading, setSignUpLoading]     = useState(false);
  const [showSignUpPw, setShowSignUpPw]       = useState(false);
  const [showSignUpCfm, setShowSignUpCfm]     = useState(false);

  // ── Sign In submit ────────────────────────────────────────
  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInError('');
    if (!signInEmail || !signInPassword) {
      setSignInError('Please fill in all fields.');
      return;
    }
    setSignInLoading(true);
    try {
      const res = await fetch(`${EXPRESS_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');
      login(data.token, data.user);
    } catch (err) {
      setSignInError(err.message);
    } finally {
      setSignInLoading(false);
    }
  };

  // ── Sign Up submit ────────────────────────────────────────
  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpError('');
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirm) {
      setSignUpError('Please fill in all fields.');
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError('Password must be at least 6 characters.');
      return;
    }
    if (signUpPassword !== signUpConfirm) {
      setSignUpError('Passwords do not match.');
      return;
    }
    setSignUpLoading(true);
    try {
      const res = await fetch(`${EXPRESS_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: signUpName, email: signUpEmail, password: signUpPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed.');
      login(data.token, data.user);
    } catch (err) {
      setSignUpError(err.message);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* ── Left Side: Purely Visual Animated SVG & Cosmic Neural Loop ── */}
      <div className="auth-showcase">
        {/* Shifting Cosmic Background Waves & Glows */}
        <div className="auth-cosmic-glow glow-1" />
        <div className="auth-cosmic-glow glow-2" />
        <div className="auth-cosmic-glow glow-3" />
        <div className="auth-starfield" />

        <div className="auth-visual-centerpiece">
          {/* Top Tag */}
          <div className="auth-minimal-tag">
            <span className="auth-neon-dot" />
            <span>NOVA MIND · CLOSED-LOOP AI</span>
          </div>

          {/* Dynamic Animated Neural Planetary SVG */}
          <div className="auth-svg-wrapper">
            <svg className="auth-animated-svg" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Glowing Gradients */}
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                </linearGradient>

                <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                </linearGradient>

                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Synapse Connection Paths */}
              <g className="svg-synapse-group" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="2" strokeDasharray="6 6">
                <path d="M300 300 L120 160" />
                <path d="M300 300 L480 160" />
                <path d="M300 300 L150 450" />
                <path d="M300 300 L450 450" />
              </g>

              {/* Outer Rotating Ring 1 (Dashed) */}
              <circle
                className="svg-ring-1"
                cx="300"
                cy="300"
                r="220"
                stroke="url(#ringGrad1)"
                strokeWidth="2.5"
                strokeDasharray="18 12 6 12"
              />

              {/* Outer Rotating Ring 2 (Tilted & Counter-Rotating) */}
              <ellipse
                className="svg-ring-2"
                cx="300"
                cy="300"
                rx="260"
                ry="150"
                stroke="url(#ringGrad2)"
                strokeWidth="2"
                strokeDasharray="24 16"
              />

              {/* Inner Pulsing Orbit Ring */}
              <circle
                className="svg-ring-3"
                cx="300"
                cy="300"
                r="130"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1.5"
              />

              {/* Central Energy Core */}
              <circle className="svg-core-pulse" cx="300" cy="300" r="75" fill="url(#coreGlow)" filter="url(#glowFilter)" />
              <circle cx="300" cy="300" r="32" fill="#ffffff" filter="url(#glowFilter)" />
              <circle cx="300" cy="300" r="16" fill="#38bdf8" />

              {/* Orbiting Satellite Nodes */}
              <g className="svg-satellite sat-1">
                <circle cx="120" cy="160" r="28" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" filter="url(#glowFilter)" />
              </g>
              <g className="svg-satellite sat-2">
                <circle cx="480" cy="160" r="28" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="3" filter="url(#glowFilter)" />
              </g>
              <g className="svg-satellite sat-3">
                <circle cx="150" cy="450" r="28" fill="#1e1b4b" stroke="#ec4899" strokeWidth="3" filter="url(#glowFilter)" />
              </g>
              <g className="svg-satellite sat-4">
                <circle cx="450" cy="450" r="28" fill="#1e1b4b" stroke="#10b981" strokeWidth="3" filter="url(#glowFilter)" />
              </g>

              {/* Traveling Energy Pulses along Synapses */}
              <circle r="6" fill="#38bdf8" filter="url(#glowFilter)">
                <animateMotion path="M300 300 L120 160 L300 300" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle r="6" fill="#ec4899" filter="url(#glowFilter)">
                <animateMotion path="M300 300 L480 160 L300 300" dur="5s" repeatCount="indefinite" />
              </circle>
              <circle r="6" fill="#10b981" filter="url(#glowFilter)">
                <animateMotion path="M300 300 L150 450 L300 300" dur="4.5s" repeatCount="indefinite" />
              </circle>
              <circle r="6" fill="#fbbf24" filter="url(#glowFilter)">
                <animateMotion path="M300 300 L450 450 L300 300" dur="3.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Clean Minimal Statement */}
          <div className="auth-minimal-statement">
            <h2>Where Intelligence Meets Mastery</h2>
            <p>Closed-loop neural learning powered by real-time AI synchronization.</p>
          </div>
        </div>
      </div>

      {/* ── Right Side: Sign In / Sign Up Modal ── */}
      <div className="auth-modal-wrapper">
        {/* Top Header Buttons */}
        <div className="auth-theme-switcher" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {onBackToHome && (
            <button
              type="button"
              className="auth-theme-btn"
              onClick={onBackToHome}
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              ← Back to Home
            </button>
          )}
          <button
            type="button"
            className="auth-theme-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <div className="auth-card">
          {/* Header */}
          <div className="auth-logo-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Logo size={48} />
            <p className="auth-logo-sub" style={{ marginTop: '4px' }}>
              {tab === 'signin'
                ? 'Welcome back! Sign in to continue your journey'
                : 'Create your account to unlock personalized AI learning'}
            </p>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${tab === 'signin' ? 'active' : ''}`}
              onClick={() => { setTab('signin'); setSignInError(''); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${tab === 'signup' ? 'active' : ''}`}
              onClick={() => { setTab('signup'); setSignUpError(''); }}
            >
              Sign Up
            </button>
          </div>

          {/* ── Sign In Form ── */}
          {tab === 'signin' && (
            <form className="auth-form" onSubmit={handleSignIn} noValidate>
              <div className="auth-field">
                <label htmlFor="signin-email" className="auth-label">Email address</label>
                <input
                  id="signin-email"
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signin-password" className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                  <input
                    id="signin-password"
                    type={showSignInPw ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-pw-toggle"
                    onClick={() => setShowSignInPw((v) => !v)}
                    aria-label={showSignInPw ? 'Hide password' : 'Show password'}
                  >
                    {showSignInPw ? <Icons.EyeOff /> : <Icons.Eye />}
                  </button>
                </div>
              </div>

              {signInError && <div className="auth-error">{signInError}</div>}

              <button
                id="signin-submit"
                type="submit"
                className="auth-submit-btn"
                disabled={signInLoading}
              >
                {signInLoading ? <span className="auth-spinner" /> : null}
                {signInLoading ? 'Signing in…' : 'Sign In'}
              </button>

              <p className="auth-switch-text">
                Don't have an account?{' '}
                <button type="button" className="auth-switch-link" onClick={() => { setTab('signup'); setSignInError(''); }}>
                  Sign up free
                </button>
              </p>
            </form>
          )}

          {/* ── Sign Up Form ── */}
          {tab === 'signup' && (
            <form className="auth-form" onSubmit={handleSignUp} noValidate>
              <div className="auth-field">
                <label htmlFor="signup-name" className="auth-label">Full name</label>
                <input
                  id="signup-name"
                  type="text"
                  className="auth-input"
                  placeholder="Jane Doe"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-email" className="auth-label">Email address</label>
                <input
                  id="signup-email"
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-password" className="auth-label">Password <span className="auth-label-hint">(min. 6 characters)</span></label>
                <div className="auth-input-wrapper">
                  <input
                    id="signup-password"
                    type={showSignUpPw ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-pw-toggle"
                    onClick={() => setShowSignUpPw((v) => !v)}
                    aria-label={showSignUpPw ? 'Hide password' : 'Show password'}
                  >
                    {showSignUpPw ? <Icons.EyeOff /> : <Icons.Eye />}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="signup-confirm" className="auth-label">Confirm password</label>
                <div className="auth-input-wrapper">
                  <input
                    id="signup-confirm"
                    type={showSignUpCfm ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={signUpConfirm}
                    onChange={(e) => setSignUpConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-pw-toggle"
                    onClick={() => setShowSignUpCfm((v) => !v)}
                    aria-label={showSignUpCfm ? 'Hide password' : 'Show password'}
                  >
                    {showSignUpCfm ? <Icons.EyeOff /> : <Icons.Eye />}
                  </button>
                </div>
              </div>

              {signUpError && <div className="auth-error">{signUpError}</div>}

              <button
                id="signup-submit"
                type="submit"
                className="auth-submit-btn"
                disabled={signUpLoading}
              >
                {signUpLoading ? <span className="auth-spinner" /> : null}
                {signUpLoading ? 'Creating account…' : 'Create Account'}
              </button>

              <p className="auth-switch-text">
                Already have an account?{' '}
                <button type="button" className="auth-switch-link" onClick={() => { setTab('signin'); setSignUpError(''); }}>
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
