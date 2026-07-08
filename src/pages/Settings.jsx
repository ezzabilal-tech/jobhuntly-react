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
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notifPrefs, setNotifPrefs] = useState({
    applicationUpdates: true,
    jobRecommendations: true,
    messages: true,
    marketingEmails: false,
  });

  const [saved, setSaved] = useState(false);

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
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '#' },
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
                  <h3>Login Details</h3>
                  <p>Update your password and manage account security.</p>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-grid">
                <div className="settings-form-label">Change Password</div>
                <div className="settings-form-fields">
                  <div className="form-field">
                    <label>Current Password *</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>New Password *</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="form-field">
                      <label>Confirm New Password *</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-grid">
                <div className="settings-form-label">
                  <h4>Account Email</h4>
                  <p>The email address used to sign in.</p>
                </div>
                <div className="settings-form-fields">
                  <div className="form-field">
                    <label>Email *</label>
                    <input type="email" value={form.email} onChange={handleChange('email')} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ---------------- Notifications Tab ---------------- */}
          {activeTab === 'notifications' && (
            <>
              <div className="settings-section">
                <div className="settings-section-text">
                  <h3>Notifications</h3>
                  <p>Choose what updates you want to hear about.</p>
                </div>
              </div>

              <div className="settings-divider" />

              <div className="notif-list">
                <label className="notif-row">
                  <div>
                    <strong>Application Updates</strong>
                    <span>Get notified when an employer views or updates your application.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPrefs.applicationUpdates}
                    onChange={() =>
                      setNotifPrefs((p) => ({ ...p, applicationUpdates: !p.applicationUpdates }))
                    }
                  />
                </label>
                <label className="notif-row">
                  <div>
                    <strong>Job Recommendations</strong>
                    <span>Receive jobs picked for you based on your profile.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPrefs.jobRecommendations}
                    onChange={() =>
                      setNotifPrefs((p) => ({ ...p, jobRecommendations: !p.jobRecommendations }))
                    }
                  />
                </label>
                <label className="notif-row">
                  <div>
                    <strong>Messages</strong>
                    <span>Get notified when you receive a new message.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPrefs.messages}
                    onChange={() => setNotifPrefs((p) => ({ ...p, messages: !p.messages }))}
                  />
                </label>
                <label className="notif-row">
                  <div>
                    <strong>Marketing Emails</strong>
                    <span>Tips, product updates, and offers from JobHuntly.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPrefs.marketingEmails}
                    onChange={() =>
                      setNotifPrefs((p) => ({ ...p, marketingEmails: !p.marketingEmails }))
                    }
                  />
                </label>
              </div>
            </>
          )}

          <div className="settings-footer">
            {saved && <span className="settings-saved-msg">Saved!</span>}
            <button type="submit" className="btn-save-profile">
              {activeTab === 'profile' ? 'Save Profile' : activeTab === 'login' ? 'Save Changes' : 'Save Preferences'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}