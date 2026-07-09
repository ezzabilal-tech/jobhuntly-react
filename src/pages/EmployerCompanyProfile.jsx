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
  Eye,
  Settings2,
  Pencil,
  PlusCircle,
  Flame,
  Briefcase,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Instagram,
  Stethoscope,
  Waves,
  GraduationCap,
  Tent,
  Coffee,
  Bus,
  ArrowRight,
} from 'lucide-react';
import { SiHtml5, SiCss, SiJavascript, SiRuby, SiFramer } from 'react-icons/si';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './Dashboard.css';
import './EmployerDashboard.css';
import './EmployerCompanyProfile.css';

const company = {
  name: 'Nomad',
  initial: 'N',
  website: 'https://nomad.com',
  founded: 'July 31, 2011',
  employees: '4000+',
  location: '20 countries',
  industry: 'Social & Non-Profit',
  about:
    "Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure\u2014from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud.",
  contact: [
    { icon: Twitter, label: 'twitter.com/Nomad', href: 'https://twitter.com/Nomad' },
    { icon: Facebook, label: 'facebook.com/NomadHQ', href: 'https://facebook.com/NomadHQ' },
    { icon: Linkedin, label: 'linkedin.com/company/nomad', href: 'https://linkedin.com/company/nomad' },
    { icon: Mail, label: 'nomad@gmail.com', href: 'mailto:nomad@gmail.com' },
  ],
  techStack: [
    { icon: SiHtml5, label: 'HTML 5', color: '#E44D26' },
    { icon: SiCss, label: 'CSS 3', color: '#1572B6' },
    { icon: SiJavascript, label: 'JavaScript', color: '#F0DB4F' },
    { icon: SiRuby, label: 'Ruby', color: '#CC342D' },
    { icon: 'dot', label: 'Mixpanel', color: '#7856FF' },
    { icon: SiFramer, label: 'Framer', color: '#0055FF' },
  ],
  countries: [
    { name: 'United States', flag: '\ud83c\uddfa\ud83c\uddf8', hq: true },
    { name: 'England', flag: '\ud83c\uddec\ud83c\udde7', hq: false },
    { name: 'Japan', flag: '\ud83c\uddef\ud83c\uddf5', hq: false },
    { name: 'Australia', flag: '\ud83c\udde6\ud83c\uddfa', hq: false },
    { name: 'China', flag: '\ud83c\udde8\ud83c\uddf3', hq: false },
  ],
  photos: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&auto=format&fit=crop&q=80',
  ],
  team: [
    { name: 'C\u00e9lestin Gardinier', role: 'CEO & Co-Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Reynaud Colbert', role: 'Co-Founder', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { name: 'Arienne Lyon', role: 'Managing Director', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
  ],
  teamTotal: 47,
};

const perks = [
  { icon: Stethoscope, title: 'Full Healthcare', desc: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
  { icon: Waves, title: 'Unlimited Vacation', desc: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.' },
  { icon: GraduationCap, title: 'Skill Development', desc: "We believe in always learning and leveling up our skills. Whether it's a conference or online course." },
  { icon: Tent, title: 'Team Summits', desc: 'Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.' },
  { icon: Coffee, title: 'Remote Working', desc: 'You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.' },
  { icon: Bus, title: 'Commuter Benefits', desc: "We're grateful for all the time and energy each team member puts into getting to work every day." },
];

const openPositions = [
  { title: 'Social Media Assistant', company: 'Nomad', location: 'Paris, France', initial: 'N', color: '#56CDAD', type: 'Full-Time', tags: ['Marketing', 'Design'] },
  { title: 'Brand Designer', company: 'Dropbox', location: 'San Francisco, USA', initial: 'D', color: '#0061FF', type: 'Full-Time', tags: ['Marketing', 'Design'] },
  { title: 'Interactive Developer', company: 'Terraform', location: 'Hamburg, Germany', initial: 'T', color: '#22C3D6', type: 'Full-Time', tags: ['Marketing', 'Design'] },
  { title: 'HR Manager', company: 'Packer', location: 'Lucern, Switzerland', initial: 'P', color: '#E0483E', type: 'Full-Time', tags: ['Marketing', 'Design'] },
];

export default function EmployerCompanyProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
                className={`sidebar-item ${item.key === 'company-profile' ? 'sidebar-item--active' : ''}`}
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
              <div className="company-dropdown-logo">{company.initial}</div>
              <div className="company-dropdown-info">
                <span className="company-dropdown-sub">Company</span>
                <span className="company-dropdown-name">
                  {company.name} <ChevronDown size={14} />
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

        <div className="ecp-scroll">
          {/* Company header card */}
          <div className="ecp-header-card">
            <button className="ecp-edit-logo-btn"><Pencil size={13} /></button>
            <div className="ecp-header-top">
              <div className="ecp-header-left">
                <div className="ecp-logo">{company.initial}</div>
                <div>
                  <h1 className="ecp-company-name">{company.name}</h1>
                  <a href={company.website} target="_blank" rel="noreferrer" className="ecp-website">
                    {company.website}
                  </a>
                </div>
              </div>
              <div className="ecp-header-actions">
                <button className="btn-outline-purple">
                  <Eye size={16} /> Public View
                </button>
                <button className="btn-outline-purple">
                  <Settings2 size={16} /> Profile Settings
                </button>
              </div>
            </div>

            <div className="ecp-stats-row">
              <div className="ecp-stat">
                <Flame size={18} className="ecp-stat-icon" />
                <div>
                  <span className="ecp-stat-label">Founded</span>
                  <span className="ecp-stat-value">{company.founded}</span>
                </div>
              </div>
              <div className="ecp-stat">
                <Users size={18} className="ecp-stat-icon" />
                <div>
                  <span className="ecp-stat-label">Employees</span>
                  <span className="ecp-stat-value">{company.employees}</span>
                </div>
              </div>
              <div className="ecp-stat">
                <MapPin size={18} className="ecp-stat-icon" />
                <div>
                  <span className="ecp-stat-label">Location</span>
                  <span className="ecp-stat-value">{company.location}</span>
                </div>
              </div>
              <div className="ecp-stat">
                <Briefcase size={18} className="ecp-stat-icon" />
                <div>
                  <span className="ecp-stat-label">Industry</span>
                  <span className="ecp-stat-value">{company.industry}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile + Tech stack */}
          <div className="ecp-grid-2col">
            <div className="ecp-card">
              <div className="ecp-card-head">
                <h3>Company Profile</h3>
                <button className="ecp-icon-btn"><Pencil size={14} /></button>
              </div>
              <p className="ecp-about">{company.about}</p>
            </div>

            <div className="ecp-card">
              <div className="ecp-card-head">
                <h3>Tech Stack</h3>
                <div className="ecp-card-head-actions">
                  <button className="ecp-icon-btn"><PlusCircle size={16} /></button>
                  <button className="ecp-icon-btn"><Pencil size={14} /></button>
                </div>
              </div>
              <div className="ecp-tech-grid">
                {company.techStack.map((t) => (
                  <div key={t.label} className="ecp-tech-item">
                    <div className="ecp-tech-icon" style={{ background: t.color }}>
                      {t.icon === 'dot' ? (
                        <span className="ecp-tech-dots">&bull;&bull;&bull;</span>
                      ) : (
                        <t.icon size={20} color="#fff" />
                      )}
                    </div>
                    <span>{t.label}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="ecp-link">
                View tech stack <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Contact + Office Locations */}
          <div className="ecp-grid-2col">
            <div className="ecp-card">
              <div className="ecp-card-head">
                <h3>Contact</h3>
                <div className="ecp-card-head-actions">
                  <button className="ecp-icon-btn"><PlusCircle size={16} /></button>
                  <button className="ecp-icon-btn"><Pencil size={14} /></button>
                </div>
              </div>
              <div className="ecp-contact-grid">
                {company.contact.map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="ecp-contact-pill">
                    <c.icon size={16} />
                    {c.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="ecp-card">
              <div className="ecp-card-head">
                <h3>Office Locations</h3>
                <div className="ecp-card-head-actions">
                  <button className="ecp-icon-btn"><PlusCircle size={16} /></button>
                  <button className="ecp-icon-btn"><Pencil size={14} /></button>
                </div>
              </div>
              <ul className="ecp-country-list">
                {company.countries.map((c) => (
                  <li key={c.name}>
                    <span className="ecp-flag">{c.flag}</span>
                    {c.name}
                    {c.hq && <span className="ecp-hq-pill">Head Quarters</span>}
                  </li>
                ))}
              </ul>
              <a href="#" className="ecp-link">
                View countries <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Working at Nomad photos */}
          <div className="ecp-card">
            <div className="ecp-card-head">
              <h3>Working at {company.name}</h3>
              <div className="ecp-card-head-actions">
                <button className="ecp-icon-btn"><PlusCircle size={16} /></button>
                <button className="ecp-icon-btn"><Pencil size={14} /></button>
              </div>
            </div>
            <div className="ecp-photos-grid">
              <div
                className="ecp-photo ecp-photo--main"
                style={{ backgroundImage: `url(${company.photos[0]})` }}
              />
              <div className="ecp-photos-side">
                {company.photos.slice(1).map((p, i) => (
                  <div key={i} className="ecp-photo" style={{ backgroundImage: `url(${p})` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="ecp-card">
            <div className="ecp-card-head">
              <h3>Team</h3>
              <div className="ecp-card-head-actions">
                <button className="ecp-icon-btn"><PlusCircle size={16} /></button>
                <button className="ecp-icon-btn"><Pencil size={14} /></button>
              </div>
            </div>
            <div className="ecp-team-grid">
              {company.team.map((m) => (
                <div key={m.name} className="ecp-team-card">
                  <img src={m.avatar} alt={m.name} className="ecp-team-avatar" />
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                  <div className="ecp-team-social">
                    <Instagram size={14} />
                    <Linkedin size={14} />
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="ecp-link">
              View all core teams <ArrowRight size={14} />
            </a>
          </div>

          {/* Benefit */}
          <div className="ecp-card">
            <div className="ecp-card-head">
              <h3>Benefit</h3>
              <div className="ecp-card-head-actions">
                <button className="ecp-icon-btn"><PlusCircle size={16} /></button>
                <button className="ecp-icon-btn"><Pencil size={14} /></button>
              </div>
            </div>
            <div className="ecp-perks-grid">
              {perks.map((p) => (
                <div key={p.title} className="ecp-perk">
                  <p.icon size={24} className="ecp-perk-icon" />
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="ecp-card">
            <div className="ecp-card-head">
              <h3>Open Positions</h3>
              <a href="#" className="ecp-link">
                Show all jobs <ArrowRight size={14} />
              </a>
            </div>
            <div className="ecp-jobs-list">
              {openPositions.map((job) => (
                <div key={job.title} className="ecp-job-row">
                  <div className="ecp-job-logo" style={{ background: job.color }}>
                    {job.initial}
                  </div>
                  <div className="ecp-job-info">
                    <h4>{job.title}</h4>
                    <p>{job.company} &bull; {job.location}</p>
                  </div>
                  <div className="ecp-job-tags">
                    <span className="ecp-tag ecp-tag--green">{job.type}</span>
                    {job.tags.map((t) => (
                      <span key={t} className="ecp-tag ecp-tag--orange">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}