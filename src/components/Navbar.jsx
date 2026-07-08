import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar({ active = 'home' }) {
  const { user, logout } = useAuth();
  
  const links = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'jobs', label: 'Find Jobs', href: '/jobs' },
    { key: 'companies', label: 'Browse Companies', href: '/companies' },
  ];

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-dot" />
          JobHuntly
        </Link>

        <nav className="navbar__links">
          {links.map((l) => (
            <Link
              key={l.key}
              to={l.href}
              className={`navbar__link ${active === l.key ? 'navbar__link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user">
              <div className="navbar__user-info">
                <img src={user.avatar} alt={user.name} className="navbar__avatar" />
                <span className="navbar__username">{user.name}</span>
              </div>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar__login">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
