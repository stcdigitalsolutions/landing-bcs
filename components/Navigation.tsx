'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#methodology', label: 'Metodologia' },
  { href: '#services', label: 'Serviços' },
  { href: '#about', label: 'Sobre' },
  { href: '#contact', label: 'Contato' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 100);
      setHidden(currentScroll > lastScroll && currentScroll > 200);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`}>
      <div className="header-container">
        <a href="#home" className="logo" onClick={e => handleNavClick(e, '#home')}>
          <img src="/logo-2.svg" className="logo-img" alt="BCS" />
        </a>

        <nav className="nav">
          <ul className={`nav-list${menuOpen ? ' active' : ''}`}>
            {navItems.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link${activeSection === item.href.slice(1) ? ' active' : ''}`}
                  onClick={e => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`menu-toggle${menuOpen ? ' active' : ''}`}
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
