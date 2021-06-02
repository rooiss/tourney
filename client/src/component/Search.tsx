/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core'

interface Option {
  firstName: string
  lastNameLetter: string
  username: string
}

const useStyles = makeStyles({
  optionBox: {
    fontSize: 'x-small',
    padding: '0',
  },
})

export default function Search() {
  const [term, setTerm] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const classes = useStyles()

  const handleChange = (e: any) => {
    setTerm(e.target.value)
    fetch(`/api/users/search?term=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((data) => {
        setOptions(data.results)
        console.log(`data`, data)
      })
  }

  return (
    <div style={{ width: 350 }}>
      <Autocomplete
        id="free-solo-demo"
        // getOptionLabel is what the search input is looking up by
        // if its option.firstName then it only takes first name as the input
        // getOptionLabel={(option: Option) => option.username}
        // renderOption is what is displayed from the input
        // renderOption also requires getOptionLabel
        renderOption={(option: Option) => {
          return (
            <div className={classes.optionBox}>
              <h2>{`${option.firstName} ${option.lastNameLetter}.`}</h2>
              <h3>@{`${option.username}`}</h3>
            </div>
          )
        }}
        freeSolo
        options={options}
        filterOptions={(options) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Name | @username | email"
            margin="normal"
            variant="outlined"
            name="term"
            onChange={handleChange}
          />
        )}
      />
    </div>
  )
}
