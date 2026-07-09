import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
  Building,
  User,
  Settings,
  HelpCircle,
  Pencil,
  Plus,
  Mail,
  Phone,
  Globe,
  Instagram,
  Twitter,
  MapPin,
  Flag,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from '../components/NotificationPanel';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const dashboardHref = user?.role === 'company' ? '/employer/dashboard' : '/dashboard';
  const navigate = useNavigate();
  const [activeMenu] = useState('profile');
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user?.name || 'Jake Gyll';
  const displayEmail = user?.email || 'jakegyll@email.com';
  const displayAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80';

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: dashboardHref },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: 1, href: '/messages' },
    { key: 'applications', label: 'My Applications', icon: FileText, href: '/applications' },
    { key: 'find-jobs', label: 'Find Jobs', icon: Search, href: '/jobs' },
    { key: 'browse-companies', label: 'Browse Companies', icon: Building, href: '/companies' },
    { key: 'profile', label: 'My Public Profile', icon: User, href: '/profile' },
  ];

  const settingItems = [
    { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  const experiences = [
    {
      role: 'Product Designer',
      company: 'Twitter',
      logo: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/twitter.svg',
      logoColor: '#1DA1F2',
      type: 'Full-Time',
      duration: 'Jun 2019 - Present (1y 1m)',
      location: 'Manchester, UK',
      description:
        'Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.',
    },
    {
      role: 'Growth Marketing Designer',
      company: 'GoDaddy',
      logo: null,
      logoColor: '#3DCB6C',
      type: 'Full-Time',
      duration: 'Jun 2011 - May 2019 (8y)',
      location: 'Manchester, UK',
      description:
        'Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives',
    },
    {
      role: 'UI/UX Designer',
      company: 'Fab302',
      logo: null,
      logoColor: '#FF5A5F',
      type: 'Full-Time',
      duration: 'Jun 2009 - May 2011 (2y)',
      location: 'Manchester, UK',
      description:
        'Designed user interfaces and experiences for a range of client products, running usability testing sessions to validate design decisions.',
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Bridge',
      logo: null,
      logoColor: '#7C5CFC',
      type: 'Part-Time',
      duration: 'Jun 2007 - May 2009 (2y)',
      location: 'Manchester, UK',
      description:
        'Built and maintained marketing sites and internal tools using HTML, CSS and JavaScript.',
    },
    {
      role: 'Junior Designer',
      company: 'Studio Six',
      logo: null,
      logoColor: '#FF9A3E',
      type: 'Internship',
      duration: 'Jun 2006 - May 2007 (1y)',
      location: 'Manchester, UK',
      description: 'Supported the senior design team on branding and print collateral projects.',
    },
  ];

  const educations = [
    {
      school: 'Harvard University',
      logo: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=100&auto=format&fit=crop&q=80',
      degree: 'Postgraduate degree, Applied Psychology',
      duration: '2010 - 2012',
      description:
        'As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.',
    },
    {
      school: 'University of Toronto',
      logo: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=100&auto=format&fit=crop&q=80',
      degree: 'Bachelor of Arts, Visual Communication',
      duration: '2005 - 2009',
      description: '',
    },
    {
      school: 'Manchester College',
      logo: null,
      degree: 'A-Levels, Art & Design',
      duration: '2003 - 2005',
      description: '',
    },
    {
      school: 'Greenfield High School',
      logo: null,
      degree: 'High School Diploma',
      duration: '1999 - 2003',
      description: '',
    },
  ];

  const skills = ['Communication', 'Analytics', 'Facebook Ads', 'Content Planning', 'Community Manager'];

  const portfolios = [
    {
      title: 'Clinically - clinic & healthcare website',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80',
    },
    {
      title: 'Growthly - SaaS Analytics & Sales Website',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    },
    {
      title: 'Planna - Project Management App',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&auto=format&fit=crop&q=80',
    },
    {
      title: 'Furniro - furniture store website',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const visibleExperiences = showAllExperience ? experiences : experiences.slice(0, 2);
  const visibleEducations = showAllEducation ? educations : educations.slice(0, 2);

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
        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <h1>My Profile</h1>
          </div>
          <div className="dashboard-header-right">
            <Link to="/" className="btn-back-home">
              Back to homepage
            </Link>
            <NotificationPanel />
          </div>
        </header>

        <div className="profile-layout">
          {/* Left column */}
          <div className="profile-main-col">
            {/* Banner + basic info */}
            <div className="profile-card profile-banner-card">
              <div className="profile-banner">
                <button className="icon-edit-btn profile-banner-edit">
                  <Pencil size={14} />
                </button>
              </div>
              <div className="profile-identity">
                <img src={displayAvatar} alt={displayName} className="profile-avatar" />
                <div className="profile-identity-text">
                  <h2>{displayName}</h2>
                  <p>
                    Product Designer at <a href="#">Twitter</a>
                  </p>
                  <span className="profile-location">
                    <MapPin size={14} /> Manchester, UK
                  </span>
                </div>
                <button className="btn-edit-profile">Edit Profile</button>
              </div>
              <div className="profile-open-badge">
                <Flag size={13} />
                OPEN FOR OPPORTUNITIES
              </div>
            </div>

            {/* About */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h3>About Me</h3>
                <button className="icon-edit-btn">
                  <Pencil size={14} />
                </button>
              </div>
              <p className="profile-about-text">
                I'm a product designer + filmmaker currently working remotely at Twitter from
                beautiful Manchester, United Kingdom. I'm passionate about designing digital
                products that have a positive impact on the world.
              </p>
              <p className="profile-about-text">
                For 10 years, I've specialised in interface, experience &amp; interaction design as
                well as working in user research and product strategy for product agencies, big
                tech companies &amp; start-ups.
              </p>
            </div>

            {/* Experience */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h3>Experiences</h3>
                <button className="icon-add-btn">
                  <Plus size={16} />
                </button>
              </div>
              <div className="profile-list">
                {visibleExperiences.map((exp, i) => (
                  <div className="experience-row" key={i}>
                    <div
                      className="experience-logo"
                      style={{ backgroundColor: exp.logo ? 'transparent' : `${exp.logoColor}1A` }}
                    >
                      {exp.logo ? (
                        <img src={exp.logo} alt={exp.company} />
                      ) : (
                        <span style={{ color: exp.logoColor }}>{exp.company[0]}</span>
                      )}
                    </div>
                    <div className="experience-details">
                      <div className="experience-details-top">
                        <div>
                          <h4>{exp.role}</h4>
                          <p className="experience-meta">
                            {exp.company} &middot; {exp.type} &middot; {exp.duration}
                          </p>
                          <p className="experience-location">{exp.location}</p>
                        </div>
                        <button className="icon-edit-btn">
                          <Pencil size={14} />
                        </button>
                      </div>
                      <p className="experience-description">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {experiences.length > 2 && (
                <button
                  className="show-more-btn"
                  onClick={() => setShowAllExperience(!showAllExperience)}
                >
                  {showAllExperience ? 'Show less' : `Show ${experiences.length - 2} more experiences`}
                </button>
              )}
            </div>

            {/* Education */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h3>Educations</h3>
                <button className="icon-add-btn">
                  <Plus size={16} />
                </button>
              </div>
              <div className="profile-list">
                {visibleEducations.map((edu, i) => (
                  <div className="experience-row" key={i}>
                    <div className="experience-logo experience-logo--school">
                      {edu.logo ? (
                        <img src={edu.logo} alt={edu.school} />
                      ) : (
                        <span>{edu.school[0]}</span>
                      )}
                    </div>
                    <div className="experience-details">
                      <div className="experience-details-top">
                        <div>
                          <h4>{edu.school}</h4>
                          <p className="experience-meta">{edu.degree}</p>
                          <p className="experience-location">{edu.duration}</p>
                        </div>
                        <button className="icon-edit-btn">
                          <Pencil size={14} />
                        </button>
                      </div>
                      {edu.description && (
                        <p className="experience-description">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {educations.length > 2 && (
                <button
                  className="show-more-btn"
                  onClick={() => setShowAllEducation(!showAllEducation)}
                >
                  {showAllEducation ? 'Show less' : `Show ${educations.length - 2} more educations`}
                </button>
              )}
            </div>

            {/* Skills */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h3>Skills</h3>
                <div className="profile-card-header-actions">
                  <button className="icon-add-btn">
                    <Plus size={16} />
                  </button>
                  <button className="icon-edit-btn">
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
              <div className="skills-list">
                {skills.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h3>Portfolios</h3>
                <button className="icon-add-btn">
                  <Plus size={16} />
                </button>
              </div>
              <div className="portfolio-grid">
                {portfolios.map((p) => (
                  <div className="portfolio-item" key={p.title}>
                    <div className="portfolio-thumb">
                      <img src={p.image} alt={p.title} />
                    </div>
                    <p>{p.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="profile-side-col">
            <div className="profile-card">
              <div className="profile-card-header">
                <h3>Additional Details</h3>
                <button className="icon-edit-btn">
                  <Pencil size={14} />
                </button>
              </div>
              <div className="detail-row">
                <Mail size={16} />
                <div>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{displayEmail}</span>
                </div>
              </div>
              <div className="detail-row">
                <Phone size={16} />
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">+44 1245 572 135</span>
                </div>
              </div>
              <div className="detail-row">
                <Globe size={16} />
                <div>
                  <span className="detail-label">Languages</span>
                  <span className="detail-value">English, French</span>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-header">
                <h3>Social Links</h3>
                <button className="icon-edit-btn">
                  <Pencil size={14} />
                </button>
              </div>
              <div className="detail-row">
                <Instagram size={16} />
                <div>
                  <span className="detail-label">Instagram</span>
                  <a className="detail-value detail-link" href="#">
                    instagram.com/jakegyll
                  </a>
                </div>
              </div>
              <div className="detail-row">
                <Twitter size={16} />
                <div>
                  <span className="detail-label">Twitter</span>
                  <a className="detail-value detail-link" href="#">
                    twitter.com/jakegyll
                  </a>
                </div>
              </div>
              <div className="detail-row">
                <Globe size={16} />
                <div>
                  <span className="detail-label">Website</span>
                  <a className="detail-value detail-link" href="#">
                    www.jakegyll.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}