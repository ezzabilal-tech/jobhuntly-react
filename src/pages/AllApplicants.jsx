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
  Plus,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Star,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import { applicants, stageStyles } from '../data/applicants';
import './Dashboard.css';
import './EmployerDashboard.css';
import './AllApplicants.css';

export default function AllApplicants() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'pipeline' | 'table'

  const displayName = user?.name || 'Maria Kelly';
  const displayEmail = user?.email || 'mariakelly@email.com';
  const displayAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'company-profile', label: 'Company Profile', icon: Building, href: '/employer/company-profile' },
    { key: 'all-applicants', label: 'All Applicants', icon: Users, href: '/employer/applicants' },
    { key: 'job-listing', label: 'Job Listing', icon: FileText, href: '/employer/job-listing' },
    { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '#' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  const filteredApplicants = applicants.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
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
                className={`sidebar-item ${item.key === 'all-applicants' ? 'sidebar-item--active' : ''}`}
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
              <Link key={item.key} to={item.href} className="sidebar-item">
                <div className="sidebar-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-profile" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Click to Logout">
          <img src={displayAvatar} alt={displayName} className="sidebar-profile-avatar" />
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{displayName}</span>
            <span className="sidebar-profile-email" title={displayEmail}>{displayEmail}</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
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

        <div className="aa-scroll">
          <div className="aa-top-row">
            <h1 className="aa-title">Total Applicants: {applicants.length}</h1>

            <div className="aa-controls">
              <div className="aa-search">
                <Search size={16} className="aa-search-icon" />
                <input
                  type="text"
                  placeholder="Search Applicants"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="aa-filter-btn">
                <SlidersHorizontal size={16} /> Filter
              </button>
              <div className="aa-view-toggle">
                <button
                  className={`aa-view-btn ${viewMode === 'pipeline' ? 'aa-view-btn--active' : ''}`}
                  onClick={() => setViewMode('pipeline')}
                >
                  Pipeline
                </button>
                <button
                  className={`aa-view-btn ${viewMode === 'table' ? 'aa-view-btn--active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          <div className="aa-table-card">
            <table className="aa-table">
              <thead>
                <tr>
                  <th className="aa-th-checkbox">
                    <input type="checkbox" />
                  </th>
                  <th>Full Name <ChevronDown size={12} /></th>
                  <th>Score <ChevronDown size={12} /></th>
                  <th>Hiring Stage <ChevronDown size={12} /></th>
                  <th>Applied Date <ChevronDown size={12} /></th>
                  <th>Job Role <ChevronDown size={12} /></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="aa-name-cell">
                        <img src={a.avatar} alt={a.name} className="aa-avatar" />
                        <span>{a.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="aa-score">
                        <Star size={14} className="aa-score-star" />
                        {a.rating.toFixed(1)}
                      </div>
                    </td>
                    <td>
                      <span className={`aa-stage ${stageStyles[a.stage] || ''}`}>{a.stage}</span>
                    </td>
                    <td className="aa-muted">{a.appliedDate}</td>
                    <td className="aa-muted">{a.jobRole}</td>
                    <td>
                      <div className="aa-action-cell">
                        <button className="aa-see-app-btn" onClick={() => navigate(`/employer/applicants/${a.id}`)}>
                          See Application
                        </button>
                        <button className="aa-more-btn">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApplicants.length === 0 && (
                  <tr>
                    <td colSpan={7} className="aa-empty">No applicants found</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="aa-pagination">
              <div className="aa-pagination-left">
                <span>View</span>
                <select defaultValue="10">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span>Applicants per page</span>
              </div>
              <div className="aa-pagination-right">
                <button className="aa-page-arrow"><ChevronLeft size={16} /></button>
                <button className="aa-page-num aa-page-num--active">1</button>
                <button className="aa-page-num">2</button>
                <button className="aa-page-num">3</button>
                <button className="aa-page-arrow"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}