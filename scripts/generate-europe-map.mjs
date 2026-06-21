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

const HUB_IDS = new Set(['276', '528', '616', '040', '380']) // DE, NL, PL, AT, IT
const HQ_ID = '688'

const topo = await new Promise((resolve, reject) => {
  https.get('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', (res) => {
    let data = ''
    res.on('data', (c) => { data += c })
    res.on('end', () => resolve(JSON.parse(data)))
    res.on('error', reject)
  })
})
const geojson = feature(topo, topo.objects.countries)

const projection = geoMercator().center([18, 52]).scale(750).translate([500, 460])
const pathGen = geoPath(projection)

const countries = []

for (const f of geojson.features) {
  const id = String(f.id)
  if (!EUROPE_IDS.has(id)) continue
  const d = pathGen(f)
  if (!d) continue
  countries.push({
    id,
    name: f.properties.name,
    path: d,
    hq: id === HQ_ID,
    hub: HUB_IDS.has(id),
  })
}

mkdirSync('src/data', { recursive: true })
const hqMarker = projection([20.14, 44.24])
writeFileSync(
  'src/data/europe-map.json',
  JSON.stringify({ viewBox: '0 0 1000 700', countries, hqMarker: { x: hqMarker[0], y: hqMarker[1] } }),
)
console.log(`Generated ${countries.length} countries`)
