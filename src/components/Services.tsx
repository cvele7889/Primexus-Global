import { useTranslation } from 'react-i18next'
import '../styles/services.css'

const serviceKeys = [
  'customer', 'technical', 'callcenter', 'admin', 'outsourcing',
  'telemarketing', 'research', 'consulting', 'data', 'it', 'training',
] as const

const serviceIcons: Record<string, string> = {
  customer: '💬',
  technical: '🔧',
  callcenter: '📞',
  admin: '📋',
  outsourcing: '🔄',
  telemarketing: '📱',
  research: '📈',
  consulting: '💡',
  data: '🗄️',
  it: '💻',
  training: '🎓',
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="services-header">
          <span className="section-label">{t('services.label')}</span>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </div>

        <div className="services-grid">
          {serviceKeys.map((key) => (
            <div key={key} className="service-card">
              <div className="service-icon">{serviceIcons[key]}</div>
              <h3>{t(`services.items.${key}.title`)}</h3>
              <p>{t(`services.items.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
