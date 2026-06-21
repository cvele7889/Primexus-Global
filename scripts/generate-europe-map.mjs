import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { writeFileSync, mkdirSync } from 'fs'
import https from 'https'

const EUROPE_IDS = new Set([
  '008', '020', '040', '051', '056', '070', '100', '112', '191', '196',
  '203', '208', '233', '246', '250', '276', '300', '348', '352', '372',
  '380', '428', '438', '440', '442', '470', '492', '498', '499', '528',
  '578', '616', '620', '642', '674', '688', '703', '705', '724',
  '752', '756', '804', '807', '826',
])

const HQ_ID = '688'
const WIDTH = 900
const HEIGHT = 620
const PADDING = 24

function isInEurope(lon, lat) {
  return lon >= -25 && lon <= 47 && lat >= 34 && lat <= 72
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

function filterGeometry(geometry) {
  if (geometry.type === 'Polygon') {
    const filtered = geometry.coordinates.filter((ring) => {
      const [lon, lat] = ringCentroid(ring)
      return isInEurope(lon, lat)
    })
    if (!filtered.length) return null
    return { type: 'Polygon', coordinates: filtered }
  }

  if (geometry.type === 'MultiPolygon') {
    const filtered = geometry.coordinates.filter((polygon) => {
      const [lon, lat] = ringCentroid(polygon[0])
      return isInEurope(lon, lat)
    })
    if (!filtered.length) return null
    return { type: 'MultiPolygon', coordinates: filtered }
  }

  return geometry
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

const europeFeatures = geojson.features
  .filter((f) => EUROPE_IDS.has(String(f.id)))
  .map((f) => {
    const geometry = filterGeometry(f.geometry)
    if (!geometry) return null
    return { type: 'Feature', id: f.id, properties: f.properties, geometry }
  })
  .filter(Boolean)

const europeCollection = { type: 'FeatureCollection', features: europeFeatures }

const projection = geoMercator().fitExtent(
  [[PADDING, PADDING], [WIDTH - PADDING, HEIGHT - PADDING]],
  europeCollection,
)

const pathGen = geoPath(projection)

const countries = europeFeatures.map((f) => {
  const id = String(f.id)
  const d = pathGen(f)
  if (!d || d.includes('NaN')) return null
  return {
    id,
    name: f.properties.name,
    path: d,
    hq: id === HQ_ID,
  }
}).filter(Boolean)

const hqMarker = projection([20.14, 44.24])

mkdirSync('src/data', { recursive: true })
writeFileSync(
  'src/data/europe-map.json',
  JSON.stringify({
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    width: WIDTH,
    height: HEIGHT,
    countries,
    hqMarker: { x: hqMarker[0], y: hqMarker[1] },
  }),
)

console.log(`Generated ${countries.length} countries`)
if (countries.some((c) => c.path.includes('NaN'))) {
  console.error('ERROR: paths contain NaN')
  process.exit(1)
}
