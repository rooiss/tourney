import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { GoogleMap, Marker } from '@react-google-maps/api'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(2),
    },
  }),
  { name: 'Map' },
)

const libraries = ['places' as const]

export const Map = ({ tourneyLocation }) => {
  const classes = useStyles()

  const containerStyle = {
    width: '100%',
    height: '450px',
  }
  const center = {
    lat: tourneyLocation.lat,
    lng: tourneyLocation.lng,
  }
  return (
    <div className={classes.root}>
      <GoogleMap zoom={16} center={center} mapContainerStyle={containerStyle}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  )
}
