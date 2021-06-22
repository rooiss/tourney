import {
  Card,
  CardContent,
  createStyles,
  List,
  ListItem,
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
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }),
  )
  useEffect(() => {
    fetch('/api/follows/')
      .then((res) => res.json())
      .then((data) => setFollowing(data.followedUsers))
  }, [following])

  const classes = useStyles()
  const allFollowing = following.map((u: any) => {
    return (
      <Card>
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
