import { useTranslation } from 'react-i18next'
import '../styles/footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">P</div>
              <div className="logo-text">
                Primexus <span>Global</span>
              </div>
            </div>
            <p>{t('footer.desc')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.company')}</h4>
            <a href="#about">{t('nav.about')}</a>
            <a href="#locations">{t('nav.locations')}</a>
            <a href="#careers">{t('nav.careers')}</a>
            <a href="#positions">{t('nav.positions')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </div>

          <div className="footer-links">
            <h4>{t('footer.services')}</h4>
            <a href="#services">{t('services.items.customer.title')}</a>
            <a href="#services">{t('services.items.callcenter.title')}</a>
            <a href="#services">{t('services.items.outsourcing.title')}</a>
            <a href="#services">{t('services.items.consulting.title')}</a>
          </div>

          <div className="footer-links">
            <h4>{t('footer.legal')}</h4>
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.terms')}</span>
            <span>82.20 — Call Center</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Primexus Global D.O.O. {t('footer.rights')}</span>
          <span>primexus.business@outlook.com</span>
        </div>
      </div>
    </footer>
  )
}
