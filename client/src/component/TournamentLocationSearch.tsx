import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'TournamentLocationSearch' },
)

export const TournamentLocationSearch = () => {
  const classes = useStyles()
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })

  // const handleChange = ({ address }) => {
  //   setAddress({ address })
  // }

  const handleSelect = async (address) => {
    const result = await geocodeByAddress(address)
    const latLng = await getLatLng(result[0])
    setAddress(address)
    // setCoordinates(latLng)
  }

  return (
    <div className={classes.root}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'type address' })} />
            <div>{loading ? <div>...loading</div> : null}</div>
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? '#41b6e6' : '#0000000',
              }
              return (
                <div
                  // key={suggestion}
                  {...getSuggestionItemProps(suggestion, { style })}
                >
                  {suggestion.description}
                </div>
              )
            })}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}
