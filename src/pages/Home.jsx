import {
  Search,
  MapPin,
  ArrowRight,
  TrendingUp,
  Palette,
  BarChart2,
  Megaphone,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
} from 'lucide-react';
import {
  SiDropbox,
  SiGodaddy,
  SiX,
  SiNetlify,
  SiUdacity,
  SiWebflow,
} from 'react-icons/si';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';
import './Home.css';

const categories = [
  { name: 'Design', count: 235, icon: Palette },
  { name: 'Sales', count: 756, icon: BarChart2 },
  { name: 'Marketing', count: 140, icon: Megaphone, active: true },
  { name: 'Finance', count: 325, icon: Wallet },
  { name: 'Technology', count: 436, icon: Monitor },
  { name: 'Engineering', count: 542, icon: Code2 },
  { name: 'Business', count: 211, icon: Briefcase },
  { name: 'Human Resource', count: 346, icon: Users },
];

const featuredJobs = [
  { title: 'Email Marketing', company: 'Revolut', initial: 'R', color: '#25324B', location: 'Madrid, Spain', type: 'Full-Time', tags: ['Marketing', 'Design'] },
  { title: 'Brand Designer', company: 'Dropbox', initial: 'D', color: '#4640DE', icon: SiDropbox, location: 'San Francisco, US', type: 'Full-Time', tags: ['Design', 'Business'] },
  { title: 'Email Marketing', company: 'Pitch', initial: 'P', color: '#111827', location: 'Berlin, Germany', type: 'Full-Time', tags: ['Marketing'] },
  { title: 'Visual Designer', company: 'Blinklist', initial: 'B', color: '#56CDAD', location: 'Granada, Spain', type: 'Full-Time', tags: ['Design'] },
  { title: 'Product Designer', company: 'ClassPass', initial: 'C', color: '#4640DE', location: 'Manchester, UK', type: 'Full-Time', tags: ['Marketing', 'Design'] },
  { title: 'Lead Designer', company: 'Canva', initial: 'C', color: '#26A4FF', location: 'Ontario, Canada', type: 'Full-Time', tags: ['Design', 'Business'] },
  { title: 'Brand Strategist', company: 'GoDaddy', initial: 'G', color: '#FF6550', icon: SiGodaddy, location: 'Marseille, France', type: 'Full-Time', tags: ['Marketing'] },
  { title: 'Data Analyst', company: 'Twitter', initial: 'T', color: '#26A4FF', icon: SiX, location: 'San Diego, US', type: 'Full-Time', tags: ['Technology'] },
];

const latestJobs = [
  [
    { title: 'Social Media Assistant', company: 'Nomad', initial: 'N', color: '#56CDAD', location: 'Paris, France' },
    { title: 'Social Media Assistant', company: 'Netlify', initial: 'N', color: '#26A4FF', icon: SiNetlify, location: 'Paris, France' },
  ],
  [
    { title: 'Brand Designer', company: 'Dropbox', initial: 'D', color: '#4640DE', icon: SiDropbox, location: 'San Fransisco, USA' },
    { title: 'Brand Designer', company: 'Maze', initial: 'M', color: '#4640DE', location: 'San Fransisco, USA' },
  ],
  [
    { title: 'Interactive Developer', company: 'Terraform', initial: 'T', color: '#4640DE', location: 'Hamburg, Germany' },
    { title: 'Interactive Developer', company: 'Udacity', initial: 'U', color: '#26A4FF', icon: SiUdacity, location: 'Hamburg, Germany' },
  ],
  [
    { title: 'HR Manager', company: 'Packer', initial: 'P', color: '#FF6550', location: 'Lucern, Switzerland' },
    { title: 'HR Manager', company: 'Webflow', initial: 'W', color: '#4640DE', icon: SiWebflow, location: 'Lucern, Switzerland' },
  ],
];

const companies = ['Vodafone', 'Intel', 'Tesla', 'AMD', 'Talkit'];

