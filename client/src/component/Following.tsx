import { Card, CardContent, Typography } from '@material-ui/core'
import FollowingAppBar from './FollowingAppBar'
import { useFollowing } from './providers/FollowingProvider'

export const Following = () => {
  const { following } = useFollowing()

  return (
    <div>
      <FollowingAppBar />
      {following &&
        following.map((u: any) => {
          return (
            <Card variant="outlined" key={u.id}>
              <CardContent>
                <Typography variant="h6">
                  {u.firstName} {u.lastNameLetter}. {u.username}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
