import { geoMercator } from 'd3-geo'

export type MapProjectionMeta = {
  center: [number, number]
  scale: number
  translate: [number, number]
}

export function createMapProjection(meta: MapProjectionMeta) {
  return geoMercator()
    .center(meta.center)
    .scale(meta.scale)
    .translate(meta.translate)
}

export function projectMapPoint(meta: MapProjectionMeta, lon: number, lat: number) {
  const point = createMapProjection(meta)([lon, lat])
  if (!point) {
    throw new Error(`Failed to project [${lon}, ${lat}]`)
  }
  return { x: point[0], y: point[1] }
}
