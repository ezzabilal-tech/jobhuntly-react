import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
  Building,
  User,
  Settings,
  HelpCircle,
  X,
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  SiNomad,
  SiUdacity,
  SiPacker,
  SiDigitalocean,
  SiMaze,
  SiStripe
} from 'react-icons/si';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './MyApplications.css';

const renderCompanyLogo = (company, color) => {
  const style = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0,
  };
  
  if (company === 'Nomad') {
    return (
      <div style={{ ...style, backgroundColor: '#E4F8F2' }}>
        <SiNomad size={24} color="#56CDAD" />
      </div>
    );
  }
  if (company === 'Udacity') {
    return (
      <div style={{ ...style, backgroundColor: '#EAF6FE' }}>
        <SiUdacity size={24} color="#00A3E0" />
      </div>
    );
  }
  if (company === 'Packer') {
    return (
      <div style={{ ...style, backgroundColor: '#FFEBEA' }}>
        <SiPacker size={24} color="#FF6550" />
      </div>
    );
  }
  if (company === 'Divvy') {
    return (
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg viewBox="0 0 100 100" width="22" height="22" fill="#ffffff">
          <circle cx="35" cy="50" r="16" />
          <circle cx="65" cy="50" r="16" />
        </svg>
      </div>
    );
  }
  if (company === 'DigitalOcean') {
    return (
      <div style={{ ...style, backgroundColor: '#E5F2FF' }}>
        <SiDigitalocean size={24} color="#0080FF" />
      </div>
    );
  }
  if (company === 'Maze') {
    return (
      <div style={{ ...style, backgroundColor: '#F0EFFF' }}>
        <SiMaze size={24} color="#26A4FF" />
      </div>
    );
  }
  if (company === 'Stripe') {
    return (
      <div style={{ ...style, backgroundColor: '#F1F0FF' }}>
        <SiStripe size={24} color="#635BFF" />
      </div>
    );
  }
  if (company === 'Slack') {
    return (
      <div style={{ ...style, backgroundColor: '#FFF0FF' }}>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="#e01e5a" d="M6 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-3a1.5 1.5 0 0 1 0 3H3v-3h3zm8.5-5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-3 0a1.5 1.5 0 0 1 3 0v3h-3v-3z" />
          <path fill="#36c5f0" d="M18 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm0 3a1.5 1.5 0 0 1 0-3h3v3h-3zm-8.5 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3 0a1.5 1.5 0 0 1-3 0v-3h3v3z" />
          <path fill="#2eb67d" d="M9.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 3a1.5 1.5 0 0 1 0-3h3v3h-3zm5.5 8.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm0-3a1.5 1.5 0 0 1 0 3h-3v-3h3z" />
          <path fill="#ecb22e" d="M14.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-3a1.5 1.5 0 0 1 0 3v-3h-3v-3h3z" />
        </svg>
      </div>
    );
  }
  
  return (
    <div style={style}>
      {company[0]}
    </div>
  );
};

