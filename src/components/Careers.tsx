import { useTranslation } from 'react-i18next'
import '../styles/careers.css'

const benefits = [
  { key: 'benefit1', icon: '🏠' },
  { key: 'benefit2', icon: '📈' },
  { key: 'benefit3', icon: '🌐' },
  { key: 'benefit4', icon: '🔒' },
] as const

export default function Careers() {
  const { t } = useTranslation()

  return (
    <section id="careers" className="section careers">
      <div className="container">
        <div className="careers-header">
          <span className="section-label">{t('careers.label')}</span>
          <h2 className="section-title">{t('careers.title')}</h2>
          <p className="section-subtitle">{t('careers.subtitle')}</p>
        </div>

        <div className="careers-grid">
          {benefits.map((b) => (
            <div key={b.key} className="career-card">
              <span className="career-icon">{b.icon}</span>
              <h3>{t(`careers.${b.key}`)}</h3>
              <p>{t(`careers.${b.key}Desc`)}</p>
            </div>
          ))}
        </div>

        <div className="careers-cta">
          <div className="careers-cta-text">
            <h3>{t('careers.cta')}</h3>
            <p>{t('careers.ctaDesc')}</p>
          </div>
          <a href="mailto:primexus.business@outlook.com?subject=CV" className="btn btn-primary">
            {t('careers.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
