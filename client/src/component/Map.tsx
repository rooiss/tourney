import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { mapStyles } from '../mapStyles/mapStyles'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(2),
    },
  }),
  { name: 'Map' },
)

const libraries = ['places' as const]

// const options = {
//   styles: mapStyles,
// }

export const Map = ({ tourneyLocation }) => {
  const classes = useStyles()

  // const [tourneyMarker, setTourneyMarker] = useState({})

  const containerStyle = {
    width: '650px',
    height: '450px',
  }
  const center = {
    lat: tourneyLocation.lat,
    lng: tourneyLocation.lng,
  }
  return (
    <div className={classes.root}>
      <GoogleMap
        zoom={16}
        center={center}
        mapContainerStyle={containerStyle}
        // options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  )
}
