import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Building,
  Users,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './Dashboard.css';
import './EmployerDashboard.css';

export default function EmployerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('week');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Default values based on Figma screenshot if user details are empty
  const displayName = user?.name || 'Maria Kelly';
  const displayEmail = user?.email || 'mariakelly@email.com';
  const displayAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'company-profile', label: 'Company Profile', icon: Building, href: '/profile' },
    { key: 'all-applicants', label: 'All Applicants', icon: Users, href: '#' },
    { key: 'job-listing', label: 'Job Listing', icon: FileText, href: '#' },
    { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '#' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  const barData = [
    { label: 'Mon', applied: 30, new: 20 },
    { label: 'Tue', applied: 15, new: 40 },
    { label: 'Wed', applied: 50, new: 30 }, // Wednesday is tallest
    { label: 'Thu', applied: 30, new: 50 },
    { label: 'Fri', applied: 40, new: 25 },
    { label: 'Sat', applied: 15, new: 10 },
    { label: 'Sun', applied: 20, new: 15 },
  ];

  const jobUpdates = [
    {
      companyName: 'Nomad',
      companyLocation: 'Paris, France',
      jobTitle: 'Social Media Assistant',
      jobType: 'Full-Time',
      capacity: 10,
      applied: 1,
      color: '#56CDAD',
      initial: 'N',
      tags: ['Marketing', 'Design'],
    },
    {
      companyName: 'Dropbox',
      companyLocation: 'San Francisco, USA',
      jobTitle: 'Brand Designer',
      jobType: 'Full-Time',
      capacity: 10,
      applied: 5,
      color: '#0061FF',
      initial: 'D',
      tags: ['Business', 'Design'],
    },
    {
      companyName: 'Terraform',
      companyLocation: 'Berlin, Germany',
      jobTitle: 'Interactive Developer',
      jobType: 'Full-Time',
      capacity: 10,
      applied: 3,
      color: '#5C4EE5',
      initial: 'T',
      tags: ['Marketing', 'Design'],
    },
    {
      companyName: 'ClassPass',
      companyLocation: 'Berlin, Germany',
      jobTitle: 'Product Designer',
      jobType: 'Full-Time',
      capacity: 10,
      applied: 5,
      color: '#E03C96',
      initial: 'C',
      tags: ['Business', 'Design'],
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
        <div className="sidebar-profile" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Click to Logout">
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
            <div className="company-selector-dropdown">
              <div className="company-dropdown-logo">N</div>
              <div className="company-dropdown-info">
                <span className="company-dropdown-sub">Company</span>
                <span className="company-dropdown-name">
                  Nomad <ChevronDown size={14} />
                </span>
              </div>
            </div>
          </div>
          <div className="dashboard-header-right">
            <button className="btn-post-job-header" onClick={(e) => e.preventDefault()}>
              <Plus size={16} />
              Post a job
            </button>
            <NotificationPanel />
          </div>
        </header>

        {/* Greeting Section */}
        <div className="dashboard-greeting-row">
          <div className="dashboard-greeting">
            <h2>Good morning, {displayName.split(' ')[0]}</h2>
            <p>Here is your job listings statistic report from July 19 - July 25.</p>
          </div>
          <button className="dashboard-datepicker">
            <Calendar size={18} />
            <span>Jul 19 - Jul 25</span>
          </button>
        </div>

        {/* Stat Banners Row */}
        <div className="employer-banners-row">
          <a href="#" className="banner-card banner-card--purple" onClick={(e) => e.preventDefault()}>
            <div className="banner-card-content">
              <span className="banner-card-value">76</span>
              <span className="banner-card-text">New candidates to review</span>
            </div>
            <ArrowRight size={18} />
          </a>
          <a href="#" className="banner-card banner-card--green" onClick={(e) => e.preventDefault()}>
            <div className="banner-card-content">
              <span className="banner-card-value">3</span>
              <span className="banner-card-text">Schedule for today</span>
            </div>
            <ArrowRight size={18} />
          </a>
          <a href="#" className="banner-card banner-card--blue" onClick={(e) => e.preventDefault()}>
            <div className="banner-card-content">
              <span className="banner-card-value">24</span>
              <span className="banner-card-text">Messages received</span>
            </div>
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Stats Grid */}
        <div className="employer-content-grid">
          {/* Left Chart Card */}
          <div className="employer-card">
            <div className="employer-card-header">
              <div className="employer-card-title-area">
                <h3>Job statistics</h3>
                <p>Showing jobstatestic Jul 19-25</p>
              </div>
              <div className="employer-card-filters">
                <button
                  className={`employer-card-filter-btn ${activeFilter === 'week' ? 'employer-card-filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter('week')}
                >
                  Week
                </button>
                <button
                  className={`employer-card-filter-btn ${activeFilter === 'month' ? 'employer-card-filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter('month')}
                >
                  Month
                </button>
                <button
                  className={`employer-card-filter-btn ${activeFilter === 'year' ? 'employer-card-filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter('year')}
                >
                  Year
                </button>
              </div>
            </div>

            <div className="employer-card-tabs">
              <button
                className={`employer-card-tab ${activeTab === 'overview' ? 'employer-card-tab--active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`employer-card-tab ${activeTab === 'views' ? 'employer-card-tab--active' : ''}`}
                onClick={() => setActiveTab('views')}
              >
                Jobs View
              </button>
              <button
                className={`employer-card-tab ${activeTab === 'applied' ? 'employer-card-tab--active' : ''}`}
                onClick={() => setActiveTab('applied')}
              >
                Jobs Applied
              </button>
            </div>

            <div className="chart-section">
              {/* Stacked Bar Chart in CSS */}
              <div className="css-bar-chart">
                {barData.map((d) => (
                  <div key={d.label} className="css-bar-col">
                    <div className="css-bar-container">
                      <div className="css-bar-fill new" style={{ height: `${d.new}%` }} title={`New: ${d.new}`} />
                      <div className="css-bar-fill applied" style={{ height: `${d.applied}%` }} title={`Applied: ${d.applied}`} />
                    </div>
                    <span className="css-bar-label">{d.label}</span>
                  </div>
                ))}
              </div>

              {/* Statistics Details on Right */}
              <div className="chart-right-stats">
                <div className="chart-metric-item">
                  <span className="chart-metric-label">Job Views</span>
                  <div className="chart-metric-val-row">
                    <span className="chart-metric-value">2,342</span>
                    <span className="chart-metric-change up">
                      8.8% <ArrowUpRight size={14} />
                    </span>
                  </div>
                  <span className="chart-metric-label" style={{ fontSize: '10px' }}>This Week</span>
                </div>
                <div className="chart-metric-item">
                  <span className="chart-metric-label">Job Applied</span>
                  <div className="chart-metric-val-row">
                    <span className="chart-metric-value">654</span>
                    <span className="chart-metric-change down">
                      0.5% <ArrowDownRight size={14} />
                    </span>
                  </div>
                  <span className="chart-metric-label" style={{ fontSize: '10px' }}>This Week</span>
                </div>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="chart-legend">
              <div className="chart-legend-item">
                <span className="chart-legend-color new" />
                <span>Job New</span>
              </div>
              <div className="chart-legend-item">
                <span className="chart-legend-color applied" />
                <span>Job Applied</span>
              </div>
            </div>
          </div>

          {/* Right Column Cards */}
          <div className="right-column-cards">
            {/* Job Open Card */}
            <div className="job-open-card">
              <h3>Job Open</h3>
              <div className="stat-value-large">12</div>
              <div className="stat-label-sub">Jobs Opened</div>
            </div>

            {/* Applicants Summary Card */}
            <div className="applicants-summary-card">
              <h3>Applicants Summary</h3>
              <div className="stat-value-large">67</div>
              <div className="stat-label-sub">Applicants</div>

              {/* Segmented Progress Bar */}
              <div className="applicants-progress-bar">
                <div className="progress-segment full-time" style={{ width: '34%' }} title="Full Time: 45" />
                <div className="progress-segment part-time" style={{ width: '18%' }} title="Part Time: 24" />
                <div className="progress-segment remote" style={{ width: '17%' }} title="Remote: 22" />
                <div className="progress-segment internship" style={{ width: '24%' }} title="Internship: 32" />
                <div className="progress-segment contract" style={{ width: '7%' }} title="Contract: 10" />
              </div>

              {/* Legend with explicit counts */}
              <div className="applicants-legend">
                <div className="legend-dot-item">
                  <div className="legend-dot-left">
                    <span className="legend-dot full-time" />
                    <span>Full-Time</span>
                  </div>
                  <strong>45</strong>
                </div>
                <div className="legend-dot-item">
                  <div className="legend-dot-left">
                    <span className="legend-dot part-time" />
                    <span>Part-Time</span>
                  </div>
                  <strong>24</strong>
                </div>
                <div className="legend-dot-item">
                  <div className="legend-dot-left">
                    <span className="legend-dot remote" />
                    <span>Remote</span>
                  </div>
                  <strong>22</strong>
                </div>
                <div className="legend-dot-item">
                  <div className="legend-dot-left">
                    <span className="legend-dot internship" />
                    <span>Internship</span>
                  </div>
                  <strong>32</strong>
                </div>
                <div className="legend-dot-item">
                  <div className="legend-dot-left">
                    <span className="legend-dot contract" />
                    <span>Contract</span>
                  </div>
                  <strong>10</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Updates Section */}
        <section className="job-updates-section">
          <div className="job-updates-section-header">
            <h3>Job Updates</h3>
            <a href="#" className="link-view-all" onClick={(e) => e.preventDefault()}>
              View All <ArrowRight size={14} />
            </a>
          </div>

          <div className="job-updates-grid">
            {jobUpdates.map((job, idx) => (
              <div key={idx} className="job-update-card">
                <div className="job-update-card-top">
                  <div className="job-update-logo" style={{ backgroundColor: job.color }}>
                    {job.initial}
                  </div>
                  <span className="status-pill status-pill--shortlisted" style={{ fontSize: '10px', padding: '4px 8px' }}>
                    {job.jobType}
                  </span>
                </div>

                <div>
                  <h4>{job.jobTitle}</h4>
                  <p className="job-update-card-info">
                    {job.companyName} &middot; {job.companyLocation}
                  </p>
                </div>

                <div className="job-update-tags">
                  {job.tags.map((t) => (
                    <span key={t} className="pill pill-orange" style={{ fontSize: '10px', padding: '4px 8px' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="job-update-footer">
                  <div className="job-capacity-row">
                    <span><strong>{job.applied}</strong> applied</span>
                    <span>of {job.capacity} capacity</span>
                  </div>
                  <div className="job-capacity-bar">
                    <div
                      className="job-capacity-fill"
                      style={{ width: `${(job.applied / job.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}