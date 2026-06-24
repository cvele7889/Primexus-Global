import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { writeFileSync, mkdirSync } from 'fs'
import https from 'https'

const HQ_ID = '688'
const RUSSIA_ID = '643'
const CANVAS_WIDTH = 1400
const CANVAS_HEIGHT = 650
const PADDING = 18
const MAX_DISPLAY_LAT = 71

function isInCoverage(lon, lat) {
  // Europe
  if (lon >= -25 && lon <= 47 && lat >= 34 && lat <= MAX_DISPLAY_LAT) return true
  // Transcaucasus & Turkey
  if (lon >= 25 && lon <= 50 && lat >= 35 && lat <= 45) return true
  // Middle East
  if (lon >= 34 && lon <= 65 && lat >= 12 && lat <= 42) return true
  // Central Asia
  if (lon >= 45 && lon <= 90 && lat >= 35 && lat <= 55) return true
  // South Asia
  if (lon >= 60 && lon <= 95 && lat >= 5 && lat <= 38) return true
  // East Asia
  if (lon >= 95 && lon <= 145 && lat >= 18 && lat <= 55) return true
  // Southeast Asia & Indonesia
  if (lon >= 95 && lon <= 141 && lat >= -12 && lat <= 25) return true
  // Russia (European Russia & Siberia, excluding Arctic islands)
  if (lon >= 20 && lon <= 180 && lat >= 41 && lat <= MAX_DISPLAY_LAT) return true
  // Japan & Ryukyu
  if (lon >= 128 && lon <= 146 && lat >= 30 && lat <= 46) return true
  return false
}

function ringCentroid(ring) {
  let lon = 0
  let lat = 0
  for (const [x, y] of ring) {
    lon += x
    lat += y
  }
  return [lon / ring.length, lat / ring.length]
}

function isValidPolygon(polygon) {
  const ring = polygon[0]
  const [cLon, cLat] = ringCentroid(ring)
  // Drop isolated far-east fragments (Chukotka rendered on the far left)
  if (cLon < -50) return false
  // Drop Arctic islands (Svalbard, Novaya Zemlya, Franz Josef Land, etc.)
  if (cLat > MAX_DISPLAY_LAT) return false
  return isInCoverage(cLon, cLat)
}

function filterGeometry(geometry) {
  if (geometry.type === 'Polygon') {
    if (!isValidPolygon(geometry.coordinates)) return null
    return geometry
  }

  if (geometry.type === 'MultiPolygon') {
    const filtered = geometry.coordinates.filter(isValidPolygon)
    if (!filtered.length) return null
    return { type: 'MultiPolygon', coordinates: filtered }
  }

  return geometry
}

function pathBounds(pathD) {
  const nums = pathD.match(/-?\d+\.?\d*/g)?.map(Number) ?? []
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (let i = 0; i < nums.length; i += 2) {
    minX = Math.min(minX, nums[i])
    maxX = Math.max(maxX, nums[i])
    minY = Math.min(minY, nums[i + 1])
    maxY = Math.max(maxY, nums[i + 1])
  }
  return { minX, maxX, minY, maxY }
}

/** Remove small disconnected SVG fragments (Chukotka left, residual Arctic islands). */
function cleanPathFragments(pathD) {
  const parts = pathD.split(/(?=M)/).filter(Boolean)
  const kept = parts.filter((p) => {
    const { minX, maxX, minY, maxY } = pathBounds(p)
    const width = maxX - minX
    const height = maxY - minY
    if (maxX < 400 && width < 120) return false
    if (minY < 95 && height < 85 && width < 120) return false
    return true
  })
  return kept.join('')
}

const topo = await new Promise((resolve, reject) => {
  https.get('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', (res) => {
    let data = ''
    res.on('data', (c) => { data += c })
    res.on('end', () => resolve(JSON.parse(data)))
    res.on('error', reject)
  })
})

const geojson = feature(topo, topo.objects.countries)

const coverageFeatures = geojson.features
  .map((f) => {
    const geometry = filterGeometry(f.geometry)
    if (!geometry) return null
    return { type: 'Feature', id: f.id, properties: f.properties, geometry }
  })
  .filter(Boolean)

const coverageCollection = { type: 'FeatureCollection', features: coverageFeatures }

const projection = geoMercator()
  .center([72, 38])
  .fitExtent(
    [[PADDING, PADDING], [CANVAS_WIDTH - PADDING, CANVAS_HEIGHT - PADDING]],
    coverageCollection,
  )

const pathGen = geoPath(projection)

const countries = coverageFeatures.map((f) => {
  const id = String(f.id)
  let d = pathGen(f)
  if (!d || d.includes('NaN')) return null
  d = cleanPathFragments(d)
  if (!d) return null
  return {
    id,
    name: f.properties.name,
    path: d,
    hq: id === HQ_ID,
  }
}).filter(Boolean)

let bounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
for (const c of countries) {
  const b = pathBounds(c.path)
  bounds.minX = Math.min(bounds.minX, b.minX)
  bounds.maxX = Math.max(bounds.maxX, b.maxX)
  bounds.minY = Math.min(bounds.minY, b.minY)
  bounds.maxY = Math.max(bounds.maxY, b.maxY)
}

const width = Math.round(bounds.maxX - bounds.minX + PADDING * 2)
const height = Math.round(bounds.maxY - bounds.minY + PADDING * 2)
const viewMinX = bounds.minX - PADDING
const viewMinY = bounds.minY - PADDING

const hq = projection([20.14, 44.24])
const hqMarker = { x: hq[0], y: hq[1] }

mkdirSync('src/data', { recursive: true })
writeFileSync(
  'src/data/europe-map.json',
  JSON.stringify({
    viewBox: `${viewMinX} ${viewMinY} ${width} ${height}`,
    width,
    height,
    countries,
    hqMarker: { x: hqMarker.x, y: hqMarker.y },
  }),
)

const russia = countries.find((c) => c.id === RUSSIA_ID)
console.log(`Generated ${countries.length} countries (Europe + Asia)`)
console.log(`ViewBox: ${viewMinX} ${viewMinY} ${width} ${height}`)
if (russia) {
  const rb = pathBounds(russia.path)
  const parts = russia.path.split(/(?=M)/).filter(Boolean).length
  console.log(`Russia: ${parts} parts, x ${rb.minX.toFixed(0)}–${rb.maxX.toFixed(0)}, y ${rb.minY.toFixed(0)}–${rb.maxY.toFixed(0)}`)
}
if (countries.some((c) => c.path.includes('NaN'))) {
  console.error('ERROR: paths contain NaN')
  process.exit(1)
}
