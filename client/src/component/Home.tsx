import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './AuthContext'

import { Landing } from './Landing'
import Search from './Search'

interface HomeProps {}
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
export const Home = ({}: HomeProps) => {
  // TODO
  // styles of home component
  // const classes = useStyles()
  // split up logged in component
  // add search component
  const { user } = useAuth()
  return (
    <div>
      {user ? (
        <div>
          {user?.username}
          <Search />
        </div>
      ) : (
        <Landing />
      )}
    </div>
  )
}
