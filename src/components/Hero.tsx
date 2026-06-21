import { useTranslation } from 'react-i18next'
import '../styles/hero.css'

export default function Hero() {
  const { t } = useTranslation()

  const stats = [
    { value: '30+', label: t('hero.stat1') },
    { value: '15+', label: t('hero.stat2') },
    { value: '24/7', label: t('hero.stat3') },
    { value: '100%', label: t('hero.stat4') },
  ]

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="container hero-content">
        <div className="hero-badge animate-in">
          <span className="hero-badge-dot" />
          {t('hero.badge')}
        </div>

        <h1 className="hero-title animate-in animate-delay-1">
          {t('hero.title1')}<br />
          <span className="gradient">{t('hero.title2')}</span><br />
          {t('hero.title3')}
        </h1>

        <p className="hero-subtitle animate-in animate-delay-2">
          {t('hero.subtitle')}
        </p>

        <div className="hero-actions animate-in animate-delay-3">
          <a href="#contact" className="btn btn-primary">{t('hero.cta1')}</a>
          <a href="#services" className="btn btn-outline">{t('hero.cta2')}</a>
        </div>

        <div className="hero-stats animate-in animate-delay-4">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <div className="hero-stat-value">{stat.value}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
