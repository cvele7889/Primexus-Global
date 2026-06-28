export type MapRoute = {
  id: string
  city: string
  lon: number
  lat: number
  bend: number
}

/** Capital cities — SVG coordinates are derived at runtime from map projection. */
export const mapRoutes: MapRoute[] = [
  { id: 'de', city: 'Berlin', lon: 13.405, lat: 52.52, bend: -0.14 },
  { id: 'gb', city: 'London', lon: -0.1276, lat: 51.5074, bend: -0.2 },
  { id: 'fr', city: 'Paris', lon: 2.3522, lat: 48.8566, bend: -0.16 },
  { id: 'it', city: 'Rome', lon: 12.4964, lat: 41.9028, bend: 0.1 },
  { id: 'es', city: 'Madrid', lon: -3.7038, lat: 40.4168, bend: 0.15 },
  { id: 'ru', city: 'Moscow', lon: 37.6173, lat: 55.7558, bend: -0.22 },
  { id: 'tr', city: 'Istanbul', lon: 28.9784, lat: 41.0082, bend: 0.12 },
  { id: 'ae', city: 'Dubai', lon: 55.2708, lat: 25.2048, bend: 0.18 },
  { id: 'in', city: 'Delhi', lon: 77.209, lat: 28.6139, bend: 0.2 },
  { id: 'cn', city: 'Beijing', lon: 116.4074, lat: 39.9042, bend: -0.18 },
  { id: 'jp', city: 'Tokyo', lon: 139.6917, lat: 35.6895, bend: -0.15 },
  { id: 'pl', city: 'Warsaw', lon: 21.0122, lat: 52.2297, bend: -0.1 },
  { id: 'nl', city: 'Amsterdam', lon: 4.9041, lat: 52.3676, bend: -0.19 },
  { id: 'gr', city: 'Athens', lon: 23.7275, lat: 37.9838, bend: 0.14 },
  { id: 'kr', city: 'Seoul', lon: 126.978, lat: 37.5665, bend: -0.12 },
  { id: 'th', city: 'Bangkok', lon: 100.5018, lat: 13.7563, bend: 0.22 },
]

export function buildCurvedPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
): string {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const cx = midX + (-dy / len) * len * bend
  const cy = midY + (dx / len) * len * bend
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}
