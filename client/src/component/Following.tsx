import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'
import FollowingAppBar from './FollowingAppBar'

export const Following = () => {
  // pass in props to this from the user

  const [following, setFollowing] = useState([])

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {},
    }),
  )
  useEffect(() => {
    fetch('/api/follows/')
      .then((res) => res.json())
      .then((data) => setFollowing(data.followedUsers))
  }, [])

  // const classes = useStyles()
  const allFollowing = following.map((u: any) => {
    return (
      <Card key={u.id}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {u.username}
          </Typography>
        </CardContent>
      </Card>
    )
  })
  return (
    <div>
      <FollowingAppBar />
      {allFollowing}
    </div>
  )
}
