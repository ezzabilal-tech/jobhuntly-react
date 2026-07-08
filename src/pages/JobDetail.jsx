import { useParams, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { SiStripe, SiDropbox, SiNetlify, SiMaze, SiUdacity, SiWebflow } from 'react-icons/si';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

  return (
    <>
      <Navbar active="companies" />

      <div className="job-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/companies">Companies</Link> / <Link to="/companies/stripe">Stripe</Link> / Social Media Assistant
        </div>
      </div>

      <section className="job-header">
        <div className="container job-header__inner">
          <div className="job-header__logo">
            <SiStripe size={26} color="#fff" />
          </div>
          <div className="job-header__info">
            <h1>Social Media Assistant</h1>
            <p className="job-header__meta">
              Stripe &middot; Paris, France &middot; Full-Time
            </p>
          </div>
          <div className="job-header__actions">
            <Share2 size={20} className="job-header__share" />
            <a href="/apply" className="btn btn-primary job-header__apply">Apply</a>
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
            <div className="about-company__logo">
              <SiStripe size={20} color="#fff" />
            </div>
            <div>
              <h3>Stripe</h3>
              <Link to="/companies/stripe" className="about-company__link">
                Read more about Stripe <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <p>
            Stripe is a technology company that builds economic infrastructure for the internet.
            Businesses of every size&mdash;from new startups to public companies&mdash;use our software
            to accept payments and manage their businesses online.
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

      <Footer />
    </>
  );
}