export default function Home() {
  return (
    <>
      <Navbar active="home" />

      <section className="hero">
        <div className="container hero__inner">
          <h1>
            Discover <br />
            more than <span className="hero__highlight">
              5000+ Jobs
              <svg className="hero__highlight-underline" viewBox="0 0 220 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 14 C 60 6, 140 6, 216 12" stroke="#26A4FF" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="hero__subtitle">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          <div className="hero__search">
            <div className="hero__search-field">
              <Search size={20} className="hero__search-icon" />
              <input type="text" placeholder="Job title or keyword" />
            </div>
            <div className="hero__search-divider" />
            <div className="hero__search-field">
              <MapPin size={20} className="hero__search-icon" />
              <input type="text" placeholder="Florence, Italy" />
            </div>
            <button className="btn btn-primary hero__search-btn">Search my job</button>
          </div>

          <div className="hero__popular">
            <span>Popular :</span>
            <a href="#">UI Designer</a>
            <a href="#">UX Researcher</a>
            <a href="#">Android</a>
            <a href="#">Admin</a>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true" />
      </section>

      <section className="companies-strip">
        <div className="container">
          <p className="companies-strip__label">Companies we helped grow</p>
          <div className="companies-strip__inner">
            {companies.map((c) => (
              <span key={c} className="companies-strip__name">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__header">
          <div>
            <h2>Explore by <span className="text-primary">category</span></h2>
          </div>
          <a href="/categories" className="section__link">
            Show all jobs <ArrowRight size={16} />
          </a>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <div key={cat.name} className={`category-card${cat.active ? ' category-card--active' : ''}`}>
              <span className="category-card__icon">
                <cat.icon size={24} />
              </span>
              <h3>{cat.name}</h3>
              <p>{cat.count} jobs available</p>
              <ArrowRight size={16} className="category-card__arrow" />
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <div className="cta__text">
            <TrendingUp size={40} />
            <h2>Start posting jobs today</h2>
            <p>Start posting jobs for only $10.</p>
            <a href="/signup" className="btn btn-white">Sign Up For Free</a>
          </div>

          <div className="cta__preview" aria-hidden="true">
            <div className="cta__preview-card">
              <div className="cta__preview-topbar">
                <span className="cta__preview-dot" />
                <span className="cta__preview-dot" />
                <span className="cta__preview-dot" />
              </div>
              <p className="cta__preview-greeting">Good morning, Maria</p>
              <div className="cta__preview-row">
                <div className="cta__preview-stat">
                  <span className="cta__preview-stat-label">Company Visitors</span>
                  <span className="cta__preview-stat-value">21,457</span>
                  <div className="cta__preview-bars">
                    {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                      <span key={i} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="cta__preview-stat cta__preview-stat--dark">
                  <span className="cta__preview-stat-label">Applicants Statistic</span>
                  <span className="cta__preview-stat-value">58</span>
                  <span className="cta__preview-stat-sub">Applicants</span>
                </div>
              </div>
              <p className="cta__preview-subheading">Recent Applicants</p>
              <div className="cta__preview-list">
                <div className="cta__preview-list-item" />
                <div className="cta__preview-list-item" />
                <div className="cta__preview-list-item" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__header">
          <div>
            <h2>Featured <span className="text-primary">jobs</span></h2>
            <p>Know your worth and find the job that qualify your life</p>
          </div>
          <a href="/jobs" className="section__link">
            Show all jobs <ArrowRight size={16} />
          </a>
        </div>

        <div className="job-grid">
          {featuredJobs.map((job, i) => (
            <div key={`${job.title}-${i}`} className="job-card">
              <div className="job-card__top">
                <div className="job-card__logo" style={{ background: job.color }}>
                  {job.icon ? <job.icon size={20} color="#fff" /> : job.initial}
                </div>
                <span className="pill pill-green">{job.type}</span>
              </div>
              <h3>{job.title}</h3>
              <p className="job-card__meta">
                {job.company} &middot; {job.location}
              </p>
              <div className="job-card__tags">
                {job.tags.map((t) => (
                  <span key={t} className="pill pill-blue">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section__header">
          <div>
            <h2>Latest <span className="text-primary">jobs open</span></h2>
          </div>
          <a href="/jobs" className="section__link">
            Show all jobs <ArrowRight size={16} />
          </a>
        </div>

        <div className="latest-grid">
          {latestJobs.map((pair, i) => (
            <div key={i} className="latest-row">
              {pair.map((job, j) => (
                <div key={j} className="latest-card">
                  <div className="latest-card__logo" style={{ background: job.color }}>
                    {job.icon ? <job.icon size={18} color="#fff" /> : job.initial}
                  </div>
                  <div className="latest-card__body">
                    <h3>{job.title}</h3>
                    <p className="latest-card__meta">
                      {job.company} &middot; {job.location}
                    </p>
                    <div className="latest-card__tags">
                      <span className="pill pill-green">Full-Time</span>
                      <span className="pill pill-orange">Marketing</span>
                      <span className="pill pill-blue">Design</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}