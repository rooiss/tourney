import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'Map' },
)

const libraries = ['places' as const]

const options = {
  disableDefaultUI: true,
}

export const Map = () => {
  const classes = useStyles()

  // const [tourneyMarker, setTourneyMarker] = useState({})

  const center = {
    lat: 37.3428,
    lng: -122.0423,
  }

  const containerStyle = {
    width: '600px',
    height: '400px',
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY || '',
    libraries,
  })

  return (
    <div className={classes.root}>
      <GoogleMap
        zoom={16}
        center={center}
        mapContainerStyle={containerStyle}
        // options={options}
      >
        <Marker position={{ lat: center.lat, lng: center.lng }} />
      </GoogleMap>
    </div>
  )
}
