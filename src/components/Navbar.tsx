import { useEffect, useState } from 'react';
import { IconMenu, IconClose } from './Icons';

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Why Us', href: '#why' },
  { label: 'Presence', href: '#presence' },
  { label: 'Owner', href: '#owner' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${open ? ' navbar--open' : ''}`}
    >
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo" onClick={close}>
          <img src="/Logo.jpeg" alt="VK Precision Valuation & Advisory" className="navbar__logo-img" />
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="navbar__link">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--primary navbar__cta">
            Get in Touch
          </a>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div className="container navbar__mobile" role="navigation">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={close}>
          Get in Touch
        </a>
      </div>
    </header>
  );
}
