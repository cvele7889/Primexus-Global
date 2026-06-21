import { useState } from 'react'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface Country {
  id: string
  name: string
  d: string
  hq?: boolean
  hub?: boolean
}

const countries: Country[] = [
  { id: 'is', name: 'Iceland', d: 'M 68,42 L 82,38 L 95,45 L 92,58 L 78,62 L 65,55 Z' },
  { id: 'ie', name: 'Ireland', d: 'M 118,148 L 128,142 L 138,150 L 135,168 L 122,172 L 112,160 Z' },
  { id: 'gb', name: 'United Kingdom', d: 'M 142,118 L 168,108 L 178,125 L 175,148 L 158,158 L 140,150 L 132,132 Z' },
  { id: 'pt', name: 'Portugal', d: 'M 118,268 L 132,262 L 138,285 L 128,302 L 115,295 L 112,278 Z' },
  { id: 'es', name: 'Spain', d: 'M 118,248 L 168,238 L 188,258 L 185,295 L 155,310 L 125,300 L 115,275 Z' },
  { id: 'fr', name: 'France', d: 'M 178,195 L 228,188 L 245,215 L 238,255 L 205,268 L 175,250 L 168,220 Z' },
  { id: 'no', name: 'Norway', d: 'M 248,55 L 275,48 L 285,75 L 278,105 L 258,115 L 242,90 L 238,68 Z' },
  { id: 'se', name: 'Sweden', d: 'M 285,68 L 315,62 L 325,95 L 318,135 L 298,145 L 278,120 L 275,88 Z' },
  { id: 'fi', name: 'Finland', d: 'M 325,62 L 365,55 L 378,85 L 370,118 L 345,125 L 325,100 Z' },
  { id: 'dk', name: 'Denmark', d: 'M 268,158 L 288,152 L 295,168 L 285,178 L 268,172 Z' },
  { id: 'de', name: 'Germany', d: 'M 248,168 L 295,162 L 310,185 L 305,215 L 275,225 L 248,210 L 242,188 Z', hub: true },
  { id: 'pl', name: 'Poland', d: 'M 305,162 L 355,155 L 368,185 L 360,215 L 325,222 L 305,200 Z', hub: true },
  { id: 'it', name: 'Italy', d: 'M 268,248 L 288,242 L 295,275 L 285,315 L 268,325 L 255,295 L 258,265 Z', hub: true },
  { id: 'gr', name: 'Greece', d: 'M 325,285 L 355,278 L 368,298 L 360,318 L 335,325 L 318,305 Z' },
  { id: 'ro', name: 'Romania', d: 'M 355,228 L 395,222 L 408,248 L 400,272 L 368,278 L 352,255 Z' },
  { id: 'bg', name: 'Bulgaria', d: 'M 355,272 L 395,268 L 405,288 L 395,305 L 365,310 L 352,290 Z' },
  { id: 'hu', name: 'Hungary', d: 'M 305,222 L 340,218 L 348,238 L 340,255 L 312,258 L 300,240 Z' },
  { id: 'at', name: 'Austria', d: 'M 278,225 L 305,220 L 312,240 L 305,255 L 280,258 L 272,242 Z', hub: true },
  { id: 'ch', name: 'Switzerland', d: 'M 248,235 L 268,230 L 275,245 L 268,258 L 248,255 L 242,242 Z' },
  { id: 'nl', name: 'Netherlands', d: 'M 238,178 L 258,172 L 265,188 L 255,198 L 238,195 Z', hub: true },
  { id: 'be', name: 'Belgium', d: 'M 228,195 L 248,190 L 255,205 L 245,215 L 228,212 Z' },
  { id: 'cz', name: 'Czech Republic', d: 'M 285,205 L 310,200 L 318,218 L 310,232 L 285,230 L 278,215 Z' },
  { id: 'sk', name: 'Slovakia', d: 'M 310,218 L 335,215 L 342,232 L 332,245 L 310,242 Z' },
  { id: 'hr', name: 'Croatia', d: 'M 288,255 L 315,248 L 325,268 L 315,285 L 290,288 L 282,270 Z' },
  { id: 'ba', name: 'Bosnia', d: 'M 298,268 L 318,262 L 325,278 L 315,292 L 295,290 L 290,278 Z' },
  { id: 'rs', name: 'Serbia', d: 'M 318,258 L 348,252 L 358,272 L 352,292 L 328,298 L 310,285 L 308,268 Z', hq: true },
  { id: 'si', name: 'Slovenia', d: 'M 278,248 L 295,242 L 302,258 L 292,268 L 278,262 Z' },
  { id: 'me', name: 'Montenegro', d: 'M 315,288 L 328,285 L 332,298 L 322,305 L 312,298 Z' },
  { id: 'al', name: 'Albania', d: 'M 328,292 L 342,288 L 348,308 L 338,318 L 325,310 Z' },
  { id: 'mk', name: 'North Macedonia', d: 'M 338,278 L 355,275 L 360,292 L 350,302 L 335,298 Z' },
  { id: 'ua', name: 'Ukraine', d: 'M 368,185 L 430,175 L 445,210 L 435,250 L 395,258 L 365,235 L 358,205 Z' },
  { id: 'by', name: 'Belarus', d: 'M 355,155 L 395,148 L 405,175 L 395,198 L 365,205 L 348,180 Z' },
  { id: 'lt', name: 'Lithuania', d: 'M 325,148 L 355,142 L 362,162 L 350,175 L 325,170 Z' },
  { id: 'lv', name: 'Latvia', d: 'M 345,125 L 375,118 L 382,140 L 370,152 L 345,148 Z' },
  { id: 'ee', name: 'Estonia', d: 'M 345,108 L 375,102 L 382,118 L 370,128 L 345,122 Z' },
]

