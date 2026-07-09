import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Bookmark } from 'lucide-react';
import {
  SiDropbox,
  SiTerraform,
  SiPacker,
  SiMaze,
  SiUdacity,
  SiNomad,
  SiRevolut,
} from 'react-icons/si';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';
import './FindJobs.css';

const jobs = [
  { title: 'Social Media Assistant', company: 'Nomad', icon: SiNomad, color: '#56CDAD', location: 'Paris, France', type: 'Full-Time', posted: '1 day ago', tags: ['Marketing', 'Design'], category: 'Marketing', applied: 5, capacity: 10 },
  { title: 'Brand Designer', company: 'Dropbox', icon: SiDropbox, color: '#4640DE', location: 'San Francisco, USA', type: 'Full-Time', posted: '1 day ago', tags: ['Design', 'Business'], category: 'Design', applied: 2, capacity: 10 },
  { title: 'Interactive Developer', company: 'Terraform', icon: SiTerraform, color: '#4640DE', location: 'Hamburg, Germany', type: 'Full-Time', posted: '2 days ago', tags: ['Marketing', 'Design'], category: 'Engineering', applied: 8, capacity: 12 },
  { title: 'Email Marketing', company: 'Revolut', icon: SiRevolut, color: '#25324B', location: 'Madrid, Spain', type: 'Full-Time', posted: '2 days ago', tags: ['Marketing', 'Design'], category: 'Marketing', applied: 0, capacity: 10 },
  { title: 'HR Manager', company: 'Packer', icon: SiPacker, color: '#FF6550', location: 'Lucerne, Switzerland', type: 'Full-Time', posted: '3 days ago', tags: ['Human Resource'], category: 'Human Resource', applied: 3, capacity: 10 },
  { title: 'Product Designer', company: 'Maze', icon: SiMaze, color: '#4640DE', location: 'San Francisco, USA', type: 'Full-Time', posted: '3 days ago', tags: ['Design'], category: 'Design', applied: 6, capacity: 10 },
  { title: 'Copywriter', company: 'Udacity', icon: SiUdacity, color: '#26A4FF', location: 'Bali, Indonesia', type: 'Part-Time', posted: '5 days ago', tags: ['Marketing', 'Design'], category: 'Marketing', applied: 4, capacity: 10 },
];

const filterGroups = [
  { title: 'Type of Employment', options: ['Full-time', 'Part-Time', 'Remote', 'Internship', 'Contract'] },
  { title: 'Categories', options: ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'] },
  { title: 'Job Level', options: ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'VP or Above'] },
  { title: 'Salary Range', options: ['$700 - $1000', '$100 - $1500', '$1500 - $2000', '$3000 or above'] },
];

const popularSearches = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

