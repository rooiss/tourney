import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'RegisteredTeam' },
)

export const RegisteredTeam = () => {
  const classes = useStyles()
  // const [team, setTeam] = useState([])
  // useEffect(()=> {
  //   fetch('/api/team')
  //   .then(res => res.json())
  //   .then(data => data.something)
  // },[])

  // const registeredTeam = team.map(() => {

  // }

  return (
    <div className={classes.root}>
      <div>Team: dig this</div>
      <div>player 1</div>
      <div>player 2</div>
      <div>player 3</div>
      <div>player 4</div>
    </div>
  )
}
