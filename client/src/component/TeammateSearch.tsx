import React, { useState } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { Teammate } from '../types/team'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    optionBox: {
      fontSize: 'x-small',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    autoComplete: {
      width: '100%',
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
        setOptions(data.results)
      })
  }

  const onTeammateAdd = (option: Teammate) => () => {
    setTeammates(teammates.concat(option))
  }

  const unregisteredTeammateAdd = (email: any) => () => {
    if (email.length === 0) {
      // some kind of error handler
      return
    }
    email = {
      email,
    }
    setTeammates(teammates.concat(email))
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.autoComplete}
        id="teammate-search"
        // getOptionLabel is what the search input is looking up by
        // if its option.firstName then it only takes first name as the input
        getOptionLabel={(option: Teammate) => option.firstName!!}
        // renderOption is what is displayed from the input
        // renderOption also requires getOptionLabel
        renderOption={(option: Teammate) => {
          return (
            <div className={classes.optionBox}>
              <Typography
                variant={'h6'}
              >{`${option.firstName} ${option.lastNameLetter}`}</Typography>
              <Button
                onClick={onTeammateAdd(option)}
                // disabled={following.has(option.id)}
              >
                <PersonAddIcon />
                {/* {following.has(option.id) ? 'following' : 'follow'} */}
              </Button>
            </div>
          )
        }}
        freeSolo
        options={options}
        filterOptions={(options) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search people or enter email"
            margin="normal"
            variant="outlined"
            name="term"
            defaultValue=""
            onChange={handleChange}
          />
        )}
      />
      {options.length === 0 && (
        <Button onClick={unregisteredTeammateAdd(term)}>
          <AddBoxIcon color={'primary'} fontSize={'large'} />
        </Button>
      )}
    </div>
  )
}
