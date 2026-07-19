'use client'

// Leaflet map showing airport markers, with favoriting via popup.
import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useMessages } from 'next-intl'
import type { LocaleMessages } from '@/lib/localeMessages'

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Self-contained colored pin icons — no external image dependency beyond the default shadow above.
function buildIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z" fill="${color}" stroke="#1a1a1a" stroke-width="1"/>
        <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
      </svg>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35],
  })
}

const DEFAULT_ICON = buildIcon('#3388ff')
const FAVORITE_ICON = buildIcon('#facc15')

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
  favoriteIds: Set<string>
  onToggleFavorite: (airportId: string) => void
  canFavorite: boolean
  addLabel: string
  removeLabel: string
}

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

export default function AirportsMap({
  airports,
  favoriteIds,
  onToggleFavorite,
  canFavorite,
  addLabel,
  removeLabel,
}: AirportsMapProps) {
  const messages = useMessages() as unknown as LocaleMessages
  const tLocation = (city: string) => messages.locations?.[city] ?? city

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
        {airports.map((airport) => {
          const isFavorite = favoriteIds.has(airport.id)
          return (
            <Marker
              key={airport.id}
              position={[airport.latitude, airport.longitude]}
              icon={isFavorite ? FAVORITE_ICON : DEFAULT_ICON}
            >
              <Popup>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    minWidth: '140px',
                  }}
                >
                  <div>
                    <strong>{airport.iata_code}</strong> — {airport.airport_name}
                    {airport.city ? (
                      <>
                        <br />
                        {tLocation(airport.city)}
                      </>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(airport.id)}
                    disabled={!canFavorite}
                    aria-label={isFavorite ? removeLabel : addLabel}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '2px',
                      cursor: canFavorite ? 'pointer' : 'default',
                      fontSize: '18px',
                      color: isFavorite ? '#facc15' : '#666',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {isFavorite ? '★' : '☆'}
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