export default function EuropeMap() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, name: '' })

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
      <svg viewBox="60 30 340 310" className="europe-map-svg" aria-label="Map of Europe">
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1628" />
            <stop offset="100%" stopColor="#0c1f3d" />
          </linearGradient>
          <linearGradient id="countryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a3a6b" />
            <stop offset="100%" stopColor="#122a50" />
          </linearGradient>
          <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0044aa" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="hqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5a0" />
            <stop offset="100%" stopColor="#00b87a" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hqGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="60" y="30" width="340" height="310" fill="url(#oceanGrad)" rx="16" />

        {/* Grid lines */}
        {[80, 130, 180, 230, 280, 330].map((y) => (
          <line key={`h${y}`} x1="70" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        {[100, 150, 200, 250, 300, 350].map((x) => (
          <line key={`v${x}`} x1={x} y1="40" x2={x} y2="330" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}

        {countries.map((c) => (
          <path
            key={c.id}
            d={c.d}
            className={`map-country ${c.hq ? 'map-hq' : c.hub ? 'map-hub' : ''} ${hovered === c.id ? 'map-hover' : ''}`}
            fill={c.hq ? 'url(#hqGrad)' : c.hub ? 'url(#hubGrad)' : 'url(#countryGrad)'}
            stroke={c.hq ? '#00e5a0' : c.hub ? '#3388ff' : 'rgba(100,140,200,0.35)'}
            strokeWidth={c.hq ? 1.5 : 0.8}
            filter={c.hq ? 'url(#hqGlow)' : undefined}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onMouseMove={(e) => handleMouseMove(e, c.name)}
          />
        ))}

        {/* HQ pulse marker on Serbia */}
        <circle cx="333" cy="275" r="5" fill="#00e5a0" className="map-pulse-dot" />
        <circle cx="333" cy="275" r="12" fill="none" stroke="#00e5a0" strokeWidth="1" opacity="0.5" className="map-ring" />
        <circle cx="333" cy="275" r="20" fill="none" stroke="#00e5a0" strokeWidth="0.5" opacity="0.25" className="map-ring-outer" />

        {/* Hub markers */}
        {[
          { cx: 272, cy: 192, label: 'DE' },
          { cx: 330, cy: 188, label: 'PL' },
          { cx: 278, cy: 280, label: 'IT' },
          { cx: 252, cy: 186, label: 'NL' },
        ].map((m) => (
          <g key={m.label}>
            <circle cx={m.cx} cy={m.cy} r="3" fill="#3388ff" opacity="0.9" />
            <circle cx={m.cx} cy={m.cy} r="6" fill="none" stroke="#3388ff" strokeWidth="0.5" opacity="0.4" />
          </g>
        ))}
      </svg>

      {hovered && (
        <div
          className="map-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
          {hovered === 'rs' && ` — ${t('locations.hq')}`}
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
