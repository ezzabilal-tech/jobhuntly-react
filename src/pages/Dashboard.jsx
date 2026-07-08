import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Calendar,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
  Building,
  User,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Default values based on Figma screenshot if user details are empty
  const displayName = user?.name || 'Jake Gyll';
  const displayEmail = user?.email || 'jakegyll@email.com';
  const displayAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'applications', label: 'My Applications', icon: FileText, href: '/applications' },
    { key: 'find-jobs', label: 'Find Jobs', icon: Search, href: '/jobs' },
    { key: 'browse-companies', label: 'Browse Companies', icon: Building, href: '/companies' },
    { key: 'profile', label: 'My Public Profile', icon: User, href: '/profile' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '#' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '#' },
  ];

  const recentApplications = [
    {
      company: 'Nomad',
      location: 'Paris, France',
      jobTitle: 'Social Media Assistant',
      jobType: 'Full-Time',
      dateApplied: '26 July 2021',
      status: 'In Review',
      statusClass: 'status-pill--review',
      color: '#56CDAD',
      initial: 'N',
    },
    {
      company: 'Udacity',
      location: 'New York, USA',
      jobTitle: 'Social Media Assistant',
      jobType: 'Full-Time',
      dateApplied: '23 July 2021',
      status: 'Shortlisted',
      statusClass: 'status-pill--shortlisted',
      color: '#02BD9B',
      initial: 'U',
    },
    {
      company: 'Packer',
      location: 'Madrid, Spain',
      jobTitle: 'Social Media Assistant',
      jobType: 'Full-Time',
      dateApplied: '20 July 2021',
      status: 'Declined',
      statusClass: 'status-pill--declined',
      color: '#FF6550',
      initial: 'P',
    },
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
              <Link
                key={item.key}
                to={item.href}
                onClick={(e) => {
                  if (item.href === '#') {
                    e.preventDefault();
                    setActiveMenu(item.key);
                  }
                }}
                className={`sidebar-item ${activeMenu === item.key ? 'sidebar-item--active' : ''}`}
              >
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
                onClick={(e) => {
                  if (item.href === '#') {
                    e.preventDefault();
                    setActiveMenu(item.key);
                  }
                }}
                className={`sidebar-item ${activeMenu === item.key ? 'sidebar-item--active' : ''}`}
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
            <span className="sidebar-profile-email" title={displayEmail}>{displayEmail}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Dashboard */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <h1>Dashboard</h1>
          </div>
          <div className="dashboard-header-right">
            <Link to="/" className="btn-back-home">
              Back to homepage
            </Link>
            <button className="btn-notification">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Greeting Section */}
        <div className="dashboard-greeting-row">
          <div className="dashboard-greeting">
            <h2>Good morning, {displayName.split(' ')[0]}</h2>
            <p>Here is what's happening with your job search applications from July 19 - July 25.</p>
          </div>
          <button className="dashboard-datepicker">
            <Calendar size={18} />
            <span>July 19 - July 25</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-grid">
          {/* Metrics Card */}
          <div className="dashboard-left-metrics">
            <div className="metric-card">
              <p className="metric-title">Total Jobs Applied</p>
              <p className="metric-value">45</p>
              <div className="metric-icon-wrapper">
                <FileText size={40} strokeWidth={1} />
              </div>
            </div>
            <div className="metric-card">
              <p className="metric-title">Interviewed</p>
              <p className="metric-value">18</p>
              <div className="metric-icon-wrapper">
                <MessageSquare size={40} strokeWidth={1} />
              </div>
            </div>
          </div>

          {/* Donut Chart Card */}
          <div className="status-card">
            <h3 className="status-card-header">Jobs Applied Status</h3>
            <div className="status-card-content">
              <div className="donut-chart-container">
                <svg className="donut-chart" width="100" height="100">
                  <circle className="donut-circle-bg" cx="50" cy="50" r="40" />
                  <circle className="donut-circle-val" cx="50" cy="50" r="40" />
                </svg>
                <span className="donut-center-text">60%</span>
              </div>
              <div className="status-legend">
                <div className="legend-item">
                  <span className="legend-color legend-color--unsuitable" />
                  <span><strong>60%</strong> Unsuitable</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color legend-color--interviewed" />
                  <span><strong>40%</strong> Interviewed</span>
                </div>
              </div>
            </div>
            <a href="#" className="card-footer-link" onClick={(e) => e.preventDefault()}>
              View All Applications <ArrowRight size={14} />
            </a>
          </div>

          {/* Upcoming Interviews Card */}
          <div className="interviews-card">
            <div className="interviews-card-header">
              <h3>Upcoming Interviews</h3>
              <div className="interviews-datepicker">
                <span>Today, 26 November</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="interviews-nav-btn"><ChevronLeft size={14} /></button>
                  <button className="interviews-nav-btn"><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
            <div className="timeline-container">
              <div className="timeline-slot">
                <div className="timeline-time">10:00 AM</div>
                <div className="timeline-line" />
              </div>
              <div className="timeline-slot">
                <div className="timeline-time">10:30 AM</div>
                <div className="interview-slot-card">
                  <div className="interview-card-left">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Joe Barmann"
                      className="interview-avatar"
                    />
                    <div className="interview-details">
                      <h4>Joe Barmann</h4>
                      <p>HR Manager at Divvy</p>
                    </div>
                  </div>
                  <button className="btn-row-action" onClick={(e) => e.preventDefault()}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              <div className="timeline-slot">
                <div className="timeline-time">11:00 AM</div>
                <div className="timeline-line" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications Section */}
        <section className="applications-section">
          <div className="applications-section-header">
            <h3>Recent Applications History</h3>
          </div>

          <div className="applications-list">
            {recentApplications.map((app, i) => (
              <div key={i} className="application-row">
                <div className="app-company-info">
                  <div className="app-company-logo" style={{ backgroundColor: app.color }}>
                    {app.initial}
                  </div>
                  <div className="app-job-details">
                    <h4>{app.jobTitle}</h4>
                    <p>{app.company} &middot; {app.location} &middot; {app.jobType}</p>
                  </div>
                </div>

                <div className="app-date-info">
                  <span className="app-date-label">Date Applied</span>
                  <span className="app-date-val">{app.dateApplied}</span>
                </div>

                <div className="app-status">
                  <span className={`status-pill ${app.statusClass}`}>{app.status}</span>
                </div>

                <div>
                  <button className="btn-row-action">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="applications-footer">
            <a href="#" className="card-footer-link" onClick={(e) => e.preventDefault()}>
              View all applications history <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}