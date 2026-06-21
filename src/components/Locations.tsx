import { useTranslation } from 'react-i18next'
import EuropeMap from './EuropeMap'
import '../styles/locations.css'

const regionKeys = ['balkans', 'cee', 'dach', 'nordics', 'west', 'south'] as const

const regionFlags: Record<string, string> = {
  balkans: '🇷🇸',
  cee: '🇵🇱',
  dach: '🇩🇪',
  nordics: '🇸🇪',
  west: '🇫🇷',
  south: '🇮🇹',
}

export default function Locations() {
  const { t } = useTranslation()

  return (
    <section id="locations" className="section locations">
      <div className="container">
        <div className="locations-header">
          <span className="section-label">{t('locations.label')}</span>
          <h2 className="section-title">{t('locations.title')}</h2>
          <p className="section-subtitle">{t('locations.subtitle')}</p>
        </div>

        <div className="locations-grid">
          <div className="locations-map">
            <EuropeMap />
            <div className="hq-badge">
              <span className="hq-dot" />
              <div>
                <strong>{t('locations.hq')}</strong>
                <span>{t('locations.hqLocation')}</span>
              </div>
            </div>
          </div>

          <div className="locations-info">
            <h3>{t('locations.regions.title')}</h3>
            <div className="regions-list">
              {regionKeys.map((key) => (
                <div key={key} className="region-item">
                  <span className="region-flag">{regionFlags[key]}</span>
                  <span>{t(`locations.regions.${key}`)}</span>
                </div>
              ))}
            </div>

            <div className="languages-box">
              <h4>{t('locations.languages')}</h4>
              <p>{t('locations.langList')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
