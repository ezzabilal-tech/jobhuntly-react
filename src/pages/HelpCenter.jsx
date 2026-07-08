import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
  Building,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './HelpCenter.css';

const CATEGORIES = ['Getting Started', 'My Profile', 'Applying for a job', 'Job Search Tips', 'Job Alerts'];

const ARTICLES = [
  {
    title: 'What is My Applications?',
    body:
      'My Applications is a way for you to track jobs as you move through the application process. Depending on the job you applied to, you may also receive notifications indicating that an application has been actioned by an employer.',
  },
  {
    title: 'How to access my applications history',
    body:
      'To access applications history, go to your My Applications page on your dashboard profile. You must be signed in to your JobHuntly account to view this page.',
  },
  {
    title: 'Not seeing jobs you applied in your application list?',
    body:
      'Please note that we are unable to track materials submitted for jobs you apply to via an employer\u2019s site. As a result, these applications are not recorded in the My Applications section of your JobHuntly account. We suggest keeping a personal record of all positions you have applied to externally.',
  },
];

export default function HelpCenter() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Getting Started');
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState({});

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFeedback = (index, value) => {
    setFeedback((prev) => ({ ...prev, [index]: value }));
  };

  const displayName = user?.name || 'Jake Gyll';
  const displayEmail = user?.email || 'jakegyll@email.com';
  const displayAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80';

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'applications', label: 'My Applications', icon: FileText, href: '/applications' },
    { key: 'find-jobs', label: 'Find Jobs', icon: Search, href: '/jobs' },
    { key: 'browse-companies', label: 'Browse Companies', icon: Building, href: '/companies' },
    { key: 'profile', label: 'My Public Profile', icon: User, href: '/profile' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <Link to="/" className="sidebar-logo">
          <span className="sidebar-logo-dot" />
          JobHuntly
        </Link>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.key} to={item.href} className="sidebar-item">
                <div className="sidebar-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </Link>
            );
          })}

          <div className="sidebar-section-title">Settings</div>

          {settingItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.href}
                className={`sidebar-item ${item.key === 'help' ? 'sidebar-item--active' : ''}`}
              >
                <div className="sidebar-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Profile Card */}
        <div className="sidebar-profile">
          <img src={displayAvatar} alt={displayName} className="sidebar-profile-avatar" />
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{displayName}</span>
            <span className="sidebar-profile-email" title={displayEmail}>
              {displayEmail}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <h1>Help Center</h1>
          </div>
          <div className="dashboard-header-right">
            <Link to="/" className="btn-back-home">
              Back to homepage
            </Link>
            <NotificationPanel />
          </div>
        </header>

        <div className="help-layout">
          {/* Left column: search + categories */}
          <div className="help-sidebar-col">
            <label className="help-search-label">Type your question or search keyword</label>
            <div className="help-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <nav className="help-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`help-category-item ${activeCategory === cat ? 'help-category-item--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="help-promo-card">
              <div className="help-promo-icon">
                <MessageCircle size={20} />
              </div>
              <h4>Didn't find what you were looking for?</h4>
              <p>Contact our customer service</p>
              <button className="btn-contact-us">Contact Us</button>
            </div>
          </div>

          {/* Right column: articles */}
          <div className="help-articles-col">
            <div className="help-articles-header">
              <span>
                Sort by: <strong>Most relevant</strong>
              </span>
              <ChevronDown size={16} />
            </div>

            <div className="help-articles-list">
              {ARTICLES.map((article, i) => (
                <div className="help-article-card" key={i}>
                  <div className="help-article-top">
                    <h3>{article.title}</h3>
                    <button className="btn-row-action">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  <p>{article.body}</p>
                  <div className="help-article-footer">
                    <span>Was this article helpful?</span>
                    <div className="help-feedback-buttons">
                      <button
                        className={`btn-feedback ${feedback[i] === 'yes' ? 'btn-feedback--active' : ''}`}
                        onClick={() => handleFeedback(i, 'yes')}
                      >
                        <ThumbsUp size={14} /> Yes
                      </button>
                      <button
                        className={`btn-feedback ${feedback[i] === 'no' ? 'btn-feedback--active' : ''}`}
                        onClick={() => handleFeedback(i, 'no')}
                      >
                        <ThumbsDown size={14} /> No
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}