export default function MyApplications() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fallback defaults
  const displayName = user?.name || 'Jake Gyll';
  const displayEmail = user?.email || 'jakegyll@email.com';
  const displayAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  // State
  const [activeMenu, setActiveMenu] = useState('applications');
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Static applications list matching Figma screenshot + adding some mocks to cover all tabs
  const applications = [
    {
      id: 1,
      company: 'Nomad',
      logoColor: '#56CDAD',
      role: 'Social Media Assistant',
      dateApplied: '24 July 2021',
      status: 'In Review',
      statusClass: 'status-pill--review',
    },
    {
      id: 2,
      company: 'Udacity',
      logoColor: '#02BD9B',
      role: 'Social Media Assistant',
      dateApplied: '20 July 2021',
      status: 'Shortlisted',
      statusClass: 'status-pill--shortlisted',
    },
    {
      id: 3,
      company: 'Packer',
      logoColor: '#FF6550',
      role: 'Social Media Assistant',
      dateApplied: '16 July 2021',
      status: 'Offered',
      statusClass: 'status-pill--offered',
    },
    {
      id: 4,
      company: 'Divvy',
      logoColor: '#111827',
      role: 'Social Media Assistant',
      dateApplied: '14 July 2021',
      status: 'Interviewing',
      statusClass: 'status-pill--interviewing',
    },
    {
      id: 5,
      company: 'DigitalOcean',
      logoColor: '#0080FF',
      role: 'Social Media Assistant',
      dateApplied: '10 July 2021',
      status: 'Unsuitable',
      statusClass: 'status-pill--unsuitable',
    },
    {
      id: 6,
      company: 'Maze',
      logoColor: '#26A4FF',
      role: 'Social Media Assistant',
      dateApplied: '8 July 2021',
      status: 'Assessment',
      statusClass: 'status-pill--assessment',
    },
    {
      id: 7,
      company: 'Stripe',
      logoColor: '#635BFF',
      role: 'Social Media Assistant',
      dateApplied: '1 July 2021',
      status: 'Hired',
      statusClass: 'status-pill--hired',
    },
    {
      id: 8,
      company: 'Slack',
      logoColor: '#4A154B',
      role: 'Social Media Assistant',
      dateApplied: '2 July 2021',
      status: 'Interviewing',
      statusClass: 'status-pill--interviewing',
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'applications', label: 'My Applications', icon: FileText, href: '/applications' },
    { key: 'find-jobs', label: 'Find Jobs', icon: Search, href: '/jobs' },
    { key: 'browse-companies', label: 'Browse Companies', icon: Building, href: '/companies' },
    { key: 'profile', label: 'My Public Profile', icon: User, href: '#' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '#' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '#' },
  ];

  // Tabs structure matching screenshot values
  const tabs = [
    { key: 'All', label: 'All', count: 45 },
    { key: 'In Review', label: 'In Review', count: 34 },
    { key: 'Interviewing', label: 'Interviewing', count: 18 },
    { key: 'Assessment', label: 'Assessment', count: 5 },
    { key: 'Offered', label: 'Offered', count: 2 },
    { key: 'Hired', label: 'Hired', count: 1 },
  ];

  // Filtering Logic
  const filteredApplications = applications.filter((app) => {
    // 1. Filter by search input (company name or role title)
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Filter by tab selection
    if (activeTab === 'All') return true;
    if (activeTab === 'In Review') return app.status === 'In Review' || app.status === 'Shortlisted';
    return app.status === activeTab;
  });

  return (
    <div className="applications-page">
      {/* Sidebar Navigation */}
      <aside className="applications-sidebar">
        <Link to="/" className="sidebar-logo">
          <span className="sidebar-logo-dot" />
          JobHuntly
        </Link>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === 'applications';
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
                className={`sidebar-item ${isActive ? 'sidebar-item--active' : ''}`}
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

      {/* Main content pane */}
      <main className="applications-main">
        {/* Header */}
        <header className="applications-header">
          <h1>My Applications</h1>
          <div className="applications-header-right">
            <Link to="/" className="btn-back-home">
              Back to homepage
            </Link>
            <NotificationPanel />
          </div>
        </header>

        {/* Greeting Banner area */}
        <div className="applications-greeting-row">
          <div className="applications-greeting">
            <h2>Keep it up, {displayName.split(' ')[0]}</h2>
            <p>Here is job applications status from July 19 - July 25.</p>
          </div>
          <button className="applications-datepicker">
            <Calendar size={18} />
            <span>Jul 19 - Jul 25</span>
          </button>
        </div>

        {/* New Feature Banner */}
        {showBanner && (
          <div className="promo-banner">
            <div className="promo-banner-left">
              <div className="promo-banner-icon">
                <Sparkles size={20} color="#4640de" />
              </div>
              <div className="promo-banner-content">
                <h4>New Feature</h4>
                <p>
                  You can request a follow-up 7 days after applying for a job if the application status is in review.
                  <br />
                  Only one follow-up is allowed per job.
                </p>
              </div>
            </div>
            <button className="btn-banner-close" onClick={() => setShowBanner(false)}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`filter-tab ${activeTab === tab.key ? 'filter-tab--active' : ''}`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Table Card container */}
        <div className="table-card">
          <div className="table-card-header">
            <h3>Applications History</h3>
            <div className="table-actions">
              <div className="table-search-box">
                <Search size={16} color="#7c8493" />
                <input
                  type="text"
                  placeholder="Search"
                  className="table-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn-filter-toggle">
                <SlidersHorizontal size={14} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Table list */}
          <table className="applications-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Roles</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, index) => (
                <tr key={app.id}>
                  <td className="col-num">{index + 1}</td>
                  <td>
                    <div className="col-company-info">
                      {renderCompanyLogo(app.company, app.logoColor)}
                      <span className="col-company-name">{app.company}</span>
                    </div>
                  </td>
                  <td className="col-role">{app.role}</td>
                  <td className="col-date">{app.dateApplied}</td>
                  <td>
                    <span className={`status-pill ${app.statusClass}`}>{app.status}</span>
                  </td>
                  <td>
                    <button className="btn-table-action">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#7c8493' }}>
                    No applications found in this category
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Table Pagination */}
          <div className="pagination-container">
            <button className="pagination-btn"><ChevronLeft size={16} /></button>
            <button className="pagination-btn pagination-btn--active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">4</button>
            <button className="pagination-btn">5</button>
            <span className="pagination-ellipsis">...</span>
            <button className="pagination-btn">33</button>
            <button className="pagination-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </main>
    </div>
  );
}