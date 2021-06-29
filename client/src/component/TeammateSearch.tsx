import React, { useState } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { Teammate } from '../types/team'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    optionBox: {
      fontSize: 'x-small',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
  { name: 'TeammateSearch' },
)

export interface TeammateSearchProps {
  tournamentId: string
  teammates: Teammate[]
  setTeammates: (teammate: Teammate) => void
}

export const TeammateSearch = ({ tournamentId, teammates, setTeammates }) => {
  const [options, setOptions] = useState<Teammate[]>([])
  const [term, setTerm] = useState('')
  const classes = useStyles()

  const handleChange = (e: any) => {
    setTerm(e.target.value)
    fetch(`/api/users/search?term=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data.results', data.results)
        setOptions(data.results)
      })
  }

  const onTeamAdd = (teammate: Teammate) => () => {
    setTeammates(teammates.concat(teammate))
  }

  return (
    <Autocomplete
      id="teammate-search"
      // getOptionLabel is what the search input is looking up by
      // if its option.firstName then it only takes first name as the input
      getOptionLabel={(option: Teammate) => option.firstName!!}
      // renderOption is what is displayed from the input
      // renderOption also requires getOptionLabel
      renderOption={(option: Teammate) => {
        return (
          <div className={classes.optionBox}>
            <div>
              <h2>{`${option.firstName} ${option.lastName!!}`}</h2>
            </div>
            <div>
              <Button
                onClick={() => onTeamAdd(option)}
                // disabled={following.has(option.id)}
              >
                <PersonAddIcon />
                {/* {following.has(option.id) ? 'following' : 'follow'} */}
              </Button>
            </div>
          </div>
        )
      }}
      freeSolo
      options={options}
      filterOptions={(options) => options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search users or enter email"
          margin="normal"
          variant="outlined"
          name="term"
          onChange={handleChange}
        />
      )}
    />
  )
}
