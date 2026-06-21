import { useTranslation } from 'react-i18next'
import '../styles/about.css'

export default function About() {
  const { t } = useTranslation()

  const values = [
    { key: 'people', icon: '👥' },
    { key: 'quality', icon: '⭐' },
    { key: 'innovation', icon: '🚀' },
    { key: 'partnership', icon: '🤝' },
  ] as const

  const details = [
    { label: t('about.activity'), value: t('about.activityCode') },
    { label: t('about.address'), value: t('about.addressValue') },
    { label: t('about.legal'), value: t('about.legalValue') },
    { label: t('about.founder'), value: t('about.founderValue') },
  ]

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-label">{t('about.label')}</span>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="section-subtitle">{t('about.subtitle')}</p>
            <p className="about-desc">{t('about.desc')}</p>

            <div className="about-details">
              {details.map((d) => (
                <div key={d.label} className="about-detail">
                  <span className="about-detail-label">{d.label}</span>
                  <span className="about-detail-value">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="about-card-main">
              <div className="about-card-logo">PG</div>
              <h3>Primexus Global</h3>
              <p>D.O.O.</p>
              <div className="about-card-location">📍 Ljig, Serbia</div>
            </div>
          </div>
        </div>

        <div className="values-section">
          <h3 className="values-title">{t('about.values.title')}</h3>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.key} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h4>{t(`about.values.${v.key}`)}</h4>
                <p>{t(`about.values.${v.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
