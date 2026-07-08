import { useParams, Link } from 'react-router-dom';
import {
  Flame,
  Users,
  MapPin,
  Briefcase,
  Twitter,
  Facebook,
  Linkedin,
  ArrowRight,
  Instagram,
  Stethoscope,
  Waves,
  GraduationCap,
  Tent,
  Coffee,
  Bus,
  HeartHandshake,
} from 'lucide-react';
import { SiStripe, SiHtml5, SiCss, SiJavascript, SiRuby, SiFramer } from 'react-icons/si';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';
import './CompanyProfile.css';

// Add a new entry here for each company profile page you build.
// The key is the URL slug used in /companies/:id
const companies = {
  stripe: {
    name: 'Stripe',
    slug: 'stripe',
    logoIcon: SiStripe,
    logoColor: '#635BFF',
    jobsCount: 43,
    website: 'https://stripe.com',
    founded: 'July 31, 2011',
    employees: '4000+',
    location: '20 countries',
    industry: 'Payment Gateway',
    about:
      'Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe\u2019s software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure\u2014from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud.',
    contact: [
      { icon: Twitter, label: 'twitter.com/stripe', href: 'https://twitter.com/stripe' },
      { icon: Facebook, label: 'facebook.com/StripeHQ', href: 'https://facebook.com/StripeHQ' },
      { icon: Linkedin, label: 'linkedin.com/company/stripe', href: 'https://linkedin.com/company/stripe' },
    ],
    techStack: [
      { icon: SiHtml5, label: 'HTML 5', color: '#E44D26' },
      { icon: SiCss, label: 'CSS 3', color: '#1572B6' },
      { icon: SiJavascript, label: 'JavaScript', color: '#F0DB4F' },
      { icon: SiRuby, label: 'Ruby', color: '#CC342D' },
      { icon: 'dot', label: 'Mixpanel', color: '#7856FF' },
      { icon: SiFramer, label: 'Framer', color: '#0055FF' },
    ],
    countries: ['United States', 'England', 'Japan', 'Australia', 'China'],
    team: [
      { name: 'C\u00e9lestin Gardinier', role: 'CEO & Co-Founder', color: '#F0997B' },
      { name: 'Reynaud Colbert', role: 'Co-Founder', color: '#85B7EB' },
      { name: 'Arienne Lyon', role: 'Managing Director', color: '#97C459' },
      { name: 'Bernard Alexander', role: 'Managing Director', color: '#B4B2A9' },
      { name: 'Christine Jhonson', role: 'Managing Director', color: '#2C2C2A' },
    ],
    teamTotal: 47,
  },
};

const perks = [
  { icon: Stethoscope, title: 'Full Healthcare', desc: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
  { icon: Waves, title: 'Unlimited Vacation', desc: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.' },
  { icon: GraduationCap, title: 'Skill Development', desc: "We believe in always learning and leveling up our skills. Whether it's a conference or online course." },
  { icon: Tent, title: 'Team Summits', desc: 'Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.' },
  { icon: Coffee, title: 'Remote Working', desc: 'You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.' },
  { icon: Bus, title: 'Commuter Benefits', desc: "We're grateful for all the time and energy each team member puts into getting to work every day." },
  { icon: HeartHandshake, title: 'We give back.', desc: 'We anonymously match any donation our employees make (up to $/\u20ac 600) so they can support the organizations they care about most-times two.' },
];

export default function CompanyProfile() {
  const { id } = useParams();
  const company = companies[id];

  if (!company) {
    return (
      <>
        <Navbar active="companies" />
        <div className="company-not-found">
          <h2>Company not found</h2>
          <p>This company profile hasn't been added yet. Check back soon, or browse other companies.</p>
          <Link to="/companies" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>
            Browse Companies
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const LogoIcon = company.logoIcon;

  return (
    <>
      <Navbar active="companies" />

      <div className="company-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/companies">Companies</Link> / {company.name}
        </div>
      </div>

      <section className="company-header">
        <div className="container company-header__inner">
          <div className="company-header__logo" style={{ background: company.logoColor }}>
            <LogoIcon size={40} color="#fff" />
          </div>
          <div className="company-header__info">
            <div className="company-header__title-row">
              <h1>{company.name}</h1>
              <span className="pill pill-blue">{company.jobsCount} Jobs</span>
            </div>
            <a href={company.website} target="_blank" rel="noreferrer" className="company-header__website">
              {company.website}
            </a>
            <div className="company-header__stats">
              <div className="company-header__stat">
                <Flame size={16} />
                <div>
                  <span className="company-header__stat-label">Founded</span>
                  <span className="company-header__stat-value">{company.founded}</span>
                </div>
              </div>
              <div className="company-header__stat">
                <Users size={16} />
                <div>
                  <span className="company-header__stat-label">Employees</span>
                  <span className="company-header__stat-value">{company.employees}</span>
                </div>
              </div>
              <div className="company-header__stat">
                <MapPin size={16} />
                <div>
                  <span className="company-header__stat-label">Location</span>
                  <span className="company-header__stat-value">{company.location}</span>
                </div>
              </div>
              <div className="company-header__stat">
                <Briefcase size={16} />
                <div>
                  <span className="company-header__stat-label">Industry</span>
                  <span className="company-header__stat-value">{company.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container company-layout">
        <div className="company-main">
          <h2>Company Profile</h2>
          <p className="company-about">{company.about}</p>

          <h2>Contact</h2>
          <div className="company-contact">
            {company.contact.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="company-contact__link">
                <c.icon size={16} />
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <aside className="company-sidebar">
          <h2>Tech stack</h2>
          <p className="company-sidebar__subtitle">Learn about the technology and tools that {company.name} uses</p>
          <div className="tech-stack-grid">
            {company.techStack.map((t) => (
              <div key={t.label} className="tech-stack-item">
                <div className="tech-stack-item__icon" style={{ background: t.color }}>
                  {t.icon === 'dot' ? (
                    <span className="tech-stack-item__dots">&bull;&bull;&bull;</span>
                  ) : (
                    <t.icon size={20} color="#fff" />
                  )}
                </div>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
          <a href="#" className="company-sidebar__link">
            View tech stack <ArrowRight size={14} />
          </a>
        </aside>
      </section>

      <section className="container company-layout company-layout--photos">
        <div className="company-photos">
          <div className="company-photo company-photo--main" />
          <div className="company-photo" />
          <div className="company-photo" />
          <div className="company-photo" />
        </div>

        <aside className="company-sidebar">
          <h2>Office Location</h2>
          <p className="company-sidebar__subtitle">{company.name} offices spread across {company.location}</p>
          <ul className="country-list">
            {company.countries.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <a href="#" className="company-sidebar__link">
            View countries <ArrowRight size={14} />
          </a>
        </aside>
      </section>

      <section className="container company-team">
        <div className="section__header">
          <h2>Team</h2>
          <a href="#" className="section__link">See all ({company.teamTotal})</a>
        </div>

        <div className="team-grid">
          {company.team.map((member) => (
            <div key={member.name} className="team-card">
              <div className="team-card__avatar" style={{ background: member.color }} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
              <div className="team-card__social">
                <Instagram size={14} />
                <Linkedin size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container perks">
        <h2>Perks &amp; Benefits</h2>
        <p className="perks__subtitle">This job comes with several perks and benefits</p>

        <div className="perks-grid">
          {perks.map((p) => (
            <div key={p.title} className="perk-card">
              <p.icon size={26} className="perk-card__icon" />
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}