import { useTranslation } from 'react-i18next'
import '../styles/trusted.css'

const icons = ['🏢', '🌍', '⚡', '🛡️', '📊', '🎯']

export default function Trusted() {
  const { t } = useTranslation()

  return (
    <section className="trusted">
      <div className="container trusted-inner">
        <div className="trusted-text">
          <h2>{t('trusted.title')}</h2>
          <p>{t('trusted.subtitle')}</p>
        </div>
        <div className="trusted-icons">
          {icons.map((icon, i) => (
            <div key={i} className="trusted-icon">{icon}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
