import { useState } from 'react'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import mapData from '../data/europe-map.json'

interface MapCountry {
  id: string
  name: string
  path: string
  hq?: boolean
}

export default function EuropeMap() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, name: '' })

  const { viewBox, countries, hqMarker } = mapData as {
    viewBox: string
    width: number
    height: number
    countries: MapCountry[]
    hqMarker: { x: number; y: number }
  }

  const [vbX, vbY, vbW, vbH] = viewBox.split(' ').map(Number)

  const handleMouseMove = (e: MouseEvent, name: string, id: string) => {
    const rect = e.currentTarget.closest('svg')?.getBoundingClientRect()
    if (!rect) return
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 12,
      name: id === '688' ? `${name} — ${t('locations.hq')}` : name,
    })
  }

  return (
    <div className="europe-map-wrapper">
      <svg
        viewBox={viewBox}
        className="europe-map-svg"
        style={{ aspectRatio: `${vbW} / ${vbH}` }}
        preserveAspectRatio="xMidYMid meet"
        aria-label={t('locations.mapLabel')}
      >
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#071220" />
            <stop offset="100%" stopColor="#0c1a30" />
          </linearGradient>
          <linearGradient id="coverageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0077ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00c896" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="coverageHoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099ff" />
            <stop offset="100%" stopColor="#00e5a0" />
          </linearGradient>
          <linearGradient id="hqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5a0" />
            <stop offset="100%" stopColor="#00a870" />
          </linearGradient>
          <filter id="mapGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#0066ff" floodOpacity="0.3" />
          </filter>
          <filter id="hqGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00e5a0" floodOpacity="0.6" />
          </filter>
        </defs>

        <rect x={vbX} y={vbY} width={vbW} height={vbH} fill="url(#oceanGrad)" />

        <g filter="url(#mapGlow)">
          {countries.map((c) => {
            const isHq = c.id === '688'
            const isHovered = hovered === c.id
            return (
              <path
                key={c.id}
                d={c.path}
                className={`map-country ${isHq ? 'map-hq' : 'map-coverage'} ${isHovered ? 'map-hover' : ''}`}
                fill={isHq ? 'url(#hqGrad)' : isHovered ? 'url(#coverageHoverGrad)' : 'url(#coverageGrad)'}
                stroke={isHq ? '#00e5a0' : isHovered ? '#66ddff' : 'rgba(0,200,160,0.35)'}
                strokeWidth={isHq ? 1.4 : 0.7}
                filter={isHq ? 'url(#hqGlow)' : undefined}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                onMouseMove={(e) => handleMouseMove(e, c.name, c.id)}
              />
            )
          })}
        </g>

        <g className="hq-marker">
          <circle cx={hqMarker.x} cy={hqMarker.y} r="5" fill="#fff" opacity="0.9" />
          <circle cx={hqMarker.x} cy={hqMarker.y} r="5" fill="#00e5a0" className="map-pulse-dot" />
          <circle cx={hqMarker.x} cy={hqMarker.y} r="12" fill="none" stroke="#00e5a0" strokeWidth="1" opacity="0.45" className="map-ring" />
        </g>
      </svg>

      {hovered && (
        <div className="map-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.name}
        </div>
      )}

      <div className="map-legend">
        <div className="map-legend-item">
          <span className="legend-dot legend-coverage" />
          <span>{t('locations.legendCoverage')}</span>
        </div>
        <div className="map-legend-item">
          <span className="legend-dot legend-hq" />
          <span>{t('locations.hq')} — {t('locations.hqLocation')}</span>
        </div>
      </div>
    </div>
  )
}
