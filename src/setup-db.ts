import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { getAppConfig } from './config'
import { upsertDefaultDivisions } from './stores/divisions'

export async function setupDB() {
  const config = getAppConfig()
  const dbConnection = await createConnection(
    config.dbConfig as PostgresConnectionOptions,
  )
  await dbConnection.synchronize()

  // upsert default divisions
  await upsertDefaultDivisions()

  console.log('========== Database schema synced =========')
}
