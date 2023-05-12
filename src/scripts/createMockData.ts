import { setupDB } from '../setup-db'

import { createUser } from '../stores/users'
import { newTournament } from '../stores/tournaments'

async function main() {
  await setupDB()

  // before anything happens blow away all preexisting data

  // const firstDude = await createUser({
  //   password: hashFunction('testing'),
  //   firstName: 'Blah',
  //   lastName: 'Kim',
  //   email: 'laksdfkj@alkjsdflk.com',
  //   username: 'lsjkdflksdjf',
  // })

  // await newTournament(
  //   {
  //     id: '1',
  //   },
  //   firstDude,
  // )

  // tournaments
  // team within tournaments

  // typeORM drop all data
}

main()
