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
  Briefcase,
  ClipboardList,
  Gift,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Smile,
  X,
  HeartPulse,
  Waves,
  MonitorPlay,
  Users2,
  Home as HomeIcon,
  Bus,
  HandHeart,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './Dashboard.css';
import './EmployerDashboard.css';
import './PostJob.css';

const EMPLOYMENT_TYPES = ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contract'];

const JOB_CATEGORIES = [
  'Design',
  'Marketing',
  'Engineering',
  'Sales',
  'Customer Service',
  'Finance',
  'Human Resources',
  'Product',
];

const PERK_ICONS = {
  health: HeartPulse,
  vacation: Waves,
  skill: MonitorPlay,
  summit: Users2,
  remote: HomeIcon,
  commuter: Bus,
  giveback: HandHeart,
};

const PERK_LIBRARY = [
  { icon: 'health', title: 'Full Healthcare', text: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
  { icon: 'vacation', title: 'Unlimited Vacation', text: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.' },
  { icon: 'skill', title: 'Skill Development', text: "We believe in always learning and leveling up our skills. Whether it's a conference or online course." },
  { icon: 'summit', title: 'Team Summits', text: 'Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.' },
  { icon: 'remote', title: 'Remote Working', text: 'You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.' },
  { icon: 'commuter', title: 'Commuter Benefits', text: "We're grateful for all the time and energy each team member puts into getting to work every day." },
  { icon: 'giveback', title: 'We give back.', text: 'We anonymously match any donation our employees make so they can support the organizations they care about.' },
];

const STEPS = [
  { key: 1, label: 'Job Information', icon: Briefcase },
  { key: 2, label: 'Job Description', icon: ClipboardList },
  { key: 3, label: 'Perks & Benefit', icon: Gift },
];

export default function PostJob() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPerkPicker, setShowPerkPicker] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const [form, setForm] = useState({
    jobTitle: '',
    employmentTypes: [],
    salaryMin: 5000,
    salaryMax: 22000,
    category: '',
    requiredSkills: ['Graphic Design', 'Communication', 'Illustrator'],
    description: '',
    responsibilities: '',
    whoYouAre: '',
    niceToHaves: '',
    perks: [
      { icon: 'health', title: 'Full Healthcare', text: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
      { icon: 'vacation', title: 'Unlimited Vacation', text: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.' },
      { icon: 'skill', title: 'Skill Development', text: "We believe in always learning and leveling up our skills. Whether it's a conference or online course." },
    ],
  });

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
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  const toggleEmploymentType = (type) => {
    setForm((f) => ({
      ...f,
      employmentTypes: f.employmentTypes.includes(type)
        ? f.employmentTypes.filter((t) => t !== type)
        : [...f.employmentTypes, type],
    }));
  };

  const addSkill = (e) => {
    e.preventDefault();
    const value = newSkill.trim();
    if (value && !form.requiredSkills.includes(value)) {
      setForm((f) => ({ ...f, requiredSkills: [...f.requiredSkills, value] }));
    }
    setNewSkill('');
  };

  const removeSkill = (skill) => {
    setForm((f) => ({ ...f, requiredSkills: f.requiredSkills.filter((s) => s !== skill) }));
  };

  const addPerk = (perk) => {
    if (form.perks.some((p) => p.title === perk.title)) return;
    setForm((f) => ({ ...f, perks: [...f.perks, perk] }));
    setShowPerkPicker(false);
  };

  const removePerk = (title) => {
    setForm((f) => ({ ...f, perks: f.perks.filter((p) => p.title !== title) }));
  };

  const goNext = () => setStep((s) => Math.min(3, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleReview = () => {
    // Hook this up to your job creation logic / API call.
    console.log('Job to submit:', form);
    navigate('/employer/job-listing');
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
            <button className="btn-post-job-header" onClick={(e) => e.preventDefault()}>
              <Plus size={16} />
              Post a job
            </button>
            <NotificationPanel />
          </div>
        </header>

        <button className="pj-back-link" onClick={() => navigate(-1)}>
          <ChevronLeft size={18} />
          <span>Post a Job</span>
        </button>

        {/* Step indicator */}
        <div className="pj-steps">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const state = s.key === step ? 'active' : s.key < step ? 'done' : 'upcoming';
            return (
              <div className={`pj-step pj-step--${state}`} key={s.key}>
                <div className="pj-step-icon">
                  <Icon size={16} />
                </div>
                <div className="pj-step-text">
                  <span className="pj-step-label">Step {s.key}/3</span>
                  <span className="pj-step-title">{s.title || s.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pj-card">
          {step === 1 && (
            <StepJobInformation
              form={form}
              setForm={setForm}
              toggleEmploymentType={toggleEmploymentType}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />
          )}

          {step === 2 && <StepJobDescription form={form} setForm={setForm} />}

          {step === 3 && (
            <StepPerks
              form={form}
              removePerk={removePerk}
              showPerkPicker={showPerkPicker}
              setShowPerkPicker={setShowPerkPicker}
              addPerk={addPerk}
            />
          )}

          <div className="pj-card-footer">
            {step > 1 ? (
              <button className="pj-btn pj-btn--ghost" onClick={goBack}>
                Back
              </button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              <button className="pj-btn pj-btn--primary" onClick={goNext}>
                Next Step
              </button>
            ) : (
              <button className="pj-btn pj-btn--primary" onClick={handleReview}>
                Do a Review
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StepJobInformation({
  form,
  setForm,
  toggleEmploymentType,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
}) {
  return (
    <>
      <h2 className="pj-section-title">Basic Information</h2>
      <p className="pj-section-sub">This information will be displayed publicly</p>

      <div className="pj-row">
        <div className="pj-row-label">
          <span>Job Title</span>
          <p>Job titles must be descriptive of one position</p>
        </div>
        <div className="pj-row-field">
          <input
            type="text"
            placeholder="e.g. Software Engineer"
            value={form.jobTitle}
            onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
          />
          <span className="pj-hint">At least 80 characters</span>
        </div>
      </div>

      <div className="pj-row">
        <div className="pj-row-label">
          <span>Type of Employment</span>
          <p>You can select multiple type of employment</p>
        </div>
        <div className="pj-row-field pj-checkbox-group">
          {EMPLOYMENT_TYPES.map((type) => (
            <label className="pj-checkbox" key={type}>
              <input
                type="checkbox"
                checked={form.employmentTypes.includes(type)}
                onChange={() => toggleEmploymentType(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pj-row">
        <div className="pj-row-label">
          <span>Salary</span>
          <p>Please specify the estimated salary range for the role. *You can leave this blank</p>
        </div>
        <div className="pj-row-field pj-salary-field">
          <div className="pj-salary-inputs">
            <div className="pj-salary-input">
              <span>$</span>
              <input
                type="number"
                value={form.salaryMin}
                onChange={(e) => setForm((f) => ({ ...f, salaryMin: Number(e.target.value) }))}
              />
            </div>
            <span className="pj-salary-to">to</span>
            <div className="pj-salary-input">
              <span>$</span>
              <input
                type="number"
                value={form.salaryMax}
                onChange={(e) => setForm((f) => ({ ...f, salaryMax: Number(e.target.value) }))}
              />
            </div>
          </div>
          <input
            className="pj-range"
            type="range"
            min={0}
            max={50000}
            step={500}
            value={form.salaryMax}
            onChange={(e) => setForm((f) => ({ ...f, salaryMax: Number(e.target.value) }))}
          />
        </div>
      </div>

      <div className="pj-row">
        <div className="pj-row-label">
          <span>Categories</span>
          <p>You can select multiple job categories</p>
        </div>
        <div className="pj-row-field">
          <span className="pj-field-title">Select Job Categories</span>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            <option value="">Select Job Categories</option>
            {JOB_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pj-row pj-row--last">
        <div className="pj-row-label">
          <span>Required Skills</span>
          <p>Add required skills for the job</p>
        </div>
        <div className="pj-row-field">
          <form className="pj-add-skill" onSubmit={addSkill}>
            <button type="submit" className="pj-add-skill-btn">
              + Add Skills
            </button>
            <input
              type="text"
              placeholder="Type a skill and press enter"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </form>
          <div className="pj-skill-tags">
            {form.requiredSkills.map((skill) => (
              <span className="pj-skill-tag" key={skill}>
                {skill}
                <button onClick={() => removeSkill(skill)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function RichTextField({ value, onChange, placeholder, maxLength = 500 }) {
  return (
    <div className="pj-richtext">
      <textarea
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="pj-richtext-toolbar">
        <div className="pj-richtext-icons">
          <Smile size={16} />
          <Bold size={16} />
          <Italic size={16} />
          <ListOrdered size={16} />
          <List size={16} />
          <Link2 size={16} />
        </div>
        <span className="pj-char-count">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

function StepJobDescription({ form, setForm }) {
  return (
    <>
      <h2 className="pj-section-title">Details</h2>
      <p className="pj-section-sub">
        Add the description of the job, responsibilities, who you are, and nice-to-haves.
      </p>

      <div className="pj-row">
        <div className="pj-row-label">
          <span>Job Descriptions</span>
          <p>Job titles must be descriptive of one position</p>
        </div>
        <div className="pj-row-field">
          <RichTextField
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            placeholder="Enter job description"
          />
        </div>
      </div>

      <div className="pj-row">
        <div className="pj-row-label">
          <span>Responsibilities</span>
          <p>Outline the core responsibilities of the position</p>
        </div>
        <div className="pj-row-field">
          <RichTextField
            value={form.responsibilities}
            onChange={(v) => setForm((f) => ({ ...f, responsibilities: v }))}
            placeholder="Enter job responsibilities"
          />
        </div>
      </div>

      <div className="pj-row">
        <div className="pj-row-label">
          <span>Who You Are</span>
          <p>Add your preferred candidates qualifications</p>
        </div>
        <div className="pj-row-field">
          <RichTextField
            value={form.whoYouAre}
            onChange={(v) => setForm((f) => ({ ...f, whoYouAre: v }))}
            placeholder="Enter qualifications"
          />
        </div>
      </div>

      <div className="pj-row pj-row--last">
        <div className="pj-row-label">
          <span>Nice-To-Haves</span>
          <p>
            Add nice-to-have skills and qualifications for the role to encourage a more diverse set
            of candidates to apply
          </p>
        </div>
        <div className="pj-row-field">
          <RichTextField
            value={form.niceToHaves}
            onChange={(v) => setForm((f) => ({ ...f, niceToHaves: v }))}
            placeholder="Enter nice-to-haves"
          />
        </div>
      </div>
    </>
  );
}

function StepPerks({ form, removePerk, showPerkPicker, setShowPerkPicker, addPerk }) {
  const available = PERK_LIBRARY.filter((p) => !form.perks.some((fp) => fp.title === p.title));

  return (
    <>
      <h2 className="pj-section-title">Basic Information</h2>
      <p className="pj-section-sub">List out your top perks and benefits.</p>

      <div className="pj-row pj-row--last pj-row--perks">
        <div className="pj-row-label">
          <span>Perks and Benefits</span>
          <p>Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees</p>
        </div>
        <div className="pj-row-field">
          <div className="pj-perks-header">
            <div className="pj-perk-picker-wrap">
              <button className="pj-add-perk-btn" onClick={() => setShowPerkPicker((v) => !v)}>
                <Plus size={14} /> Add Benefit
              </button>
              {showPerkPicker && (
                <div className="pj-perk-picker">
                  {available.length === 0 && <div className="pj-perk-picker-empty">All perks added</div>}
                  {available.map((perk) => (
                    <button key={perk.title} className="pj-perk-picker-item" onClick={() => addPerk(perk)}>
                      {perk.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pj-perks-grid">
            {form.perks.map((perk) => {
              const Icon = PERK_ICONS[perk.icon] || Gift;
              return (
                <div className="pj-perk-card" key={perk.title}>
                  <button className="pj-perk-remove" onClick={() => removePerk(perk.title)}>
                    <X size={14} />
                  </button>
                  <div className="pj-perk-icon">
                    <Icon size={20} />
                  </div>
                  <h4>{perk.title}</h4>
                  <p>{perk.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
