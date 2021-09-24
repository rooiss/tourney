import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import FollowingAppBar from './FollowingAppBar'
import { useFollowing } from './providers/FollowingProvider'

const useStyles = makeStyles(
  (theme) => ({
    title: {
      textAlign: 'left',
    },
  }),
  { name: 'Following' },
)

export const Following = () => {
  const classes = useStyles()

  const { following } = useFollowing()

  return (
    <div>
      <FollowingAppBar />
      {following &&
        following.map((u: any) => {
          return (
            <Card variant="outlined" key={u.id}>
              <CardContent>
                <Typography variant="h6" className={classes.title}>
                  {u.firstName} {u.lastNameLetter}. {u.username}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