export default function FindJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedJobs, setAppliedJobs] = useState({});

  // Categories pre-checked/filtered from the ?category= query param (e.g. from Home page cards)
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Search bar state, initialized from ?title= and ?location= (e.g. from Home page search)
  const [keyword, setKeyword] = useState(searchParams.get('title') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');

  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategories(category ? [category] : []);

    setKeyword(searchParams.get('title') || '');
    setLocationQuery(searchParams.get('location') || '');
  }, [searchParams]);

  const toggleCategory = (opt) => {
    setSelectedCategories((prev) =>
      prev.includes(opt) ? prev.filter((c) => c !== opt) : [...prev, opt]
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (keyword.trim()) params.set('title', keyword.trim());
    else params.delete('title');

    if (locationQuery.trim()) params.set('location', locationQuery.trim());
    else params.delete('location');

    setSearchParams(params);
  };

  const handlePopularClick = (e, term) => {
    e.preventDefault();
    setKeyword(term);
    const params = new URLSearchParams(searchParams);
    params.set('title', term);
    setSearchParams(params);
  };

  const visibleJobs = useMemo(() => {
    const titleQuery = (searchParams.get('title') || '').trim().toLowerCase();
    const locQuery = (searchParams.get('location') || '').trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(job.category);

      const matchesTitle =
        !titleQuery ||
        job.title.toLowerCase().includes(titleQuery) ||
        job.company.toLowerCase().includes(titleQuery) ||
        job.tags.some((t) => t.toLowerCase().includes(titleQuery));

      const matchesLocation =
        !locQuery || job.location.toLowerCase().includes(locQuery);

      return matchesCategory && matchesTitle && matchesLocation;
    });
  }, [selectedCategories, searchParams]);

  const handleApply = (jobTitle, index) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      setAppliedJobs((prev) => ({ ...prev, [index]: true }));
      alert(`Congratulations! You have applied for the ${jobTitle} position.`);
    }
  };

  return (
    <>
      <Navbar active="jobs" />

      <section className="jobs-search">
        <div className="container jobs-search__inner">
          <h1 className="jobs-search__heading">
            Find your <span className="text-primary jobs-search__highlight">dream job</span>
          </h1>
          <p className="jobs-search__subtitle">
            Find your next career at companies like HubSpot, Nike, and Dropbox
          </p>

          <form className="hero__search" onSubmit={handleSearchSubmit} role="search">
            <div className="hero__search-field">
              <Search size={20} className="hero__search-icon" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                aria-label="Job title or keyword"
              />
            </div>
            <div className="hero__search-divider" />
            <div className="hero__search-field">
              <MapPin size={20} className="hero__search-icon" />
              <input
                type="text"
                placeholder="Florence, Italy"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                aria-label="Location"
              />
            </div>
            <button type="submit" className="btn btn-primary hero__search-btn">Search</button>
          </form>

          <div className="hero__popular">
            <span>Popular :</span>
            {popularSearches.map((term) => (
              <a key={term} href="#" onClick={(e) => handlePopularClick(e, term)}>
                {term}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container jobs-layout">
        <aside className="jobs-filters">
          {filterGroups.map((group) => (
            <div key={group.title} className="filter-group">
              <h4>{group.title}</h4>
              {group.options.map((opt) => (
                <label key={opt} className="filter-option">
                  <input
                    type="checkbox"
                    checked={group.title === 'Categories' && selectedCategories.includes(opt)}
                    onChange={group.title === 'Categories' ? () => toggleCategory(opt) : undefined}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
          ))}
        </aside>

        <div className="jobs-results">
          <div className="jobs-results__header">
            <span>{visibleJobs.length} Jobs Results</span>
            <select>
              <option>Most relevant</option>
              <option>Most recent</option>
            </select>
          </div>

          {visibleJobs.length === 0 ? (
            <p className="job-row__meta">No jobs match your search. Try different keywords or clear filters.</p>
          ) : (
            <ul className="jobs-list">
              {visibleJobs.map((job, i) => (
                <li key={job.title} className="job-row">
                  <div className="job-row__logo" style={{ background: job.color }}>
                    <job.icon size={22} color="#fff" />
                  </div>
                  <div className="job-row__body">
                    <div className="job-row__top">
                      <h3>{job.title}</h3>
                      <Bookmark size={18} className="job-row__save" />
                    </div>
                    <p className="job-row__meta">
                      {job.company} &middot; {job.location}
                    </p>
                    <div className="job-row__tags">
                      <span className="pill pill-green">{job.type}</span>
                      {job.tags.map((t) => (
                        <span key={t} className="pill pill-blue">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="job-row__action">
                    {appliedJobs[i] ? (
                      <button className="btn job-row__apply" style={{ background: 'var(--color-accent-green)', color: '#fff', cursor: 'default' }} disabled>
                        Applied
                      </button>
                    ) : (
                      <button onClick={() => handleApply(job.title, i)} className="btn btn-primary job-row__apply">
                        Apply
                      </button>
                    )}
                    <div className="job-row__progress">
                      <div className="job-row__progress-track">
                        <div
                          className="job-row__progress-fill"
                          style={{ width: `${(job.applied / job.capacity) * 100}%` }}
                        />
                      </div>
                      <span className="job-row__progress-label">
                        {job.applied} applied of {job.capacity} capacity
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}