import { useState } from 'react'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import mapData from '../data/europe-map.json'

interface MapCountry {
  id: string
  name: string
  path: string
  hq?: boolean
  hub?: boolean
}

const HUB_COORDS: Record<string, [number, number]> = {
  '276': [420, 490], // Germany
  '528': [395, 455], // Netherlands
  '616': [515, 470], // Poland
  '040': [455, 530], // Austria
  '380': [430, 590], // Italy
}

export default function EuropeMap() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, name: '' })

  const { viewBox, countries, hqMarker } = mapData as {
    viewBox: string
    countries: MapCountry[]
    hqMarker: { x: number; y: number }
  }

  const handleMouseMove = (e: MouseEvent, name: string) => {
    const rect = e.currentTarget.closest('svg')?.getBoundingClientRect()
    if (!rect) return
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 12,
      name,
    })
  }

  return (
    <div className="europe-map-wrapper">
      <svg viewBox={viewBox} className="europe-map-svg" aria-label="Map of Europe">
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#071220" />
            <stop offset="100%" stopColor="#0c1a30" />
          </linearGradient>
          <linearGradient id="countryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e4a7a" />
            <stop offset="100%" stopColor="#153258" />
          </linearGradient>
          <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0044aa" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="hqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5a0" />
            <stop offset="100%" stopColor="#00b87a" />
          </linearGradient>
          <filter id="mapGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#0066ff" floodOpacity="0.3" />
          </filter>
          <filter id="hqGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00e5a0" floodOpacity="0.6" />
          </filter>
          <clipPath id="europeClip">
            <rect x="0" y="0" width="1000" height="700" rx="16" />
          </clipPath>
        </defs>

        <rect width="1000" height="700" fill="url(#oceanGrad)" rx="16" />

        <g clipPath="url(#europeClip)" filter="url(#mapGlow)">
          {countries.map((c) => (
            <path
              key={c.id}
              d={c.path}
              className={`map-country ${c.hq ? 'map-hq' : c.hub ? 'map-hub' : ''} ${hovered === c.id ? 'map-hover' : ''}`}
              fill={c.hq ? 'url(#hqGrad)' : c.hub ? 'url(#hubGrad)' : 'url(#countryGrad)'}
              stroke={c.hq ? '#00e5a0' : c.hub ? '#55aaff' : 'rgba(80,130,200,0.45)'}
              strokeWidth={c.hq ? 1.2 : 0.6}
              filter={c.hq ? 'url(#hqGlow)' : undefined}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              onMouseMove={(e) => handleMouseMove(e, c.name)}
            />
          ))}
        </g>

        {/* HQ marker — Ljig, Serbia */}
        <g className="hq-marker">
          <circle cx={hqMarker.x} cy={hqMarker.y} r="6" fill="#00e5a0" className="map-pulse-dot" />
          <circle cx={hqMarker.x} cy={hqMarker.y} r="14" fill="none" stroke="#00e5a0" strokeWidth="1.2" opacity="0.5" className="map-ring" />
          <circle cx={hqMarker.x} cy={hqMarker.y} r="24" fill="none" stroke="#00e5a0" strokeWidth="0.6" opacity="0.2" className="map-ring-outer" />
        </g>

        {/* Hub markers */}
        {countries.filter((c) => c.hub).map((c) => {
          const coords = HUB_COORDS[c.id]
          if (!coords) return null
          return (
            <g key={c.id}>
              <circle cx={coords[0]} cy={coords[1]} r="4" fill="#3388ff" opacity="0.95" />
              <circle cx={coords[0]} cy={coords[1]} r="8" fill="none" stroke="#3388ff" strokeWidth="0.6" opacity="0.35" />
            </g>
          )
        })}
      </svg>

      {hovered && (
        <div className="map-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.name}
          {hovered === '688' && ` — ${t('locations.hq')}`}
        </div>
      )}

      <div className="map-legend">
        <div className="map-legend-item">
          <span className="legend-dot legend-hq" />
          <span>{t('locations.hq')}</span>
        </div>
        <div className="map-legend-item">
          <span className="legend-dot legend-hub" />
          <span>{t('locations.legendHub')}</span>
        </div>
        <div className="map-legend-item">
          <span className="legend-dot legend-coverage" />
          <span>{t('locations.legendCoverage')}</span>
        </div>
      </div>
    </div>
  )
}
