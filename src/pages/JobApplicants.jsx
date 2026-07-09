import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  ChevronLeft,
  Search,
  SlidersHorizontal,
  Star,
  MoreHorizontal,
  ChevronRight,
  CheckCircle2,
  Pencil,
  HeartPulse,
  Waves,
  Video,
  Triangle,
  Coffee,
  Bus,
  HandHeart,
  Eye,
  Send,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import { jobs, getJobDetails, getJobAnalytics } from '../data/jobs';
import { applicants, stageStyles } from '../data/applicants';
import './Dashboard.css';
import './EmployerDashboard.css';
import './AllApplicants.css';
import './JobApplicants.css';

export default function JobApplicants() {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('pipeline'); // 'pipeline' | 'table'
  const [activeTab, setActiveTab] = useState('applicants'); // 'applicants' | 'details' | 'analytics'

  const job = jobs.find((j) => String(j.id) === String(id)) || jobs[0];

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
    { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '/employer/my-schedule' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  // Applicants for this job. Falls back to showing all applicants (demo data
  // isn't linked 1:1 to job ids), same behaviour as the reference screenshot.
  const jobApplicants = applicants.filter(
    (a) => a.appliedJob === job.role || true
  );

  const filteredApplicants = jobApplicants.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pipelineStageDefs = [
    { key: 'review', label: 'In Review', stages: ['In Review'] },
    { key: 'shortlisted', label: 'Shortlisted', stages: ['Shortlisted'] },
    { key: 'interview', label: 'Interview', stages: ['Interview', 'Interviewed'] },
    { key: 'hired', label: 'Hired', stages: ['Hired'] },
  ];

  const pipelineStages = pipelineStageDefs.map((def) => ({
    ...def,
    applicants: filteredApplicants.filter((a) => def.stages.includes(a.stage)),
  }));

  const jobDetails = getJobDetails(job);
  const analytics = getJobAnalytics(job);

  const perkIconMap = {
    health: HeartPulse,
    vacation: Waves,
    skill: Video,
    summit: Triangle,
    remote: Coffee,
    commuter: Bus,
    giveback: HandHeart,
  };

  // Build donut chart segments (SVG stroke-dasharray based pie/donut, no extra deps)
  const donutRadius = 60;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let donutOffsetAcc = 0;
  const donutSegments = analytics.trafficChannel.map((seg) => {
    const length = (seg.percent / 100) * donutCircumference;
    const segment = {
      ...seg,
      length,
      offset: donutOffsetAcc,
    };
    donutOffsetAcc += length;
    return segment;
  });

  // Build the view-stats line chart path
  const chartWidth = 640;
  const chartHeight = 220;
  const chartPad = 20;
  const maxViews = Math.max(...analytics.viewStats.map((d) => d.views), 1);
  const stepX = (chartWidth - chartPad * 2) / (analytics.viewStats.length - 1);
  const chartPoints = analytics.viewStats.map((d, i) => {
    const x = chartPad + i * stepX;
    const y = chartHeight - chartPad - (d.views / maxViews) * (chartHeight - chartPad * 2);
    return { x, y, ...d };
  });
  const chartPath = chartPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');
  const highlightedPoint = chartPoints[Math.min(4, chartPoints.length - 1)];

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
                className={`sidebar-item ${item.key === 'job-listing' ? 'sidebar-item--active' : ''}`}
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
          {/* Breadcrumb / job title */}
          <div className="ja-breadcrumb-row">
            <button className="ja-back-btn" onClick={() => navigate('/employer/job-listing')}>
              <ChevronLeft size={20} />
            </button>
            <h1 className="ja-job-title">{job.role}</h1>
            <button className="ja-more-action-btn">
              More Action <ChevronDown size={14} />
            </button>
          </div>
          <p className="ja-job-subtitle">
            Design &bull; {job.jobType === 'Fulltime' ? 'Full-Time' : job.jobType} &bull; {job.needs} Hired &bull; {jobApplicants.length} Applied
          </p>

          {/* Tabs */}
          <div className="ja-tabs">
            <button
              className={`ja-tab ${activeTab === 'applicants' ? 'ja-tab--active' : ''}`}
              onClick={() => setActiveTab('applicants')}
            >
              Applicants
            </button>
            <button
              className={`ja-tab ${activeTab === 'details' ? 'ja-tab--active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Job Details
            </button>
            <button
              className={`ja-tab ${activeTab === 'analytics' ? 'ja-tab--active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {activeTab === 'applicants' && (
            <>
              <div className="aa-top-row" style={{ marginTop: 20 }}>
                <h1 className="aa-title">Total Applicants: {jobApplicants.length}</h1>

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
                      type="button"
                      className={`aa-view-btn ${viewMode === 'pipeline' ? 'aa-view-btn--active' : ''}`}
                      onClick={() => setViewMode('pipeline')}
                    >
                      Pipeline View
                    </button>
                    <button
                      type="button"
                      className={`aa-view-btn ${viewMode === 'table' ? 'aa-view-btn--active' : ''}`}
                      onClick={() => setViewMode('table')}
                    >
                      Table View
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === 'table' ? (
                <div className="ja-pipeline">
                  {pipelineStages.map((stage) => (
                    <div className="ja-pipeline-col" key={stage.key}>
                      <div className="ja-pipeline-col-header">
                        <span className={`ja-pipeline-dot ja-pipeline-dot--${stage.key}`} />
                        <span className="ja-pipeline-col-title">{stage.label}</span>
                        <span className="ja-pipeline-col-count">{stage.applicants.length}</span>
                        <button className="ja-pipeline-col-more">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      <div className="ja-pipeline-col-body">
                        {stage.applicants.map((a) => (
                          <div className="ja-pipeline-card" key={a.id}>
                            <div className="ja-pipeline-card-top">
                              <img src={a.avatar} alt={a.name} className="ja-pipeline-avatar" />
                              <div>
                                <div className="ja-pipeline-name">{a.name}</div>
                                <Link
                                  to={`/employer/applicants/${a.id}`}
                                  className="ja-pipeline-viewprofile"
                                >
                                  View Profile
                                </Link>
                              </div>
                            </div>
                            <div className="ja-pipeline-card-bottom">
                              <div>
                                <div className="ja-pipeline-meta-label">Applied on</div>
                                <div className="ja-pipeline-meta-value">{a.appliedDate}</div>
                              </div>
                              <div>
                                <div className="ja-pipeline-meta-label">Score</div>
                                <div className="ja-pipeline-meta-value ja-pipeline-score">
                                  <Star size={12} className="aa-score-star" />
                                  {a.rating.toFixed(1)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {stage.applicants.length === 0 && (
                          <div className="ja-pipeline-empty">No applicants</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
                          <td colSpan={6} className="aa-empty">No applicants found</td>
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
              )}
            </>
          )}

          {activeTab === 'details' && (
            <div className="jd-details-wrap">
              <div className="jd-details-card">
                <div className="jd-details-header">
                  <div className="jd-details-header-left">
                    <div className="jd-details-logo">S</div>
                    <h2>{job.role}</h2>
                  </div>
                  <button className="ja-more-action-btn">
                    <Pencil size={14} /> Edit Job Details
                  </button>
                </div>
              </div>

              <div className="jd-details-body">
                <div className="jd-details-main">
                  <section className="jd-section">
                    <h3>Description</h3>
                    <p>{jobDetails.description}</p>
                  </section>

                  <section className="jd-section">
                    <h3>Responsibilities</h3>
                    <ul className="jd-check-list">
                      {jobDetails.responsibilities.map((item, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="jd-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="jd-section">
                    <h3>Who You Are</h3>
                    <ul className="jd-check-list">
                      {jobDetails.whoYouAre.map((item, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="jd-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="jd-section">
                    <h3>Nice-To-Haves</h3>
                    <ul className="jd-check-list">
                      {jobDetails.niceToHaves.map((item, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="jd-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <aside className="jd-details-sidebar">
                  <div className="jd-sidebar-block">
                    <h4>About this role</h4>
                    <div className="jd-capacity-row">
                      <span>{jobApplicants.length} applied</span>
                      <span>of {jobDetails.capacity} capacity</span>
                    </div>
                    <div className="jd-capacity-bar">
                      <div
                        className="jd-capacity-bar-fill"
                        style={{ width: `${Math.min(100, (jobApplicants.length / jobDetails.capacity) * 100)}%` }}
                      />
                    </div>

                    <div className="jd-fact-row">
                      <span className="jd-fact-label">Apply Before</span>
                      <span className="jd-fact-value">{jobDetails.applyBefore}</span>
                    </div>
                    <div className="jd-fact-row">
                      <span className="jd-fact-label">Job Posted On</span>
                      <span className="jd-fact-value">{jobDetails.jobPostedOn}</span>
                    </div>
                    <div className="jd-fact-row">
                      <span className="jd-fact-label">Job Type</span>
                      <span className="jd-fact-value">
                        {job.jobType === 'Fulltime' ? 'Full-Time' : job.jobType}
                      </span>
                    </div>
                    <div className="jd-fact-row">
                      <span className="jd-fact-label">Salary</span>
                      <span className="jd-fact-value">{jobDetails.salary}</span>
                    </div>
                  </div>

                  <div className="jd-sidebar-block">
                    <h4>Categories</h4>
                    <div className="jd-tag-row">
                      {jobDetails.categories.map((cat, i) => (
                        <span key={i} className={`jd-tag jd-tag--cat-${i % 2}`}>{cat}</span>
                      ))}
                    </div>
                  </div>

                  <div className="jd-sidebar-block">
                    <h4>Required Skills</h4>
                    <div className="jd-tag-row">
                      {jobDetails.requiredSkills.map((skill, i) => (
                        <span key={i} className="jd-tag jd-tag--skill">{skill}</span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>

              <div className="jd-perks-section">
                <h3>Perks &amp; Benefits</h3>
                <p className="jd-perks-subtitle">This job comes with several perks and benefits</p>

                <div className="jd-perks-grid">
                  {jobDetails.perks.map((perk, i) => {
                    const Icon = perkIconMap[perk.icon] || CheckCircle2;
                    return (
                      <div className="jd-perk-card" key={i}>
                        <Icon size={22} className="jd-perk-icon" />
                        <h5>{perk.title}</h5>
                        <p>{perk.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="an-wrap">
              <div className="an-top-cards">
                <div className="an-stat-card">
                  <div className="an-stat-card-head">
                    <span>Total Views</span>
                    <span className="an-stat-icon"><Eye size={16} /></span>
                  </div>
                  <div className="an-stat-value">{analytics.totalViews.toLocaleString()}</div>
                  <div className="an-stat-change an-stat-change--up">
                    {analytics.totalViewsChange}% <span>vs last day</span>
                  </div>
                </div>

                <div className="an-stat-card">
                  <div className="an-stat-card-head">
                    <span>Total Applied</span>
                    <span className="an-stat-icon"><Send size={16} /></span>
                  </div>
                  <div className="an-stat-value">{analytics.totalApplied}</div>
                  <div className="an-stat-change an-stat-change--down">
                    {analytics.totalAppliedChange}% <span>vs last day</span>
                  </div>
                </div>

                <div className="an-traffic-card">
                  <h4>Traffic channel</h4>
                  <div className="an-traffic-body">
                    <svg viewBox="0 0 160 160" className="an-donut">
                      {donutSegments.map((seg, i) => (
                        <circle
                          key={i}
                          cx="80"
                          cy="80"
                          r={donutRadius}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="22"
                          strokeDasharray={`${seg.length} ${donutCircumference - seg.length}`}
                          strokeDashoffset={-seg.offset}
                          transform="rotate(-90 80 80)"
                        />
                      ))}
                      <text x="80" y="76" textAnchor="middle" className="an-donut-value">
                        {analytics.totalViews > 999
                          ? `${Math.round(analytics.totalViews / 1000)}`
                          : analytics.totalViews}
                      </text>
                    </svg>

                    <ul className="an-traffic-legend">
                      {analytics.trafficChannel.map((seg, i) => (
                        <li key={i}>
                          <span className="an-legend-dot" style={{ background: seg.color }} />
                          {seg.label} : {seg.percent}%
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="an-bottom-row">
                <div className="an-chart-card">
                  <div className="an-chart-card-head">
                    <h4>Job Listing View stats</h4>
                    <button className="jl-date-btn">
                      Last 7 days <ChevronDown size={14} />
                    </button>
                  </div>

                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} className="an-line-chart">
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const y = chartPad + i * ((chartHeight - chartPad * 2) / 5);
                      return (
                        <line
                          key={i}
                          x1={chartPad}
                          x2={chartWidth - chartPad}
                          y1={y}
                          y2={y}
                          className="an-grid-line"
                        />
                      );
                    })}

                    <path d={chartPath} className="an-line-path" fill="none" />

                    {chartPoints.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r={i === 4 ? 5 : 3} className="an-line-dot" />
                    ))}

                    {highlightedPoint && (
                      <g>
                        <line
                          x1={highlightedPoint.x}
                          x2={highlightedPoint.x}
                          y1={highlightedPoint.y}
                          y2={chartHeight - chartPad}
                          className="an-highlight-line"
                        />
                        <rect
                          x={highlightedPoint.x - 34}
                          y={highlightedPoint.y - 46}
                          width="68"
                          height="36"
                          rx="8"
                          className="an-tooltip-bg"
                        />
                        <text x={highlightedPoint.x} y={highlightedPoint.y - 30} textAnchor="middle" className="an-tooltip-label">
                          Views
                        </text>
                        <text x={highlightedPoint.x} y={highlightedPoint.y - 16} textAnchor="middle" className="an-tooltip-value">
                          {highlightedPoint.views}
                        </text>
                      </g>
                    )}

                    {chartPoints.map((p, i) => (
                      <text
                        key={i}
                        x={p.x}
                        y={chartHeight + 20}
                        textAnchor="middle"
                        className={`an-x-label ${i === 4 ? 'an-x-label--active' : ''}`}
                      >
                        {p.date}
                      </text>
                    ))}
                  </svg>
                </div>

                <div className="an-country-card">
                  <h4>Visitors by country</h4>
                  <ul className="an-country-list">
                    {analytics.visitorsByCountry.map((c, i) => (
                      <li key={i}>
                        <span className="an-country-flag">{c.flag}</span>
                        <span className="an-country-name">{c.country}</span>
                        <span className="an-country-count">{c.count.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}