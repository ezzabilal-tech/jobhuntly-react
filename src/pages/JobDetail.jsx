import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Share2,
  Stethoscope,
  Waves,
  GraduationCap,
  Tent,
  Coffee,
  Bus,
  HeartHandshake,
  ArrowRight,
  X,
  Paperclip,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Smile,
} from 'lucide-react';
import { SiStripe, SiDropbox, SiNetlify, SiMaze, SiUdacity, SiWebflow } from 'react-icons/si';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { companiesList } from '../data/companies';
import '../styles/global.css';
import './JobDetail.css';

const responsibilities = [
  'Community engagement to ensure that is supported and actively represented online',
  'Focus on social media content development and publication',
  'Marketing and strategy support',
  'Stay on top of trends on social media platforms, and suggest content ideas to the team',
  'Engage with online communities',
];

const whoYouAre = [
  'You get energy from people and building the ideal work environment',
  'You have a sense for beautiful spaces and office experiences',
  'You are a confident office manager, ready for added responsibilities',
  "You're detail-oriented and creative",
  "You're a growth marketer and know how to run campaigns",
];

const niceToHaves = ['Fluent in English', 'Project management skills', 'Copy editing skills'];

const perks = [
  { icon: Stethoscope, title: 'Full Healthcare', desc: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
  { icon: Waves, title: 'Unlimited Vacation', desc: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.' },
  { icon: GraduationCap, title: 'Skill Development', desc: "We believe in always learning and leveling up our skills. Whether it's a conference or online course." },
  { icon: Tent, title: 'Team Summits', desc: 'Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.' },
  { icon: Coffee, title: 'Remote Working', desc: 'You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.' },
  { icon: Bus, title: 'Commuter Benefits', desc: "We're grateful for all the time and energy each team member puts into getting to work every day." },
  { icon: HeartHandshake, title: 'We give back.', desc: 'We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most-times two.' },
];

const similarJobs = [
  { title: 'Social Media Assistant', company: 'Nomad', location: 'Paris, France', icon: null, color: '#56CDAD', initial: 'N', tags: ['Design'] },
  { title: 'Social Media Assistant', company: 'Netlify', location: 'Paris, France', icon: SiNetlify, color: '#26A4FF', tags: ['Design'] },
  { title: 'Brand Designer', company: 'Dropbox', location: 'San Francisco, USA', icon: SiDropbox, color: '#4640DE', tags: ['Design'] },
  { title: 'Brand Designer', company: 'Maze', location: 'San Francisco, USA', icon: SiMaze, color: '#26A4FF', tags: ['Design'] },
  { title: 'Interactive Developer', company: 'Terraform', location: 'Hamburg, Germany', icon: null, color: '#4640DE', initial: 'T', tags: ['Design'] },
  { title: 'Interactive Developer', company: 'Udacity', location: 'Hamburg, Germany', icon: SiUdacity, color: '#02BD9B', tags: ['Design'] },
  { title: 'HR Manager', company: 'Packer', location: 'Lucern, Switzerland', icon: null, color: '#FF6550', initial: 'P', tags: ['Design'] },
  { title: 'HR Manager', company: 'Webflow', location: 'Lucern, Switzerland', icon: SiWebflow, color: '#4640DE', tags: ['Design'] },
];

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [applied, setApplied] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [fullname, setFullname] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (user) {
      setFullname(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Parse route parameter, e.g. "nomad-social-media-assistant"
  // -> company slug "nomad", job title slug "social-media-assistant"
  const parts = id ? id.split('-') : [];
  const companySlug = parts[0] || '';
  const titleSlug = parts.slice(1).join('-');

  const matchedCompany = companiesList.find(
    (c) => c.name.toLowerCase() === companySlug.toLowerCase()
  ) || {
    name: 'Stripe',
    color: '#635BFF',
    icon: SiStripe,
    location: 'Paris, France',
    description: 'Stripe is a technology company that builds economic infrastructure for the internet.',
  };

  // Turn "social-media-assistant" into "Social Media Assistant"; falls back
  // to a default title when the slug can't be parsed.
  // (Named pageJobTitle to avoid clashing with the apply-form's jobTitle state.)
  const pageJobTitle = titleSlug
    ? titleSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Social Media Assistant';

  const handleApply = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      setShowModal(true);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !phone || !jobTitle) {
      alert('Please fill out all required fields.');
      return;
    }
    setShowModal(false);
    setApplied(true);
    alert('Congratulations! Your application has been submitted successfully.');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const CompanyLogo = matchedCompany.icon || SiStripe;

  return (
    <>
      <Navbar active="companies" />

      <div className="job-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/companies">Companies</Link> / <Link to={`/companies/${matchedCompany.name.toLowerCase()}`}>{matchedCompany.name}</Link> / {pageJobTitle}
        </div>
      </div>

      <section className="job-header">
        <div className="container job-header__inner">
          <div className="job-header__logo" style={{ background: matchedCompany.color }}>
            <CompanyLogo size={26} color="#fff" />
          </div>
          <div className="job-header__info">
            <h1>{pageJobTitle}</h1>
            <p className="job-header__meta">
              {matchedCompany.name} &middot; {matchedCompany.location} &middot; Full-Time
            </p>
          </div>
          <div className="job-header__actions">
            <Share2 size={20} className="job-header__share" />
            {applied ? (
              <button className="btn job-header__apply" style={{ background: 'var(--color-accent-green)', color: '#fff', cursor: 'default' }} disabled>
                Applied
              </button>
            ) : (
              <button onClick={handleApply} className="btn btn-primary job-header__apply">
                Apply
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="container job-layout">
        <div className="job-main">
          <div className="job-section">
            <h2>Description</h2>
            <p>
              Stripe is looking for Social Media Marketing expert to help manage our online networks. You
              will be responsible for monitoring our social media channels, creating content, finding
              effective ways to engage the community and incentivize others to engage on our channels.
            </p>
          </div>

          <div className="job-section">
            <h2>Responsibilities</h2>
            <ul className="job-list job-list--check">
              {responsibilities.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          <div className="job-section">
            <h2>Who You Are</h2>
            <ul className="job-list job-list--check">
              {whoYouAre.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          <div className="job-section">
            <h2>Nice-To-Haves</h2>
            <ul className="job-list job-list--check">
              {niceToHaves.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </div>

        <aside className="job-sidebar">
          <div className="sidebar-card">
            <h4>About this role</h4>
            <div className="sidebar-capacity">
              <div className="sidebar-capacity__top">
                <span><strong>5 applied</strong> of 10 capacity</span>
              </div>
              <div className="sidebar-capacity__track">
                <div className="sidebar-capacity__fill" style={{ width: '50%' }} />
              </div>
            </div>

            <div className="sidebar-row">
              <span>Apply Before</span>
              <span>July 31, 2026</span>
            </div>
            <div className="sidebar-row">
              <span>Job Posted On</span>
              <span>July 1, 2026</span>
            </div>
            <div className="sidebar-row">
              <span>Job Type</span>
              <span>Full-Time</span>
            </div>
            <div className="sidebar-row">
              <span>Salary</span>
              <span>$75k-$85k USD</span>
            </div>
          </div>

          <div className="sidebar-card">
            <h4>Categories</h4>
            <div className="job-row__tags">
              <span className="pill pill-orange">Marketing</span>
              <span className="pill pill-green">Design</span>
            </div>
          </div>

          <div className="sidebar-card">
            <h4>Required Skills</h4>
            <div className="job-row__tags">
              <span className="pill pill-blue">Project Management</span>
              <span className="pill pill-blue">Copywriting</span>
              <span className="pill pill-blue">Social Media Marketing</span>
              <span className="pill pill-blue">English</span>
              <span className="pill pill-blue">Copy Editing</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section container perks">
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

      <section className="container about-company">
        <div className="about-company__text">
          <div className="about-company__header">
            <div className="about-company__logo" style={{ background: matchedCompany.color }}>
              <CompanyLogo size={20} color="#fff" />
            </div>
            <div>
              <h3>{matchedCompany.name}</h3>
              <Link to={`/companies/${matchedCompany.name.toLowerCase()}`} className="about-company__link">
                Read more about {matchedCompany.name} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <p>
            {matchedCompany.description ||
              `${matchedCompany.name} is a technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.`}
          </p>
        </div>

        <div className="about-company__photos">
  <div
    className="about-company__photo about-company__photo--main"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=600)', backgroundSize: 'cover', backgroundPosition: 'center' }}
  />
  <div
    className="about-company__photo"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400)', backgroundSize: 'cover', backgroundPosition: 'center' }}
  />
  <div
    className="about-company__photo"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400)', backgroundSize: 'cover', backgroundPosition: 'center' }}
  />
</div>
      </section>

      <section className="similar-jobs">
        <div className="container">
          <div className="section__header">
            <h2>Similar Jobs</h2>
            <a href="/jobs" className="section__link">
              Show all jobs <ArrowRight size={16} />
            </a>
          </div>

          <div className="similar-jobs-grid">
            {similarJobs.map((job, i) => (
              <div key={`${job.company}-${i}`} className="similar-job-card">
                <div className="similar-job-card__logo" style={{ background: job.color }}>
                  {job.icon ? <job.icon size={18} color="#fff" /> : job.initial}
                </div>
                <div className="similar-job-card__body">
                  <h4>{job.title}</h4>
                  <p>{job.company} &middot; {job.location}</p>
                  <div className="job-row__tags">
                    <span className="pill pill-green">Full-Time</span>
                    <span className="pill pill-orange">Marketing</span>
                    {job.tags.map((t) => (
                      <span key={t} className="pill pill-blue">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <div className="modal-header__logo" style={{ background: matchedCompany.color }}>
                <CompanyLogo size={22} color="#fff" />
              </div>
              <div className="modal-header__info">
                <h3>{pageJobTitle}</h3>
                <p className="modal-header__meta">
                  {matchedCompany.name} &middot; {matchedCompany.location} &middot; Full-Time
                </p>
              </div>
            </div>
            <div className="modal-body">
              <h4>Submit your application</h4>
              <p className="modal-body__subtitle">
                The following is required and will only be shared with {matchedCompany.name}
              </p>
              <form onSubmit={handleModalSubmit}>
                <div className="modal-form-group">
                  <label htmlFor="fullname">Full name</label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Enter your fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label htmlFor="jobTitle">Current or previous job title</label>
                  <input
                    type="text"
                    id="jobTitle"
                    placeholder="What's your current or previous job title?"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-section-title">Links</div>

                <div className="modal-form-group">
                  <label htmlFor="linkedin">LinkedIn URL</label>
                  <input
                    type="url"
                    id="linkedin"
                    placeholder="Link to your LinkedIn URL"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="modal-form-group">
                  <label htmlFor="portfolio">Portfolio URL</label>
                  <input
                    type="url"
                    id="portfolio"
                    placeholder="Link to your portfolio URL"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="coverLetter">Additional information</label>
                  <div className="textarea-wrapper">
                    <div className="textarea-toolbar">
                      <button type="button"><Smile size={18} /></button>
                      <button type="button"><Bold size={18} /></button>
                      <button type="button"><Italic size={18} /></button>
                      <button type="button"><List size={18} /></button>
                      <button type="button"><ListOrdered size={18} /></button>
                      <button type="button"><Link2 size={18} /></button>
                    </div>
                    <textarea
                      id="coverLetter"
                      className="with-toolbar"
                      placeholder="Add a cover letter or anything else you want to share"
                      rows={5}
                      maxLength={500}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value.slice(0, 500))}
                    />
                    <div className="char-count">
                      <span>Maximum 500 characters</span>
                      <span>{coverLetter.length} / 500</span>
                    </div>
                  </div>
                </div>

                <div className="resume-upload">
                  <span className="resume-upload__label">Attach your resume</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {resume && <span className="resume-filename">{resume.name}</span>}
                    <label htmlFor="resume-file" className="resume-upload__btn">
                      <Paperclip size={18} />
                      {resume ? 'Change Resume' : 'Attach Resume/CV'}
                    </label>
                  </div>
                  <input
                    type="file"
                    id="resume-file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary modal-submit-btn">
                  Submit Application
                </button>

                <p className="modal-disclaimer">
                  By sending the request you can confirm that you accept our{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}