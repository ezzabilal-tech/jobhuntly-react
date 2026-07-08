import { Search } from 'lucide-react';
import './Navbar.css';
export default function Navbar({ active = 'home' }) {
  const links = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'jobs', label: 'Find Jobs', href: '/jobs' },
    { key: 'companies', label: 'Browse Companies', href: '/companies' },
  ];
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <div className="navbar__logo">
          <span className="navbar__logo-dot" />
          JobHuntly
        </div>

        <nav className="navbar__links">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={`navbar__link ${active === l.key ? 'navbar__link--active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href="/login" className="navbar__login">Login</a>
          <a href="/signup" className="btn btn-primary">Sign Up</a>
        </div>
      </div>
    </header>
  );
}
