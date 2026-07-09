import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Building,
  Users,
  FileText,
  Calendar,
  Settings as SettingsIcon,
  HelpCircle,
  Plus,
  ChevronDown,
  ImageUp,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Smile,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Grid3x3,
  List as ListIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './Dashboard.css';
import './EmployerDashboard.css';
import './EmployerSettings.css';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'social', label: 'Social Links' },
  { key: 'team', label: 'Team' },
];

const EMPLOYEE_RANGES = ['1 - 50', '51 - 200', '201 - 500', '501 - 1000', '1000+'];
const INDUSTRIES = [
  'Technology',
  'Marketing',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const TEAM_MEMBERS = [
  { name: 'Célestin Gardinier', role: 'CEO & Co-Founder', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Reynaud Colbert', role: 'Co-Founder', avatar: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Arienne Lyon', role: 'Managing Director', avatar: 'https://i.pravatar.cc/150?img=32' },
  { name: 'Bernard Alexander', role: 'Managing Director', avatar: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Christine Jhonson', role: 'Managing Director', avatar: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Aaron Morgan', role: 'Managing Director', avatar: 'https://i.pravatar.cc/150?img=15' },
];

export default function EmployerSettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [saved, setSaved] = useState(false);

  const [company, setCompany] = useState({
    name: 'Nomad',
    website: 'https://www.nomad.com',
    locations: ['England', 'Japan', 'Australia'],
    employees: '1 - 50',
    industry: 'Technology',
    foundedDay: '31',
    foundedMonth: 'July',
    foundedYear: '2021',
    techStack: ['HTML 5', 'CSS 3', 'Javascript'],
    description:
      'Nomad is part of the Information Technology Industry. We believe travellers want to experience real life and meet local people. Nomad has 30 total employees across all of its locations and generates $1.50 million in sales.',
  });

  const [locationInput, setLocationInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const [social, setSocial] = useState({
    instagram: 'https://www.instagram.com/nomad/',
    twitter: 'https://twitter.com/nomad/',
    facebook: 'https://web.facebook.com/nomad/',
    linkedin: '',
    youtube: '',
  });

  const [members, setMembers] = useState(TEAM_MEMBERS);
  const [teamView, setTeamView] = useState('grid');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user?.name || 'Maria Kelly';
  const displayEmail = user?.email || 'mariakelly@email.com';
  const displayAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'company-profile', label: 'Company Profile', icon: Building, href: '/employer/company-profile' },
    { key: 'all-applicants', label: 'All Applicants', icon: Users, href: '/employer/applicants' },
    { key: 'job-listing', label: 'Job Listing', icon: FileText, href: '/employer/job-listing' },
    { key: 'my-schedule', label: 'My Schedule', icon: Calendar, href: '/employer/my-schedule' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: SettingsIcon, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  const addLocation = (e) => {
    if (e.key !== 'Enter' || !locationInput.trim()) return;
    e.preventDefault();
    const value = locationInput.trim();
    if (!company.locations.includes(value)) {
      setCompany((c) => ({ ...c, locations: [...c.locations, value] }));
    }
    setLocationInput('');
  };

  const removeLocation = (loc) => {
    setCompany((c) => ({ ...c, locations: c.locations.filter((l) => l !== loc) }));
  };

  const addTech = (e) => {
    if (e.key !== 'Enter' || !techInput.trim()) return;
    e.preventDefault();
    const value = techInput.trim();
    if (!company.techStack.includes(value)) {
      setCompany((c) => ({ ...c, techStack: [...c.techStack, value] }));
    }
    setTechInput('');
  };

  const removeTech = (tech) => {
    setCompany((c) => ({ ...c, techStack: c.techStack.filter((t) => t !== tech) }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

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

        <div
          className="sidebar-profile"
          style={{ cursor: 'pointer' }}
          onClick={handleLogout}
          title="Click to Logout"
        >
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

        <h1 className="es-page-title">Settings</h1>

        {/* Tabs */}
        <div className="es-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`es-tab ${activeTab === tab.key ? 'es-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------- Overview Tab ---------------- */}
        {activeTab === 'overview' && (
          <form className="es-card" onSubmit={handleSave}>
            <div className="es-section-header">
              <h3>Basic Information</h3>
              <p>This is company information that you can update anytime.</p>
            </div>

            <div className="es-row">
              <div className="es-row-label">
                <span>Company Logo</span>
                <p>This image will be shown publicly as company logo.</p>
              </div>
              <div className="es-row-field es-logo-row">
                <div className="es-company-logo">N</div>
                <label className="es-upload-box">
                  <ImageUp size={22} />
                  <span>
                    <strong>Click to replace</strong> or drag and drop
                  </span>
                  <span className="es-upload-hint">SVG, PNG, JPG or GIF (max. 400 x 400px)</span>
                  <input type="file" accept="image/*" hidden />
                </label>
              </div>
            </div>

            <div className="es-row">
              <div className="es-row-label">
                <span>Company Details</span>
                <p>Introduce your company core info quickly to users by fill up company details</p>
              </div>
              <div className="es-row-field">
                <div className="es-field">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={company.name}
                    onChange={(e) => setCompany((c) => ({ ...c, name: e.target.value }))}
                  />
                </div>

                <div className="es-field">
                  <label>Website</label>
                  <input
                    type="text"
                    value={company.website}
                    onChange={(e) => setCompany((c) => ({ ...c, website: e.target.value }))}
                  />
                </div>

                <div className="es-field">
                  <label>Location</label>
                  <div className="es-tags-input">
                    {company.locations.map((loc) => (
                      <span className="es-tag" key={loc}>
                        {loc}
                        <button type="button" onClick={() => removeLocation(loc)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder={company.locations.length ? '' : 'Add a location'}
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={addLocation}
                    />
                  </div>
                </div>

                <div className="es-field-row">
                  <div className="es-field">
                    <label>Employee</label>
                    <select
                      value={company.employees}
                      onChange={(e) => setCompany((c) => ({ ...c, employees: e.target.value }))}
                    >
                      {EMPLOYEE_RANGES.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="es-field">
                    <label>Industry</label>
                    <select
                      value={company.industry}
                      onChange={(e) => setCompany((c) => ({ ...c, industry: e.target.value }))}
                    >
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="es-field">
                  <label>Date Founded</label>
                  <div className="es-date-row">
                    <select
                      value={company.foundedDay}
                      onChange={(e) => setCompany((c) => ({ ...c, foundedDay: e.target.value }))}
                    >
                      {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      value={company.foundedMonth}
                      onChange={(e) => setCompany((c) => ({ ...c, foundedMonth: e.target.value }))}
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={company.foundedYear}
                      onChange={(e) => setCompany((c) => ({ ...c, foundedYear: e.target.value }))}
                    >
                      {[...Array(40)].map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="es-field">
                  <label>Tech Stack</label>
                  <div className="es-tags-input">
                    {company.techStack.map((tech) => (
                      <span className="es-tag" key={tech}>
                        {tech}
                        <button type="button" onClick={() => removeTech(tech)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder={company.techStack.length ? '' : 'Add a technology'}
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={addTech}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="es-row es-row--last">
              <div className="es-row-label">
                <span>About Company</span>
                <p>Brief description for your company. URLs are hyperlinked.</p>
              </div>
              <div className="es-row-field">
                <div className="es-richtext">
                  <textarea
                    maxLength={500}
                    value={company.description}
                    onChange={(e) => setCompany((c) => ({ ...c, description: e.target.value }))}
                  />
                  <div className="es-richtext-toolbar">
                    <div className="es-richtext-icons">
                      <Smile size={16} />
                      <Bold size={16} />
                      <Italic size={16} />
                      <ListOrdered size={16} />
                      <List size={16} />
                      <Link2 size={16} />
                    </div>
                    <span className="es-char-count">{company.description.length}/500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="es-card-footer">
              {saved && <span className="es-saved-msg">Saved!</span>}
              <button type="submit" className="es-btn es-btn--primary">
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* ---------------- Social Links Tab ---------------- */}
        {activeTab === 'social' && (
          <form className="es-card" onSubmit={handleSave}>
            <div className="es-row es-row--last">
              <div className="es-row-label">
                <span>Basic Information</span>
                <p>
                  Add elsewhere links to your company profile. You can add only username without
                  full https links.
                </p>
              </div>
              <div className="es-row-field">
                <div className="es-field">
                  <label>
                    <Instagram size={14} /> Instagram
                  </label>
                  <input
                    type="text"
                    value={social.instagram}
                    onChange={(e) => setSocial((s) => ({ ...s, instagram: e.target.value }))}
                    placeholder="https://www.instagram.com/yourcompany/"
                  />
                </div>
                <div className="es-field">
                  <label>
                    <Twitter size={14} /> Twitter
                  </label>
                  <input
                    type="text"
                    value={social.twitter}
                    onChange={(e) => setSocial((s) => ({ ...s, twitter: e.target.value }))}
                    placeholder="https://twitter.com/yourcompany/"
                  />
                </div>
                <div className="es-field">
                  <label>
                    <Facebook size={14} /> Facebook
                  </label>
                  <input
                    type="text"
                    value={social.facebook}
                    onChange={(e) => setSocial((s) => ({ ...s, facebook: e.target.value }))}
                    placeholder="https://web.facebook.com/yourcompany/"
                  />
                </div>
                <div className="es-field">
                  <label>
                    <Linkedin size={14} /> Linkedin
                  </label>
                  <input
                    type="text"
                    value={social.linkedin}
                    onChange={(e) => setSocial((s) => ({ ...s, linkedin: e.target.value }))}
                    placeholder="Enter your LinkedIn address"
                  />
                </div>
                <div className="es-field">
                  <label>
                    <Youtube size={14} /> Youtube
                  </label>
                  <input
                    type="text"
                    value={social.youtube}
                    onChange={(e) => setSocial((s) => ({ ...s, youtube: e.target.value }))}
                    placeholder="Enter your youtube address"
                  />
                </div>
              </div>
            </div>

            <div className="es-card-footer">
              {saved && <span className="es-saved-msg">Saved!</span>}
              <button type="submit" className="es-btn es-btn--primary">
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* ---------------- Team Tab ---------------- */}
        {activeTab === 'team' && (
          <div className="es-card">
            <div className="es-row es-row--last es-row--team">
              <div className="es-row-label">
                <span>Basic Information</span>
                <p>Add team members of your company</p>
              </div>
              <div className="es-row-field">
                <div className="es-team-header">
                  <h3>{members.length} Members</h3>
                  <div className="es-team-header-actions">
                    <button type="button" className="es-add-member-btn">
                      <Plus size={14} /> Add Members
                    </button>
                    <div className="es-view-toggle">
                      <button
                        className={teamView === 'grid' ? 'es-view-toggle--active' : ''}
                        onClick={() => setTeamView('grid')}
                        type="button"
                      >
                        <Grid3x3 size={16} />
                      </button>
                      <button
                        className={teamView === 'list' ? 'es-view-toggle--active' : ''}
                        onClick={() => setTeamView('list')}
                        type="button"
                      >
                        <ListIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={teamView === 'grid' ? 'es-team-grid' : 'es-team-list'}>
                  {members.map((member) => (
                    <div className="es-team-card" key={member.name}>
                      <img src={member.avatar} alt={member.name} className="es-team-avatar" />
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                      <div className="es-team-social">
                        <Instagram size={14} />
                        <Linkedin size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="es-card-footer">
              {saved && <span className="es-saved-msg">Saved!</span>}
              <button type="button" className="es-btn es-btn--primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
