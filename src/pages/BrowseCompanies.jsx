import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { companiesList } from '../data/companies';
import '../styles/global.css';
import './BrowseCompanies.css';

const recommendedNames = ['Nomad', 'Discord', 'Maze', 'Udacity', 'Webflow', 'Foundation'];
const moreNames = ['Pentagram', 'Wolff Olins', 'Clay', 'MediaMonks', 'Packer', 'Square', 'Divy'];

// Map the items to maintain their specific order as defined in the names arrays
const recommendedCompanies = recommendedNames
  .map(name => companiesList.find(c => c.name.toLowerCase() === name.toLowerCase()))
  .filter(Boolean);

const moreCompanies = moreNames
  .map(name => companiesList.find(c => c.name.toLowerCase() === name.toLowerCase()))
  .filter(Boolean);

const popularSearches = ['Twitter', 'Microsoft', 'Apple', 'Facebook', 'Fintech'];

const tagClass = (tag) => {
  if (tag === 'Technology') return 'pill pill-blue';
  if (tag === 'Crypto') return 'pill pill-purple';
  return 'pill pill-orange';
};

export default function BrowseCompanies() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Florence, Italy');

  const handleSearch = () => {
    navigate(`/companies/search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  // Only companies with a matching entry in CompanyProfile.jsx's `companies`
  // object will show a real profile page. Others fall back to "not found".
  const goToProfile = (name) => {
    navigate(`/companies/${name.toLowerCase()}`);
  };

  return (
    <>
      <Navbar active="companies" />

      <section className="companies-hero">
        <div className="container companies-hero__inner">
          <h1>
            Find your <span className="text-primary companies-hero__highlight">dream companies</span>
          </h1>
          <p className="companies-hero__subtitle">Find the dream companies you dream work for</p>

          <div className="companies-hero__search">
            <div className="companies-hero__search-field">
              <Search size={20} className="companies-hero__search-icon" />
              <input
                type="text"
                placeholder="Company name or keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="companies-hero__search-divider" />
            <div className="companies-hero__search-field">
              <MapPin size={20} className="companies-hero__search-icon" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="btn btn-primary companies-hero__search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="companies-hero__popular">
            <span>Popular :</span>
            {popularSearches.map((p) => (
              <a
                key={p}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setQuery(p);
                  navigate(`/companies/search?q=${encodeURIComponent(p)}&location=${encodeURIComponent(location)}`);
                }}
              >
                {p}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__header">
          <div>
            <h2>Recommended <span className="text-primary">Companies</span></h2>
            <p>Based on your profile, company preferences, and recent activity</p>
          </div>
        </div>

        <div className="company-grid">
          {recommendedCompanies.map((c) => (
            <div
              key={c.name}
              className="company-card"
              onClick={() => goToProfile(c.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="company-card__top">
                <div className="company-card__logo" style={{ background: c.color }}>
                  {c.icon ? <c.icon size={22} color="#fff" /> : c.initial}
                </div>
                <span className="pill pill-gray">{c.jobs} Jobs</span>
              </div>
              <h3>{c.name}</h3>
              <p className="company-card__desc">{c.description}</p>
              <div className="company-card__tags">
                {c.tags.map((t) => (
                  <span key={t} className={tagClass(t)}>{t}</span>
                ))}
              </div>
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
        <div className="more-companies-grid">
          {moreCompanies.map((c) => (
            <div
              key={c.name}
              className="mini-company-card"
              onClick={() => goToProfile(c.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="mini-company-card__logo" style={{ background: c.color }}>
                {c.icon ? <c.icon size={20} color="#fff" /> : <span>{c.initial}</span>}
              </div>
              <h4>{c.name}</h4>
              <p>3 Jobs</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
