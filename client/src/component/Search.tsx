/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

interface Option {
  firstName: string
  lastNameLetter: string
  username: string
}

export default function Search() {
  const [term, setTerm] = useState('')
  const [options, setOptions] = useState<Option[]>([])

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
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        getOptionLabel={(option: Option) => option.firstName}
        renderOption={(option: Option) => {
          return <h4>{`${option.firstName}`}</h4>
        }}
        freeSolo
        options={options}
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
