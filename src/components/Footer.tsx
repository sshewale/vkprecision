import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconLinkedIn,
  IconFacebook,
  IconInstagram,
} from './Icons';

type LinkItem = { label: string; href: string };

const quickLinks: LinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks: LinkItem[] = [
  { label: 'Residential Valuation', href: '#services' },
  { label: 'Commercial Valuation', href: '#services' },
  { label: 'Industrial Valuation', href: '#services' },
  { label: 'Land Valuation', href: '#services' },
  { label: 'Advisory & Compliance', href: '#services' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-mark">
              <img src="/Logo.jpeg" alt="VK Precision Valuation & Advisory" className="footer__logo-img" />
            </div>
            <p className="footer__about">
              Accurate, transparent, and reliable valuation services — built on
              technical expertise, market insight, and regulatory compliance.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="LinkedIn" className="footer__social"><IconLinkedIn /></a>
              <a href="#" aria-label="Facebook" className="footer__social"><IconFacebook /></a>
              <a href="#" aria-label="Instagram" className="footer__social"><IconInstagram /></a>
            </div>
          </div>

          <div className="footer__col">
            <h5>Quick Links</h5>
            <ul className="footer__list">
              {quickLinks.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h5>Services</h5>
            <ul className="footer__list">
              {serviceLinks.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h5>Get in Touch</h5>
            <div className="footer__contact-item">
              <IconMapPin width={18} height={18} />
              <span>Office No. 104–105, Akurti Sankul, Tilak Road, Sadashiv Peth, Pune — 411030</span>
            </div>
            <div className="footer__contact-item">
              <IconPhone width={18} height={18} />
              <a href="tel:+919922334736">+91 99223 34736</a>
            </div>
            <div className="footer__contact-item">
              <IconMail width={18} height={18} />
              <a href="mailto:vikas@vkptech.in">vikas@vkptech.in</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} VKPrecision Valuation &amp; Advisory. All rights reserved.</span>
          <span>Accuracy. Integrity. Excellence.</span>
        </div>
      </div>
    </footer>
  );
}
