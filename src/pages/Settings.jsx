import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
  Building,
  User,
  Settings as SettingsIcon,
  HelpCircle,
  ImageUp,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const TABS = [
  { key: 'profile', label: 'My Profile' },
  { key: 'login', label: 'Login Details' },
  { key: 'notifications', label: 'Notifications' },
];

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const [form, setForm] = useState({
    fullName: user?.name || 'Jake Gyll',
    phone: '+44 1245 572 135',
    email: user?.email || 'jakegyll@email.com',
    dob: '09/08/1997',
    gender: 'Male',
    accountType: user?.role === 'employer' ? 'employer' : 'seeker',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [notifPrefs, setNotifPrefs] = useState({
    applications: true,
    jobs: false,
    recommendations: false,
  });

  const [saved, setSaved] = useState(false);

  const handleUpdateEmail = () => {
    if (!newEmail) return;
    setForm((prev) => ({ ...prev, email: newEmail }));
    setNewEmail('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const displayName = form.fullName || 'Jake Gyll';
  const displayEmail = form.email || 'jakegyll@email.com';
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
    { key: 'settings', label: 'Settings', icon: SettingsIcon, href: '/settings' },
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
                className={`sidebar-item ${item.key === 'settings' ? 'sidebar-item--active' : ''}`}
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
            <h1>Settings</h1>
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

        {/* Tabs */}
        <div className="settings-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`settings-tab ${activeTab === tab.key ? 'settings-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form className="settings-card" onSubmit={handleSave}>
          {/* ---------------- My Profile Tab ---------------- */}
          {activeTab === 'profile' && (
            <>
              <div className="settings-section">
                <div className="settings-section-text">
                  <h3>Basic Information</h3>
                  <p>This is your personal information that you can update anytime.</p>
                </div>
              </div>

              <div className="settings-photo-row">
                <div className="settings-photo-label">Profile Photo</div>
                <div className="settings-photo-content">
                  <img src={displayAvatar} alt={displayName} className="settings-avatar" />
                  <label className="settings-upload-box">
                    <ImageUp size={22} />
                    <span>
                      <strong>Click to replace</strong> or drag and drop
                    </span>
                    <span className="settings-upload-hint">SVG, PNG, JPG or GIF (max. 400 x 400px)</span>
                    <input type="file" accept="image/*" hidden />
                  </label>
                </div>
                <p className="settings-photo-note">
                  This image will be shown publicly as your profile picture, it will help recruiters
                  recognize you!
                </p>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-grid">
                <div className="settings-form-label">Personal Details</div>
                <div className="settings-form-fields">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                      placeholder="Jake Gyll"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Phone Number *</label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={handleChange('phone')}
                        placeholder="+44 1245 572 135"
                      />
                    </div>
                    <div className="form-field">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        placeholder="jakegyll@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Date of Birth *</label>
                      <div className="form-input-icon">
                        <input
                          type="text"
                          value={form.dob}
                          onChange={handleChange('dob')}
                          placeholder="09/08/1997"
                        />
                        <Calendar size={16} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Gender *</label>
                      <select value={form.gender} onChange={handleChange('gender')}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-grid">
                <div className="settings-form-label">
                  <h4>Account Type</h4>
                  <p>You can update your account type</p>
                </div>
                <div className="settings-form-fields">
                  <label className="radio-card">
                    <input
                      type="radio"
                      name="accountType"
                      checked={form.accountType === 'seeker'}
                      onChange={() => setForm((p) => ({ ...p, accountType: 'seeker' }))}
                    />
                    <div>
                      <strong>Job Seeker</strong>
                      <span>Looking for a job</span>
                    </div>
                  </label>
                  <label className="radio-card">
                    <input
                      type="radio"
                      name="accountType"
                      checked={form.accountType === 'employer'}
                      onChange={() => setForm((p) => ({ ...p, accountType: 'employer' }))}
                    />
                    <div>
                      <strong>Employer</strong>
                      <span>Hiring, sourcing candidates, or posting jobs</span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* ---------------- Login Details Tab ---------------- */}
          {activeTab === 'login' && (
            <>
              <div className="settings-section">
                <div className="settings-section-text">
                  <h3>Basic Information</h3>
                  <p>This is login information that you can update anytime.</p>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-grid">
                <div className="settings-form-label">
                  <h4>Update Email</h4>
                  <p>Update your email address to make sure it is safe</p>
                </div>
                <div className="settings-form-fields">
                  <div className="current-value-row">
                    <span>{form.email}</span>
                    <span className="verified-badge">
                      <CheckCircle2 size={14} />
                    </span>
                  </div>
                  <p className="field-hint">Your email address is verified.</p>

                  <div className="form-field">
                    <label>Update Email</label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter your new email"
                    />
                  </div>

                  <button type="button" className="btn-inline-action" onClick={handleUpdateEmail}>
                    Update Email
                  </button>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-grid">
                <div className="settings-form-label">
                  <h4>New Password</h4>
                  <p>Manage your password to make sure it is safe</p>
                </div>
                <div className="settings-form-fields">
                  <div className="form-field">
                    <label>Old Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your old password"
                    />
                    <span className="field-hint">Minimum 8 characters</span>
                  </div>

                  <div className="form-field">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                    />
                    <span className="field-hint">Minimum 8 characters</span>
                  </div>

                  <button type="button" className="btn-inline-action" onClick={handleChangePassword}>
                    Change Password
                  </button>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-close-account-row">
                <button type="button" className="btn-close-account">
                  Close Account
                  <HelpCircle size={13} />
                </button>
              </div>
            </>
          )}

          {/* ---------------- Notifications Tab ---------------- */}
          {activeTab === 'notifications' && (
            <>
              <div className="settings-section">
                <div className="settings-section-text">
                  <h3>Basic Information</h3>
                  <p>This is notifications preferences that you can update anytime.</p>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-grid">
                <div className="settings-form-label">
                  <h4>Notifications</h4>
                  <p>Customize your preferred notification settings</p>
                </div>
                <div className="settings-form-fields">
                  <div className="notif-list">
                    <label className="notif-check-row">
                      <input
                        type="checkbox"
                        checked={notifPrefs.applications}
                        onChange={() =>
                          setNotifPrefs((p) => ({ ...p, applications: !p.applications }))
                        }
                      />
                      <div>
                        <strong>Applications</strong>
                        <span>These are notifications for jobs that you have applied to</span>
                      </div>
                    </label>
                    <label className="notif-check-row">
                      <input
                        type="checkbox"
                        checked={notifPrefs.jobs}
                        onChange={() => setNotifPrefs((p) => ({ ...p, jobs: !p.jobs }))}
                      />
                      <div>
                        <strong>Jobs</strong>
                        <span>These are notifications for job openings that suit your profile</span>
                      </div>
                    </label>
                    <label className="notif-check-row">
                      <input
                        type="checkbox"
                        checked={notifPrefs.recommendations}
                        onChange={() =>
                          setNotifPrefs((p) => ({ ...p, recommendations: !p.recommendations }))
                        }
                      />
                      <div>
                        <strong>Recommendations</strong>
                        <span>These are notifications for personalized recommendations from our recruiters</span>
                      </div>
                    </label>
                  </div>

                  <button type="button" className="btn-inline-action" onClick={handleSave}>
                    Update Email
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <div className="settings-footer">
              {saved && <span className="settings-saved-msg">Saved!</span>}
              <button type="submit" className="btn-save-profile">
                Save Profile
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}