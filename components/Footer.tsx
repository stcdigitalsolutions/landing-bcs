const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#methodology', label: 'Metodologia' },
  { href: '#services', label: 'Serviços' },
  { href: '#about', label: 'Sobre' },
  { href: '#contact', label: 'Contato' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="/logo-1.svg" className="logo-img" alt="BCS" />
        </div>

        <nav className="footer-nav">
          <ul>
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-bottom">
          <p className="copyright">
            {new Date().getFullYear()} BCS Consultoria em Tecnologia. Todos os direitos reservados.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn">Li</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="E-mail">@</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
