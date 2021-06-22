/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Button, makeStyles } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { UserToSearchResult } from '../types/users'

interface Option {
  firstName: string
  lastNameLetter: string
  username: string
  id: string
}

const useStyles = makeStyles({
  optionBox: {
    fontSize: 'x-small',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchBox: {
    width: '100%',
  },
})

export default function Search() {
  const [term, setTerm] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const [following, setFollowing] = useState<Set<string>>(new Set())
  const classes = useStyles()

  const handleChange = (e: any) => {
    setTerm(e.target.value)
    fetch(`/api/users/search?term=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((data) => {
        setOptions(data.results)
      })
  }

  const onFollow = (id: string) => () => {
    fetch('/api/follows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      const newFollowing = new Set(following)
      newFollowing.add(id)
      setFollowing(newFollowing)
    })
  }

  // need to move this to the home component
  // what does this useEffect depend on
  // following getting updated twice once on home render and then again on search render
  useEffect(() => {
    fetch('/api/follows/')
      .then((res) => res.json())
      .then((data) => {
        // setFollowing(data.followedUsers.map((user) => user.id))
        const followSet = new Set<string>(
          data.followedUsers.map((user) => user.id),
        )
        setFollowing(followSet)
      })
  }, [])
  // if the id matches the ones in the option list then
  // disable the add button and replace with "following" text

  return (
    <div className={classes.searchBox}>
      <Autocomplete
        id="free-solo-demo"
        // getOptionLabel is what the search input is looking up by
        // if its option.firstName then it only takes first name as the input
        getOptionLabel={(option: Option) => option.username}
        // renderOption is what is displayed from the input
        // renderOption also requires getOptionLabel
        renderOption={(option: Option) => {
          return (
            <div className={classes.optionBox}>
              <div>
                <h2>{`${option.firstName} ${option.lastNameLetter}.`}</h2>
                <h3>@{`${option.username}`}</h3>
              </div>
              <div>
                <Button
                  onClick={onFollow(option.id)}
                  disabled={following.has(option.id)}
                >
                  <PersonAddIcon />
                  {following.has(option.id) ? 'following' : 'follow'}
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
