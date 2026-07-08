import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart2 } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState('seeker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  // Extract redirect URL from location state, default to dashboard '/dashboard'
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(email, password, tab);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error);
    }
  };

  const handleGoogleLogin = () => {
    // Mock login with Google
    const res = login('google.user@gmail.com', 'googlepassword', tab);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="auth-container">
      {/* Left side panel */}
      <div className="auth-left">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-dot" />
          JobHuntly
        </Link>

        <div className="auth-badge-card">
          <div className="auth-badge-icon">
            <BarChart2 size={20} />
          </div>
          <div className="auth-badge-text">
            <h4>100K+</h4>
            <p>People got hired</p>
          </div>
        </div>

        <div className="auth-image-wrapper">
          <div className="auth-image-container">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
              alt="Professional Businessperson"
              className="auth-image"
            />
          </div>
        </div>

        <div className="auth-testimonial-card">
          <p className="auth-testimonial-quote">
            <span className="auth-testimonial-quote-icon">“</span>
            Great platform for the job seeker that searching for new career heights.
          </p>
          <div className="auth-testimonial-author">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Vicky Jenkins"
              className="auth-testimonial-avatar"
            />
            <div className="auth-testimonial-info">
              <h5>Vicky Jenkins</h5>
              <p>Lead Engineer at Canva</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form panel */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${tab === 'seeker' ? 'auth-tab--active' : ''}`}
              onClick={() => setTab('seeker')}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`auth-tab ${tab === 'company' ? 'auth-tab--active' : ''}`}
              onClick={() => setTab('company')}
            >
              Company
            </button>
          </div>

          <div className="auth-header">
            <h1>Welcome Back, Dude</h1>
          </div>

          {error && <div className="auth-error-msg">{error}</div>}

          <button type="button" className="auth-google-btn" onClick={handleGoogleLogin}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.79 2.7v2.24h2.9c1.69-1.55 2.69-3.85 2.69-6.57z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.23l-2.9-2.24c-.8.54-1.84.87-3.06.87-2.35 0-4.34-1.58-5.05-3.71H.94v2.3C2.42 15.93 5.47 18 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.95 10.7c-.18-.54-.28-1.12-.28-1.7s.1-1.16.28-1.7V5.0H.94C.34 6.2 0 7.56 0 9s.34 2.8 1.05 4.0l3.01-2.3z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.03C13.46.59 11.43 0 9 0 5.47 0 2.42 2.07.94 5.0l3.01 2.3c.71-2.13 2.7-3.71 5.05-3.71z"
              />
            </svg>
            Login with Google
          </button>

          <div className="auth-divider">Or login with email</div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-remember-row">
              <label className="auth-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="auth-forgot" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="auth-submit-btn">
              Login
            </button>
          </form>

          <div className="auth-footer-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
