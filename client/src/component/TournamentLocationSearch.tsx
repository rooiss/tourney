import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { TourneyLocation } from '../types/tournament'
import { Input } from '@material-ui/core'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'TournamentLocationSearch' },
)

interface TournamentLocationSearchProps {
  tourneyLocation: TourneyLocation | null
  onChange: (tourneyLocation: TourneyLocation) => void
}

export const TournamentLocationSearch = ({
  tourneyLocation,
  onChange,
}: TournamentLocationSearchProps) => {
  const classes = useStyles()

  const [address, setAddress] = useState(tourneyLocation?.address || '')

  const handleSelect = async (address) => {
    const result = await geocodeByAddress(address)
    const latLng = await getLatLng(result[0])
    onChange({
      ...latLng,
      address: address,
    })
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
            <Input {...getInputProps({ placeholder: 'Location' })} />
            <div>{loading ? <div>...loading</div> : null}</div>
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? '#41b6e6' : '#0000000',
              }
              return (
                <div
                  {...{
                    ...getSuggestionItemProps(suggestion, { style }),
                    key: suggestion.placeId,
                    // adding a key to this spreaded obj
                  }}
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
