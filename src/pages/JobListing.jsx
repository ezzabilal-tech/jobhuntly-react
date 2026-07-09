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
  MoreVertical,
  Filter,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import { jobs } from '../data/jobs';
import './Dashboard.css';
import './EmployerDashboard.css';
import './JobListing.css';

export default function JobListing() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu] = useState('job-listing');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user?.name || 'Maria Kelly';
  const displayEmail = user?.email || 'mariakelly@email.com';
  const displayAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

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

  const totalPages = Math.max(1, Math.ceil(jobs.length / perPage));
  const paginatedJobs = jobs.slice((currentPage - 1) * perPage, currentPage * perPage);

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

      {/* Main Content */}
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

        <h1 className="jl-page-title">Job Listing</h1>

        {/* Job List Card */}
        <div className="jl-card">
          <div className="jl-card-header">
            <div>
              <h3>Job List</h3>
              <p>Here is your job listing status from July 19 - July 25</p>
            </div>
            <div className="jl-card-header-right">
              <button className="jl-date-btn">
                <Calendar size={16} />
                <span>Jul 19 - Jul 25</span>
              </button>
              <button className="jl-filter-btn">
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="jl-table-wrapper">
            <table className="jl-table">
              <thead>
                <tr>
                  <th>Roles</th>
                  <th>Status</th>
                  <th>Date Posted</th>
                  <th>Due Date</th>
                  <th>Job Type</th>
                  <th>Applicants</th>
                  <th>Needs</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="jl-row-clickable"
                    onClick={() => navigate(`/employer/job-listing/${job.id}/applicants`)}
                  >
                    <td className="jl-role-cell">{job.role}</td>
                    <td>
                      <span
                        className={`jl-status-pill ${
                          job.status === 'Live' ? 'jl-status-pill--live' : 'jl-status-pill--closed'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>{job.datePosted}</td>
                    <td>{job.dueDate}</td>
                    <td>
                      <span
                        className={`jl-jobtype-pill ${
                          job.jobType === 'Freelance' ? 'jl-jobtype-pill--freelance' : 'jl-jobtype-pill--fulltime'
                        }`}
                      >
                        {job.jobType}
                      </span>
                    </td>
                    <td>
                      <div className="jl-avatar-stack">
                        {[...Array(Math.min(3, job.needs))].map((_, i) => (
                          <img
                            key={i}
                            className="jl-avatar-stack-img"
                            src={`https://i.pravatar.cc/40?img=${(job.id * 3 + i) % 70}`}
                            alt="applicant"
                          />
                        ))}
                        <span className="jl-avatar-stack-count">{job.applicants}/{job.needs}</span>
                      </div>
                    </td>
                    <td className="jl-needs-cell">{job.needs}</td>
                    <td>
                      <button
                        className="jl-row-menu-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / pagination */}
          <div className="jl-table-footer">
            <div className="jl-per-page">
              <span>Show</span>
              <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>Applicants per page</span>
            </div>

            <div className="jl-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? 'jl-page-btn--active' : ''}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}