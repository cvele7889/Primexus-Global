import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { writeFileSync, mkdirSync } from 'fs'
import https from 'https'

// Europe — without Armenia (051), Russia, Turkey, etc.
const EUROPE_IDS = new Set([
  '008', '020', '040', '056', '070', '100', '112', '191', '196',
  '203', '208', '233', '246', '250', '276', '300', '348', '352', '372',
  '380', '428', '438', '440', '442', '470', '492', '498', '499', '528',
  '578', '616', '620', '642', '674', '688', '703', '705', '724',
  '752', '756', '804', '807', '826',
])

const HQ_ID = '688'
const WIDTH = 900
const HEIGHT = 620
const PADDING = 28

const topo = await new Promise((resolve, reject) => {
  https.get('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', (res) => {
    let data = ''
    res.on('data', (c) => { data += c })
    res.on('end', () => resolve(JSON.parse(data)))
    res.on('error', reject)
  })
})

const geojson = feature(topo, topo.objects.countries)
const europeFeatures = geojson.features.filter((f) => EUROPE_IDS.has(String(f.id)))
const europeCollection = { type: 'FeatureCollection', features: europeFeatures }

const projection = geoMercator().fitExtent(
  [[PADDING, PADDING], [WIDTH - PADDING, HEIGHT - PADDING]],
  europeCollection,
)
const pathGen = geoPath(projection)

const countries = europeFeatures.map((f) => {
  const id = String(f.id)
  const d = pathGen(f)
  if (!d) return null
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
console.log(`Generated ${countries.length} countries, viewBox 0 0 ${WIDTH} ${HEIGHT}`)
