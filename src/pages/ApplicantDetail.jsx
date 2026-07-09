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
  Star,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Globe,
  MessageCircle,
  MapPin,
  PlusCircle,
  Pencil,
  MoreHorizontal,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import { applicants, stageOrder, getResume, getHiringProgress, hiringStages, getInterviewSchedule } from '../data/applicants';
import './Dashboard.css';
import './EmployerDashboard.css';
import './ApplicantDetail.css';

const tabs = ['Applicant Profile', 'Resume', 'Hiring Progress', 'Interview Schedule'];

export default function ApplicantDetail() {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Applicant Profile');

  const applicant = applicants.find((a) => String(a.id) === String(id)) || applicants[0];
  const resume = getResume(applicant);
  const hiring = getHiringProgress(applicant);
  const interviewSchedule = getInterviewSchedule(applicant);

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

  const stageIndex = stageOrder.indexOf(applicant.stage);
  const progressPct = stageIndex >= 0 ? ((stageIndex + 1) / stageOrder.length) * 100 : 30;

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
            <button className="btn-post-job-header" onClick={() => navigate('/employer/post-job')}>
              <Plus size={16} />
              Post a job
            </button>
            <NotificationPanel />
          </div>
        </header>

        <div className="ad-scroll">
          <div className="ad-top-row">
            <button className="ad-back-btn" onClick={() => navigate('/employer/applicants')}>
              <ChevronLeft size={20} />
            </button>
            <h1 className="ad-title">Applicant Details</h1>
            <div className="ad-more-action">
              <button className="ad-more-action-btn">
                More Action <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="ad-layout">
            {/* Left profile card */}
            <div className="ad-profile-card">
              <div className="ad-profile-head">
                <img src={applicant.avatar} alt={applicant.name} className="ad-profile-avatar" />
                <div>
                  <h2>{applicant.name}</h2>
                  <p>{applicant.role}</p>
                  <div className="ad-profile-rating">
                    <Star size={14} className="ad-star" />
                    {applicant.rating.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="ad-applied-job-box">
                <div className="ad-applied-job-top">
                  <span>Applied Jobs</span>
                  <span>{applicant.appliedAgo}</span>
                </div>
                <h4>{applicant.appliedJob}</h4>
                <p>{applicant.appliedJobTags}</p>
              </div>

              <div className="ad-stage-block">
                <div className="ad-stage-top">
                  <span>Stage</span>
                  <span className="ad-stage-current">{applicant.stage}</span>
                </div>
                <div className="ad-stage-bar">
                  <div className="ad-stage-bar-fill" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <div className="ad-profile-actions">
                <button className="ad-schedule-btn">Schedule Interview</button>
                <button className="ad-message-btn" onClick={() => navigate('/messages')}>
                  <MessageCircle size={18} />
                </button>
              </div>

              <div className="ad-contact-block">
                <h3>Contact</h3>
                <div className="ad-contact-item">
                  <Mail size={16} />
                  <div>
                    <span className="ad-contact-label">Email</span>
                    <span className="ad-contact-value">{applicant.email}</span>
                  </div>
                </div>
                <div className="ad-contact-item">
                  <Phone size={16} />
                  <div>
                    <span className="ad-contact-label">Phone</span>
                    <span className="ad-contact-value">{applicant.phone}</span>
                  </div>
                </div>
                <div className="ad-contact-item">
                  <Instagram size={16} />
                  <div>
                    <span className="ad-contact-label">Instagram</span>
                    <span className="ad-contact-value ad-contact-link">{applicant.instagram}</span>
                  </div>
                </div>
                <div className="ad-contact-item">
                  <Twitter size={16} />
                  <div>
                    <span className="ad-contact-label">Twitter</span>
                    <span className="ad-contact-value ad-contact-link">{applicant.twitter}</span>
                  </div>
                </div>
                <div className="ad-contact-item">
                  <Globe size={16} />
                  <div>
                    <span className="ad-contact-label">Website</span>
                    <span className="ad-contact-value ad-contact-link">{applicant.website}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="ad-content-card">
              <div className="ad-tabs">
                {tabs.map((t) => (
                  <button
                    key={t}
                    className={`ad-tab ${activeTab === t ? 'ad-tab--active' : ''}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {activeTab === 'Applicant Profile' && (
                <div className="ad-tab-content">
                  <h3>Personal Info</h3>
                  <div className="ad-info-grid">
                    <div>
                      <span className="ad-info-label">Full Name</span>
                      <span className="ad-info-value">{applicant.fullName}</span>
                    </div>
                    <div>
                      <span className="ad-info-label">Gender</span>
                      <span className="ad-info-value">{applicant.gender}</span>
                    </div>
                    <div>
                      <span className="ad-info-label">Date of Birth</span>
                      <span className="ad-info-value">
                        {applicant.dob} <span className="ad-info-muted">({applicant.age} y.o)</span>
                      </span>
                    </div>
                    <div>
                      <span className="ad-info-label">Language</span>
                      <span className="ad-info-value">{applicant.language}</span>
                    </div>
                    <div className="ad-info-full">
                      <span className="ad-info-label">Address</span>
                      <span className="ad-info-value ad-info-multiline">{applicant.address}</span>
                    </div>
                  </div>

                  <div className="ad-divider" />

                  <h3>Professional Info</h3>
                  <div className="ad-info-block">
                    <span className="ad-info-label">About Me</span>
                    {applicant.about.split('\n\n').map((para, i) => (
                      <p key={i} className="ad-about-para">{para}</p>
                    ))}
                  </div>

                  <div className="ad-info-grid" style={{ marginTop: 20 }}>
                    <div>
                      <span className="ad-info-label">Current Job</span>
                      <span className="ad-info-value">{applicant.currentJob}</span>
                    </div>
                    <div>
                      <span className="ad-info-label">Experience in Years</span>
                      <span className="ad-info-value">{applicant.experience}</span>
                    </div>
                    <div>
                      <span className="ad-info-label">Highest Qualification Held</span>
                      <span className="ad-info-value">{applicant.qualification}</span>
                    </div>
                    <div>
                      <span className="ad-info-label">Skill set</span>
                      <div className="ad-skill-tags">
                        {applicant.skills.map((s) => (
                          <span key={s} className="ad-skill-tag">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Resume' && (
                <div className="ad-resume-wrap">
                  <div className="ad-resume-sheet">
                    <div className="ad-resume-header">
                      <div>
                        <h2>{applicant.fullName || applicant.name}</h2>
                        <p>{applicant.role}</p>
                      </div>
                      <img src={applicant.avatar} alt={applicant.name} className="ad-resume-avatar" />
                    </div>

                    <div className="ad-resume-body">
                      <div className="ad-resume-main">
                        <h4 className="ad-resume-section-title">Experience</h4>
                        {resume.experience.map((exp, i) => (
                          <div key={i} className="ad-resume-exp">
                            <h5>{exp.title}</h5>
                            <p className="ad-resume-exp-meta">{exp.company}</p>
                            <p className="ad-resume-exp-period">{exp.period}</p>
                            <ul>
                              {exp.bullets.map((b, j) => (
                                <li key={j}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        <h4 className="ad-resume-section-title">Education</h4>
                        {resume.education.map((ed, i) => (
                          <div key={i} className="ad-resume-exp">
                            <h5>{ed.degree}</h5>
                            <p className="ad-resume-exp-meta">{ed.school}</p>
                            <p className="ad-resume-exp-period">{ed.period}</p>
                          </div>
                        ))}
                      </div>

                      <div className="ad-resume-side">
                        <div className="ad-resume-side-block">
                          <span className="ad-resume-side-label">Email</span>
                          <span className="ad-resume-side-value">{applicant.email}</span>
                        </div>
                        <div className="ad-resume-side-block">
                          <span className="ad-resume-side-label">Phone</span>
                          <span className="ad-resume-side-value">{applicant.phone}</span>
                        </div>

                        <h4 className="ad-resume-section-title">Industry Knowledge</h4>
                        <ul className="ad-resume-plain-list">
                          {resume.industryKnowledge.map((s) => <li key={s}>{s}</li>)}
                        </ul>

                        <h4 className="ad-resume-section-title">Tools &amp; Technologies</h4>
                        <ul className="ad-resume-plain-list">
                          {resume.toolsAndTechnologies.map((s) => <li key={s}>{s}</li>)}
                        </ul>

                        <h4 className="ad-resume-section-title">Other Skills</h4>
                        <p className="ad-resume-inline-list">{resume.otherSkills.join(', ')}</p>

                        <h4 className="ad-resume-section-title">Languages</h4>
                        <p className="ad-resume-inline-list">{resume.languages.join(', ')}</p>

                        <h4 className="ad-resume-section-title">Social</h4>
                        <div className="ad-resume-side-block">
                          <span className="ad-resume-side-value ad-resume-link">{resume.social.website}</span>
                        </div>
                        <div className="ad-resume-side-block">
                          <span className="ad-resume-side-value ad-resume-link">{resume.social.linkedin}</span>
                        </div>
                        <div className="ad-resume-side-block">
                          <span className="ad-resume-side-value ad-resume-link">{resume.social.dribbble}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Hiring Progress' && (
                <div className="ad-tab-content">
                  <div className="ad-hp-top-row">
                    <h3 style={{ margin: 0 }}>Current Stage</h3>
                    <button className="ad-hp-rating-btn">
                      Give Rating <ChevronDown size={14} />
                    </button>
                  </div>

                  <div className="ad-hp-pipeline">
                    {hiringStages.map((stage) => (
                      <div
                        key={stage}
                        className={`ad-hp-stage-chip ${
                          stage === hiring.currentStage ? 'ad-hp-stage-chip--active' : ''
                        }`}
                      >
                        {stage}
                      </div>
                    ))}
                  </div>

                  <div className="ad-divider" />

                  <h3>Stage Info</h3>
                  <div className="ad-info-grid">
                    <div>
                      <span className="ad-info-label">Interview Date</span>
                      <span className="ad-info-value">{hiring.interviewDate}</span>
                    </div>
                    <div>
                      <span className="ad-info-label">Interview Status</span>
                      <span className="ad-hp-status-pill">{hiring.interviewStatus}</span>
                    </div>
                    <div>
                      <span className="ad-info-label">Interview Location</span>
                      <span className="ad-info-value">
                        {hiring.interviewLocation.name}
                        <br />
                        <span className="ad-info-multiline ad-info-muted">
                          {hiring.interviewLocation.address}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="ad-info-label">Assigned to</span>
                      <div className="ad-hp-avatars">
                        {hiring.assignedTo.map((src, i) => (
                          <img key={i} src={src} alt="assignee" className="ad-hp-avatar" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="ad-hp-next-step-btn">Move To Next Step</button>

                  <div className="ad-divider" />

                  <div className="ad-hp-notes-top">
                    <h3 style={{ margin: 0 }}>Notes</h3>
                    <button className="ad-hp-add-notes-btn">
                      <PlusCircle size={15} /> Add Notes
                    </button>
                  </div>

                  <div className="ad-hp-notes-list">
                    {hiring.notes.map((note) => (
                      <div key={note.id} className="ad-hp-note">
                        <img src={note.avatar} alt={note.author} className="ad-hp-note-avatar" />
                        <div className="ad-hp-note-body">
                          <div className="ad-hp-note-head">
                            <span className="ad-hp-note-author">{note.author}</span>
                            <span className="ad-hp-note-date">{note.date}</span>
                          </div>
                          <p className="ad-hp-note-text">{note.text}</p>
                          {note.replies > 0 && (
                            <a href="#" className="ad-hp-note-replies">{note.replies} Replies</a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Interview Schedule' && (
                <div className="ad-tab-content">
                  <div className="ad-is-top-row">
                    <h3 style={{ margin: 0 }}>Interview List</h3>
                    <button className="ad-is-add-btn">
                      <PlusCircle size={15} /> Add Schedule Interview
                    </button>
                  </div>

                  <div className="ad-is-groups">
                    {interviewSchedule.map((group) => (
                      <div key={group.dateLabel} className="ad-is-group">
                        <span className="ad-is-date-label">{group.dateLabel}</span>
                        {group.items.map((item) => (
                          <div key={item.id} className="ad-is-row">
                            <img src={item.avatar} alt={item.name} className="ad-is-avatar" />
                            <div className="ad-is-info">
                              <h4>{item.name}</h4>
                              <p>{item.testType}</p>
                            </div>
                            <div className="ad-is-time">
                              <span>{item.time}</span>
                              <p>{item.location}</p>
                            </div>
                            <button className="ad-is-feedback-btn">
                              <Pencil size={13} /> Add Feedback
                            </button>
                            <button className="ad-is-more-btn">
                              <MoreHorizontal size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}