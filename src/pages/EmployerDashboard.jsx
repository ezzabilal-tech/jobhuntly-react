import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  Users,
  Briefcase,
  Calendar,
  Settings,
  HelpCircle,
  Plus,
  ChevronDown,
  Bell,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './EmployerDashboard.css';

const WEEK_DATA = [
  { day: 'Mon', jobView: 45, jobApplied: 28 },
  { day: 'Tue', jobView: 62, jobApplied: 34 },
  { day: 'Wed', jobView: 38, jobApplied: 20 },
  { day: 'Thu', jobView: 70, jobApplied: 42 },
  { day: 'Fri', jobView: 55, jobApplied: 30 },
  { day: 'Sat', jobView: 33, jobApplied: 18 },
  { day: 'Sun', jobView: 20, jobApplied: 10 },
];

const APPLICANT_SUMMARY = [
  { label: 'Full Time', value: 45, color: '#4640DE' },
  { label: 'Part-Time', value: 24, color: '#56CDAD' },
  { label: 'Remote', value: 22, color: '#FF6550' },
  { label: 'Internship', value: 32, color: '#FFB836' },
  { label: 'Contract', value: 27, color: '#26A4FF' },
];

const JOB_UPDATES = [
  {
    title: 'Social Media Assistant',
    type: 'Full-Time',
    typeClass: 'pill-green',
    tag: 'Marketing',
    tagClass: 'pill-orange',
    icon: '🟩',
    color: '#56CDAD',
    location: 'Paris, France',
    applied: 5,
    capacity: 10,
  },
  {
    title: 'Brand Designer',
    type: 'Full-Time',
    typeClass: 'pill-green',
    tag: 'Design',
    tagClass: 'pill-blue',
    icon: '🟦',
    color: '#4640DE',
    location: 'Paris, France',
    applied: 5,
    capacity: 10,
  },
  {
    title: 'Interactive Developer',
    type: 'Full-Time',
    typeClass: 'pill-green',
    tag: 'Marketing',
    tagClass: 'pill-orange',
    icon: '🟪',
    color: '#26A4FF',
    location: 'Berlin, Germany',
    applied: 5,
    capacity: 10,
  },
  {
    title: 'Product Designer',
    type: 'Full-Time',
    typeClass: 'pill-green',
    tag: 'Design',
    tagClass: 'pill-blue',
    icon: '🟨',
    color: '#FF6550',
    location: 'Madrid, Spain',
    applied: 5,
    capacity: 10,
  },
];

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [chartRange, setChartRange] = useState('week');

  const displayName = user?.name || 'Maria Kelly';
  const displayEmail = user?.email || 'maria@email.com';
  const displayAvatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4640DE&color=fff&size=128&bold=true`;

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'company-profile', label: 'Company Profile', icon: Building2, href: '/companies/1' },
    { key: 'all-applicants', label: 'All Applicants', icon: Users, href: '#' },
    { key: 'job-listing', label: 'Job Listing', icon: Briefcase, href: '#' },
    { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '#' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  const maxViewValue = Math.max(...WEEK_DATA.map((d) => d.jobView));
  const totalApplicants = APPLICANT_SUMMARY.reduce((sum, s) => sum + s.value, 0);

  // Build conic-gradient stops for the donut chart
  let cumulative = 0;
  const gradientStops = APPLICANT_SUMMARY.map((s) => {
    const start = (cumulative / totalApplicants) * 360;
    cumulative += s.value;
    const end = (cumulative / totalApplicants) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(', ');

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
                className={`sidebar-item ${item.key === 'dashboard' ? 'sidebar-item--active' : ''}`}
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
      <main className="dashboard-main employer-main">
        {/* Header */}
        <header className="employer-header">
          <div className="employer-company-select">
            <div className="employer-company-logo">N</div>
            <div>
              <span className="employer-company-label">Company</span>
              <span className="employer-company-name">
                Nomad <ChevronDown size={14} />
              </span>
            </div>
          </div>
          <div className="employer-header-right">
            <button className="btn-post-job">
              <Plus size={16} /> Post a job
            </button>
            <NotificationPanel />
          </div>
        </header>

        <h1 className="employer-greeting">Good morning, {displayName.split(' ')[0]}</h1>
        <p className="employer-subgreeting">Here is your job listings statistic report from July 19 - July 25.</p>

        {/* Stat cards */}
        <div className="employer-stat-cards">
          <div className="employer-stat-card employer-stat-card--purple">
            <span className="employer-stat-value">76</span>
            <span className="employer-stat-label">New candidates to review</span>
          </div>
          <div className="employer-stat-card employer-stat-card--green">
            <span className="employer-stat-value">3</span>
            <span className="employer-stat-label">Schedule for today</span>
          </div>
          <div className="employer-stat-card employer-stat-card--blue">
            <span className="employer-stat-value">24</span>
            <span className="employer-stat-label">Messages received</span>
          </div>
        </div>

        {/* Middle row: chart + job open */}
        <div className="employer-middle-row">
          <div className="employer-card employer-chart-card">
            <div className="employer-card-header">
              <h3>Job statistics</h3>
              <div className="employer-chart-toggle">
                {['week', 'month', 'year'].map((r) => (
                  <button
                    key={r}
                    className={chartRange === r ? 'active' : ''}
                    onClick={() => setChartRange(r)}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <p className="employer-chart-subtitle">Showing Jobstatistic Jul 19-25</p>

            <div className="employer-chart-legend">
              <span className="employer-chart-tab employer-chart-tab--active">
                Overview
              </span>
              <span className="employer-chart-tab">
                <span className="legend-dot" style={{ background: '#4640DE' }} /> Job View
              </span>
              <span className="employer-chart-tab">
                <span className="legend-dot" style={{ background: '#FFB836' }} /> Job Applied
              </span>
            </div>

            <div className="employer-bar-chart">
              {WEEK_DATA.map((d) => (
                <div className="bar-chart-col" key={d.day}>
                  <div className="bar-chart-bars">
                    <div
                      className="bar-chart-bar bar-chart-bar--view"
                      style={{ height: `${(d.jobView / maxViewValue) * 100}%` }}
                      title={`Job View: ${d.jobView}`}
                    />
                    <div
                      className="bar-chart-bar bar-chart-bar--applied"
                      style={{ height: `${(d.jobApplied / maxViewValue) * 100}%` }}
                      title={`Job Applied: ${d.jobApplied}`}
                    />
                  </div>
                  <span className="bar-chart-label">{d.day}</span>
                </div>
              ))}
            </div>

            <div className="employer-chart-stats">
              <div>
                <span className="employer-chart-stats-label">Job Views</span>
                <span className="employer-chart-stats-value">2,342</span>
                <span className="employer-chart-stats-sub">This Week <strong>1.4% ↑</strong></span>
              </div>
              <div>
                <span className="employer-chart-stats-label">Job Applied</span>
                <span className="employer-chart-stats-value">654</span>
                <span className="employer-chart-stats-sub employer-chart-stats-sub--down">
                  This Week <strong>0.5% ↓</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="employer-side-col">
            <div className="employer-card employer-job-open-card">
              <div className="employer-card-header">
                <h3>Job Open</h3>
              </div>
              <span className="employer-job-open-value">12</span>
              <span className="employer-job-open-sub">Jobs Opened</span>
            </div>

            <div className="employer-card employer-applicant-summary-card">
              <div className="employer-card-header">
                <h3>Applicants Summary</h3>
              </div>
              <div className="employer-applicant-summary-body">
                <div
                  className="applicant-donut"
                  style={{ background: `conic-gradient(${gradientStops})` }}
                >
                  <div className="applicant-donut-hole">
                    <span>{totalApplicants}</span>
                    <span className="applicant-donut-hole-sub">Applicants</span>
                  </div>
                </div>
                <div className="applicant-summary-legend">
                  {APPLICANT_SUMMARY.map((s) => (
                    <div className="applicant-summary-legend-item" key={s.label}>
                      <span className="legend-dot" style={{ background: s.color }} />
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Updates */}
        <div className="employer-job-updates">
          <div className="employer-card-header">
            <h3>Job Updates</h3>
            <Link to="#" className="employer-view-all">
              View all <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="employer-job-updates-grid">
            {JOB_UPDATES.map((job) => (
              <div className="employer-job-update-card" key={job.title}>
                <div className="employer-job-update-top">
                  <div className="employer-job-update-logo" style={{ background: job.color }}>
                    {job.title[0]}
                  </div>
                  <span className={`pill ${job.typeClass}`}>{job.type}</span>
                </div>
                <h4>{job.title}</h4>
                <p className="employer-job-update-meta">Nomad &middot; {job.location}</p>
                <span className={`pill ${job.tagClass}`}>{job.tag}</span>
                <div className="employer-job-update-footer">
                  <div className="employer-job-update-progress">
                    <div
                      className="employer-job-update-progress-fill"
                      style={{ width: `${(job.applied / job.capacity) * 100}%` }}
                    />
                  </div>
                  <span>{job.applied} applied of {job.capacity} capacity</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}