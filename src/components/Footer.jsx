import { Facebook, Instagram, Linkedin, Twitter, Send } from 'lucide-react';
import './Footer.css';
const columns = [
  {
    title: 'About',
    links: ['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'],
  },
  {
    title: 'Resources',
    links: ['Help Docs', 'Guide', 'Updates', 'Contact Us'],
  },
];
const socials = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Send, label: 'Pinterest' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter, label: 'Twitter' },
];
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="navbar__logo" style={{ color: '#fff' }}>
            <span className="navbar__logo-dot" />
            JobHuntly
          </div>
          <p className="footer__desc">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="footer__col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer__col">
          <h4>Get job notifications</h4>
          <p className="footer__newsletter-desc">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <form className="footer__subscribe" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>2026 &copy; JobHuntly. All rights reserved.</p>
        <div className="footer__socials">
          {socials.map(({ icon: Icon, label }) => (
            <a key={label} href="#" aria-label={label} className="footer__social-link">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
