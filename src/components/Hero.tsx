import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useAiChat } from '../context/AiChatContext'
import '../styles/glass.css'
import '../styles/hero.css'

const heroCards = [
  { key: 'customer', serviceKey: 'customer', icon: '🎧' },
  { key: 'technical', serviceKey: 'technical', icon: '📡' },
  { key: 'telecom', serviceKey: 'callcenter', icon: '📞' },
  { key: 'ai', serviceKey: 'ai', icon: '🤖' },
  { key: 'backoffice', serviceKey: 'admin', icon: '💼' },
] as const

export default function Hero() {
  const { t } = useTranslation()
  const { openChat } = useAiChat()

  return (
    <section id="home" className="hero">
      <div className="hero-overlay" />

      <div className="container hero-layout">
        <div className="hero-main">
          <div className="hero-badge animate-in">
            <span className="hero-badge-line" aria-hidden="true" />
            {t('hero.badge')}
          </div>

          <h1 className="hero-title animate-in animate-delay-1">
            {t('hero.title1')}
            {t('hero.title2') ? (
              <>
                <br />
                <span className="gradient">{t('hero.title2')}</span>
              </>
            ) : null}
          </h1>

          <p className="hero-subtitle animate-in animate-delay-2">
            {t('hero.subtitle')}
          </p>

          <div className="hero-actions animate-in animate-delay-3">
            <a href="#services" className="btn btn-primary">
              {t('hero.cta2')}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#about" className="btn btn-outline">{t('hero.cta1')}</a>
          </div>
        </div>

        <div className="hero-services animate-in animate-delay-4">
          {heroCards.map(({ key, serviceKey, icon }) => (
            <div key={key} className="hero-service-card glass-card">
              <span className="hero-service-icon" aria-hidden="true">{icon}</span>
              <h3>{t(`hero.cards.${key}`)}</h3>
              <p>{t(`services.items.${serviceKey}.desc`)}</p>
            </div>
          ))}

          <button
            type="button"
            className="hero-service-card hero-service-card-ai glass-card"
            onClick={openChat}
            aria-label={t('aiChat.open')}
          >
            <div className="hero-ai-header">
              <div className="hero-ai-wave" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="hero-ai-bar" style={{ '--i': i } as CSSProperties} />
                ))}
              </div>
              <span className="hero-ai-play" aria-hidden="true">▶</span>
            </div>
            <h3>{t('hero.primexusAi.title')}</h3>
            <p>{t('hero.primexusAi.greeting')}</p>
          </button>
        </div>
      </div>
    </section>
  )
}
