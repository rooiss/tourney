import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './AuthContext'

import { Landing } from './Landing'
import Search from './Search'

// const useStyles = makeStyles({
//   root: {
//     backgroundImage: `url('https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/38171759_841322879394176_4617258798623490048_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=a26aad&_nc_ohc=MdW3weUxOBwAX9KeL6y&_nc_ht=scontent-dfw5-2.xx&oh=1cd6b8cdd834f96bfa44f4c417680eb3&oe=60C82117')`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//   },
//   loginContainer: {
//     display: 'flex',
//   },
// })
export const Home = () => {
  // TODO
  // styles of home component
  // const classes = useStyles()
  const { user } = useAuth()
  return (
    <div>
      {user ? (
        <div>
          {user?.username}
          <Search />

          <Button
            component={Link}
            to={'/tournament'}
            color={'primary'}
            variant={'contained'}
          >
            Create Tournament
          </Button>
        </div>
      ) : (
        <Landing />
      )}
    </div>
  )
}
