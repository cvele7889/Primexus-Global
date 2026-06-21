import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/header.css'

const languages = [
  { code: 'sr', label: 'SR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'ru', label: 'RU' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const changeLang = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('primexus-lang', code)
  }

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#about', label: t('nav.about') },
    { href: '#locations', label: t('nav.locations') },
    { href: '#careers', label: t('nav.careers') },
    { href: '#positions', label: t('nav.positions') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#home" className="logo">
          <div className="logo-icon">P</div>
          <div className="logo-text">
            Primexus <span>Global</span>
          </div>
        </a>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-switcher">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-btn ${i18n.language === lang.code ? 'active' : ''}`}
                onClick={() => changeLang(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn btn-primary">{t('nav.contact')}</a>
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
      </nav>
    </header>
  )
}
