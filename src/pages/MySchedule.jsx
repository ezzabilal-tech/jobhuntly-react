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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import { scheduleCategories, weekDays, scheduleEvents } from '../data/schedule';
import './Dashboard.css';
import './EmployerDashboard.css';
import './MySchedule.css';

const MONTH_LABEL = 'NOVEMBER 2021';
const MINI_MONTH_LABEL = 'NOVEMBER 2021';

const MINI_CAL_WEEKS = [
  [31, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 1, 2, 3, 4],
];

const HOURS = ['GMT -07', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM'];

export default function MySchedule() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [rangeMode, setRangeMode] = useState('Week'); // 'Day' | 'Week' | 'Month'
  const [categories, setCategories] = useState(scheduleCategories);
  const [selectedDate, setSelectedDate] = useState(24);

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
    { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '/employer/my-schedule' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  const toggleCategory = (key) => {
    setCategories((prev) =>
      prev.map((c) => (c.key === key ? { ...c, checked: !c.checked } : c))
    );
  };

  const activeCategoryKeys = categories.filter((c) => c.checked).map((c) => c.key);
  const categoryColor = (key) => categories.find((c) => c.key === key)?.color || '#4640de';

  const visibleEvents = scheduleEvents.filter((e) => activeCategoryKeys.includes(e.category));

  // Layout constants for the hour grid (must match MySchedule.css row height)
  const ROW_HEIGHT = 56; // px per hour
  const GRID_START_HOUR = 0;

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
                className={`sidebar-item ${item.key === 'my-schedule' ? 'sidebar-item--active' : ''}`}
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

        <div className="ms-scroll">
          {/* Toolbar */}
          <div className="ms-toolbar">
            <div className="ms-toolbar-left">
              <h1 className="ms-title">My Schedule</h1>
              <button className="ms-today-btn">Today</button>
            </div>

            <div className="ms-toolbar-center">
              <button className="ms-nav-arrow"><ChevronLeft size={18} /></button>
              <span className="ms-month-label">{MONTH_LABEL}</span>
              <button className="ms-nav-arrow"><ChevronRight size={18} /></button>
            </div>

            <div className="ms-toolbar-right">
              {['Day', 'Week', 'Month'].map((mode) => (
                <button
                  key={mode}
                  className={`ms-range-btn ${rangeMode === mode ? 'ms-range-btn--active' : ''}`}
                  onClick={() => setRangeMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="ms-body">
            {/* Left panel */}
            <aside className="ms-side-panel">
              <button className="ms-create-event-btn">
                <Plus size={16} /> Create Event
              </button>

              <div className="ms-mini-cal">
                <div className="ms-mini-cal-head">
                  <span>{MINI_MONTH_LABEL}</span>
                  <div>
                    <button className="ms-mini-cal-arrow"><ChevronLeft size={14} /></button>
                    <button className="ms-mini-cal-arrow"><ChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="ms-mini-cal-grid ms-mini-cal-grid--head">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                {MINI_CAL_WEEKS.map((week, wi) => (
                  <div className="ms-mini-cal-grid" key={wi}>
                    {week.map((day, di) => {
                      const isCurrentMonth = !(
                        (wi === 0 && day > 20) || (wi === 4 && day < 20)
                      );
                      const isSelected = isCurrentMonth && day === selectedDate;
                      return (
                        <button
                          key={di}
                          className={`ms-mini-cal-day ${isCurrentMonth ? '' : 'ms-mini-cal-day--muted'} ${
                            isSelected ? 'ms-mini-cal-day--selected' : ''
                          }`}
                          onClick={() => isCurrentMonth && setSelectedDate(day)}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="ms-categories">
                <div className="ms-categories-head">
                  <span>Categories</span>
                  <button className="ms-add-category-btn">
                    <Plus size={14} /> Add Category
                  </button>
                </div>
                <ul className="ms-category-list">
                  {categories.map((c) => (
                    <li key={c.key}>
                      <label className="ms-category-checkbox">
                        <input
                          type="checkbox"
                          checked={c.checked}
                          onChange={() => toggleCategory(c.key)}
                        />
                        <span
                          className="ms-checkbox-visual"
                          style={c.checked ? { background: c.color, borderColor: c.color } : {}}
                        />
                        {c.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Week grid */}
            <div className="ms-calendar-wrap">
              <div className="ms-week-header">
                <div className="ms-time-gutter-spacer" />
                {weekDays.map((d, i) => (
                  <div
                    key={i}
                    className={`ms-week-header-cell ${d.date === selectedDate ? 'ms-week-header-cell--selected-col' : ''} ${
                      d.holiday ? 'ms-week-header-cell--holiday' : ''
                    }`}
                  >
                    <span className="ms-week-header-label">{d.label}</span>
                    <span className={`ms-week-header-date ${d.date === selectedDate ? 'ms-week-header-date--active' : ''}`}>
                      {d.date}
                    </span>
                    {d.holiday && <span className="ms-holiday-pill">Holiday</span>}
                  </div>
                ))}
              </div>

              <div className="ms-week-grid">
                <div className="ms-time-gutter">
                  {HOURS.map((h, i) => (
                    <div key={i} className="ms-time-label">{h}</div>
                  ))}
                </div>

                {weekDays.map((d, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`ms-day-col ${d.date === selectedDate ? 'ms-day-col--selected' : ''} ${
                      d.holiday ? 'ms-day-col--holiday' : ''
                    }`}
                  >
                    {HOURS.map((_, hourIndex) => (
                      <div key={hourIndex} className="ms-hour-cell" />
                    ))}

                    {visibleEvents
                      .filter((ev) => ev.dayIndex === dayIndex)
                      .map((ev) => {
                        const top = (ev.startHour - GRID_START_HOUR) * ROW_HEIGHT;
                        const height = (ev.endHour - ev.startHour) * ROW_HEIGHT;
                        return (
                          <div
                            key={ev.id}
                            className="ms-event-card"
                            style={{
                              top,
                              height,
                              background: categoryColor(ev.category),
                            }}
                          >
                            <div className="ms-event-title">{ev.title}</div>
                            <div className="ms-event-time">{ev.time}</div>
                            {ev.avatars.length > 0 && (
                              <div className="ms-event-avatars">
                                {ev.avatars.map((src, i) => (
                                  <img key={i} src={src} alt="" className="ms-event-avatar" />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}