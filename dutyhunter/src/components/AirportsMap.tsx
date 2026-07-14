'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

type Airport = {
  id: string
  iata_code: string
  airport_name: string
  city: string | null
  latitude: number
  longitude: number
}

type AirportsMapProps = {
  airports: Airport[]
}

// Forces Leaflet to remeasure its container after mount —
// fixes the "thin strip" bug that happens in flex/grid layouts
function ResizeFix() {
  const map = useMap()

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)

    function handleResize() {
      map.invalidateSize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [map])

  return null
}
export default function AirportsMap({ airports }: AirportsMapProps) {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <ResizeFix />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {airports.map((airport) => (
          <Marker key={airport.id} position={[airport.latitude, airport.longitude]}>
            <Popup>
              <strong>{airport.iata_code}</strong> — {airport.airport_name}
              {airport.city ? <><br />{airport.city}</> : null}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}