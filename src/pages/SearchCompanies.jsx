import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, LayoutGrid, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { companiesList } from '../data/companies';
import '../styles/global.css';
import './SearchCompanies.css';

const PAGE_SIZE = 6;


export default function SearchCompanies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || 'Florence, Italy');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setLocation(searchParams.get('location') || 'Florence, Italy');
  }, [searchParams]);

  const industryOptions = useMemo(() => {
    const baseList = [
      'Advertising',
      'Business Service',
      'Blockchain',
      'Cloud',
      'Consumer Tech',
      'Design',
      'Education',
      'Fintech',
      'Gaming',
      'Food & Beverage',
      'Healthcare',
      'Hosting',
      'Media',
      'Technology',
    ];
    return baseList.map((name) => {
      const count = companiesList.filter((c) => c.industry === name).length;
      return { name, count };
    });
  }, []);

  const sizeOptions = useMemo(() => {
    const baseSizes = [
      '1 - 50',
      '51 - 150',
      '151 - 250',
      '251 - 500',
      '501 - 1000',
      '1000 - above',
    ];
    return baseSizes.map((name) => {
      const count = companiesList.filter((c) => c.size === name).length;
      return { name, count };
    });
  }, []);

  const toggle = (list, setList, value) => {
    setPage(1);
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filtered = useMemo(() => {
    return companiesList.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        (c.tags && c.tags.some((tag) => tag.toLowerCase().includes(q))) ||
        (c.description && c.description.toLowerCase().includes(q));

      const locClean = location.trim().toLowerCase();
      const companyLocClean = (c.location || '').toLowerCase();
      const matchesLocation =
        !locClean ||
        locClean === 'florence, italy' ||
        companyLocClean.includes(locClean);

      const matchesIndustry =
        selectedIndustries.length === 0 || selectedIndustries.includes(c.industry);
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.includes(c.size);

      return matchesQuery && matchesLocation && matchesIndustry && matchesSize;
    });
  }, [query, location, selectedIndustries, selectedSizes]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = () => {
    setPage(1);
    navigate(`/companies/search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <>
      <Navbar active="companies" />

      <section className="search-hero">
        <div className="container search-hero__inner">
          <h1>
            Find your <span className="text-primary search-hero__highlight">dream companies</span>
          </h1>
          <p className="search-hero__subtitle">Find the dream companies you dream work for</p>

          <div className="search-hero__search">
            <div className="search-hero__search-field">
              <Search size={20} className="search-hero__search-icon" />
              <input
                type="text"
                placeholder="Company name or keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="search-hero__search-divider" />
            <div className="search-hero__search-field">
              <MapPin size={20} className="search-hero__search-icon" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="btn btn-primary search-hero__search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="search-hero__popular">
            <span>Popular :</span>
            {['Twitter', 'Microsoft', 'Apple', 'Facebook', 'Fintech'].map((p) => (
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

      <section className="container search-layout">
        <aside className="search-filters">
          <div className="filter-group">
            <h4>Industry</h4>
            {industryOptions.map((opt) => (
              <label key={opt.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedIndustries.includes(opt.name)}
                  onChange={() => toggle(selectedIndustries, setSelectedIndustries, opt.name)}
                />
                {opt.name} <span className="filter-option__count">({opt.count})</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Company Size</h4>
            {sizeOptions.map((opt) => (
              <label key={opt.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(opt.name)}
                  onChange={() => toggle(selectedSizes, setSelectedSizes, opt.name)}
                />
                {opt.name} <span className="filter-option__count">({opt.count})</span>
              </label>
            ))}
          </div>
        </aside>

        <div className="search-results">
          <div className="search-results__header">
            <div>
              <h2>All Jobs</h2>
              <p>Showing {filtered.length} results</p>
            </div>
            <div className="search-results__controls">
              <select>
                <option>Most relevant</option>
                <option>Most recent</option>
              </select>
              <div className="search-results__view-toggle">
                <LayoutGrid size={18} className="active" />
                <List size={18} />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="search-results__empty">No companies match your filters. Try adjusting your search.</p>
          ) : (
            <div className="search-results-grid">
              {paginated.map((c) => (
       <div
          key={c.name}
          className="company-card"
          onClick={() => navigate(`/jobs/${c.name.toLowerCase()}-social-media-assistant`)}
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
                      <span key={t} className="pill pill-orange">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="search-pagination">
              <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={p === page ? 'active' : ''}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                &gt;
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}