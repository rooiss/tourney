import { Card, CardContent, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'
import FollowingAppBar from './FollowingAppBar'

export const Following = () => {
  // pass in props to this from the user

  const [following, setFollowing] = useState([])

  useEffect(() => {
    fetch('/api/follows/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFollowing(data.followedUsers)
          return
        }
      })
  }, [])

  return (
    <div>
      <FollowingAppBar />
      {following.map((u: any) => {
        return (
          <Card key={u.id}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {u.username}
              </Typography>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
