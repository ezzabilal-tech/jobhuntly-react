import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, LayoutGrid, List } from 'lucide-react';
import { SiStripe, SiSquare, SiCoinbase, SiRobinhood, SiRevolut } from 'react-icons/si';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';
import './SearchCompanies.css';

const industryOptions = [
  { name: 'Advertising', count: 12 },
  { name: 'Business Service', count: 34 },
  { name: 'Blockchain', count: 8 },
  { name: 'Cloud', count: 19 },
  { name: 'Consumer Tech', count: 27 },
  { name: 'Education', count: 15 },
  { name: 'Fintech', count: 22 },
  { name: 'Gaming', count: 11 },
  { name: 'Food & Beverage', count: 6 },
  { name: 'Healthcare', count: 14 },
  { name: 'Hosting', count: 5 },
  { name: 'Media', count: 9 },
];

const sizeOptions = [
  { name: '1 - 50', count: 25 },
  { name: '51 - 150', count: 18 },
  { name: '151 - 250', count: 26 },
  { name: '251 - 500', count: 12 },
  { name: '501 - 1000', count: 7 },
  { name: '1000 - above', count: 4 },
];

const companies = [
  {
    name: 'Stripe',
    initial: 'S',
    color: '#635BFF',
    icon: SiStripe,
    industry: 'Fintech',
    size: '1000 - above',
    jobs: 7,
    description: 'Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe\u2019s software tools.',
    tags: ['Fintech', 'Payment gateway'],
  },
  {
    name: 'Truebill',
    initial: 'T',
    color: '#26A4FF',
    industry: 'Fintech',
    size: '51 - 150',
    jobs: 7,
    description: 'Truebill takes control of your money. Truebill develops a mobile app that helps consumers take control of their financial.',
    tags: ['Fintech'],
  },
  {
    name: 'Square',
    initial: 'S',
    color: '#111827',
    icon: SiSquare,
    industry: 'Fintech',
    size: '501 - 1000',
    jobs: 7,
    description: 'Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.',
    tags: ['Fintech'],
  },
  {
    name: 'Coinbase',
    initial: 'C',
    color: '#0052FF',
    icon: SiCoinbase,
    industry: 'Blockchain',
    size: '251 - 500',
    jobs: 7,
    description: 'Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies.',
    tags: ['Fintech'],
  },
  {
    name: 'Robinhood',
    initial: 'R',
    color: '#111827',
    icon: SiRobinhood,
    industry: 'Fintech',
    size: '151 - 250',
    jobs: 7,
    description: 'Robinhood is lowering barriers, removing fees, and providing greater access to financial information.',
    tags: ['Fintech'],
  },
  {
    name: 'Kraken',
    initial: 'K',
    color: '#5741D9',
    industry: 'Blockchain',
    size: '251 - 500',
    jobs: 7,
    description: 'Based in San Francisco, Kraken is the world\u2019s largest global bitcoin exchange in euro volume and liquidity.',
    tags: ['Fintech'],
  },
  {
    name: 'Revolut',
    initial: 'R',
    color: '#25324B',
    icon: SiRevolut,
    industry: 'Fintech',
    size: '251 - 500',
    jobs: 7,
    description: 'When Revolut was founded in 2015, we had a vision to build a sustainable, digital alternative to traditional big banks.',
    tags: ['Fintech'],
  },
  {
    name: 'Divy',
    initial: 'D',
    color: '#111827',
    industry: 'Fintech',
    size: '51 - 150',
    jobs: 7,
    description: 'Divy is a secure financial platform for businesses to manage payments and subscriptions.',
    tags: ['Fintech'],
  },
];

const PAGE_SIZE = 6;

export default function SearchCompanies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || 'Florence, Italy');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [page, setPage] = useState(1);

  const toggle = (list, setList, value) => {
    setPage(1);
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesQuery =
        !query.trim() ||
        c.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        c.industry.toLowerCase().includes(query.trim().toLowerCase());
      const matchesIndustry =
        selectedIndustries.length === 0 || selectedIndustries.includes(c.industry);
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.includes(c.size);
      return matchesQuery && matchesIndustry && matchesSize;
    });
  }, [query, selectedIndustries, selectedSizes]);

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
            <a href="#">Twitter</a>
            <a href="#">Microsoft</a>
            <a href="#">Apple</a>
            <a href="#">Facebook</a>
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