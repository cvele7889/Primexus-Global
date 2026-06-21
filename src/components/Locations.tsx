import { useTranslation } from 'react-i18next'
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
            <svg viewBox="0 0 800 500" className="europe-map" aria-hidden="true">
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0066ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00e5a0" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <rect width="800" height="500" fill="#0c1629" rx="20" />
              {/* Simplified Europe outline */}
              <path
                d="M120,200 Q140,160 180,150 Q220,140 260,155 Q300,130 340,140 Q380,120 420,130 Q460,110 500,125 Q540,115 580,130 Q620,120 650,140 L670,180 Q680,220 660,260 Q640,300 600,320 Q560,340 520,330 Q480,350 440,340 Q400,360 360,350 Q320,370 280,360 Q240,380 200,370 Q160,390 130,360 Q100,330 110,290 Q90,250 120,200 Z"
                fill="url(#mapGrad)"
                stroke="rgba(0,102,255,0.4)"
                strokeWidth="2"
              />
              {/* HQ marker - Serbia/Ljig area */}
              <circle cx="380" cy="280" r="8" fill="#00e5a0" className="map-pulse" />
              <circle cx="380" cy="280" r="20" fill="none" stroke="#00e5a0" strokeWidth="1.5" opacity="0.4" className="map-ring" />
              {/* Other European dots */}
              {[
                [300, 200], [420, 180], [480, 200], [350, 220],
                [520, 240], [280, 260], [450, 260], [550, 220],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="#0066ff" opacity="0.6" />
              ))}
            </svg>
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
