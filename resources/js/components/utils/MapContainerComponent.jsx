import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import at from './attributes'

const MapContainerComponent = ({children, center, zoom = 13}) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{width: '100%', height: '100%'}}>
        <TileLayer attribution={at.attribution} url={at.url}/>
        {children}
    </MapContainer>
  )
}

export default MapContainerComponent