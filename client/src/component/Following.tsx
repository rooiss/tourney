import { Card, CardContent, Typography } from '@material-ui/core'
import FollowingAppBar from './FollowingAppBar'
import { useFollowing } from './providers/FollowingProvider'

export const Following = () => {
  const { following } = useFollowing()

  return (
    <div>
      <FollowingAppBar />
      {console.log(following)}
      {following &&
        following.map((u: any) => {
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
